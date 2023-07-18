/**
 * @author      Morgan Bergen <mbergen@ripple.com>
 * @file        trustline.ts
 * @overview    This script sends a request to the XRPL account_lines API for a specified account.
 *              The account_lines API method returns information about an account's trust lines. 
 *              A trust line represents a balance between two accounts, usually in a non-XRP currency or asset. 
 *              This script analyzes the trust lines extended to the specified account.
 *              The script constructs a list of "authorized" trust lines, defined here as trust lines with the currency "PSC". 
 *              The script then iterates through all trust lines extended to the account, and for each trust line:
 *              If the trust line's currency and account combination is in the authorized list, 
 *              a log is printed indicating the trust line is authorized. 
 *              If the trust lie's currency and account combination is not in the authorized list, 
 *              a warning log is printed, indicating the trust line is unknown. 
 *              This could be used to identify and freeze unknown trust lines, although the freezing functionality is not included in this script.
 */

import { Client } from "xrpl";


async function trustline_alert_hard() {
    
    const authorized_trustlines = [
        "PSC.rngdKd8BAM3etQcb12DvGxd5Ps9MocAvPa"
    ];  

    
    interface trustline_inter {
        account: string;
        balance: string;
        currency: string;
        limit: string;
        limit_peer: string;
        quality_in: number;
        quality_out: number;
        no_ripple: boolean;
        no_ripple_peer: boolean;
        authorized: boolean;
        peer_authorized: boolean;
        freeze: boolean;
        freeze_peer: boolean;
        peer: string;
    }

    interface lines_interf {
        id: string;
        status: string;
        type: string;
        //marker: {
            //ledger: number;
            //seq: number;
        //}
        result: {
            account: string;
            lines: trustline_inter[];
        }
    }

    const client = new Client("wss://s1.cbdc-sandbox.rippletest.net:51233");

    try {
        await client.connect();  
        const issuer_lines_res = await client.request({
            id: 1,
            command: "account_lines",
            account: "rngdKd8BAM3etQcb12DvGxd5Ps9MocAvPa",
            //marker?: unknown
        });
        console.log(issuer_lines_res);
        
        var customer_addresses_list = [];
        
        const balances_accounts: { balance: string, account: string }[] = [];

        for (const lines of issuer_lines_res.result.lines) {
            const { balance, account } = lines;
            balances_accounts.push( { balance, account });
        }

        console.log(balances_accounts);

        for (const address of customer_addresses_list) {
            var customer_lines_res: lines_interf = await client.request({
                id: 1,
                command: "account_lines",
                account: address,
            })

            console.log(customer_lines_res.result.lines);
        }

        client.disconnect();

    } catch (error) {
        console.log(error);
    }

    return(0);
}



/*
 *     const authorized_trustlines = [
        "PSC.rngdKd8BAM3etQcb12DvGxd5Ps9MocAvPa"
    ];  
*/














/*
 * const authorized_trustlines = [
    "PSC.rwekfW4MiS5yZjXASRBDzzPPWYKuHvKP7E"
];

const accounts = [
    "rnebweDSjd1U9K1PGWvE9wSaaFdiQttb7f",
    "rNKMqgo2yK4oXbAMDozXSNBwQGtwB1xjX9",
    "r37gZtp3awv3vJTuCC3RYN6v9VAj9QoB2n",
    "rpLztFaud5Kbm7BkC77NSeUEqHr2n68977"
]

for (each account in accounts) {
    xrpl: get trustlines for account
        for each line
            if belongs to authorized_trustlines
                GOOD
            else
                ALERT
}
*/

/**
 * @description we declare the trustline interface that describes the structure of the trustline object
 *
 * @account_lines_response.result.lines is the parent object utilizing the Trustline 
 * typescript assertion to treat the account_lines_response.result.lines 
 *
 */

interface Trustlines {
    account: string;
    balance: string;
    currency: string;
    limit: string;
    limit_peer: string;
    quality_in: number;
    quality_out: number;
    no_ripple: boolean;
    no_ripple_peer: boolean;
    authorized: boolean;
    peer_authorized: boolean;
    freeze: boolean;
    freeze_peer: boolean;
    peer: string;
}

interface account_lines_response {
    id: string;
    status: string;
    type: string;
    result: {
        account: string;
        lines: Trustlines[];
    }
}

async function trustline_alert(p_account: string, p_url: string) {

    const account_lines_request = {
        id: 1,
        command: "account_lines",
        account: p_account,
    };

    const client = new Client(p_url);

    try {
        await client.connect();
        const account_lines_response: account_lines_response = await client.request(account_lines_request);
        const trustlines = account_lines_response.result.lines as Trustlines[];

        //console.log(`------------------------ACCOUNT LINES RESPONSE-------------------------------`);
        //console.log(account_lines_response);
        //console.log(`Issuer: ${account_lines_response.result.account}`);
        //console.log(trustlines);

        const allowed_currency = "PSC";
        const allowed_accounts = trustlines.map(line => line.account);

        const authorized_trustlines: string[] = allowed_accounts.map(account => `${allowed_currency}.${account}`);

        for (const line of trustlines) {
            const trustline_key = `${line.currency}.${line.account}`;
            if (!authorized_trustlines.includes(trustline_key)) {
                //console.log(`ALERT:  Unknown Trustline Customer Account: ${line.account}, Balance ${line.balance}`);
            } else {
                //console.log(`Authorized Trustline ${trustline_key} Customer Account ${line.account}, Balance ${line.balance}`);
            }
        }

        client.disconnect();

    } catch (error) {
        console.error(`Error in account_lines request: ${error}`);
    }
}

function main() {
    const account = "rngdKd8BAM3etQcb12DvGxd5Ps9MocAvPa";
    const url = 'wss://s1.cbdc-sandbox.rippletest.net:51233';

    trustline_alert(account, url);

    trustline_alert_hard();

    return(0);

}

main();
