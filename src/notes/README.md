#  set up a private ledger network

line 353

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


### now validator key tool generation

[link](https://github.com/ripple/validator-keys-tool/blob/master/README.md)


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

##  quickstart

1.  [prerequisites](#prerequisites)
2.  [configure the network](#configure-the-network)
3.  [start the network](#start-the-network)
4.  [verify the network](#verify-the-network)
5.  [perform a test transaction](#perform-a-test-transaction)
6.  [stop the network](#stop-the-network)


###  prerequisites

1.  install docker
2.  generate the keys for each of your validator nodes by using the `validator-keys` tool provided with `rippled`



```zsh
❯ l
total 16
drwxr-xr-x  11 mbergen  staff   352B Jun  9 10:29 .
drwx------+  7 mbergen  staff   224B Jun  1 10:04 ..
-rw-r--r--@  1 mbergen  staff   6.0K Jun  7 12:52 .DS_Store
drwxr-xr-x  23 mbergen  staff   736B Jun  4 19:51 blockchain-demo
drwxr-xr-x@ 12 mbergen  staff   384B Jun  9 09:07 cbdc-demos
drwxr-xr-x   9 mbergen  staff   288B Jun  8 08:26 internship
drwxr-xr-x   8 mbergen  staff   256B Jun  7 14:41 learning-unix
drwxr-xr-x   5 mbergen  staff   160B Jun  7 12:52 private-network
drwxr-xr-x  23 mbergen  staff   736B Jun  9 09:16 rippled
drwxr-xr-x  15 mbergen  staff   480B Jun  6 14:49 validator-keys-tool
drwxr-xr-x  12 mbergen  staff   384B Jun  6 13:57 welcome-to-docker
❯ cd validator-keys-tool
❯
❯ docker run -it --platform linux/amd64 \
>       --entrypoint /bin/bash \
>       xrpllabsofficial/xrpld:latest

root@611b18544728:/# ls
bin  boot  dev  entrypoint.sh  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

root@611b18544728:/# cd /opt/ripple/bin &&
>   ./validator-keys create_keys --keyfile /PATH/TO/YOUR/validator-keys.json
Validator keys stored in /PATH/TO/YOUR/validator-keys.json

This file should be stored securely and not shared.

root@611b18544728:/opt/ripple/bin# cat /PATH/TO/YOUR/validator-keys.json
{
   "key_type" : "ed25519",
   "public_key" : "nHBPqHygzUYR599K3qtcjEfvp8SMyqpo9rTo7xB5ctfTiq7AjiZy",
   "revoked" : false,
   "secret_key" : "pnPFw253m76hRSv8JqHQ1YJQkEBuHsjfeRAKhrMd1d64DfJu8VY",
   "token_sequence" : 0
}
root@611b18544728:/opt/ripple/bin# ./validator-keys create_token --keyfile /PATH/TO/YOUR/validator-keys.json
Update rippled.cfg file with these values and restart rippled:

# validator public key: nHBPqHygzUYR599K3qtcjEfvp8SMyqpo9rTo7xB5ctfTiq7AjiZy

[validator_token]
eyJtYW5pZmVzdCI6IkpBQUFBQUZ4SWUwRmNMVjE4MlBNNmlNRDNPQ1FSbWEvWGp5VlY2MlE2
U2ZUNUh6RWMwK1grbk1oQXZTR2pIRC9HcytFT0NRUUo4c3BBNXJNQ1RoT2EwV2ZaOGpPSVlP
b3R1U2Rka2N3UlFJaEFOUFZaYXZySjd3bzk2K0NRU2hYMU5nb3pXSCtlN3phZWxEcnJuTTVo
M24yQWlBSG8wbnR4ZDhZcXgzU3hkcDJ4bER4THVnYUwxcVFpN2d1QkZjYndzakRhSEFTUUo1
Q1Fxck93Q2ZKdEY1cXgyckwzS3FuR1J6NDVPRFlmZTVsRzI3RG8rSitheW9CQytmdUNUWHMr
bk5FV2hZMWlOYktMak5yUnBTMllHYnBuWjZEM1FRPSIsInZhbGlkYXRpb25fc2VjcmV0X2tl
eSI6IkJGRTkyQUQyMjYwOTZFM0U2QUM0NzdFNTgzQjQxNDdEMkNBMzM0QjJDRkYzQzQ4ODMx
OTc4MEVENUJBRjMxNkEifQ==

root@611b18544728:/opt/ripple/bin#
```

###  `rippled.cfg`

a .cfg file is a configuration file that contains settings and parameters for a particular application or system.  it is commonly used to define the behavior and properties of the software based on the values specified in the file.

in this case, the provided `rippled.cfg` file appears to be a configuration file for the [rippled software](https://github.com/XRPLF/rippled).  the language used in the `rippled.cfg` is often referred to as an "INI-style" configuration format.  it is a simple and human readable format that consists of sections, keys, and values.

across unix like operating systems many different configuration file formats exist, with each application or service ppotentially having a unique format, but there is a strong tradition of human readable plain text and simple `key-value-pari` formats.  so a configuration file `rippled.cfg` is a file is the set of command upon startup.  analogous to `.vimrc` config which runs a set of commands upon start up.  

system wide software often uses configuration files stored in `/etc` while user application often use a `dotfile` a file or directory in the home directory prefixed with a period.  which in unix hides the file or directory from casual listing.

###  `Loading: "/etc/opt/ripple/rippled.cfg"`

`/etc` contains a system wide configuration file and system databases; the name standard for et cetera with a better expandsion of **e**ditable-**t**est-**c**onfigurations. this must be located in the root filesystem itself.


###  start the network

```
version: "3.9"
services:
  validator_1:
    platform: linux/amd64
    container_name: validator_1
    image: xrpllabsofficial/xrpld
    ports:
      - 8001:80
      - 5006:5005
      - 4001:6006
      - 9001:51235
    volumes:
      - ./Users/mbergen/Documents/xrpl-private-network/validator_1/config:/config/
  validator_2:
    platform: linux/amd64
    container_name: validator_2
    image: xrpllabsofficial/xrpld
    ports:
      - 8002:80
      - 5007:5005
      - 4002:6006
      - 9002:51235
    volumes:
      - ./Users/mbergen/Documents/xrpl-private-network/validator_2/config:/config/
  validator_3:
    platform: linux/amd64
    container_name: validator_3
    image: xrpllabsofficial/xrpld
    ports:
      - 8003:80
      - 5008:5005
      - 4003:6006
      - 9003:51235
    volumes:
      - ./Users/mbergen/Documents/xrpl-private-network/validator_3/config:/config/

```

### `docker-compose.yml` 

1.  `apt-get update`
2.  `apt-get install -y docker-compose`

```bash
root@2ebacb0f4f58:~# apt-get update
Get:1 http://security.ubuntu.com/ubuntu focal-security InRelease [114 kB]
Get:2 http://archive.ubuntu.com/ubuntu focal InRelease [265 kB]
Get:3 https://repos.ripple.com/repos/rippled-deb focal InRelease [17.6 kB]
Get:4 http://archive.ubuntu.com/ubuntu focal-updates InRelease [114 kB]
Get:5 https://repos.ripple.com/repos/rippled-deb focal/stable amd64 Packages [6345 B]
Get:6 http://archive.ubuntu.com/ubuntu focal-backports InRelease [108 kB]
Get:7 http://security.ubuntu.com/ubuntu focal-security/restricted amd64 Packages [2345 kB]
Get:8 http://archive.ubuntu.com/ubuntu focal/universe amd64 Packages [11.3 MB]
Get:9 http://security.ubuntu.com/ubuntu focal-security/multiverse amd64 Packages [28.5 kB]
Get:10 http://security.ubuntu.com/ubuntu focal-security/main amd64 Packages [2776 kB]
Get:11 http://security.ubuntu.com/ubuntu focal-security/universe amd64 Packages [1058 kB]
Get:12 http://archive.ubuntu.com/ubuntu focal/multiverse amd64 Packages [177 kB]
Get:13 http://archive.ubuntu.com/ubuntu focal/restricted amd64 Packages [33.4 kB]
Get:14 http://archive.ubuntu.com/ubuntu focal/main amd64 Packages [1275 kB]
Get:15 http://archive.ubuntu.com/ubuntu focal-updates/universe amd64 Packages [1354 kB]
Get:16 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 Packages [3255 kB]
Get:17 http://archive.ubuntu.com/ubuntu focal-updates/multiverse amd64 Packages [31.2 kB]
Get:18 http://archive.ubuntu.com/ubuntu focal-updates/restricted amd64 Packages [2483 kB]
Get:19 http://archive.ubuntu.com/ubuntu focal-backports/universe amd64 Packages [28.6 kB]
Get:20 http://archive.ubuntu.com/ubuntu focal-backports/main amd64 Packages [55.2 kB]
Fetched 26.9 MB in 22s (1207 kB/s)
Reading package lists... Done
```

###  docker-compose

```
root@2ebacb0f4f58:~# docker-compose

Commands:
  build              Build or rebuild services
  bundle             Generate a Docker bundle from the Compose file
  config             Validate and view the Compose file
  create             Create services
  down               Stop and remove containers, networks, images, and volumes
  events             Receive real time events from containers
  exec               Execute a command in a running container
  help               Get help on a command
  images             List images
  kill               Kill containers
  logs               View output from containers
  pause              Pause services
  port               Print the public port for a port binding
  ps                 List containers
  pull               Pull service images
  push               Push service images
  restart            Restart services
  rm                 Remove stopped containers
  run                Run a one-off command
  scale              Set number of containers for a service
  start              Start services
  stop               Stop services
  top                Display the running processes
  unpause            Unpause services
  up                 Create and start containers
  version            Show the Docker-Compose version information
```


`root@2ebacb0f4f58:~# apt-get install --only-upgrade docker-compose`







