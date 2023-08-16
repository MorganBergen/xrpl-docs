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
    const morgan_wallet = await client.fundWallet()
    
    console.log(morgan_wallet) 

    // this queries the xrpl using the request method to access the xrpl ledgers websocket api
    const response = await client.request({
        "command": "account_info",
        "account": morgan_wallet.wallet.address,
        "leger_index": "validated"
    })

    // console.log(response)


    // this creates an unsigned transaction
    const unsigned_transaction = await client.prepareTransaction({
        "TransactionType": "Payment",
        "Account": morgan_wallet.wallet.address,
        "Amount": xrpl.xrpToDrops("20"),
        "Destination": ""
    })


    // this signs the transaction
    const signed = morgan_wallet.wallet.sign(unsigned_transaction)
    const tx = await client.submitAndWait(signed.tx_blob)


    /*
     * check the transaction results
     */

    console.log(tx.result.meta.TransactionResult)
    console.log(tx)


    // disconnect
    client.disconnect()

    return (0); 
}

main()

