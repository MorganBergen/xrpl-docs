#  pull request

###  high level overview of change

###  type of change

###  modules affected

#  build rippled server software from source

`rippled` written in c++ is the server software that powers the xrp ledger and runs on a variety of differing platforms.  the `rippled` server software can run in several modes depending on its configuration, here are instructions on how to build `rippled` from source as well as learn how cmake and conan behave in the compilation process.

####  contents

1.  [references](#references)
2.  [systems hardware and software configuration](#systems-hardware-and-software-configuration)
3.  [dependencies](#dependencies) 
4.  [cmake](#cmake)
5.  [conan](#conan)
6.  [`CMakeLists.txt`](#cmakelists-txt)
7.  [`CMAKE_BUILD_TYPE`](#cmake_build_type)
8.  [`CMAKE_PREFIX_PATH`](#cmake_prefix_path)
9.  [`~/.conan/profiles/default`](#conan-profiles-default)
10. [cmake and conan](#cmake-and-conan)
11. [package setup commands](#package-set-up-commands)
12. [build commands](#build-commands)
13. [troubleshooting](#troubleshooting)
14. [`rippled/conanfile.py`](#rippled-conanfile-py)
15. [running the binary executable](#running-the-binary-executable)

-----------------------------------------------------------------------------------------------------

##  references

1.  [server modes](https://xrpl.org/rippled-server-modes.html)
2.  [master build instructions](https://github.com/XRPLF/rippled/blob/master/BUILD.md#a-crash-course-in-cmake-and-conan)

##  systems hardware and software configuration

1.  **OS** macOS 13.4 22F66 arm64
2.  **host** MacBookPro18,3
3.  **kernel** 22.5.0
4.  **packages** 56 (brew)
5.  **shell** zsh 5.9
6.  **cpu** Apple M1 Pro
7.  **memory** 2026MiB / 16384MiB

##  dependencies

1.  [`gcc`](https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/gcc.rb) gnu compiler collection **version 13.0.0**

2.  [`clang`](https://opensource.apple.com/source/clang/clang-23/clang/tools/clang/docs/UsersManual.html) apple clang **version 14.0.3**

3.  [`cmake`](https://formulae.brew.sh/formula/cmake) cross platform make **version 3.26.4**

4.  [`conan`](https://conan.io/downloads.html) conan package manager **version 1.59.0**

##  cmake

Technically, CMake is not required to build rippled. You could manually compile every translation unit into an object file using the correct compiler options, and then manually link all those objects together with the right linker options. However, this approach is tedious and error-prone, which is why CMake is used. CMake configuration files have been written for this project, allowing CMake to correctly compile and link all the translation units or generate files for a separate build system to handle compilation and linking.  

CMake is an extensible system that manages the build process in an operating system and compiler-independent manner. Unlike many cross-platform systems, CMake is designed to be used with the native build environment. Simple configuration files called `CMakeLists.txt` placed in each source directory are used to generate standard build files, such as makefiles on Unix.  it controls the software compilation process using platform and compiler-independent configuration files.

CMake can generate a native build environment that compiles source code, creates libraries, generates wrappers, and builds executables in various combinations. It supports in-place and out-of-place builds, allowing multiple builds from a single source tree. CMake also supports static and dynamic library builds. During its operation, CMake locates files, libraries, and executables, and may encounter optional build directives. This information is gathered into the cache, which can be modified by the user before generating the native build files.  CMake is designed to support complex directory hierarchies and applications dependent on multiple libraries. For example, it supports projects consisting of multiple toolkits, where each toolkit contains several directories, and the application depends on the toolkits along with additional code. CMake can also handle situations where executables must be built in a specific order to generate code that is then compiled and linked into a final application.

The build process is controlled by creating one or more `CMakeLists.txt` files in each directory, including subdirectories, that make up the project. Each `CMakeLists.txt` file consists of one or more commands in the form `COMMAND` (args..), where COMMAND is the name of the command, and args is a whitespace-separated list of arguments.

CMake has parameters, some of which are platform-specific, referred to as variables include `CMAKE_BUILD_TYPE` or `CMAKE_MSVC_RUNTIME_LIBRARY`.

here are some key points to know:

1.  `CMakeLists.txt` is the main configuration file written in cmake scipting language.  it specifies the project structre, source files, dependencies, build options, and targets. 

2.  **generators**  cmake supports various build system generators such as make, ninja, visual studio code, and xcode.  these generators produce build files specific to these respective systems.

3.  **variables** cmake provides various variables that control the build process, such as the build data type `CMAKE_BUILD_TYPE`, compiler options, dependency paths, etc.  these variables can be set in `CMakeLists.txt` or passed via the commandline.

4.  **toolchain file** a toolchain file is used to specify platform specific settings, including the compiler, linker, and other tool locations.  it helps ensure consistent configuration across different platforms.

5.  **build configuration**  cmake supports different build configurations, such as debug, release, relwithwebinfo, etc.  these configurations determine compilation flags, optimization levels, and other settings used during the build process.

##  conan

conan is a package manager designed for c++, aimed at simplifying the process of software package management which includes installation, upgrade, configuration, and management of software packages or libraries.  conan is platform independent and the recipes developed under conan can function across all platforms, configuration, and compilers.

understanding conan involves getting to grips with several key components

1.  `Conanfile.py`  this is the configuration file that conan uses to defien and manage project dependencies.  it provides critical information such as the package name, version, build options, and dependencies.

2.  **profiles** in conan profiles are used to define the settings and options for your build enviroment.  these include variables like the compiler version, build type, and options specific to your platform.  profiles ensure consistent builds across various machines.

the profile collectivly holds definitions for the build enviroment.  it holds the target platform, operating system, architecture, compiler, build type, and language standard.  additionally there are set flags and env variables related to the boost library and specify the paths to c and c++ compilers used for the build.

3.  **packages**  conan packages represent external libraries or dependencies on which the project depends.  package recipes provide instructions on how to download, configure, build, and install these dependencies.

4.  **build folders** conan employs build folders to segregate different builds and avoid conflicts among dependencies.  while conan creates build files in the current directory by default, users can specify a different build folder to maintain a clean project directory and avoid pollution.

`Conanfile.py` enables conan to efficiently download, configure, build, and install all dependencies.  this process utilizes a unified set of compiler and linker options for all dependencies.  the `Conanfile.py` generates files incorporating most parameters that Cmake expects.  these include a single toolchain file, and for each dependency files that collectively implements version checking and define imported targets for dependencies.  these files are a cmake package configuration file, a package version file, and a package target file for every build type.

the toolchain modifies the search path `CMAKE_PREFIX_PATH` to facilitat `find_package()` in locating the generated package configuration files.  to configure cmake properly one needs only pass the toolchain file.

however it's important to note that cmake parameters are excluded, you must select a build system generator and if choosing a single configuration generator specify the `CMAKE_BUILD_TYPE` which should align with the `build_type` setting given in `Conanfile.py`.  parameters are either `setting` or `options`, and settings are shared among all packages, for example build type.  for settings conan understakes an intricate search process to establish defaults.  although you can pass every parameter to conan via cli, it's most convient to store them within a profile. (profiles will be discussed in depth further in this documentation). 

[`~/.conan/profiles/default`](#conan-profiles-default) will be created within your local root directory. and will look something like this after package setup.

##  `CMakeLists.txt`

```
```

##  `CMAKE_PREFIX_PATH`

##  `CMAKE_BUILD_TYPE`

##  cmake and conan

in order to use cmake and conan together, you will need to configure cmake to recognize and link the dependencies managed by conan.  conan generates package configuration files that cmake can use to discover and link dependencies correctly.  the typical workflow involves exporting the dependencies using conant, creating a build directory, installing the dependencies using conan, configuring cmake with the generated package configuration file, and finally building the project.

1.  exporting dependencies
2.  creating build directory
3.  installing dependencies
4.  configuring cmake
5.  building the project

##  package set up commands

before we start we need to ensure to define the directory paths of our compiler executables, these will be included in the default script.  the following commands will result in a scripted config found in the default script generated from conan [`~/.conan/profiles/default`](#conan-profiles-default)  the format of most calls are as follows `conan profile update <option>=<value> <profile_name>`, the name of profile will be in our case default.  however it can be named anything.  the result from `which gcc` and `which g++` will need to be used to initialize paths, in our case `which gcc` results in `/usr/bin/gcc` and `which g++` results in `/usr/bin/g++` and have been defined in some of the commands.

1.  `pwd rippled`

2.  `which gcc` 

3.  `which g++`

4.  `get checkout master`

5.  `conan profile new default --detect`

6.  `conan profile update settings.compiler.cppstd=20 default`

7.  `conan profile update env.CC=/usr/bin/gcc default`

8.  `conan profile update env.CFLAGS=-DBOOST_ASIO_HAS_STD_INVOKE_RESULT=1 default`

9.  `conan profile update env.CXX=/usr/bin/g++ default`

10.  `conan profile update env.CXXFLAGS=-DBOOST_ASIO_HAS_STD_INVOKE_RESULT=1 default`

11.  `conan profile update 'conf.tools.build:compiler_executables={"c": "/usr/bin/gcc", "cpp": "/usr/bin/g++"}' default`

12.  `conan profile update -o boost:extra_b2_flags="define=BOOST_ASIO_HAS_STD_INVOKE_RESULT"`

once completed the following profile should reflect that of your own.  once a profile is created, it can be used in a build, the conan install command downloads or builds the necessary packages according to the settings specified in the profile.  when calling `conan profile new default --detect` your shell should return a message declaring the location of the module within the `conan` profiles directory as a text file within your local system.

```
❯ conan profile new default --detect
Found apple-clang 14.0
apple-clang>=13, using the major as version
Profile created with detected settings: /Users/.conan/profiles/default
```

##  `~/.conan/profiles/default`(#conan-profiles-default)

```
[settings]
os=Macos
os_build=Macos
arch=armv8
arch_build=armv8
compiler=apple-clang
compiler.version=14
compiler.libcxx=libc++
build_type=Release
compiler.cppstd=20
[options]
boost:extra_b2_flags=define=BOOST_ASIO_HAS_STD_INVOKE_RESULT
[build_requires]
[env]
CC=/usr/bin/gcc
CFLAGS=-DBOOST_ASIO_HAS_STD_INVOKE_RESULT=1
CXX=/usr/bin/g++
CXXFLAGS=-DBOOST_ASIO_HAS_STD_INVOKE_RESULT=1
[conf]
tools.build:compiler_executables={'c': '/usr/bin/gcc', 'cpp': '/usr/bin/g++'}
```

##  reset conan package setup

1.  `pwd rippled`
2.  `rm -rf ~/.conan/data`
3.  `rm -rf ~/.conan/conan.conf`
4.  `rm -rf ~/.conan/profiles`
5.  `rm -r .build`

##  build commands

1.  `pwd rippled`

2.  `conan export external/snappy snappy/1.1.9@`

export our conan recipe for snappy, this doesnt explicitly link the c++ standard library, which allows us to statically link it.  snappy is a fast compression/decompression library developed by google, it aims to provide high speed data processing iwth a reasonable compression ratio (i do not have knowledge in compression/decompression tools however ill just blockbox).  `conanfile.py` is exported to snappy which is located in the `external/snappy` directory to the local conan cache.  and `snappy/1.1.9@` is the reference for the recipe in the local conan cache.  `rippled/external/snappy/`

3.  `mkdir .build`

4.  `cd .build`

5.  `conan install .. --output-folder . --build missing --settings build_type=Release`

6.  `cmake -DCMAKE_TOOLCHAIN_FILE:FILEPATH=/build/generators/conan_toolchain.cmake -DCMAKE_BUILD_TYPE=Release ..`

7.  `cmake --build .` 

9.  `./rippled --version`

8.  `./rippled --unittest` 

upon successfully configuring conan and cmake a console log will be provided along the lines of

```
cmake -DCMAKE_TOOLCHAIN_FILE:FILEPATH=build/generators/conan_tollchain.cmake -DCMAKE_BUILD_TYPE=Release ..

-- Configuring done (1.4s)
-- Generating done (0.1s)
-- Build files have been written to: /Users/mbergen/Documents/Github/rippled/.build
```

##  command walkthrough

###  0.  `pwd rippled`

starting in ripple root

###  1.  `which gcc` 

`which` locate a program in user's path `gcc`

###  2.  `which g++`

run the following command to find the installation path of gcc using `which` token the output will display path `/usr/bin/gcc/<path>` make a note of this path.  use this path as the values for `env.CC=`, `env.FLAGS`, `c`, `cpp` variables.

###  3.  `git checkout master`

this guide has been written for `master` in june of 2023

###  4.  `conan profile new default --detect`

these settings define various aspects of the build process, such as the operating system, architecture, compiler.  boost library flags, and environment variables.  

`[settings]` this section specifies the settings related to the target platform, operating system, architecture, and compiler used for the rippled build.

- `os` indicates the target operating system used which is macos
- `os_build` represents the operating system used for building the rippled software, also macos. this is defined for rippled being built on a different os than the target platform, these could be `Linux` what have you. having `os_build` and `os` allows for cross-compilation, where the software is built on one operating system but targeted for another.
-  `arch` specifies the target architecture, which is `armv8` ARM64 in this case.
-  `arch_build` denotes the architecture used for the build process, which is `armv8` as well
-  `compiler` indicates the compiler used, in this case it's apple clang
-  `compiler.version` specifies version of compiler
-  `compiler.libcxx` indicates the c++ standard library used, which is `libc++`
-  `build_type` specifies the build type which is release in our case
-  `compiler.cppstd` specifies the c++ language standard used
-  `[build_requires]` uninitialized but is used to specify any needed dependencies needed during process
-  `CC` specifies the path to the c compiler which is `/usr/bin/gcc`
-  `CFLAGS` sets the compiler flags for the c compiler and adds the `DBOOST_ASIN_HAS_STD_INVOKE_RESULT=1` flag and defines the macro to 1
-  `CXX` specifies the path to the c++ compiler
-  `CXXFLAGS` sets the compiler flags for the c++ compiler and adds the `-BOOST_ASIO_HAS_STD_INVOKE_RESULT=1`
-  `[conf]` is used for configuration options
-  `tools.build:compiler_executables` option is used to specify the paths to the c and cpp compilers that will be used during the compilation process so objects can be linked successfully.
-  in this case the configuration has set the `compiler_executables` option to a dictionary that maps the compiler names to their corresponding executable paths (note these paths are examples and may look different depending on your system) 
    - `c` specifies that the c compiler executable can be found in `/usr/bin/gcc`
    - `cpp` specifies that the cpp compiler executable can be found `/usr/bin/g++`

```
[settings]
os=Macos
os_build=Macos
arch=armv8
arch_build=armv8
compiler=apple-clang
compiler.version=14
compiler.libcxx=libc++
build_type=Release
compiler.cppstd=20
[options]
boost:extra_b2_flags=define=BOOST_ASIO_HAS_STD_INVOKE_RESULT
[build_requires]
[env]
CC=/usr/bin/gcc
CFLAGS=-DBOOST_ASIO_HAS_STD_INVOKE_RESULT=1
CXX=/usr/bin/g++
CXXFLAGS=-DBOOST_ASIO_HAS_STD_INVOKE_RESULT=1
[conf]
tools.build:compiler_executables={'c': '/usr/bin/gcc', 'cpp': '/usr/bin/g++'}
```
###  5.  `conan profile update settings.compiler.cppstd=20 default`

-  `conan` calling the package manager to execute
-  `profile` specifying we are working with a conan profile specifically the profile created with detected settings returned from step 4 [conan profile new default --detect](#conan-profile-new-default---detect).  
-  `update` indicates that we want to update an existing profile 
-  `settings.compiler.cppstd` refers to which will be initialized under `[settings]` under the `20` dialect of the c++20 standard.
-  `default` is the destination profile in this case its `default`

###  6.  `conan profile update env.CC=/usr/bin/gcc default`

###  7.  `conan profile update env.CFLAGS=-DBOOST_ASIO_HAS_STD_INVOKE_RESULT=1 default`
###  8.  `conan profile update env.CXX=/usr/bin/g++ default`
###  9.  `conan profile update env.CXXFLAGS=-DBOOST_ASIO_HAS_STD_INVOKE_RESULT=1 default`
###  10.  `conan profile update 'conf.tools.build:compiler_executables={"c": "/usr/bin/gcc", "cpp": "/usr/bin/g++"}' default`
###  
###  11.  `conan profile update -o boost:extra_b2_flags="define=BOOST_ASIO_HAS_STD_INVOKE_RESULT"`
###  12.  `pwd rippled`
###  13.  `conan export external/snappy snappy/1.1.9@`
###  14.  `mkdir .build`
###  15.  `cd .build`
###  16.  `conan install .. --output-folder . --build missing --settings build_type=Release`
###  17.  `cmake -DCMAKE_TOOLCHAIN_FILE:FILEPATH=/build/generators/conan_toolchain.cmake -DCMAKE_BUILD_TYPE=Release ..`
###  18.  `cmake --build .` 
###  19.  `./rippled --version`
###  20.  `./rippled --unittest` 

##  running the binary executable

```
rippled [options] <command> <params>

General Options:
  --conf arg             Specify the configuration file.
  --debug                Enable normally suppressed debug logging
  -h [ --help ]          Display this message.
  --newnodeid            Generate a new node identity for this server.
  --nodeid arg           Specify the node identity for this server.
  --quorum arg           Override the minimum validation quorum.
  --reportingReadOnly    Run in read-only reporting mode
  --silent               No output to the console after startup.
  -a [ --standalone ]    Run with no peers.
  -v [ --verbose ]       Verbose logging.
  --version              Display the build version.

RPC Client Options:
  --rpc                  Perform rpc command - see below for available
                         commands. This is assumed if any positional parameters
                         are provided.
  --rpc_ip arg           Specify the IP address for RPC command. Format:
                         <ip-address>[':'<port-number>]
  --rpc_port arg         DEPRECATED: include with rpc_ip instead. Specify the
                         port number for RPC command.

Ledger/Data Options:
  --import               Import an existing node database (specified in the
                         [import_db] configuration file section) into the
                         current node database (specified in the [node_db]
                         configuration file section).
  --ledger arg           Load the specified ledger and start from the value
                         given.
  --ledgerfile arg       Load the specified ledger file.
  --load                 Load the current ledger from the local DB.
  --net                  Get the initial ledger from the network.
  --nodetoshard          Import node store into shards
  --replay               Replay a ledger close.
  --start                Start from a fresh Ledger.
  --startReporting arg   Start reporting from a fresh Ledger.
  --vacuum               VACUUM the transaction db.
  --valid                Consider the initial ledger a valid network ledger.

Unit Test Options:
  -q [ --quiet ]         Suppress test suite messages, including suite/case
                         name (at start) and test log messages.
  -u [ --unittest ] arg  Perform unit tests. The optional argument specifies
                         one or more comma-separated selectors. Each selector
                         specifies a suite name, full-name (lib.module.suite),
                         module, or library (checked in that order).
  --unittest-arg arg     Supplies an argument string to unit tests. If
                         provided, this argument is made available to each
                         suite that runs. Interpretation of the argument is
                         handled individually by any suite that accesses it --
                         as such, it typically only make sense to provide this
                         when running a single suite.
  --unittest-ipv6        Use IPv6 localhost when running unittests (default is
                         IPv4).
  --unittest-log         Force unit test log message output. Only useful in
                         combination with --quiet, in which case log messages
                         will print but suite/case names will not.
  --unittest-jobs arg    Number of unittest jobs to run in parallel (child
                         processes).

Commands:
     account_currencies <account> [<ledger>] [strict]
     account_info <account>|<seed>|<pass_phrase>|<key> [<ledger>] [strict]
     account_lines <account> <account>|"" [<ledger>]
     account_channels <account> <account>|"" [<ledger>]
     account_objects <account> [<ledger>] [strict]
     account_offers <account>|<account_public_key> [<ledger>] [strict]
     account_tx accountID [ledger_index_min [ledger_index_max [limit ]]] [binary]
     book_changes [<ledger hash|id>]
     book_offers <taker_pays> <taker_gets> [<taker [<ledger> [<limit> [<proof> [<marker>]]]]]
     can_delete [<ledgerid>|<ledgerhash>|now|always|never]
     channel_authorize <private_key> <channel_id> <drops>
     channel_verify <public_key> <channel_id> <drops> <signature>
     connect <ip> [<port>]
     consensus_info
     deposit_authorized <source_account> <destination_account> [<ledger>]
     download_shard [[<index> <url>]]
     feature [<feature> [accept|reject]]
     fetch_info [clear]
     gateway_balances [<ledger>] <issuer_account> [ <hotwallet> [ <hotwallet> ]]
     get_counts
     json <method> <json>
     ledger [<id>|current|closed|validated] [full]
     ledger_accept
     ledger_cleaner
     ledger_closed
     ledger_current
     ledger_request <ledger>
     log_level [[<partition>] <severity>]
     logrotate
     manifest <public_key>
     node_to_shard [status|start|stop]
     peers
     ping
     random
     peer_reservations_add <public_key> [<description>]
     peer_reservations_del <public_key>
     peer_reservations_list
     ripple ...
     ripple_path_find <json> [<ledger>]
     server_info [counters]
     server_state [counters]
     sign <private_key> <tx_json> [offline]
     sign_for <signer_address> <signer_private_key> <tx_json> [offline]
     stop
     submit <tx_blob>|[<private_key> <tx_json>]
     submit_multisigned <tx_json>
     tx <id>
     validation_create [<seed>|<pass_phrase>|<key>]
     validator_info
     validators
     validator_list_sites
     version
     wallet_propose [<passphrase>]
```

[`./rippled --unittest`]

the console log output from `./rippled --unittest` is the result of the built-in unit tests being run.  each line is the name of a specific test case or test suite being executed. the end of the test will output performance results

```
./rippled --unittest
ripple.tx.Offer Removing Canceled Offers
ripple.tx.Offer Incorrect Removal of Funded Offers
ripple.tx.Offer Tiny payments
ripple.tx.Offer XRP Tiny payments
ripple.tx.Offer Enforce No Ripple
ripple.tx.Offer Insufficient Reserve
rippled.app.ShardArchiveHandler testSingleDownloadAndStateDB
ripple.app.TheoreticalQuality Relative quality distance
ripple.tx.NFTokenBurn Burn random
ripple.app.AccountDelete Basics
ripple.app.Flow limitQuality
ripple.app.ReportingETL GetLedger
ripple.app.ReportingETL GetLedgerData
ripple.app.ReportingETL GetLedgerDiff
ripple.app.ReportingETL GetLedgerDiff
ripple.app.ReportingETL NeedCurrentOrClosed
ripple.app.ReportingETL SecureGateway
ripple.app.ValidatorSite Config Load
ripple.app.ValidatorSite Fetch list - /validators [https] v1
ripple.app.ValidatorSite File list - /Users/mbergen/Documents/Github/rippled/.build/test_val2/vl.txt, /Users/mbergen/Documents/Github/rippled/.build/test_val3/helloworld.txt
ripple.tx.NFToken Enabled
ripple.app.AccountSet No AccountSet
ripple.app.Book One Side Empty Book
ripple.app.LedgerData
ripple.appLdgerReplayer ProofPath
WRN:Application Server stopping
ripple.app.TxQ1 queue sequence
ripple.tx.Taker XRP Quantization: output
ripple.tx.Taker IOU to IOU
ripple.tx.ThinBook
ripple.tx.Ticket Feature Not Enabled
ripple.tx.Ticket Create Tickets that fail Preflight
ripple.tx.Ticket Create Tickets that fail Preclaim
ripple.tx.Ticket Create Ticket Insufficient Reserve
ripple.tx.Ticket Using Tickets
ripple.tx.Ticket Transaction Database With Tickets
ripple.tx.Ticket Sign with TicketSequence
ripple.tx.Ticket Fix both Seq and Ticket

Longest suite times:
71.8s ripple.tx.NFToken
54.4s ripple.tx.NFTokenBurn
42.8s ripple.tx.Offer
34.9s ripple.app.ValidatorSite
27.3s ripple.app.ShardArchiveHandler
23.3s ripple.app.TheoreticalQuality
14.6s ripple.app.Flow
13.2s ripple.app.AccountDelete
8.3s ripple.tx.Check
7.9s ripple.app.LedgerReplayer
451.4s, 205 suites, 1654 cases, 577987 tests total, 0 failures
```
