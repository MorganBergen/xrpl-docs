#  intern guide 

###  to do list

-  [x] [build rippled](./src/build-rippled/macos/README.md)
-  [x] [pull request from found bug on rippled](./src/build-rippled/macos/PR.md)
-  [x] [complete issue #1 palau monitoring](https://github.com/ripple/wwbdc-monitoring/issues/1)
-  [x] [dev containers](https://www.youtube.com/watch?v=SDa3v4Quj7Y)
-  [x] [Payment System Basics](#payment-system-basics)
-  [ ] [trust lines and issuing](https://xrpl.org/trust-lines-and-issuing.html)
-  [ ] [monitor incoming payments](https://xrpl.org/monitor-incoming-payments-with-websocket.html)
-  [ ] [fix this error with the config reporting]()
-  [ ] consensus
-  [ ] make a do a transaction

```
❯ grep -r "TODO" .
./test/main/CBDCALERT002.test.ts:    //TODO test actual fucntion called by the alert
./enums/index.ts:    // TODO: ...
./utils/misc.ts:        if (paramType === "LIST") result[param.parameter_name] = new Array(); // TODO LIST ENUM
./index.ts:                            log.warn(`TODO: ignoring ${alertCode} alerts for now (Not implemented)`);
./index.ts:        startServer(3003); //TODO: port
./services/alerts/CBDCALERT002.ts:    timezone: string = ""; // TODO: Enum
./services/alerts/CBDCALERT002.ts:        // TODO: validate parameters
./services/alerts/CBDCALERT003.ts: * TODO include rasing an actual alert that is send out.
./services/alerts/CBDCALERT003.ts:        // TODO: validate parameters
./services/alerts/CBDCALERT003.ts:                // TODO: Cast to its own type
./services/alerts/CBDCALERT004.ts:        // TODO: validate parameters
./services/alerts/CBDCALERT005.ts:    timezone: string = ""; // TODO: Enum
./services/alerts/CBDCALERT005.ts:        // TODO: validate parameters
./services/alerts/CBDCALERT001.ts:    timezone: string = ""; // TODO: Enum?
./services/alerts/CBDCALERT001.ts:        // TODO: Validate parameters
./services/xrpl.ts:    return details; // TODO: type
```

##  agenda

**issues**
CBDCALERT001: Check issuer trustlines #26
Define CBDCAlert001.test.ts

1.  Test user interface for monitoring
2.  Outline for project presentation 

# agenda

1.  Use cron package with momentjs to format enum Timezone values. for Enumerate TimeZones for CBDCALERT00{1, 2, 3, 4} #10
2.  Comment process/src/services/alerts/CBDCALERT004.ts && 005 && 006.ts
3.  Resolve PR for 7-cbdcalert001-class-comments and close issue
4.  1301 files have been changed under the contribute branch, I'll be combing through the Class Diagram to see what new issues I can address through comments made by Javier
5.  Prepare source code for tomorrows meeting over creating an account to an issuer requiring an AuthTrustline and then freeze the account
6.  Work with `morgan_cbdc_test` to test trustlines


```
❯ ./rippled --conf ../cfg/rippled-reporting.cfg
Loading: "../cfg/rippled-reporting.cfg"
libc++abi: terminating due to uncaught exception of type std::runtime_error: The file specified in [validators_file] does not exist: /opt/rippled-reporting/etc/validators.txt
[1]    5614 abort      ./rippled --conf ../cfg/rippled-reporting.cfg
```

-  [ ] still need to schedule a meeting with Ross Edwards
-  [ ] [Setup private XRPL network](https://ripplelabs.atlassian.net/wiki/spaces/RIPD/pages/2728100754/Setup+private+XRPL+network)
-  [ ] [resolve error](https://preview.redoc.ly/dcm-docs/xbs-1822-private-ledger/dcm/admin/private-network/quickstart/)
-  [ ] [input license and enter into package.json]()

### selected readings

1.  [private ledger network](./src/private-network/README.md)
2.  [build rippled from source](./src/build-rippled/README.md)
3.  [check on pull request](https://github.com/XRPLF/rippled/pull/4583)

### [Documentation Index](https://xrpl.org/docs-index.html)

- [x] [Introduction](#introduction)
- [x] [getting started again](https://xrpl.org/get-started-using-javascript.html)
- [ ] [Payment Types](#payment-types)
- [x] [Tokens](#tokens)
- [ ] [Decentralized Exchange](#decentralized-exchange)
- [ ] [Consensus Network](#consensus-network)
- [x] [XRP Ledger Servers](#xrp-ledger-servers)


### References

- [XRPL Overview](#xrpl-overview)
- [Use Cases & Featured Projects](#use-cases--featured-projects)
- [History](#history)
- [Ledger Explorer](#ledger-explorer)
- [XRP Overview](#xrp-overview)
- [xrpl documentation](https://xrpl.org/docs-index.html)

