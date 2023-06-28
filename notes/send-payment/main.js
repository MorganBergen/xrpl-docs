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
    const fund_result = await client.fundWallet()
    console.log(fund_result.wallet)
    console.log(fund_result.balance)

    // if you only want to generate keys you can create a new wallet instance 
    const keypairs = xrpl.Wallet.generate()

    console.log(keypairs)

    // disconnect
    client.disconnect()
    
}

main()





















