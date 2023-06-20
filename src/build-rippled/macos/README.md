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

---------------------------------------------------------------------------------
##  references

1.  [server modes]
2.  [master build instructions]

##  systems hardware and software configuration

1.  **OS** macOS 13.4 22F66 arm64
2.  **host** MacBookPro18,3
3.  **kernel** 22.5.0
4.  **packages** 56 (brew)
5.  **shell** zsh 5.9
6.  **cpu** Apple M1 Pro
7.  **memory** 2026MiB / 16384MiB

##  dependencies

1.  [`gcc`](https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/gcc.rb) gnu compiler collection version 13.0.0
2.  [`clang`](https://opensource.apple.com/source/clang/clang-23/clang/tools/clang/docs/UsersManual.html) apple clang version 14.0.3
3.  [`cmake`](https://formulae.brew.sh/formula/cmake) cross platform make version 3.26.4
4.  [`conan`](https://conan.io/downloads.html) conan package manager version 1.59.0

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

3.  **packages**  conan packages represent external libraries or dependencies on which the project depends.  package recipes provide instructions on how to download, configure, build, and install these dependencies.

4.  **build folders** conan employs build folders to segregate different builds and avoid conflicts among dependencies.  while conan creates build files in the current directory by default, users can specify a different build folder to maintain a clean project directory and avoid pollution.

`Conanfile.py` enables conan to efficiently download, configure, build, and install all dependencies.  this process utilizes a unified set of compiler and linker options for all dependencies.  the `Conanfile.py` generates files incorporating most parameters that Cmake expects.  these include a single toolchain file, and for each dependency files that collectively implement version checking and define imported targets for dependencies.  these files are a cmake package configuration file, a package version file, and a package target file for every build type.

the toolchain modifies the search path `CMAKE_PREFIX_PATH` to facilitat `find_package()` in locating the generated package configuration files.  to configure cmake properly one needs only pass the toolchain file.

however it's important to note that cmake parameters are 

####  running the binary executable

[`./rippled --unittest`]

The console log output from `./rippled --unittest` is the result of the built-in unit tests being run.  each line is the name of a specific test case or test suite being executed.

```
```







