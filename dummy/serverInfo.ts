/**
 * @author      morgan bergen <mbergen@ripple.com>
 * @file        serverInfo.ts
 * @overview 
 *
 * This script makes a request to the XRPL account_lines API for the specified issuer_account.
 * It receives a response containing information about trustlines for the account.
 * If any trustlines are not known to the pilot, an alert message is displayed, including the PSC balance.
 * The intention is to freeze the unknown trustlines.
 *
 */

import { Client } from "xrpl";
import * as fs from 'fs';
import * as WebSocket from 'ws';

const sendRequest = () => {
    const url = 'wss://s1.cbdc-sandbox.rippletest.net:51233';
    const payload = JSON.stringify({
        command: 'account_lines',
        account: "rngdKd8BAM3etQcb12DvGxd5Ps9MocAvPa"
    });

    const socket = new WebSocket(url);
    socket.on('open', () => {
        socket.send(payload);
    });

    socket.on('open', () => {
        socket.send(payload);
    });

    socket.on('message', (data) => {
        fs.writeFileSync('./response.json', data);
        console.log('response written to response.json');
        serverInfo();
        socket.close();
    });

    socket.on('error', (error) => {
        console.error(error);
    })
};

sendRequest();

const blob = (path: string): any => {
    const content = fs.readFileSync(path, 'utf-8');
    const data = JSON.parse(content);
    return (data);
};

export const serverInfo = async () => {
    const client = new Client("wss://s1.cbdc-sandbox.rippletest.net:51233");
    await client.connect();
    const path = ('./response.json')
    const response = blob(path);

    for (const line of response.result.lines) {
        const { account, balance, no_ripple, no_ripple_peer } = line;
        if (no_ripple || no_ripple_peer) {
            console.log(`\x1b[41mALERT\x1b[0m Unknown Trustline Account: "${account}" Balance: ${balance}`);
        }
    }
    client.disconnect();
};
