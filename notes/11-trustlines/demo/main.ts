/**
 * @author                      Morgan Bergen <mbergen@ripple.com>
 * @file                        main.ts
 * @overview
 * @tutorial                    main.ts in the terminal call tsc main.ts, then call node main.js, and the console output will be returned
 * @overview                    This module implement account creation on the testnet using websockets
 *
 * @todo                        Implement a function analagous to set_require_auth to freeze the newly created account 
 * @function                    create_account 
 * @function                    set_require_auth 
 * @function                    create_trustline
 * @function                    account_info
 *
 *
 */

import { Client, Wallet, TrustSet, AccountSet, TrustSetFlags, AccountSetAsfFlags } from "xrpl"

async function main() {

    const p_client = new Client ('wss://s.altnet.rippletest.net:51233/');
    const { wallet } = await create_account();

    const p_limit = '100';
    const p_currency = 'XXX';
    const p_flags = TrustSetFlags.tfSetfAuth | TrustSetFlags.tfSetFreeze;

    await set_require_auth(p_client, wallet);

    create_trustline(p_client, wallet, p_limit, p_currency, '', p_flags);

    return(0);
}

async function create_account() {
   
    // const FAUCET_URL = 'wss://s.altnet.rippletest.net:51233/';
    const client = new Client ('wss://s.altnet.rippletest.net:51233/', {
        
    });
    await client.connect();
    const wallet = await client.fundWallet();

    console.log(`---------------------------------------New Account Wallet Info---------------------------------------`);
    console.log(wallet);
    console.log(`\n\n`);
    
    const message = await client.request({
        "id": 2,
        "command": "account_info",
        "account": wallet.wallet.classicAddress,
        "strict": true,
        "ledger_index": "validated",
        "api_version": 1
    })
    
    console.log(`---------------------------------------Account ${wallet.wallet.classicAddress} Info Response ---------------------------------------`);
    console.log(message);

    client.disconnect();
    return (wallet);
}


async function set_require_auth(client: Client, wallet: Wallet) {
    
    await client.connect();
    
    const account_set: AccountSet = {
        TransactionType: "AccountSet",
        Account: wallet.classicAddress,
        SetFlag: AccountSetAsfFlags.asfRequireAuth,
        //SetFlag: AccountSetAsfFlags.asfDisallowIncomingTrustline,
        ClearFlag: 0 
    };

    console.log(typeof AccountSetAsfFlags.asfDisallowIncomingTrustline);

    const tx_prepared = await client.autofill(account_set);

    const tx_signed = wallet.sign(tx_prepared);

    const tx_result = await client.submit(tx_signed.tx_blob);

    if (tx_result.result.engine_result !== 'tesSUCCESS') {

        console.log(`---------------------------------------Account Set Failed Response---------------------------------------`);
        console.log(`Transaction failed with result: ${tx_result.result.engine_result}`);
        console.log(`Error message: ${tx_result.result.engine_result_message}`);
        console.log(`Transaction failed with result: ${tx_result.result.engine_result}`);
        console.log(`\n\n`);

        return(1);
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    await new Promise(resolve => setTimeout(resolve, 4000));

    const tx_hash = tx_result.result.tx_json.hash;

    const tx_request = {
        command: "tx",
        transaction: tx_hash
    }

    const tx_response = await client.request(tx_request);

    console.log(`---------------------------------------Account Set Response---------------------------------------`);
    console.log(tx_response);
    console.log(`\n\n`);

    console.log(`---------------------------------------Updated Account ${wallet.classicAddress} Info Response ---------------------------------------`);
    
    const message = await client.request({
        "id": 2,
        "command": "account_info",
        "account": wallet.classicAddress,
        "strict": true,
        "ledger_index": "validated",
        "api_version": 1
    })
    
    console.log(message);

    client.disconnect();

}

async function create_trustline(client: Client, wallet: Wallet, limit: string, currency: string, issuer: string, flags: number) {

    const new_client = new Client ('wss://s.altnet.rippletest.net:51233/');
    
    client = new_client;
    
    await client.connect();

    const tx_trustset: TrustSet = {
        TransactionType: 'TrustSet',
        Account: wallet.classicAddress,
        LimitAmount: {
            currency: currency,
            issuer: issuer,
            value: limit,
        },
        Flags: flags,
    }
    
    const tx_prepared = await client.autofill(tx_trustset);

    const tx_signed = wallet.sign(tx_prepared);

    const tx_result = await client.submit(tx_signed.tx_blob);
   
    if (tx_result.result.engine_result !== 'tesSUCCESS') {
        
        console.log(`---------------------------------------Trustline Set Response---------------------------------------`);
        console.log(`Transaction failed with result: ${tx_result.result.engine_result}`);
        console.log(`\n\n`);
        client.disconnect();    
        return;
    }

    await new Promise(resolve => setTimeout(resolve, 4000));

    const tx_hash = tx_result.result.tx_json.hash;
    
    const tx_request = {
        command: "tx",
        transaction: tx_hash
    }

    const tx_response = await client.request(tx_request);

    console.log(`---------------------------------------Trustline Set Response---------------------------------------`);
    console.log(tx_response);
    console.log(`\n\n`);
    client.disconnect();

}

/**
 * @function                    account_info
 * @summary                     An asynchronous method that retrieves the account information of the issuer account.
 * @returns {Promise<string>}   A promise that resolves with the account's address as a string.
 * 
 * @description                 This function connects to the testnet, sends a request to retrieve the account information of a 
 *                              issuer account (r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59), and logs the response to the console. 
 *                              Finally disconnects the client and returns the account's address as a string. 
 *                              If there is an error during this process, the error is catched and console logged.
 */
async function account_info() {

    const client = new Client ('wss://s.altnet.rippletest.net:51233/');
    try {
        await client.connect();

        const message = await client.request({
            "id": 2,
            "command": "account_info",
            "account": "",
            "strict": true,
            "ledger_index": "validated",
            "api_version": 1
        })

        console.log(`---------------------------------------Issuer Account r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59 Info Response---------------------------------------`);
        console.log(message);

        return(message.result.account_data.Account.toString());

    } catch (error) {
        
        console.log(error);

    } finally {

        client.disconnect();

    }
}


main();

async function issuer_set() {
    const p_client = new Client ('wss://s.altnet.rippletest.net:51233/');
    const { wallet } = await create_account();
    const issuer = wallet;
    await set_require_auth(p_client, issuer);
    return (wallet);
}

async function requester_set() {
    const p_client = new Client ('wss://s.altnet.rippletest.net:51233/');
    const { wallet } = await create_account();
    const requester = wallet;
    await set_require_auth(p_client, requester);
    return (wallet);
}

