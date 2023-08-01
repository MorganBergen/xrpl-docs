"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var xrpl_1 = require("xrpl");
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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var p_client, wallet, p_limit, p_currency, p_issuer, p_flags;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    p_client = new xrpl_1.Client('wss://s.altnet.rippletest.net:51233/');
                    return [4 /*yield*/, create_account()];
                case 1:
                    wallet = (_a.sent()).wallet;
                    p_limit = '100';
                    p_currency = 'PSC';
                    return [4 /*yield*/, account_info()];
                case 2:
                    p_issuer = _a.sent();
                    p_flags = xrpl_1.TrustSetFlags.tfSetfAuth | xrpl_1.TrustSetFlags.tfSetFreeze;
                    return [4 /*yield*/, set_require_auth(p_client, wallet)];
                case 3:
                    _a.sent();
                    create_trustline(p_client, wallet, p_limit, p_currency, 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59', p_flags);
                    return [2 /*return*/, (0)];
            }
        });
    });
}
/**
 * @function                    create_account
 * @summary                     Connects to the XRP TestNet, creates a new wallet and funds it. Prints out wallet info and account info to the console.
 * @returns {Promise<Wallet>}   The wallet that has been created and funded.
 *
 * @description                 The function creates a new client connected to the XRP TestNet, creates a new wallet, funds it and disconnects the client.
 *                              It then retrieves the account info related to the wallet and prints it.
 *                              It finally returns the wallet object.
 */
