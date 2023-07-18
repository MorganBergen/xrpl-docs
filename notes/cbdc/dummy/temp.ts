/**
 * @author          morgan bergen <mbergen@ripple.com>
 * @file            trustline.ts
 * @overview        Makes a request to the XRPL account_lines API for the specified issuer_account.
 *                  The intention is to freeze the unknown trustlines.
 *                  The account_lines method returns information about an account's trust lines, 
 *                  which contain balances in all non-XRP currencies and assets. 
 *                  All information retrieved is relative to a 
 *                  particular version of the ledger.
 *                  if the issuer authorizes the trust line first, 
 *                  this creates a trust line with the limit set to 0, 
 *                  and the customer's TrustSet transaction sets the limit on 
 *                  the pre-authorized trust line.
 */

import { Client } from "xrpl";

/**
 * @function        trustline_info
 * @description     displays an alert message if any trustlines are not authorized to the pilot
 * @param           {string} p_account - the account to check for unauthorized trustlines
 * @param           {string} p_url - the url of the rippled server to connect to
 * @returns         {string} - the account of the unauthorized trustline
 */
async function account_line_info(p_account: string, p_url: string) {

    interface account_info {
        id: string;
        status: string;
        type: string;
        result: {
            account_data: {
                Account: string;
                Balance: string;
                Flags: number;
                LedgerEntryType: string;
                OwnerCount: number;
                PreviousTxnID: string;
                PreviousTxnLgrSeq: number;
                Sequence: number;
                index: string;
            },
            ledger_current_index: number;
            queue_data: {
                auth_change_queued: boolean;
                highest_sequence: number;
                lowest_sequence: number;
                max_spend_drops_total: string;
                transactions: {
                    auth_change: boolean;
                    fee: string;
                    fee_level: string;
                    max_spend_drops: string;
                    seq: number;
                }
                txn_count: number;
            },
            validated: boolean;
        }
    }

    interface trustline {
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

    interface account_line { 
        id: string;
        status: string;
        type: string;
        marker: {
            ledger: number;
            seq: number;
        }
        result: {
            account: string;
            lines: trustline[];
        }
    }

    const account_line_request = {
        id: 1,
        command: "account_lines",
        account: p_account,
    };

    const issuer_account_info_request = {
        id: 2,
        command: "account_info",
        account: p_account,
        strict: true,
        ledger_index: "current",
        queue: true
    }

    const client = new Client(p_url);

    try {
        await client.connect();

        const account_info_response = await client.request(issuer_account_info_request) as account_info;
        const account_line_response = await client.request(account_line_request) as account_line;

        const issuer_account_response = await client.request(account_line_request) 
        const trustlines: trustline[] = account_line_response.result.lines as trustline[];

        console.log(`---------------------TRUSTLINE RESPONSE--------------------------------------------`);
        console.log(issuer_account_response);

        console.log(`---------------------ISSUER ACCOUNT RESPONSE--------------------------------------------`);
        console.log(issuer_account_response);

        console.log(`---------------------ACCOUNT LINE RESPONSE--------------------------------------------`);
        console.log(account_line_response);

        console.log(`---------------------ACCOUNT LINE RESPONSE RESULTS--------------------------------------------`);
        console.log(account_line_response.result);

        console.log(`---------------------ACCOUNT INFO RESPONSE--------------------------------------------`);
        console.log(account_info_response);

        console.log(`----------------------TRUSTLINES RESPONSE---------------------------------------------`);
        console.log(trustlines);

        var allowed_accounts = [];
        for (const line of account_line_response.result.lines) {
            allowed_accounts.push(line.account);
        }

        const allowed_currency = "PSC";
        let authorized_trustlines: string[] = [];
        allowed_accounts.forEach(allowed_account => {
            authorized_trustlines.push(`${allowed_currency}.${allowed_account}`);
        });

        for (const line of account_line_response.result.lines) {
            const trustline_key = `${line.currency}.${line.account}`;
            if (!authorized_trustlines.includes(trustline_key)) {
                console.log(`ALERT:  Unknown Trustline ${trustline_key} for Account ${line.account}, Balance ${line.balance}`);
            } else {
                console.log(`Authorized Trustline ${trustline_key} for Account ${line.account}, Balance ${line.balance}`);
            }
        }

        client.disconnect();

    } catch (error) {
        console.error(`Error in account_lines request: ${error}`);
    }
}

/**
 * @function        trustline_info @description     check if any of the trustlines are not allowed
 *                  meaning it doesnt belong to an allowed_trustlines list
 *                  for example that list could be something like ["EUR.issuer1"]
 *                  if trustline is not in the allowed_trust_lines array trigger alert
 * @param           {string} p_account - the account to check for unauthorized trustlines
 * @param           {string} p_url - the url of the rippled server to connect to
 * @returns         {string} - the account of the unauthorized trustline
 */

function main() {
    const account = "rngdKd8BAM3etQcb12DvGxd5Ps9MocAvPa";
    const url = 'wss://s1.cbdc-sandbox.rippletest.net:51233';

    account_line_info(account, url);
}

main();
