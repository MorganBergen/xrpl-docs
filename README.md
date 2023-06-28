#  intern guide

###  to do list

-  [x] [build rippled](./src/build-rippled/macos/README.md)
-  [x] [pull request from found bug on rippled](./src/build-rippled/macos/PR.md)
-  [ ] [complete issue #1 palau monitoring](https://github.com/ripple/cbdc-monitoring/issues/1)
-  [ ] send lauren my github repo
-  [ ] still need to schedule a meeting with Ross Edwards
-  [ ] [Setup private XRPL network](https://ripplelabs.atlassian.net/wiki/spaces/RIPD/pages/2728100754/Setup+private+XRPL+network)
-  [ ] [resolve error](https://preview.redoc.ly/dcm-docs/xbs-1822-private-ledger/dcm/admin/private-network/quickstart/)
-  [ ] [input license and enter into package.json]()
-  [ ] watch explainer video from mary hall cb-palau(https://ripple.freshservice.com/support/catalog/items/123)

### selected readings

1.  [private ledger network](./src/private-network/README.md)
2.  [build rippled from source](./src/build-rippled/README.md)
3.  [check on pull request](https://github.com/XRPLF/rippled/pull/4583)

### [Documentation Index](https://xrpl.org/docs-index.html)

- [x] [Introduction](#introduction)
- [x] [Payment System Basics](#payment-system-basics)
     - [ ] accounts 
     - [ ] cryptographic keys
     - [ ] multi signing

- [ ] [Payment Types](#payment-types)
- [x] [Tokens](#tokens)
- [ ] [Decentralized Exchange](#decentralized-exchange)
- [ ] [Consensus Network](#consensus-network)
- [x] [XRP Ledger Servers](#xrp-ledger-servers)

- [ ] consensus
- [ ] transaction basics

### References

- [XRPL Overview](#xrpl-overview)
- [Use Cases & Featured Projects](#use-cases--featured-projects)
- [History](#history)
- [Ledger Explorer](#ledger-explorer)
- [XRP Overview](#xrp-overview)
- [xrpl documentation](https://xrpl.org/docs-index.html)



WebSocket is a protocol that provides full-duplex communication channels over a single TCP connection. This protocol enables interaction between a web browser (or other client applications) and a server with lower overheads, facilitating real-time data transfer from and to the server.
In the context of rippled, the reference server software that powers the XRP Ledger (XRPL), WebSocket is one of the ways that clients can connect to a rippled server to submit transactions, request information, or subscribe to updates.
When you interact with a rippled server via WebSocket:
You establish a WebSocket connection: This is typically done using a WebSocket client, which could be a library in a programming language like JavaScript, Python, or Java, or even directly in a web browser that supports the WebSocket protocol.
You send requests through the WebSocket connection: These requests are usually in the form of JSON-formatted command messages. Each different command you send corresponds to a different type of request you're making to the rippled server. For example, the wallet_propose command generates a new key pair and XRP Ledger address.
You receive responses from the server: After you send a command, the server processes your request and sends back a response. This response includes any data you requested, along with information about whether the request was successful or why it failed. For instance, in response to a wallet_propose command, you'd receive information about the newly generated address.
You can subscribe to updates from the server: Some commands, like subscribe, set up ongoing communication from the server to your client. For example, you could subscribe to all transactions affecting a particular account, and the server would send your client a message every time a new transaction affecting that account is validated.
To close the connection, either the client or the server can send a close frame and terminate the TCP connection.
Please note, to interact with a rippled server via WebSocket, you need the server's WebSocket URL, which typically looks like "wss://s1.ripple.com:443/". Always be sure to use a secure WebSocket connection (wss://) when dealing with real account information or transactions.

