/*
 * @file	reproduce_main.ts
 * @author	morgan bergen
 * @summary	server info to query ledger
 */

import { Client, LedgerEntry } from "xrpl";

async function main() {

		const client = new Client('wss://s1.ripple.com/');

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
