# getting started

**learning goals**

-  the basic building blocks of the xrp ledger based applications
-  how to connect to the xrp ledger using `xrpl.js`
-  how to get an account on the testnet using `xrpl.js`
-  how to use the `xrpl.js` library to look up information about an account on the ledger
-  how to put these steps together to create a javascript app or web app

###  steps for most ledger projects

1.  import library
2.  connect to the xrp ledger
3.  get an account
4.  query the xrp ledger
5.  listen for events

##  import library

`const xrpl = require("xrpl");`

##  connect to the xrp ledger

xrpl.js 2.0 library

Managing keys & creating test credentials (Wallet && Client.fundWallet())

Submitting transactions to the XRP Ledger (Client.submit(...) & transaction types)

Sending requests to observe the ledger (Client.request(...) using public API methods)

Subscribing to changes in the ledger (Ex. ledger, transactions, & more...)

Parsing ledger data into more convenient formats (xrpToDrops and rippleTimeToISOTime)
