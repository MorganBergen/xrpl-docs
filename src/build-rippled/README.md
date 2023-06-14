#  build rippled server software from source

`rippled` is the server software that powers the xrp ledger, written in c++, and runs on a variety of platforms.  the `rippled` server software can run in several modes depending on its configuration.

###  references
1.  [server modes](https://xrpl.org/rippled-server-modes.html)
2.  [`rippled/BUILD.md`](https://github.com/XRPLF/rippled/blob/master/BUILD.md#a-crash-course-in-cmake-and-conan)

- [ ] `./rippled --unittest`
- [ ] execute `./rippled --conf testnet_rippled.cfg`

`./rippled server_info --conf testnet_rippled.cfg`

when you have completed ledgers youre synced to the network

###  dependencies

-  gcc: stable 13.1.0 [GNU compiler collection](https://gcc.gnu.org/)
-  fetched `gmp` [gnu multiple precision arithmetic library](https://gmplib.org)
-  fetched `isl` [integer set library for the polyhedral model](https://libisl.sourceforge.io/)
-  fetched `mpfr` [c library for multiple-precision floating-point computations](https://www.mpfr.org/)
-  fetched `libmpc` [c library for arithmetic of complex num](https://www.multiprecision.org/mpc)
-  clang 13.0.0 [clang 13 version](https://releases.llvm.org/13.0.0/tools/clang/docs/ReleaseNotes.html)
-  apple clang [apple clang compiler](https://opensource.apple.com/source/clang/clang-23/clang/tools/clang/docs/UsersManual.html)
-  msvc [msvc](https://learn.microsoft.com/en-us/cpp/build/reference/compiler-options?view=msvc-170)
-  cmake [cmake version 3.26.4 with homebrew](https://cmake.org/cmake/help/latest/)
-  conan@1 [conan@1](https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/conan@1.rb)

##  contents

1.  [cmake](#cmake)
2.  [conan](#conan)
3.  [`CMAKE_BUILD_TYPE`](##cmake-build-type)
4.  [`CMakeLists.txt`](##cmakelists-txt)
5.  [install conan with pip](#install-conan-with-pip)
6.  [getting-started](#getting-started)

###  cmake

cmake is a meta-build tool for generating makefiles based on platform specific parameters.
cmake is a tool to control the softwares compilation process using simple platform and compiler independent configuration files, and generate native `makefiles` and workspaces taht can be used in the compiler enviroment of your choice.

cmake is an extensible, system that manages the build process in an operating system and in a compiler-independent manner.  unlike many cross-platform systems, cmake is deisgned to be used in conjunction with the native build enviroment.  simple configuration files placed in each source directory is called `CMakeList.txt` are used to generate standard build files e.g. `makefiles` on unix.

cmake can generate a native build enviroment that will compile source code, create libraries, generate wrappers, and build executables in arbitrary combinations.  cmake supports in-place and out-of-place, builds, and can therefore support multiple builds from a single source tree. cmake also supports static and dunamic library builds.  when cmake runs, it locates files, libraries, and executables, and may encounter optional build directives.  this info is gathered into the cache, which may be changed by the user prior to the generation of the native build files.

cmake is deisgned to support complex directory hierarchies and applications dependent on several libraries.  for example cmake supports projects consisting of multiple toolkits, where each toolkit might contain sevral directories, and the application depends on the toolkits plus additional code.  cmake can also handle situations where executables must be built in order to generate code that is then compiled and linked into a final application.

the build process is controlled by creating one or more `CMakeLists.txt` files in each directory (including subdirectories) that make up the project.  Each `CMakeLists.txt` consists of one or more commands.  each command has the form `COMMAND (args..)` where `COMMAND`is the name of the command and `args` is a white-spaced separated list of arguments.

technically cmake is unneeded to build rippled.  you could manually compile every translation unit into an object file, using the right compiler options, and then manually link all those objects together, using the right linker options.  however that's very tedious and error prone, which is why we use cmake.  we have written cmake configuration files for this project so that cmake can be used to correctly compile and link all of the translation units in it or rather cmake will generate files for a separate build system that compile and link all of the translation units.  even then cmake has parameters, some of which are platform specific.  in cmake's parlance parameters are specifically named variables like `CMAKE_BUILD_TYPE` or `CMAKE_MSVC_RUNTIME_LIBRARY`

1.  `CMakeLists.txt` is the main configuration file written in cmake scripting lang, it specifies the project structure, source files, dependencies, build options, and targets.

2.  **generators** cmake supports muild different build system generators such as (make, ninja, vscode & xcode ides) that can be specififed when running cmake.  each generator produces build files specific to that system.

3.  **variables** cmake provides various variables that control the build process such as the build data type `CMAKE_BUILD_TYPE`, compiler options, dependency paths, etc.  these variables can be set in `CMakeLists.txt` or passed in via the command line.

4.  **toolchain file** a toolchain file is used to specify platform specific settings, such as the compiler, linker, and other tool locations. it helps ensure consistent configuration across different platforms.

5.  **build configurations**  cmake supports different build configurations, such as debug, release, relwithwebinfo, etc.  these configurations determine the compilation flags, optimization levels, and other settinsg used during the build process.


####  `CMAKE_BUILD_TYPE`

`CMAKE_BUILD_TYPE` must match `build_type`

`CMAKE_BUILD_TYPE` is a cmake variable that defines the build type or configuration for your cmake project.  it allows you to specify different build configuration such as debug, release, or custom configurations specific to your project.   if you dont specify the `CMAKE_BUILD_TYPE` var, cmake uses an empty string as the build type.  in this case the generated build system such as Makefiles or VS project may use its default build configuration, which varies depending on the system or generator.  since I need to be consistent with conan's build type system I will just use a command argument in cli.

####  `CMAKE_PREFIX_PATH`  



**parameters include**

-  what build system to generate files for
-  where to find the compiler and linker
-  where to find dependencies, e.g. libraries and headers
-  how to link dependencies e.g. any special compiler or linker flags that need to be used with them, including preprocessor definition
-  how to compile translation units with optimizations, debug symbols, position independent code, etc

for some of these parameters, like the build system and compiler, cmake goes through a complicated search process to choose default values.  for other like the dependencies, we had written in the cmake config files of this project to our own complicated process to choose defaults.

you can pass every parameter to cmake on the command line, but writing out these parameters everytime we want to configure cmake is a pain.  once you configure a file once cmake can read everytime it is configured, which is a toolchain file.

a toolchain is a set of utilities to compile, link libraries, and creat archives, and other tasks to drive the build.  the toolchain utilities available are determined by the languages enabled.


####  `CMakeLists.txt` 

```cmake
cmake_minimum_required(VERSION 3.16)                        #  version to run cmake

if(POLICY CMP0074)                                          #  set policy to new for specific behavior
  cmake_policy(SET CMP0074 NEW)
endif()
if(POLICY CMP0077)
  cmake_policy(SET CMP0077 NEW)
endif()

# Fix "unrecognized escape" issues when passing CMAKE_MODULE_PATH on Windows.
file(TO_CMAKE_PATH "${CMAKE_MODULE_PATH}" CMAKE_MODULE_PATH)
list(APPEND CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/Builds/CMake")

#  comments from morgan
#  set(CMAKE_BUILD_TYPE Release)
#  this declaration eliminates the need to pass -DCMAKE_BUILD_TYPE=Release, however 
#  this is not recommended for production builds, using cmake command line argument by using a profile or toolchain file is recommended
project(rippled)                                            #  name of the project is ripple, 
                                                            #  this initializes a cmake project and sets various project related variables
set(CMAKE_CXX_EXTENSIONS OFF)                               #  compiler settings, disable language extensions
set(CMAKE_CXX_STANDARD 20)                                  #  maintain at c++20 standard version
set(CMAKE_CXX_STANDARD_REQUIRED ON)                         #  standard version on

# make GIT_COMMIT_HASH define available to all sources  
find_package(Git)                                           #  find git executables using find package and retrieve the git commit hash of the project
if(Git_FOUND)                                               #  if found it sets a compile-time macro `-DGIT_COMMIT_HASH` with a commit hash value
    execute_process(COMMAND ${GIT_EXECUTABLE} describe --always --abbrev=40
        OUTPUT_STRIP_TRAILING_WHITESPACE OUTPUT_VARIABLE gch)
    if(gch)
        set(GIT_COMMIT_HASH "${gch}")
        message(STATUS gch: ${GIT_COMMIT_HASH})
        add_definitions(-DGIT_COMMIT_HASH="${GIT_COMMIT_HASH}")
    endif()
endif() #git

if(thread_safety_analysis)                                  #  adds a compile and link option related to thread safety annotations if the 
                                                            #  `thread_safety_analysis` option is enabled
  add_compile_options(-Wthread-safety -D_LIBCPP_ENABLE_THREAD_SAFETY_ANNOTATIONS -DRIPPLE_ENABLE_THREAD_SAFETY_ANNOTATIONS)
  add_compile_options("-stdlib=libc++")
  add_link_options("-stdlib=libc++")                        #  links additional standard libraries
endif()

include (CheckCXXCompilerFlag)
include (FetchContent)
include (ExternalProject)
include (CMakeFuncs)                                        # must come *after* ExternalProject b/c it overrides one function in EP
include (ProcessorCount)
if (target)
  message (FATAL_ERROR "The target option has been removed - use native cmake options to control build")
endif ()

#  defining the additional cmake files responsible for different aspects of the project
include(RippledSanity)                                      #  ripped/Builds/Cmake/RippledSanity.cmake!!!! this get called and it's parsed
include(RippledVersion)
include(RippledSettings)
include(RippledRelease)
# this check has to remain in the top-level cmake
# because of the early return statement
if (packages_only)
  if (NOT TARGET rpm)
    message (FATAL_ERROR "packages_only requested, but targets were not created - is docker installed?")
  endif()
  return ()
endif ()
include(RippledCompiler)
include(RippledInterface)

option(only_docs "Include only the docs target?" FALSE)
include(RippledDocs)
if(only_docs)
  return()
endif()

###

include(deps/Boost)                                             #  brew install boost
find_package(OpenSSL 1.1.1 REQUIRED)                            #  brew install openssl@1.1
set_target_properties(OpenSSL::SSL PROPERTIES
  INTERFACE_COMPILE_DEFINITIONS OPENSSL_NO_SSL2
)
add_subdirectory(src/secp256k1)
add_subdirectory(src/ed25519-donna)
find_package(lz4 REQUIRED)
# Target names with :: are not allowed in a generator expression.
# We need to pull the include directories and imported location properties
# from separate targets.
find_package(LibArchive REQUIRED)
find_package(SOCI REQUIRED)
find_package(SQLite3 REQUIRED)
find_package(Snappy REQUIRED)

option(rocksdb "Enable RocksDB" ON)
if(rocksdb)
  find_package(RocksDB REQUIRED)
  set_target_properties(RocksDB::rocksdb PROPERTIES
    INTERFACE_COMPILE_DEFINITIONS RIPPLE_ROCKSDB_AVAILABLE=1
  )
  target_link_libraries(ripple_libs INTERFACE RocksDB::rocksdb)
endif()

find_package(nudb REQUIRED)
find_package(date REQUIRED)
include(deps/Protobuf)
include(deps/gRPC)

target_link_libraries(ripple_libs INTERFACE
  ed25519::ed25519
  LibArchive::LibArchive
  lz4::lz4
  nudb::core
  OpenSSL::Crypto
  OpenSSL::SSL
  Ripple::grpc_pbufs
  Ripple::pbufs
  secp256k1::secp256k1
  soci::soci
  SQLite::SQLite3
)

if(reporting)
  find_package(cassandra-cpp-driver REQUIRED)
  find_package(PostgreSQL REQUIRED)
  target_link_libraries(ripple_libs INTERFACE
    cassandra-cpp-driver::cassandra-cpp-driver
    PostgreSQL::PostgreSQL
  )
endif()

include(RippledCore)
include(RippledInstall)
include(RippledCov)
include(RippledMultiConfig)
include(RippledValidatorKeys)
```

##  conan

conan is a package manager for c++ ensuring that the process of installing, upgrading, configuring, and managing software packages or libraries.  the key concepts to understand conan for is

1.  `Conanfile.py` this is the configuration file used by conan to define and manage dependencies for the project and it specifies the package name, version, build options, and dependencies.

2.  **profiles** profiles in conan define the settings and options for your build enviroment.  they include settings like the compiler version, build type, and options specific to your platform.  profiles help ensure consistent builds across different machines.

2.  **packages** in conan represent external libraries or dependencies that the project relies on.  the package recipes define how to download, configure, build, and install the dependencies.

3.  **build folders**  conan uses build folders to isolate different builds and prevent conflicts between dependencies.  by default conan generate build files in the current directoyr, but you can specify a different build folder to keep your project directory clean.

we have written a conan configuration file `conanfile.py` so that conan can be used to correctly download, configure, and build, and install all of the dependencies for this project, using a single set of compiler and linker options for all of them.  

the `conanfile.py` generates files that contain almost all of the parameters that cmake expects.  those tools include 

1.  a single toolchain file

2.  for every dependency each file all together implement version checking and define imported targets for the dependencies.  
    -  a cmake package configuration file
    -  package version file
    -  for every build type, a package target file

the toolchain file itself amends the search path `CMAKE_PREFIX_PATH` so that `find_package()` will discover the generated package configuration files.  all we must do to properly configure cmake is to pass the toolchiain file.

what cmake parameters are left out?  you still need to pick a build system generator and if you choose a single-configuration generated youll need to pass the `CMAKE_BUILD_TYPE`, which such match the `build_type` setting you have to conan.  even then conan has parameters some of which are platform specific.  if conan's parlance parameters are either settings or options.  settings are shared by all packages e.g. build type.  options are specific to a given package, whether to build and link OpenSSL as a shared library.

for settings conan goes through a complicated search process to choose defaults.  for options each package recipe define its own defaults.  
you can pass every parameter to conan on the command line, but it more convenient to put them in a [profile](https://docs.conan.io/1/reference/profiles.html) 

7.  [cmake-and-conan](#cmake-and-conan)

##  cmake and conan

in order to use cmake and conan togetehr you need to configure cmake to recognize and link the dependencies managed by conan.  conan generates package configuration files that cmake can use to discover and link dependencies correctly.  the typical workflow involves exporting the dependencies using conan, creating a build directory, instaling the dependencies using conan, configuring cmake with the generated package configuration file, and finally building the project.

1.  exporting dependencies
2.  creating a build directory
3.  installing dependencies
4.  configuring cmake
5.  building the project

all the commands and instructions provided need to be **adapted** to my specific project and enviroment.  it's essential to understand the purpose and implications of each step before executing the commands.

-----------------------------------------------------------
##  package set up

1.  `git checkout master`
2.  `conan profile new default --detect`
3.  `conan profile update settings.compiler.cppstd=20 default`
4.  `conan profile update 'conf.tools.build:compiler_executables={"c": "/usr/bin/gcc", "cpp": "/usr/bin/g++"}' default`
5.  `conan profile update env.CC=/sr/bin/gcc default` `conan profile update env.CXX=/usr/bin/g++ default`

##  build

1.  `conan export external/snappy snappy/1.1.9@`
2.  `mkdir .build`
3.  `cd .build`
4.  `conan install .. --output-folder . --build missing --settings build_type=Release` boost/1.77.0 failed
5.  `cmake -DCMAKE_TOOLCHAIN_FILE:FILEPATH=build/generators/conan_tollchain.cmake -DCMAKE_BUILD_TYPE=Release ..`
6.  `cmake --build .`
7.  `./rippled --unitest`

##  `~/.conan/profiles/default`

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
[build_requires]
[env]
CC=/usr/bin/gcc
CXX=/usr/bin/g++
[conf]
tools.build:compiler_executables={'c': '/usr/bin/gcc', 'cpp': '/usr/bin/g++'}
```
##  `conan version`

`Conan version 1.60.1`
-----------------------------------------------------------






-----------------------------------------------------------
##  reset conan package setup

1.  `pwd rippled`
2.  `rm -rf ~/.conan/data`
3.  `rm -rf ~/.conan/conan.conf`
4.  `rm -rf ~/.conan/profiles`
4.  `rm -r .build`

##  package set up

1.  `git checkout master`
2.  `conan profile new default --detect`
3.  `conan profile update settings.compiler.cppstd=20 default`

##  build

1.  `conan export external/snappy snappy/1.1.9@`
2.  `mkdir .build`
3.  `cd .build`
3.  `conan install --build boost .`
4.  `conan install .. --output-folder . --build missing --settings build_type=Release` 
5.  `cmake -DCMAKE_TOOLCHAIN_FILE:FILEPATH=build/generators/conan_tollchain.cmake -DCMAKE_BUILD_TYPE=Release ..`
6.  `cmake --build .`
7.  `./rippled --unitest`

##  `~/.conan/profiles/default`

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
[build_requires]
```
##  `conan version`

`Conan version 1.59.0`

-----------------------------------------------------------

LINE 250 ON BUILD

```
brew uninstall conan@1
brew install https://raw.githubusercontent.com/homebrew/homebrew-core/1fc9e09956a2aa5ee2f2f4f6c81e359c232dee0f/formula/conan.rb
pip install conan==1.59.0
❯ conan --version
Conan version 1.59.0
❯ tree .conan
.conan
├── conan.conf
└── version.txt

1 directory, 2 files

boost version needs to be 1.77.0
```











##  commands for package set up

####  1.  `git checkout master`

```
Already on 'master'
Your branch is up to date with 'origin/master'.
```

####  2.  `conan profile new default --detect`

```
❯ conan profile new default --detect
Found apple-clang 14.0
apple-clang>=13, using the major as version
Profile created with detected settings: /Users/mbergen/.conan/profiles/default
```

####  3.  `conan profile update settings.compiler.cppstd=20 default`

1.  `conan` calling the package manager
2.  `profile` is a keyword specifiying that we are working with a conan profile, specifically the Profile created with detected settings: /Users/mbergen/.conan/profiles/default
3.  `update` indicates that we want to update an existing profile (so writing out to default)
4.  `settings.compiler.cppstd` refers to the standard compiler were using
5.  `20` is the dialect of c++
6.  `default` specifies the name of the profile to update, `default` is a common name, but you can add more profiles and configure their name to anything

####  4.  `conan profile update 'conf.tools.build:compiler_executables={"c": "/usr/bin/gcc", "cpp": "/usr/bin/g++"}' default`

1.  `which gcc` in order to locate and define the path value of `c` key which is the compiler for c

```
❯ which gcc
/usr/bin/gcc
```

2.  `which g++` in order to locate and define the path value of `c++` key which is the compiler for c++

```
❯ which g++
/usr/bin/g++
```

####  5.  add the following to default profile or call in cli

```
conan profile update env.CC=/usr/bin/gcc default
conan profile update env.CXX=/usr/bin/g++ default
```

this just generates a [env] variable with two CC and CXX paths provided for the compiler executables 

###  Conan Profile

```
❯ tree .conan
.
├── artifacts.properties
├── cacert.pem
├── conan.conf
├── profiles
│   └── default
└── version.txt

2 directories, 5 files
```

###  `.conan/profiles/default`

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
[build_requires]
[env]
CC=/usr/bin/gcc
CXX=/usr/bin/g++
[conf]
tools.build:compiler_executables={'c': '/usr/bin/gcc', 'cpp': '/usr/bin/g++'}
```

###  build and test

1.  `conan export external/snappy snappy/1.1.9@`

2.  `mkdir .build`

3.  `cd .build`

4.  `conan install .. --output-folder . --build missing --settings build_type=Release`

5.  `cmake -DCMAKE_TOOLCHAIN_FILE:FILEPATH=build/generators/conan_toolchain.cmake -DCMAKE_BUILD_TYPE=Release ..`

6.  `cmake --build .`

7.  `./rippled --unitest`

```
conan export external/snappy snappy/1.1.9@
mkdir .build
cd .build
conan install .. --output-folder . --build missing --settings build_type=Release
cmake -DCMAKE_TOOLCHAIN_FILE:FILEPATH=build/generators/conan_toolchain.cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build .
./rippled --unittest
```

####  1.  `conan export external/snappy snappy/1.1.9@`

export our conan recipe for snappy, this doesnt explicitly link the c++ standard library, which allows us to statically link it.

snappy is a fast compression/decompression library developed by google, it aims to provide high speed data processing iwth a reasonable compression ratio (i do not have knowledge in compression/decompression tools however ill just blockbox).  `conanfile.py` is exported to snappy which is located in the `external/snappy` directory to the local conan cache.  and `snappy/1.1.9@` is the reference for the recipe in the local conan cache.  `rippled/external/snappy/`

there is a conanfile within that directory which can be blackboxed.


####  2.  `mkdir .build` 3.  `cd .build`

by creating teh build directory. conan will generate some files in what is calls the "install folder".  
these files are implementation details that can be blackboxed.  
by default the install folder is your current working directory.  
if you don't move into your build directory before calling Conan, then you may see it polluting your project root directory with these files
to make conan put them in your build directory youll have to add the options `--install-folder` or `-if` to every `conan install` command

####  3.  `conan install .. --output-folder . --build missing --settings build_type=Release`

1.  `conan install ..` tells conan to install the dependencies listed in the `conanfile.py`
2.  `--output-folder .` this argument is specifying that the output from this command should be placed in the current directory which is `.`
3.  `--build missing` tells conan to build any dependencies that are missing from conan's cache, essentially the cache is located here `~/.conan/conan.conf` and will be written out under the `[storage]` section 
4.  `--settings build_type=Release` argument tells conan to build the dependencies for a release build

####  4.  `cmake -DCMAKE_TOOLCHAIN_FILE:FILEPATH=build/generators/conan_toolchain.cmake -DCMAKE_BUILD_TYPE=Release ..`

1.  `cmake` command to run the cmake tool which is a build system generator whcih reads the `CMakeLists.txt` file that you write and generate build files for a build tool of your choice like Make

2.  `-D` is used to define a variable that will be passed into the CMake script so `-DCMAKE_TOOLCHAIN_FILE:FILEPATH=build/generators/conan_toolchain.cmake` is telling CMake to use a specific toolchain file which should exist after running the previous commands before 4

a toolchain file is a script that cmake reads before your main `CMakeLists.txt` and is used to set up the compiler and other tools like linkers that will be used to build the project.  the toolchain file is often used when cross-compiling which is wehn  you are building code on one type of system (the host), such that it can be executed on a different type of system (the target).  this is common when you have limited resources.  the cross compiler produces binaries that can be executed on a specific argitecture.  CMAKE's toolchain file handles all of these complexities and specifies the deatils about the target system and the cross compiler to be used, which cmake then uses when generating the build files.


3.  `conan_toolchain.cmake` is a toolchain file that was generated by conan.  it sets up the tools and settinsg taht conan has figure out for the project based on the dep and settings in `conanfile.py`

4.  `-DCMAKE_BUILD_TYPE=Release` sets the build type to `Release`, this typically means that the code will be optimized for speed and the debug info will be removed making the binaries smaller!!  

5.  `..` at the end of the command is specifying the source directory of the project which is the parent directory of build which were currently in when running the 4th command.

NOTE IT'S VERY IMPORTANT TO RUN CMAKE FROM A BUILD DIRECTORY THAT'S SEPARATE FROM THE SOURCE DIRECTORY IN ORDER TO MAINTAIN MODULARITY.

####  5.  `cmake --build .`

invokation for the underlying build system!!!

####  6.  `./rippled --unitest`

execute the `rippled` unix binary executable and `--unittest` argument means to run the program's unit tests.  
unit tests are small isolated tests that check the functionality of a specific part of a program.  








###  console log output from commands

1.  `❯ conan export external/snappy snappy/1.1.9@`  need to understand these lines

indicates that there has been a successful export of snappy package recipe, the warning is just stating that couldnt find a remotes registry file which is the file taht keeps 


```
❯ conan export external/snappy snappy/1.1.9@
WARN: Remotes registry file missing, creating default one in /Users/mbergen/.conan/remotes.json     
Exporting package recipe
snappy/1.1.9 exports: File 'conandata.yml' found. Exporting it...
snappy/1.1.9 exports: Copied 1 '.yml' file: conandata.yml
snappy/1.1.9: Calling export_sources()
snappy/1.1.9: A new conanfile.py version was exported
snappy/1.1.9: Folder: /Users/mbergen/.conan/data/snappy/1.1.9/_/_/export
snappy/1.1.9: Exported revision: d64c117aaa6d3a61064ba8cec8212db6

~/Documents/Github/rippled on master !1
```

2.  `❯ mkdir .build cd .build`

3.  `❯ conan install .. --output-folder . --build missing --settings build_type=Release --settings compiler.runtime=MT`

```
❯ conan install .. --output-folder . --build missing --settings build_type=Release --settings compiler.runtime=MT
ERROR: 'settings.compiler.runtime' doesn't exist for 'apple-clang'
'settings.compiler' possible configurations are ['cppstd', 'libcxx', 'version']
```

####  troubleshooting

2.  ⚠️  problem may come from using the wrong version of conan - install v 1.59.0

```
❯ brew info conan@1
==> conan@1: stable 1.60.1 (bottled) [keg-only]
Distributed, open source, package manager for C/C++
https://conan.io
/opt/homebrew/Cellar/conan@1/1.60.1 (1,490 files, 16.2MB)
    Poured from bottle using the formulae.brew.sh API on 2023-06-13 at 10:22:19
    From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/conan@1.rb
    License: MIT
    ==> Dependencies
    Build: pkg-config ✔
    Required: openssl@1.1 ✔, pygments ✔, python@3.11 ✔, pyyaml ✔, six ✔
    ==> Caveats
    conan@1 is keg-only, which means it was not symlinked into /opt/homebrew,
    because this is an alternate version of another formula.

    If you need to have conan@1 first in your PATH, run:
    echo 'export PATH="/opt/homebrew/opt/conan@1/bin:$PATH"' >> ~/.zshrc
    ==> Analytics
    install: 0 (30 days), 8 (90 days), 8 (365 days)
    install-on-request: 0 (30 days), 8 (90 days), 8 (365 days)
    build-error: 0 (30 days)

    ~/Documents/Github/rippled on master !1

    ❯ echo 'export PATH"/opt/homebrew/conan@1/bin:$PATH"' >> ~/.zshrc


    ~

    ❯ source .zshrc

    .zshrc:export:116: not valid in this context: PATH/opt/homebrew/conan@1/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin
```


2.  

```
❯ conan install .. --output-folder . --build missing --settings build_type=Release
Configuration:
[settings]
arch=armv8
arch_build=armv8
build_type=Release
compiler=apple-clang
compiler.cppstd=20
compiler.libcxx=libc++
compiler.version=14
os=Macos
os_build=Macos
[options]
[build_requires]
[env]
CC=/usr/bin/gcc
CXX=/usr/bin/g++
[conf]
tools.build:compiler_executables={'c': '/usr/bin/gcc', 'cpp': '/usr/bin/g++'}

boost/1.77.0: Not found in local cache, looking in remotes...
boost/1.77.0: Trying with 'conancenter'...
Downloading conanmanifest.txt completed [0.70k]
Downloading conanfile.py completed [81.81k]
Downloading conan_export.tgz completed [1.65k]
Decompressing conan_export.tgz completed [0.00k]
boost/1.77.0: Downloaded recipe revision 0
WARN: boost/1.77.0: requirement zlib/1.2.13 overridden by xrpl/1.10.1 to zlib/1.2.12
.....

35 warnings and 1 error generated.
...failed updating 2 targets...
boost/1.77.0:
boost/1.77.0: ERROR: Package '12a0259a3874809e8c87bd0624bf06329b6d5b82' build failed
boost/1.77.0: WARN: Build folder /Users/mbergen/.conan/data/boost/1.77.0/_/_/build/12a0259a3874809e8c87bd0624bf06329b6d5b82/build-release
ERROR: boost/1.77.0: Error in build() method, line 887
	self.run(full_command)
	ConanException: Error 1 while executing b2 -q numa=on target-os=darwin architecture=arm address-model=64 binary-format=mach-o abi=aapcs --layout=system --user-config=/Users/mbergen/.conan/data/boost/1.77.0/_/_/source/src/tools/build/user-config.jam -sNO_ZLIB=0 -sNO_BZIP2=0 -sNO_LZMA=1 -sNO_ZSTD=1 boost.locale.icu=off --disable-icu boost.locale.iconv=on boost.locale.iconv.lib=libiconv threading=multi visibility=global link=static variant=release --with-atomic --with-chrono --with-container --with-context --with-contract --with-coroutine --with-date_time --with-exception --with-fiber --with-filesystem --with-graph --with-iostreams --with-json --with-locale --with-log --with-math --with-nowide --with-program_options --with-random --with-regex --with-serialization --with-stacktrace --with-system --with-test --with-thread --with-timer --with-type_erasure --with-wave toolset=clang-darwin cxxflags=-std=c++20 pch=on -sLIBBACKTRACE_PATH=/Users/mbergen/.conan/data/libbacktrace/cci.20210118/_/_/package/240c2182163325b213ca6886a7614c8ed2bf1738 -sICONV_PATH=/Users/mbergen/.conan/data/libiconv/1.17/_/_/package/240c2182163325b213ca6886a7614c8ed2bf1738 linkflags="-stdlib=libc++" cxxflags="-fPIC -stdlib=libc++ -DBOOST_STACKTRACE_ADDR2LINE_LOCATION=/usr/bin/addr2line" install --prefix=/Users/mbergen/.conan/data/boost/1.77.0/_/_/package/12a0259a3874809e8c87bd0624bf06329b6d5b82 -j8 --abbreviate-paths -d0 --debug-configuration --build-dir="/Users/mbergen/.conan/data/boost/1.77.0/_/_/build/12a0259a3874809e8c87bd0624bf06329b6d5b82/build-release"
```

the error message is in the build() method on line 887 from boost/1.77.0
and potentially since conan count locate the correct boost version
the steps to troubleshoot are to re-run the build command with verbose logging which may help with where the error is coming from
however, i may want to check the compatability of boost and conan because as it shows in the first warning was from boost 


maybe on the 


```
❯ conan install .. --output-folder . --build missing --settings build_type=Release
Configuration:
[settings]
arch=armv8
arch_build=armv8
build_type=Release
compiler=apple-clang
compiler.cppstd=20
compiler.libcxx=libc++
compiler.version=14
os=Macos
os_build=Macos
[options]
[build_requires]
[env]
CC=/usr/bin/gcc
CXX=/usr/bin/g++
[conf]
tools.build:compiler_executables={'c': '/usr/bin/gcc', 'cpp': '/usr/bin/g++'}

boost/1.77.0: Not found in local cache, looking in remotes...
boost/1.77.0: Trying with 'conancenter'...
Downloading conanmanifest.txt completed [0.70k]
Downloading conanfile.py completed [81.81k]
Downloading conan_export.tgz completed [1.65k]
Decompressing conan_export.tgz completed [0.00k]
boost/1.77.0: Downloaded recipe revision 0
WARN: boost/1.77.0: requirement zlib/1.2.13 overridden by xrpl/1.10.1 to zlib/1.2.12
```


###  `conanfile.py` located in rippled root

```python
from conans import ConanFile
from conan.tools.cmake import CMake, CMakeToolchain, cmake_layout
import re

class Xrpl(ConanFile):
    name = 'xrpl'

    license = 'ISC'
    author = 'John Freeman <jfreeman@ripple.com>'
    url = 'https://github.com/xrplf/rippled'
    description = 'The XRP Ledger'
    settings = 'os', 'compiler', 'build_type', 'arch'
    options = {
        'assertions': [True, False],
        'coverage': [True, False],
        'fPIC': [True, False],
        'jemalloc': [True, False],
        'reporting': [True, False],
        'rocksdb': [True, False],
        'shared': [True, False],
        'static': [True, False],
        'tests': [True, False],
        'unity': [True, False],
    }

    requires = [
        'boost/1.77.0',
        'date/3.0.1',
        'libarchive/3.6.0',
        'lz4/1.9.3',
        'grpc/1.50.1',
        'nudb/2.0.8',
        'openssl/1.1.1m',
        'protobuf/3.21.4',
        'snappy/1.1.9',
        'soci/4.0.3',
        'sqlite3/3.38.0',
        'zlib/1.2.12',
    ]

    default_options = {
        'assertions': False,
        'coverage': False,
        'fPIC': True,
        'jemalloc': False,
        'reporting': False,
        'rocksdb': True,
        'shared': False,
        'static': True,
        'tests': True,
        'unity': False,

        'cassandra-cpp-driver:shared': False,
        'date:header_only': True,
        'grpc:shared': False,
        'grpc:secure': True,
        'libarchive:shared': False,
        'libarchive:with_acl': False,
        'libarchive:with_bzip2': False,
        'libarchive:with_cng': False,
        'libarchive:with_expat': False,
        'libarchive:with_iconv': False,
        'libarchive:with_libxml2': False,
        'libarchive:with_lz4': True,
        'libarchive:with_lzma': False,
        'libarchive:with_lzo': False,
        'libarchive:with_nettle': False,
        'libarchive:with_openssl': False,
        'libarchive:with_pcreposix': False,
        'libarchive:with_xattr': False,
        'libarchive:with_zlib': False,
        'libpq:shared': False,
        'lz4:shared': False,
        'openssl:shared': False,
        'protobuf:shared': False,
        'protobuf:with_zlib': True,
        'rocksdb:enable_sse': False,
        'rocksdb:lite': False,
        'rocksdb:shared': False,
        'rocksdb:use_rtti': True,
        'rocksdb:with_jemalloc': False,
        'rocksdb:with_lz4': True,
        'rocksdb:with_snappy': True,
        'snappy:shared': False,
        'soci:shared': False,
        'soci:with_sqlite3': True,
        'soci:with_boost': True,
    }

    def set_version(self):
        path = f'{self.recipe_folder}/src/ripple/protocol/impl/BuildInfo.cpp'
        regex = r'versionString\s?=\s?\"(.*)\"'
        with open(path, 'r') as file:
            matches = (re.search(regex, line) for line in file)
            match = next(m for m in matches if m)
            self.version = match.group(1)

    def configure(self):
        if self.settings.compiler == 'apple-clang':
            self.options['boost'].visibility = 'global'

    def requirements(self):
        if self.options.jemalloc:
            self.requires('jemalloc/5.2.1')
        if self.options.reporting:
            self.requires('cassandra-cpp-driver/2.15.3')
            self.requires('libpq/13.6')
        if self.options.rocksdb:
            self.requires('rocksdb/6.27.3')

    exports_sources = 'CMakeLists.txt', 'Builds/CMake/*', 'src/*', 'cfg/*'

    def layout(self):
        cmake_layout(self)
        # Fix this setting to follow the default introduced in Conan 1.48
        # to align with our build instructions.
        self.folders.generators = 'build/generators'

    generators = 'CMakeDeps'
    def generate(self):
        tc = CMakeToolchain(self)
        tc.variables['tests'] = self.options.tests
        tc.variables['assert'] = self.options.assertions
        tc.variables['coverage'] = self.options.coverage
        tc.variables['jemalloc'] = self.options.jemalloc
        tc.variables['reporting'] = self.options.reporting
        tc.variables['rocksdb'] = self.options.rocksdb
        tc.variables['BUILD_SHARED_LIBS'] = self.options.shared
        tc.variables['static'] = self.options.static
        tc.variables['unity'] = self.options.unity
        tc.generate()

    def build(self):
        cmake = CMake(self)
        cmake.verbose = True
        cmake.configure()
        cmake.build()

    def package(self):
        cmake = CMake(self)
        cmake.verbose = True
        cmake.install()

    def package_info(self):
        self.cpp_info.libs = [
            'libxrpl_core.a',
            'libed25519-donna.a',
            'libsecp256k1.a',
        ]
```










###  install conan with pip 

install with python package manager and not homebrew.  conan will be installed globally when using pip.


```
❯ tree .conan2
❯ tree .conan2
.conan2
├── extensions
│   └── plugins
│       ├── compatibility
│       │   ├── compatibility.py
│       │   └── cppstd_compat.py
│       └── profile.py
├── global.conf
├── p
│   └── cache.sqlite3
├── settings.yml
└── version.txt

5 directories, 7 files
```

###  getting started with conan

MD5 hash calculator app that uses [`Poco`](https://pocoproject.org) c++ libraries.  we will use cmake as the build system.

[`md5.cpp`](./examples/libraries/poco/md5.cpp)

```cpp

```

`md5.cpp` relies on the Poco libraries, we can look for them in the ConanCenter remote [conancenter](https://conan.io/center/) and typing `poco` in the search box and we'll dee different versions available

[`poco/1.8.1`](https://conan.io/center/poco?version=1.8.1&os=Macos&tab=recipe)
`poco/1.9.3`
`poco/1.9.4`

the conan client contains a command to search in remote repoistories, and we could try `$ conan search poco --remote=conancenter`

```
Last login: Sat Jun 10 19:27:46 on ttys003
❯ conan search poco --remote=conancenter
conancenter
  poco
    poco/1.8.1
    poco/1.9.3
    poco/1.9.4
    poco/1.10.0
    poco/1.10.1
    poco/1.11.0
    poco/1.11.1
    poco/1.11.2
    poco/1.11.3
    poco/1.12.0
    poco/1.12.1
    poco/1.12.2
    poco/1.12.3
    poco/1.12.4
```



```
openssl/1.1.1m: ['"conan-Release-Macos-armv8-apple-clang-14"', 'no-shared', '--prefix="/Users/mbergen/.conan/data/openssl/1.1.1m/_/_/package/240c2182163325b213ca6886a7614c8ed2bf1738"', '--openssldir="/Users/mbergen/.conan/data/openssl/1.1.1m/_/_/package/240c2182163325b213ca6886a7614c8ed2bf1738/res"', 'no-unit-test', 'threads', 'PERL=perl', 'no-tests', '--release', '-fPIC', 'no-md2']
Configuring OpenSSL version 1.1.1m (0x101010dfL) for conan-Release-Macos-armv8-apple-clang-14
Using os-specific seed configuration
Creating configdata.pm
Creating Makefile

**********************************************************************
***                                                                ***
***   OpenSSL has been successfully configured                     ***
***                                                                ***
***   If you encounter a problem while building, please open an    ***
***   issue on GitHub <https://github.com/openssl/openssl/issues>  ***
***   and include the output from the following command:           ***
***                                                                ***
***       perl configdata.pm --dump                                ***
***                                                                ***
***   (If you are new to OpenSSL, you might want to consult the    ***
***   'Troubleshooting' section in the INSTALL file first)         ***
***                                                                ***
**********************************************************************
```
