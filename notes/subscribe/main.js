/*
 * @author  morgan bergen
 * @date    thu jun 29
 * @name    main.js
 * @brief   listen for events with the subscribe method
 */

const xrpl = require('xrpl')
async function main() {
    const client = new xrpl.client("wss://s.altnet.rippletest.net:51233")

    await client.connect()
    
    /*  you can set up handlers for various types of events in xrpl such as whenever the xrp ledger's consensus process
     *  produces a new ledger version.  in order to do that first call the subscribe method to get the type of events
     *  you want, then attach an event handler using the on(eventType, callback) method of the client
     */

    client.request({
        "command": "subscribe",
        "streams": ["ledger"]
    })

    client.on("ledgerClosed", async (ledger) => {
        console.log(`Ledger #${ledger.ledger_index} validated with ${ledger.txn_count} transactions`)
    })

    client.disconnect()
}
