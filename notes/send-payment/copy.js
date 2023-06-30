/** 
 * @author     morgan bergen
 * @date        june 30 2023
 * @file        copy.js
 * @brief       sending a payment on the test network
 */

const xrpl = require("xrpl") 

async function main() {
    
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233") 

    await client.connect()

    const morgan = await client.fundWallet()
    
    console.log(morgan)

    client.request({
        "TransactionType": "Payment",
        "Account": "rKXm5BZXz24brmPSkNBxuYjdKMTkFkLHUf",
        "Amount": "2000000",
        "Destination": "rUCzEr6jrEyMpjhs4wSdQdz4g8Y382NxfM"
    })

    client.disconnect()
}

main()
