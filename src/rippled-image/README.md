#  set up a private ledger network

###  contents

1.  [xrpl node `rippled` run a xrp ledger node](#xrpl-node-rippled-run-a-xrp-ledger-node)
2.  [introduction](#introduction)
2.  [set up a private ledger network](#set-up-a-private-ledger-network)

##  [xrpl node `rippled` run a xrp ledger node](https://hub.docker.com/r/xrpllabsofficial/xrpld)

docker is a platform that allows developers to automate the deployment and management of applicatiosn within software containers.  containers are lightweight, isolated, enviroments that package all the necessary software, libraries, and dependencies required to run an application.  containers provide a consistent enviroment across different systems, making it easier to deploy applications on various platforms.

**docker images** are the building blocks of containers.  they are read only templates that contain everything needed to run an application, including the operating system, application code, runtime, libraries, and dependencies.  runtime handles tasks like process management, memory allocation, file system access, network communication, and other services for your applications executabe.

`docker pull xrpllabsofficial/xrpld`

by running the "docker pull" command with the specified image name, you would download the docker image containing the XRPL software or related tools onto your local machine. this image can then be used to create and run docker containers based on the XRPL application or components.

**containers** are instances of docker images that can be run on a host system.  each container is isolated from other containers and the host system, providing process-level isolation and ensuring that applications run consistently across different enviroments.

When running a container, it uses an isolated filesystem. This custom filesystem is provided by a container image. Since the image contains the container's filesystem, it must include everything needed to run the application - all dependencies, configuration, scripts, binaries, etc. The image also contains other configuration for the container, such as environment variables, a default command to run, and other metadata.

**Dockerfile**  a docker file is a text file that contains a set of instructions for building a docker image.  it specifies the base image, adds application code and dependencies, and defines configurations and settings.  think about it this way... a dockerfile is alot like a makefile!  dockerfiles are specific to docker image creation and containerization, while makefiles are of course a more general purpose build automation tool for compilation.

you use docker to develop apps within a container, containers are runtime enviroments.  think of containers like virtual machines, VMs emulate an entire operating system, while containers share the host system's kernel.  the kernel is the central component of an OS and is the core part that manages the system's resources and acts as the bridge between the hardware and software layers of a the system

###  [Rippled (node)](https://github.com/WietseWind/docker-rippled.git)

this is a container that allows you to run a `rippled` node.  with no config required.

```
❯ tree
.
├── Dockerfile          //  instructions for building docker image
├── LICENSE
├── README.md
├── config
│   ├── rippled.cfg
│   └── validators.txt
├── entrypoint
└── go
    ├── build
    ├── down
    └── up

3 directories, 9 files
```

###  `docker-rippled/Dockerfile` load build definitions

having a basic understanding of the dockerfile will be helpful for gaining insights into how the docker image is built and what dependencies are installed.  it allows you to have more control and visibility over the enviroment in which the rippld node will run.


```Dockerfile
FROM ubuntu:latest

LABEL maintainer="w@xrpl-labs.com"

RUN export LANGUAGE=C.UTF-8; export LANG=C.UTF-8; export LC_ALL=C.UTF-8; export DEBIAN_FRONTEND=noninteractive

COPY entrypoint /entrypoint.sh

RUN apt-get update -y && \
    apt-get install apt-transport-https ca-certificates wget gnupg -y && \
    mkdir -p /usr/local/share/keyrings/ && \
    wget -q -O - "https://repos.ripple.com/repos/api/gpg/key/public" | gpg --dearmor > ripple-key.gpg && \
    mv ripple-key.gpg /usr/local/share/keyrings && \
    echo "deb [signed-by=/usr/local/share/keyrings/ripple-key.gpg] https://repos.ripple.com/repos/rippled-deb focal stable" | tee -a /etc/apt/sources.list.d/ripple.list && \
    apt-get update -y && \
    apt-get install rippled -y && \
    rm -rf /var/lib/apt/lists/* && \
    export PATH=$PATH:/opt/ripple/bin/ && \
    chmod +x /entrypoint.sh && \
    echo '#!/bin/bash' > /usr/bin/server_info && echo '/entrypoint.sh server_info' >> /usr/bin/server_info && \
    chmod +x /usr/bin/server_info

RUN ln -s /opt/ripple/bin/rippled /usr/bin/rippled

EXPOSE 80 443 5005 6006 51235

ENTRYPOINT [ "/entrypoint.sh" ]
```


1.  `FROM ubuntu:latest`  specifies the base image for the docker image.  in this case it starts with the latest version of ubuntu linux distribution.  It is most advisable to use Ubuntu's operating system in order to run the rippled node.

2.  `LABEL maintainer="w@xrpl-labs.com"`  adds a label to the image indicating the maintainer's email address

3.  `RUN export LANGUAGE=C.UTF-8;`  sets enviroment variables to configure the locale and the debian package manager for non-interactive mode

4.  `COPY entrypoint/entrypoint.sh`  copies the file name `entrypoint` from the build context to `/entrypoint.sh` inside the image.

5.  `RUN apt-get update -y &&....`  updates the package lists, installs necessary dependencies, sets up the Ripple repository keyring, adds the ripple repository to the package manager's sources, installs the rippled package, and cleans up the package lists.

6.  `RUN In -s /opt/ripple/bin/rippled/usr/bin/rippled` creates a symbolic link to the rippled binary in the `/usr/bin` directory

7.  `EXPOSE 80 443 5005 6006 51235`  exposes ports 80, 443, 5005, 6006, and 51235 from the container to the host system.  these are ports that can be used to communicate with the rippled node.

8.  `ENTRYPOINT [ "/entrypoint.sh" ]`  specifies the entrypoint command that will be executed when a container is started from this image.  in this case it runs the `/entrypoint.sh` script.


this container is configurd to serve a public http websocket at port `80` and the rpc admin service in the container at port `5005`.  other ports can be mapped but should be enabled in the config first.

###  how to run

1.  `pwd docker-rippled`
2.  `go/build`
3.  `go/up`

the `go/up` command will mount the subfolder in the cloned repo fold `config` to the container; the `rippled.cfg` config and `validators.txt` will be loaded from this folder when `rippled` starts.  after spinning up the container you will see the rippled log.  you should see a lot of information show up within a few seconds.  

```
2023-Jun-06 19:08:05.059149217 UTC LedgerConsensus:NFO Converge cutoff (0 participants)
2023-Jun-06 19:08:05.060407800 UTC LedgerConsensus:NFO CNF buildLCL E8A8012962F96D61CD5EAF6F51EFAC9635980EE65F2B66E78AE5DAEC50DBA95A
2023-Jun-06 19:08:05.062513383 UTC NetworkOPs:WRN We are not running on the consensus ledger
2023-Jun-06 19:08:05.063004633 UTC NetworkOPs:NFO Our LCL:
{
	"accepted" : true,
	"account_hash" : "96E8B73A7B24E6238E6C22ECB5E00586ED1A8FC37372B7A6C643ACD8607F83D3",
	"close_flags" : 0,
	"close_time" : 739393681,
	"close_time_human" : "2023-Jun-06 19:08:01.000000000 UTC",
	"close_time_resolution" : 10,
	"closed" : true,
	"hash" : "E8A8012962F96D61CD5EAF6F51EFAC9635980EE65F2B66E78AE5DAEC50DBA95A",
	"ledger_hash" : "E8A8012962F96D61CD5EAF6F51EFAC9635980EE65F2B66E78AE5DAEC50DBA95A",
	"ledger_index" : "4",
	"parent_close_time" : 739393680,
	"parent_hash" : "2D4227C0ADC82FEBAF6C0455B56654A468F3E2FAC4054D25DC63B40B82FA82E8",
	"seqNum" : "4",
	"totalCoins" : "100000000000000000",
	"total_coins" : "100000000000000000",
	"transaction_hash" : "0000000000000000000000000000000000000000000000000000000000000000"
}
2023-Jun-06 19:08:36.236364217 UTC NetworkOPs:NFO Our LCL:
{
	"accepted" : true,
	"account_hash" : "86C206D41843A1558E4A2FBEA9067530987E941ED1B5F45CD24D2C7DAFBEDBB3",
	"close_flags" : 0,
	"close_time" : 739393712,
	"close_time_human" : "2023-Jun-06 19:08:32.000000000 UTC",
	"close_time_resolution" : 10,
	"closed" : true,
	"hash" : "0542423067B9910102F75E35E3254345890AEEBC676F632A0DA17F3D23EBBA33",
	"ledger_hash" : "0542423067B9910102F75E35E3254345890AEEBC676F632A0DA17F3D23EBBA33",
	"ledger_index" : "7",
	"parent_close_time" : 739393711,
	"parent_hash" : "0F4B74CD5D902ED9D7B3627B41C87DE3043DC41592F82E535D9500FD00AB508A",
	"seqNum" : "7",
	"totalCoins" : "100000000000000000",
	"total_coins" : "100000000000000000",
	"transaction_hash" : "0000000000000000000000000000000000000000000000000000000000000000"
}
```

form the docker hub use the image `xrpllabsofficial/xrpld.`  because you only retrieved the container image from the docker hub, you have to manually create a container based on the image.  when creating the container, please make sure youre open port 80.


the command that launches your `rippled` container and the rippled websocket at port 80


```
❯ docker run -dit --platform linux/amd64 \
    --name rippled \
    -p 80:80 \
    -v /Users/mbergen/Documents/Github/docker-rippled/config/:/config/ \
    xrpllabsofficial/xrpld:latest
c2e5d8654a143661bd2b6d351e2f2e98cc09a9c0875c19549e53f31242ee68fb
```

the output `c2e5d8654a143661bd2b6d351e2f2e98cc09a9c0875c19549e53f31242ee68fb` you received after running the `docker run` command is teh containerID of the newly created docker container.


###  `docker logs -f rippled`

```
```

###  `docker exec rippled server_info`

```
Args:
    >> [server_info]

Env Args:
    >> []

Env:
_=/usr/bin/printenv
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
SHLVL=2
HOME=/root
PWD=/
HOSTNAME=c2e5d8654a14

Loading: "/etc/opt/ripple/rippled.cfg"
2023-Jun-08 22:27:36.596040840 UTC HTTPClient:NFO Connecting to 127.0.0.1:5005

{
   "result" : {
      "info" : {
         "build_version" : "1.10.1",
         "closed_ledger" : {
            "age" : 26,
            "base_fee_xrp" : 1e-05,
            "hash" : "43CBD1D7BC343B69D5958E887D892499DC4F48FB1EE8BF3EE0F5A047FC0DA42C",
            "reserve_base_xrp" : 200,
            "reserve_inc_xrp" : 50,
            "seq" : 22
         },
         "complete_ledgers" : "empty",
         "fetch_pack" : 1,
         "hostid" : "c2e5d8654a14",
         "io_latency_ms" : 1,
         "jq_trans_overflow" : "0",
         "last_close" : {
            "converge_time_s" : 3.009,
            "proposers" : 0
         },
         "load" : {
            "job_types" : [
               {
                  "in_progress" : 1,
                  "job_type" : "clientRPC"
               },
               {
                  "job_type" : "untrustedValidation",
                  "peak_time" : 2,
                  "per_second" : 15
               },
               {
                  "job_type" : "ledgerData",
                  "per_second" : 1
               },
               {
                  "job_type" : "advanceLedger",
                  "peak_time" : 3,
                  "per_second" : 11
               },
               {
                  "job_type" : "fetchTxnData",
                  "peak_time" : 6,
                  "per_second" : 66
               },
               {
                  "job_type" : "trustedValidation",
                  "peak_time" : 3,
                  "per_second" : 5
               },
               {
                  "job_type" : "trustedProposal",
                  "peak_time" : 3,
                  "per_second" : 10
               },
               {
                  "job_type" : "peerCommand",
                  "peak_time" : 3,
                  "per_second" : 495
               },
               {
                  "job_type" : "SyncReadNode",
                  "per_second" : 3
               }
            ],
            "threads" : 6
         },
         "load_factor" : 1,
         "node_size" : "tiny",
         "peer_disconnects" : "10",
         "peer_disconnects_resources" : "0",
         "peers" : 10,
         "pubkey_node" : "n9JmKDRMgeeScGdiabVgg4ikxZSCqDjhc8yp4V64B49BNpAHSzEn",
         "pubkey_validator" : "none",
         "published_ledger" : "none",
         "server_state" : "connected",
         "server_state_duration_us" : "112335133",
         "state_accounting" : {
            "connected" : {
               "duration_us" : "233761235",
               "transitions" : "3"
            },
            "disconnected" : {
               "duration_us" : "4236705",
               "transitions" : "3"
            },
            "full" : {
               "duration_us" : "0",
               "transitions" : "0"
            },
            "syncing" : {
               "duration_us" : "0",
               "transitions" : "0"
            },
            "tracking" : {
               "duration_us" : "0",
               "transitions" : "0"
            }
         },
         "time" : "2023-Jun-08 22:27:36.622943 UTC",
         "uptime" : 238,
         "validation_quorum" : 28,
         "validator_list" : {
            "count" : 2,
            "expiration" : "2023-Oct-24 00:00:00.000000000 UTC",
            "status" : "active"
         }
      },
      "status" : "success"
   }
}
```

###  update process

1.  `docker stop rippled`

2.  remove the conaginer `docker rm rippled`

3.  remove the image `docker rmi xrpllabsofficial/xrpld:latest`


###  ledger header

```
{
	"accepted" : true,
	"account_hash" : "96E8B73A7B24E6238E6C22ECB5E00586ED1A8FC37372B7A6C643ACD8607F83D3",
	"close_flags" : 0,
	"close_time" : 739393681,
	"close_time_human" : "2023-Jun-06 19:08:01.000000000 UTC",
	"close_time_resolution" : 10,
	"closed" : true,
	"hash" : "E8A8012962F96D61CD5EAF6F51EFAC9635980EE65F2B66E78AE5DAEC50DBA95A",
	"ledger_hash" : "E8A8012962F96D61CD5EAF6F51EFAC9635980EE65F2B66E78AE5DAEC50DBA95A",
	"ledger_index" : "4",
	"parent_close_time" : 739393680,
	"parent_hash" : "2D4227C0ADC82FEBAF6C0455B56654A468F3E2FAC4054D25DC63B40B82FA82E8",
	"seqNum" : "4",
	"totalCoins" : "100000000000000000",
	"total_coins" : "100000000000000000",
	"transaction_hash" : "0000000000000000000000000000000000000000000000000000000000000000"
}
```

