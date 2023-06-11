##  set up a private network with docker on local dev enviroment

1.  [prerequisites](#prerequisites)
2.  [configure the network](#configure-the-network)
3.  [start the network](#start-the-network)
4.  [verify the network](#verify-the-network)
5.  [perform a test transaction](#perform-a-test-transaction)
6.  [stop the network](#stop-the-network)

##  prerequisites

####  1.  install docker
####  2.  install [rippled image](../rippled-image/README.md)

####  3.  proceed with following the rippled validator key generation tool [`/rippled/validator-keys`](https://github.com/ripple/validator-keys-tool)

1.  **dependencies**  validator key generator depends on the [`rippled`](https://github.com/ripple/rippled.git) repository for signing functionality.
2.  **install** have a stable & local installation of rippled development files
3.  **optional** point the [`rippled/validator-keys`](https://github.com/ripple/validator-keys-tool) at my installation using `CMAKE_PREFIX_PATH` parameter during the cmake configuration step. (not necessary because if there's no local path given then the validator key generator will fetch an appropriate version of the source code using cmake's fetchcontent)

3.  **build** rippled

-  C++14 or greater
```
❯ c++ --version
Apple clang version 14.0.3 (clang-1403.0.22.14.1)
Target: arm64-apple-darwin22.5.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
```

-  [Boost](https://formulae.brew.sh/formula/boost#default) - 1.70+ required
```
❯ brew info boost
==> boost: stable 1.81.0 (bottled), HEAD
Collection of portable C++ source libraries
https://www.boost.org/
```
-  [OpenSSL](https://formulae.brew.sh/formula/openssl@3)
```
❯ brew info openssl@3
==> openssl@3: stable 3.1.1 (bottled) [keg-only]
Cryptography and SSL/TLS Toolkit
https://openssl.org/
```
-  [cmake](https://formulae.brew.sh/formula/cmake) - 3.11+ required
```
❯ brew info cmake
Warning: Treating cmake as a formula. For the cask, use homebrew/cask/cmake
==> cmake: stable 3.26.4 (bottled), HEAD
Cross-platform make
https://www.cmake.org/
```



###  build and run

0.  not necessary `cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_PREFIX_PATH=/path/to/rippled/installation/root ../..`

1.  `cd /validator-keys-tools`
2.  `mkdir -d build/gcc.debug`
3.  `cd build/gcc.debug`
4.  `cmake --build`
5.  `./validator-keys`

```
❯ l
total 88
drwxr-xr-x  17 mbergen  staff   544B Jun 11 12:28 .
drwxr-xr-x  10 mbergen  staff   320B Jun 11 12:18 ..
drwxr-xr-x  12 mbergen  staff   384B Jun 11 12:29 .git
-rw-r--r--   1 mbergen  staff   288B Jun  6 14:49 .gitignore
drwxr-xr-x   3 mbergen  staff    96B Jun 11 12:28 .nih_c
-rw-r--r--   1 mbergen  staff    15K Jun  6 14:49 .travis.yml
drwxr-xr-x   3 mbergen  staff    96B Jun  6 14:49 Builds
-rw-r--r--   1 mbergen  staff   3.1K Jun  6 14:49 CMakeLists.txt
-rw-r--r--   1 mbergen  staff   3.3K Jun  6 14:49 LICENSE
-rw-r--r--   1 mbergen  staff   2.2K Jun 11 11:45 README.md
-rw-r--r--   1 mbergen  staff   686B Jun  6 14:49 RELEASENOTES.md
-rw-r--r--   1 mbergen  staff   2.7K Jun  6 14:49 appveyor.yml
drwxr-xr-x   3 mbergen  staff    96B Jun 11 12:28 build
drwxr-xr-x   5 mbergen  staff   160B Jun  6 14:49 ci
-rw-r--r--   1 mbergen  staff   1.8K Jun  6 14:49 circle.yml
drwxr-xr-x   3 mbergen  staff    96B Jun  9 18:22 doc
drwxr-xr-x   7 mbergen  staff   224B Jun  6 14:49 src

~/Documents/Github/validator-keys-tool on master
❯ mkdir -p build/gcc.debug
❯ cd build/gcc.debug
❯ cmake -DCMAKE_BUILD_TYPE=Release ../..
-- The C compiler identification is AppleClang 14.0.3.14030022
-- The CXX compiler identification is AppleClang 14.0.3.14030022
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /Library/Developer/CommandLineTools/usr/bin/cc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /Library/Developer/CommandLineTools/usr/bin/c++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- NIH-EP cache path: /Users/mbergen/Documents/Github/validator-keys-tool/.nih_c/unix_makefiles/AppleClang_14.0.3.14030022/Release
-- Found Git: /usr/bin/git (found version "2.39.2 (Apple Git-143)")
-- Installed rippled not found...       using local copy from tag/commit [master]
-- Pausing to download rippled source...
-- gch:c640d03010ca0a45b66c35427503e959ae1df255
-- Using 4 cores for ExternalProject builds.
-- rippled version: 1.10.1
-- Performing Test CMAKE_HAVE_LIBC_PTHREAD
-- Performing Test CMAKE_HAVE_LIBC_PTHREAD - Success
-- Found Threads: TRUE
-- Found Boost: /opt/homebrew/lib/cmake/Boost-1.81.0/BoostConfig.cmake (found suitable version "1.81.0", minimum required is "1.70") found components: chrono container context coroutine date_time filesystem program_options regex system thread
CMake Error at /opt/homebrew/Cellar/cmake/3.26.4/share/cmake/Modules/FindPackageHandleStandardArgs.cmake:230 (message):
  Could NOT find OpenSSL, try to set the path to OpenSSL root folder in the
  system variable OPENSSL_ROOT_DIR (missing: OPENSSL_CRYPTO_LIBRARY
  OPENSSL_INCLUDE_DIR) (Required is at least version "1.1.1")
Call Stack (most recent call first):
  /opt/homebrew/Cellar/cmake/3.26.4/share/cmake/Modules/FindPackageHandleStandardArgs.cmake:600 (_FPHSA_FAILURE_MESSAGE)
  /opt/homebrew/Cellar/cmake/3.26.4/share/cmake/Modules/FindOpenSSL.cmake:670 (find_package_handle_standard_args)
  .nih_c/unix_makefiles/AppleClang_14.0.3.14030022/Release/rippled_src-src/CMakeLists.txt:70 (find_package)


-- Configuring incomplete, errors occurred!
❯ l
total 56
drwxr-xr-x  4 mbergen  staff   128B Jun 11 12:37 .
drwxr-xr-x  3 mbergen  staff    96B Jun 11 12:28 ..
-rw-r--r--  1 mbergen  staff    24K Jun 11 12:37 CMakeCache.txt
drwxr-xr-x  7 mbergen  staff   224B Jun 11 12:37 CMakeFiles
```

```
  brew reinstall openssl@3
❯ export OPENSSL_ROOT_DIR=$(brew --prefix openssl)

❯ cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_PREFIX_PATH=/path/to/lz4 ../..

-- NIH-EP cache path: /Users/mbergen/Documents/Github/validator-keys-tool/.nih_c/unix_makefiles/AppleClang_14.0.3.14030022/Release
-- Installed rippled not found...       using local copy from tag/commit [master]
-- Pausing to download rippled source...
-- gch:c640d03010ca0a45b66c35427503e959ae1df255
-- Using 4 cores for ExternalProject builds.
-- rippled version: 1.10.1
CMake Error at .nih_c/unix_makefiles/AppleClang_14.0.3.14030022/Release/rippled_src-src/CMakeLists.txt:76 (find_package):
  By not providing "Findlz4.cmake" in CMAKE_MODULE_PATH this project has
  asked CMake to find a package configuration file provided by "lz4", but
  CMake did not find one.

  Could not find a package configuration file provided by "lz4" with any of
  the following names:

    lz4Config.cmake
    lz4-config.cmake

  Add the installation prefix of "lz4" to CMAKE_PREFIX_PATH or set "lz4_DIR"
  to a directory containing one of the above files.  If "lz4" provides a
  separate development package or SDK, be sure it has been installed.


-- Configuring incomplete, errors occurred!
```



> this should spit out a `.validator-keys` executable

###  option 1 running a rippled container for `validator-keys` tool

###  option 2 set up a validator  

1.  `cd validator-keys-tool` 
2.  `validator-keys create_keys`

sample output:  `Validator keys stored in /home/ubuntu/.ripple/validator-keys.json`

4.  `validator-keys createn_token`

sample output:

```
  Update rippled.cfg file with these values:

  # validator public key: nHUtNnLVx7odrz5dnfb2xpIgbEeJPbzJWfdicSkGyVw1eE5GpjQr

  [validator_token]
  eyJ2YWxpZGF0aW9uX3NlY3J|dF9rZXkiOiI5ZWQ0NWY4NjYyNDFjYzE4YTI3NDdiNT
  QzODdjMDYyNTkwNzk3MmY0ZTcxOTAyMzFmYWE5Mzc0NTdmYT|kYWY2IiwibWFuaWZl
  c3QiOiJKQUFBQUFGeEllMUZ0d21pbXZHdEgyaUNjTUpxQzlnVkZLaWxHZncxL3ZDeE
  hYWExwbGMyR25NaEFrRTFhZ3FYeEJ3RHdEYklENk9NU1l1TTBGREFscEFnTms4U0tG
  bjdNTzJmZGtjd1JRSWhBT25ndTlzQUtxWFlvdUorbDJWMFcrc0FPa1ZCK1pSUzZQU2
  hsSkFmVXNYZkFpQnNWSkdlc2FhZE9KYy9hQVpva1MxdnltR21WcmxIUEtXWDNZeXd1
  NmluOEhBU1FLUHVnQkQ2N2tNYVJGR3ZtcEFUSGxHS0pkdkRGbFdQWXk1QXFEZWRGdj
  VUSmEydzBpMjFlcTNNWXl3TFZKWm5GT3I3QzBrdzJBaVR6U0NqSXpkaXRROD0ifQ==
```


















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








