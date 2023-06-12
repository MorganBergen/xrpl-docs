#  build rippled server software from source

`rippled` is the server software that powers the xrp ledger, written in c++, and runs on a variety of platforms.  the `rippled` server software can run in several modes depending on its configuration.

###  references
1.  [server modes](https://xrpl.org/rippled-server-modes.html)
2.  [`rippled/BUILD.md`](https://github.com/XRPLF/rippled/blob/master/BUILD.md#a-crash-course-in-cmake-and-conan)
3.  gcc: stable 13.1.0 [GNU compiler collection](https://gcc.gnu.org/)

fetched `gmp` [gnu multiple precision arithmetic library](https://gmplib.org)
fetched `isl` [integer set library for the polyhedral model](https://libisl.sourceforge.io/)
fetched `mpfr` [c library for multiple-precision floating-point computations](https://www.mpfr.org/)
Installing dependencies for gcc: gmp, isl, mpfr and libmpc

4.  [clang 13 version]()
5.  [apple clang]()
6.  [msvc]()

##  contents

###  cmake

-  cmake makes your makefile
-  cmake is a meta-build tool for generating makefiles.

cmake is a tool to control the softwares compilation process using simple platform and compiler independent configuration files, and generate native `makefiles` and workspaces taht can be used in the compiler enviroment of your choice.

cmake is an extensible, system that manages the build process in an operating system and in a compiler-independent manner.  unlike many cross-platform systems, cmake is deisgned to be used in conjunction with the native build enviroment.  simple configuration files placed in each source directory is called `CMakeList.txt` are used to generate standard build files e.g. `makefiles` on unix.

cmake can generate a native build enviroment that will compile source code, create libraries, generate wrappers, and build executables in arbitrary combinations.  cmake supports in-place and out-of-place, builds, and can therefore support multiple builds from a single source tree. cmake also supports static and dunamic library builds.  when cmake runs, it locates files, libraries, and executables, and may encounter optional build directives.  this info is gathered into the cache, which may be changed by the user prior to the generation of the native build files.

cmake is deisgned to support complex directory hierarchies and applications dependent on several libraries.  for example cmake supports projects consisting of multiple toolkits, where each toolkit might contain sevral directories, and the application depends on the toolkits plus additional code.  cmake can also handle situations where executables must be built in order to generate code that is then compiled and linked into a final application.

the build process is controlled by creating one or more `CMakeLists.txt` files in each directory (including subdirectories) that make up the project.

Each `CMakeLists.txt` consists of one or more commands.  each command has the form `COMMAND (args..)` where `COMMAND`is the name of the command and `args` is a white-spaced separated list of arguments.

technically cmake is unneeded to build rippled.  you could manually compile every translation unit into an object file, using the right compiler options, and then manually link all those objects together, using the right linker options.  however that's very tedious and error prone, which is why we use cmake.  we have written cmake configuration files for this project so that cmake can be used to correctly compile and link all of the translation units in it or rather cmake will generate files for a separate build system that compile and link all of the translation units.  even then cmake has parameters, some of which are platform specific.  in cmake's parlance parameters are specifically named variables like `CMAKE_BUILD_TYPE` or `CMAKE_MSVC_RUNTIME_LIBRARY`

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

```txt
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
include(RippledSanity)                                      #  ripped/Builds/Cmake/RippledSanity.cmake!!!! this get called a is parsed
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

###

include(RippledCore)
include(RippledInstall)
include(RippledCov)
include(RippledMultiConfig)
include(RippledValidatorKeys)
```

##  conan

we have written a conan configuration file `conanfile.py` so that conan can be used to correctly download, configure, and build, and install all of the dependencies for this project, using a single set of compiler and linker options for all of them.  it generates files that contain almost all of the parameters that cmake expects.  those tools include 

1.  a single toolchain file
2.  for every dependency each file all together implement version checking and define imported targets for the dependencies.  
    -  a cmake package configuration file
    -  package version file
    -  for every build type, a package target file

the toolchain file itself amends the search path `CMAKE_PREFIX_PATH` so that `find_package()` will discover the generated package configuration files.

all we must do to properly configure cmake is to pass the toolchiain file.

what cmake parameters are left out?  you still need to pick a build system generator and if you choose a single-configuration generated youll need to pass the `CMAKE_BUILD_TYPE`, which such match the `build_type` setting you have to conan.  even then conan has parameters some of which are platform specific.  if conan's parlance parameters are either settings or options.  settings are shared by all packages e.g. build type.  options are specific to a given package, whether to build and link OpenSSL as a shared library.

for settings conan goes through a complicated search process to choose defaults.  for options each packaeg recipe define its own defaults.  you can pass every parameter to conan on the command line, but it more convenient to put them in a [profile](https://docs.conan.io/1/reference/profiles.html)


###  getting started

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





