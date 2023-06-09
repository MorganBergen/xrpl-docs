/*
 * get started
 */


const xrpl = require('xrpl')

async function main() {
    // const api = new xrpl.Client('wss://s.altnet.rippletest.net/')
    const api = new xrpl.Client('wss://xrplcluster.com/') 
    await api.connect();

    let response = await api.request({
        "command" : "ledger",
        "ledger_index" : "validated",
        "transactions" : true || false
    });
    console.log(response);
}

main();
