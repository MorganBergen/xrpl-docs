#  conan

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





