##  set up a private network with docker on local dev enviroment

1.  [prerequisites](#prerequisites)
2.  [configure the network](#configure-the-network)
3.  [start the network](#start-the-network)
4.  [verify the network](#verify-the-network)
5.  [perform a test transaction](#perform-a-test-transaction)
6.  [stop the network](#stop-the-network)

###  prerequisites

- [ ]  install docker
- [ ]  install [rippled image](../rippled-image/README.md)
- [ ]  generate the keys for each of your validator nodes by using the `validator-keys` tool provided with `rippled`

```
❯ docker run -it --platform linux/amd64 \
        >       --entrypoint /bin/bash \
        >       xrpllabsofficial/xrpld:latest
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








