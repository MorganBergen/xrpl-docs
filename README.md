#  intern guide

###  to do list

-  [x] [build rippled](./src/build-rippled/macos/README.md)
-  [x] [pull request from found bug on rippled](./src/build-rippled/macos/PR.md)

-  [ ] [complete issue #1 palau monitoring](https://github.com/ripple/cbdc-monitoring/issues/1)


Michael Legleux

Just came across your PR and am refraining from commenting on it there but it looks like some stuff snuck in that maybe you didn’t intend?
The PR looks like a bug-fix but says it’s documentation?
That docs dir is the source documentation that gets built by Doxygen and that README.md shouldn’t be there for sure.
None of these files listed at the beginning are on the paths listed? None of them should be added anyway.

```
./conanfile.py added array for boost versioning options
./Build/macos/README.md provided a readme for reference
./Build/macos/reset_conan.sh
./Build/macos/default
```

I haven’t built rippled on mac in a while (and not on apple silicon) but isn’t that boost issue explained in the BUILD.md or you just need to wipe out the conan boost data dir. The `Pathfinder.cpp` changes would have to be commented on by some C++ devs but the formatting is specified by running clang-format so you could see if those changes would match that specifiication.  

These git subtree links should be completely removed as they are way obsolete and a lie! I thought I removed that but I guess it was somewhere else.



### selected readings

1.  [private ledger network](./src/private-network/README.md)
2.  [build rippled from source](./src/build-rippled/README.md)
3.  [check on pull request](https://github.com/XRPLF/rippled/pull/4583)

### Documentation

- [x] [Documentation Index](https://xrpl.org/docs-index.html)
- [x] [Concepts](#concepts)
- [x] [Introduction](#introduction)
- [x] [Payment System Basics](#payment-system-basics)
- [ ] [Payment Types](#payment-types)
- [x] [Tokens](#tokens)
- [ ] [Decentralized Exchange](#decentralized-exchange)
- [x] [Consensus Network](#consensus-network)
- [x] [XRP Ledger Servers](#xrp-ledger-servers)

### References

- [XRPL Overview](#xrpl-overview)
- [Use Cases & Featured Projects](#use-cases--featured-projects)
- [History](#history)
- [Ledger Explorer](#ledger-explorer)
- [XRP Overview](#xrp-overview)
- [xrpl documentation](https://xrpl.org/docs-index.html)