function create_account() {
    return __awaiter(this, void 0, void 0, function () {
        var client, wallet, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new xrpl_1.Client('wss://s.altnet.rippletest.net:51233/');
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.fundWallet()];
                case 2:
                    wallet = _a.sent();
                    console.log("---------------------------------------New Account Wallet Info---------------------------------------");
                    console.log(wallet);
                    console.log("\n\n");
                    return [4 /*yield*/, client.request({
                            "id": 2,
                            "command": "account_info",
                            "account": wallet.wallet.classicAddress,
                            "strict": true,
                            "ledger_index": "validated",
                            "api_version": 1
                        })];
                case 3:
                    message = _a.sent();
                    console.log("---------------------------------------Account ".concat(wallet.wallet.classicAddress, " Info Response ---------------------------------------"));
                    console.log(message);
                    client.disconnect();
                    return [2 /*return*/, (wallet)];
            }
        });
    });
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
function set_require_auth(client, wallet) {
    return __awaiter(this, void 0, void 0, function () {
        var account_set, tx_prepared, tx_signed, tx_result, tx_hash, tx_request, tx_response, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    account_set = {
                        TransactionType: "AccountSet",
                        Account: wallet.classicAddress,
                        SetFlag: xrpl_1.AccountSetAsfFlags.asfRequireAuth,
                        //SetFlag: AccountSetAsfFlags.asfDisallowIncomingTrustline,
                        ClearFlag: 0
                    };
                    console.log(typeof xrpl_1.AccountSetAsfFlags.asfDisallowIncomingTrustline);
                    return [4 /*yield*/, client.autofill(account_set)];
                case 2:
                    tx_prepared = _a.sent();
                    tx_signed = wallet.sign(tx_prepared);
                    return [4 /*yield*/, client.submit(tx_signed.tx_blob)];
                case 3:
                    tx_result = _a.sent();
                    if (tx_result.result.engine_result !== 'tesSUCCESS') {
                        console.log("---------------------------------------Account Set Failed Response---------------------------------------");
                        console.log("Transaction failed with result: ".concat(tx_result.result.engine_result));
                        console.log("Error message: ".concat(tx_result.result.engine_result_message));
                        console.log("Transaction failed with result: ".concat(tx_result.result.engine_result));
                        console.log("\n\n");
                        return [2 /*return*/, (1)];
                    }
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 4000); })];
                case 5:
                    _a.sent();
                    tx_hash = tx_result.result.tx_json.hash;
                    tx_request = {
                        command: "tx",
                        transaction: tx_hash
                    };
                    return [4 /*yield*/, client.request(tx_request)];
                case 6:
                    tx_response = _a.sent();
                    console.log("---------------------------------------Account Set Response---------------------------------------");
                    console.log(tx_response);
                    console.log("\n\n");
                    console.log("---------------------------------------Updated Account ".concat(wallet.classicAddress, " Info Response ---------------------------------------"));
                    return [4 /*yield*/, client.request({
                            "id": 2,
                            "command": "account_info",
                            "account": wallet.classicAddress,
                            "strict": true,
                            "ledger_index": "validated",
                            "api_version": 1
                        })];
                case 7:
                    message = _a.sent();
                    console.log(message);
                    client.disconnect();
                    return [2 /*return*/];
            }
        });
    });
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
function create_trustline(client, wallet, limit, currency, issuer, flags) {
    return __awaiter(this, void 0, void 0, function () {
        var new_client, tx_trustset, tx_prepared, tx_signed, tx_result, tx_hash, tx_request, tx_response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    new_client = new xrpl_1.Client('wss://s.altnet.rippletest.net:51233/');
                    client = new_client;
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    tx_trustset = {
                        TransactionType: 'TrustSet',
                        Account: wallet.classicAddress,
                        LimitAmount: {
                            currency: currency,
                            issuer: issuer,
                            value: limit,
                        },
                        Flags: flags,
                    };
                    return [4 /*yield*/, client.autofill(tx_trustset)];
                case 2:
                    tx_prepared = _a.sent();
                    tx_signed = wallet.sign(tx_prepared);
                    return [4 /*yield*/, client.submit(tx_signed.tx_blob)];
                case 3:
                    tx_result = _a.sent();
                    if (tx_result.result.engine_result !== 'tesSUCCESS') {
                        console.log("---------------------------------------Trustline Set Response---------------------------------------");
                        console.log("Transaction failed with result: ".concat(tx_result.result.engine_result));
                        console.log("\n\n");
                        client.disconnect();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 4000); })];
                case 4:
                    _a.sent();
                    tx_hash = tx_result.result.tx_json.hash;
                    tx_request = {
                        command: "tx",
                        transaction: tx_hash
                    };
                    return [4 /*yield*/, client.request(tx_request)];
                case 5:
                    tx_response = _a.sent();
                    console.log("---------------------------------------Trustline Set Response---------------------------------------");
                    console.log(tx_response);
                    console.log("\n\n");
                    client.disconnect();
                    return [2 /*return*/];
            }
        });
    });
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
function account_info() {
    return __awaiter(this, void 0, void 0, function () {
        var client, message, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new xrpl_1.Client('wss://s.altnet.rippletest.net:51233/');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client.request({
                            "id": 2,
                            "command": "account_info",
                            "account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
                            "strict": true,
                            "ledger_index": "validated",
                            "api_version": 1
                        })];
                case 3:
                    message = _a.sent();
                    console.log("---------------------------------------Issuer Account r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59 Info Response---------------------------------------");
                    console.log(message);
                    return [2 /*return*/, (message.result.account_data.Account.toString())];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 6];
                case 5:
                    client.disconnect();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
main();
/**
 * TESTING GROUND
 */
function issuer_set() {
    return __awaiter(this, void 0, void 0, function () {
        var p_client, wallet, issuer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    p_client = new xrpl_1.Client('wss://s.altnet.rippletest.net:51233/');
                    return [4 /*yield*/, create_account()];
                case 1:
                    wallet = (_a.sent()).wallet;
                    issuer = wallet;
                    return [4 /*yield*/, set_require_auth(p_client, issuer)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, (wallet)];
            }
        });
    });
}
function requester_set() {
    return __awaiter(this, void 0, void 0, function () {
        var p_client, wallet, requester;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    p_client = new xrpl_1.Client('wss://s.altnet.rippletest.net:51233/');
                    return [4 /*yield*/, create_account()];
                case 1:
                    wallet = (_a.sent()).wallet;
                    requester = wallet;
                    return [4 /*yield*/, set_require_auth(p_client, requester)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, (wallet)];
            }
        });
    });
}
