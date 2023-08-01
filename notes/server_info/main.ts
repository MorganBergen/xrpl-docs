/**
 * @file        main.ts
 * @author      Morgan Bergen
 * @summary     Server info to check build_version
 *              Amendment ID check 47C3002ABA31628447E8E9A8B315FAA935CE30183F9A9B86845E469CA2CDC3DF
 */

import { Client, LedgerEntry } from "xrpl";

async function main() {

    const client = new Client ('wss://s1.ripple.com/');
    await client.connect();
    
    const message = await client.request({
        "id": 1,
        "command": "server_info",
        "ledger_index": "current",
    });

    console.log(message);


    client.disconnect();
    return(0);
}

main();
