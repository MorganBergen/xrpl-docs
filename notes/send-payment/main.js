/*
 * send payment on the test network
 * 1.  get credentials
 * 2.  connect to a testnet server
 * 3.  prepare the transaction
 * 4.  sign the transaction instructions
 * 5.  submit the signed blob
 * 6.  wait for validation
 * 7.  check transaction status
 */

const xrpl = require("xrpl") 

/*
 * in order to make queries and submit transactions you need to connect to the xrol 
 * in order to do this with xrpl.js you create an instance of the client class 
 * and use the connect() method
 * the network functions will be using async/await pattern to wait for the actual result of the promise
 *
 * promises are the foundation of asynchronous programming in javascript
 * a promise is an object return by an asynchronous function 
 * which represents the current state of the operation
 * at the time the promise is returned to the caller
 * the operation often isnt finished but the promise object provides methods to handle the 
 * eventual success or failure of the operation
 *
 */
async function main() {
    
    // creating an instance of the client class using the testnet server
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233") 

    // connecting to the testnet server
    await client.connect()

    // this create a wallet and funds it with the testnet faucet
    const morgan = await client.fundWallet()

    // print wallet object 
    console.log(morgan.wallet)

    // console.log(`wallet address: ${morgan.wallet.address}`)
    // this is the balance of the wallet
    // console.log(`balance: ${morgan.balance}`)

    // this queries the xrpl using the request method to access the xrpl ledgers websocket api
    const response = await client.request({

        "command": "account_info",
        "account": morgan.wallet.address,
        "leger_index": "validated"

    })

    console.log(response)

    /*
     * you can set up handlers for various types of events in xrpl such as the xrpl ledger's consensus process
     * which produces a new ledger version
     *
     */
    client.request({
        "command": "subscribe",
        "streams": ["ledger"]
    })

    client.on("ledgerClosed", async (ledger) => {
        console.log(`ledger #${ledger.ledger_index} validated with ${ledger.txn_count} transactions!`)
    })


    // disconnect
    client.disconnect()

    return (0); 
}

main()
















