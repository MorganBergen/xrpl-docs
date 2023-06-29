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

async function main() {
    
    // creating an instance of the client class using the testnet server
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233") 

    // connecting to the testnet server
    await client.connect()

    // this create a wallet and funds it with the testnet faucet
    const morgan = await client.fundWallet()
    
    console.log(morgan)

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
        console.log(`ledger #${ledger.ledger_index} 
            validated with ${ledger.txn_count} transactions!`)
    })


    // disconnect
    client.disconnect()

    return (0); 
}

main()







