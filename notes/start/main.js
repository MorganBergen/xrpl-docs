/*
 * @author:     morgan bergen
 * @date:       june 29
 * @name:       main.js
 * @brief:      
 */

const xrpl = require('xrpl')

async function main() {

    //define the network client and instantiate a new object of type Client
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")

    // connect to the network, the awiat keyword is used to pause you rasync function execution
    // and wait for the promie to resolve or reject it
    // a promise is an object that may produce a single value some time in the future
    // in this case the client request() function returns a promisewhen the promise resolves
    // it returns response data from the server, and when it's rejected it throws an error
    await client.connect()

    // initialize my_wallet to the result of the fundWallet() method, which returns a Promise
    const fund_result = await client.fundWallet()
    const morgan_wallet = fund_result.wallet
   
    console.log(`wallet\n--------------------------------------------------------`)
    console.log(`public key: ${morgan_wallet.publicKey}`) 
    console.log(`private key: ${morgan_wallet.privateKey}`)
    console.log(`classic address: ${morgan_wallet.classicAddress}`)
    console.log(`seed: ${morgan_wallet.seed}`)

    /*  client.request() is a function call to the request method of your client object
     *  this function is built into the xrpl library and is used to:w
     *  make requests to the xrp ledger
     *  the method takes an object as an argument which defines the details of the request
     *  such as the command you want to execute and any required parameters
     *
     *  const response = ... assigns the response data from the primise to the reponse variable
     *  the argument for the request method is a single javascript object
     *  the properties of the object define the details of the request to be sent to the xrp ledger
     *
     */

    // Get info from the ledger about the address we just funded
    const response = await client.request({
        "command": "account_info",
        "account": morgan_wallet.address,
        "ledger_index": "validated"
    })

    

    client.disconnect()
}

main()
