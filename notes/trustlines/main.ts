/**
 * @author                      Morgan Bergen <mbergen@ripple.com>
 * @file                        main.ts
 * @overview
 * @tutorial                    main.ts in the terminal call tsc main.ts, then call node main.js, and the console output will be returned
 * @overview                    This module implement account creation on the testnet using websockets
 *                              Sets the account authorization requirement with SetFlag: AccountSetAsfFlags.asfRequireAuth
 *                              Initializes a trustline to the issuer "account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59"
 *
 * @todo                        Implement a function analagous to set_require_auth to freeze the newly created account 
 * @function                    create_account 
 * @function                    set_require_auth 
 * @function                    create_trustline
 * @function                    account_info
 *
 */

import { Client, Wallet, TrustSet, AccountSet, TrustSetFlags, AccountSetAsfFlags } from "xrpl"

/**
 * @function                    create_account
 * @summary                     Connects to the XRP TestNet, creates a new wallet and funds it. Prints out wallet info and account info to the console.
 * @returns {Promise<Wallet>}   The wallet that has been created and funded.
 *
 * @description                 The function creates a new client connected to the XRP TestNet, creates a new wallet, funds it and disconnects the client. 
 *                              It then retrieves the account info related to the wallet and prints it. 
 *                              It finally returns the wallet object.
 */
async function create_account() {
    
    const client = new Client ('wss://s.altnet.rippletest.net:51233/');
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

/**
 * @function                set_require_auth
 * @summary                 An asynchronous function that sets the requireAuth flag for an XRPL account.
 * @param {Client}          client The Client object to interact with the XRPL.
 * @param {Wallet}          wallet The Wallet object containing the account details.
 * @returns {Promise<void>} A promise that resolves when the requireAuth flag has been set.
 *
 * @description             This function connects to the XRPL, prepares and signs a transaction to set the requireAuth flag for the account, 
 *                          and submits the transaction. 
 *                          If the transaction is not successful, an error message is printed to the console and 1 is returned indicated failure.
 *                          If it is successful, the function waits for a certain period of time before retrieving and printing the transaction details. 
 *                          It then retrieves and prints the updated account information and finally disconnects from the testnet.
 */
async function set_require_auth(client: Client, wallet: Wallet) {
    
    await client.connect();
    
    const account_set: AccountSet = {
        TransactionType: "AccountSet",
        Account: wallet.classicAddress,
        SetFlag: AccountSetAsfFlags.asfRequireAuth,
        ClearFlag: 0 
    };

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

/**
 * @function                create_trustline
 * @summary                 An asynchronous function that creates a trustline in the XRPL.
 * @param {Client}          client The Client object to interact with the XRPL.
 * @param {Wallet}          wallet The Wallet object containing the account details.
 * @param {string}          limit The limit amount for the trustline.
 * @param {string}          currency The currency code for the trustline.
 * @param {string}          issuer The issuer's address for the trustline.
 * @param {number}          flags The flags to set for the trustline.
 * 
 * @returns {Promise<void>} A promise that resolves when the trustline has been created.
 * @flags                   TrustSetFlags.tfSetfAuth | TrustSetFlags.tfSetFreeze;
 * 
 * @description             This method connects to the testnet, prepares and signs a transaction to create a trustline for the account, 
 *                          and submits the transaction. 
 *                          If the transaction is not successful, an error message is printed to the console and the function exits. 
 *                          If it is successful, the function waits for a certain period of time before retrieving and printing the transaction details. 
 *                          It then disconnects the client.
 */
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
            "account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
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

/**
 * @function                    main
 * @summary                     The main asynchronous function that implements the account creation, setting the account authorization requirement, 
 *                              and creation of a trustline to an issuer on the testnet
 * @returns {Promise<number>}   A promise that resolves with 0, indicating a successful execution
 * 
 * @description                 This function initializes a client connection to the XRPL, gets a new wallet, sets account authorization requirement,
 *                              creates a trustline to an issuer, and finally returns 0 to indicate successful execution. 
 *                              If there is an error during this process, the error will be thrown and has yet to be caught and handled by the main calling.
 */
async function main() {

    const p_client = new Client ('wss://s.altnet.rippletest.net:51233/');

    const { wallet } = await create_account();

    const p_limit = '100';
    const p_currency = 'PSC';
    const p_issuer = await account_info();
    const p_flags = TrustSetFlags.tfSetfAuth | TrustSetFlags.tfSetFreeze;

    await set_require_auth(p_client, wallet);
    create_trustline(p_client, wallet, p_limit, p_currency, 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59', p_flags);

    return(0);
}

main();
