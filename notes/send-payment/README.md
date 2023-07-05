# send XRP

1.  connect to the ledger
2.  get credentials
3.  prepare transactions

###  `Client.autofill()` in js or `xrpl.Payment` in ts

typically we create xrp ledger transactions as objects in the JSON transaction format.  the following shows a minimal payment specification.

```
{
"TransactionType": "Payment",
"Account": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
"Amount": "1000",
"Destination": "rUCzEr6jrEyMpjhs4wSdQdz4g8Y382NxfM"
}
```

the wallet object that's returned conatins all the necessary details for a new acount on the xrpl 
the `classicAddress` field conatins the address of your new account `rQd3VD6dBMzs6HuQ5FaRxGUMs6mqqAtgc`

**wallet** is just a keypair - a public key `publicKey` and a private key `privateKey`
it can sign transactions, but until it's funded, it doesnt have an account on the ledger

**account** when you fund a wallet by sending at least 20xrp to its address (which is the account reserve)
that wallet's address becomes an account on the ledger

you use the private key to sign transactions from this account and the public key is used by others to verify those transactions
keep your private key safe; it it's compromised, someone else can sign transactions on your behalf

the seed is another representation of the private key which you can use to regenerate the keypair if needed
like the private key, the seed must also be kept secret
WebSocket is a protocol that provides full-duplex communication channels over a single TCP connection. This protocol enables interaction between a web browser (or other client applications) and a server with lower overheads, facilitating real-time data transfer from and to the server.
In the context of rippled, the reference server software that powers the XRP Ledger (XRPL), WebSocket is one of the ways that clients can connect to a rippled server to submit transactions, request information, or subscribe to updates.


###  websockets

When you interact with a rippled server via WebSocket:

You establish a WebSocket connection: This is typically done using a WebSocket client, which could be a library in a programming language like JavaScript, Python, or Java, or even directly in a web browser that supports the WebSocket protocol.

You send requests through the WebSocket connection: These requests are usually in the form of JSON-formatted command messages. 
Each different command you send corresponds to a different type of request you're making to the rippled server. 
For example, the wallet_propose command generates a new key pair and XRP Ledger address.

You receive responses from the server: After you send a command, the server processes your request and sends back a response. This response includes any data you requested, along with information about whether the request was successful or why it failed. For instance, in response to a wallet_propose command, you'd receive information about the newly generated address.

You can subscribe to updates from the server: Some commands, like subscribe, set up ongoing communication from the server to your client. For example, you could subscribe to all transactions affecting a particular account, and the server would send your client a message every time a new transaction affecting that account is validated.

To close the connection, either the client or the server can send a close frame and terminate the TCP connection.
Please note, to interact with a rippled server via WebSocket, you need the server's WebSocket URL, which typically looks like "wss://s1.ripple.com:443/". Always be sure to use a secure WebSocket connection (wss://) when dealing with real account information or transactions.

Trust lines in the XRP Ledger represent an issuer's obligation to redeem an IOU for an account. In simpler terms, they define the limits at which one account trusts another to owe it money. Trust lines can only be established if the account on the receiving end of the trust line explicitly agrees to it, which is a key feature of the XRP Ledger's trust system.








