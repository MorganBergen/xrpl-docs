#  xrp ledger augmented documentation 

-  [build rippled](./src/build-rippled/macos/README.md)
-  [pull request from found bug on rippled](./src/build-rippled/macos/PR.md)
-  [dev containers](https://www.youtube.com/watch?v=SDa3v4Quj7Y)
-  [Payment System Basics](#payment-system-basics)
-  [trust lines and issuing](https://xrpl.org/trust-lines-and-issuing.html)
-  [monitor incoming payments](https://xrpl.org/monitor-incoming-payments-with-websocket.html)
-  [Setup private XRPL network](https://ripplelabs.atlassian.net/wiki/spaces/RIPD/pages/2728100754/Setup+private+XRPL+network)
[resolve error](https://preview.redoc.ly/dcm-docs/xbs-1822-private-ledger/dcm/admin/private-network/quickstart/)

Managing keys & creating test credentials (Wallet && Client.fundWallet())
Submitting transactions to the XRP Ledger (Client.submit(...) & transaction types)
sending requests to observe the ledger (client.request(...) using public api methods)
Subscribing to changes in the ledger (Ex. ledger, transactions, & more...)
Parsing ledger data into more convenient formats (xrpToDrops and rippleTimeToISOTime)

### [Documentation Index](https://xrpl.org/docs-index.html)

-  [private ledger network](./src/private-network/README.md)
-  [build rippled from source](./src/build-rippled/README.md)
-  [check on pull request](https://github.com/XRPLF/rippled/pull/4583)
-  [Introduction](#introduction)
-  [getting started again](https://xrpl.org/get-started-using-javascript.html)
-  [Payment Types](#payment-types)
-  [Tokens](#tokens)
-  [Decentralized Exchange](#decentralized-exchange)
-  [Consensus Network](#consensus-network)
-  [XRP Ledger Servers](#xrp-ledger-servers)
-  [XRPL Overview](#xrpl-overview)
-  [Use Cases & Featured Projects](#use-cases--featured-projects)
-  [History](#history)
-  [Ledger Explorer](#ledger-explorer)
-  [XRP Overview](#xrp-overview)
-  [xrpl documentation](https://xrpl.org/docs-index.html)

### temp

```cli
❯ ./rippled --conf ../cfg/rippled-reporting.cfg
Loading: "../cfg/rippled-reporting.cfg"
libc++abi: terminating due to uncaught exception of type std::runtime_error: The file specified in [validators_file] does not exist: /opt/rippled-reporting/etc/validators.txt
[1]    5614 abort      ./rippled --conf ../cfg/rippled-reporting.cfg
```
