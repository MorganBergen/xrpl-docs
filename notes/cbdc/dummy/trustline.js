"use strict";
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
function trustline_alert_hard() {
    return __awaiter(this, void 0, void 0, function () {
        var authorized_trustlines, client, issuer_lines_res, customer_addresses_list, balances_accounts, _i, _a, lines, balance, account, _b, customer_addresses_list_1, address, customer_lines_res, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    authorized_trustlines = [
                        "PSC.rngdKd8BAM3etQcb12DvGxd5Ps9MocAvPa"
                    ];
                    client = new xrpl_1.Client("wss://s1.cbdc-sandbox.rippletest.net:51233");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, client.request({
                            id: 1,
                            command: "account_lines",
                            account: "rngdKd8BAM3etQcb12DvGxd5Ps9MocAvPa",
                            //marker?: unknown
                        })];
                case 3:
                    issuer_lines_res = _c.sent();
                    console.log(issuer_lines_res);
                    customer_addresses_list = [];
                    balances_accounts = [];
                    for (_i = 0, _a = issuer_lines_res.result.lines; _i < _a.length; _i++) {
                        lines = _a[_i];
                        balance = lines.balance, account = lines.account;
                        balances_accounts.push({ balance: balance, account: account });
                    }
                    console.log(balances_accounts);
                    _b = 0, customer_addresses_list_1 = customer_addresses_list;
                    _c.label = 4;
                case 4:
                    if (!(_b < customer_addresses_list_1.length)) return [3 /*break*/, 7];
                    address = customer_addresses_list_1[_b];
                    return [4 /*yield*/, client.request({
                            id: 1,
                            command: "account_lines",
                            account: address,
                        })];
                case 5:
                    customer_lines_res = _c.sent();
                    console.log(customer_lines_res.result.lines);
                    _c.label = 6;
                case 6:
                    _b++;
                    return [3 /*break*/, 4];
                case 7:
                    client.disconnect();
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _c.sent();
                    console.log(error_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/, (0)];
            }
        });
    });
}
function trustline_alert(p_account, p_url) {
    return __awaiter(this, void 0, void 0, function () {
        var account_lines_request, client, account_lines_response, trustlines, allowed_currency_1, allowed_accounts, authorized_trustlines, _i, trustlines_1, line, trustline_key, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    account_lines_request = {
                        id: 1,
                        command: "account_lines",
                        account: p_account,
                    };
                    client = new xrpl_1.Client(p_url);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client.request(account_lines_request)];
                case 3:
                    account_lines_response = _a.sent();
                    trustlines = account_lines_response.result.lines;
                    allowed_currency_1 = "PSC";
                    allowed_accounts = trustlines.map(function (line) { return line.account; });
                    authorized_trustlines = allowed_accounts.map(function (account) { return "".concat(allowed_currency_1, ".").concat(account); });
                    for (_i = 0, trustlines_1 = trustlines; _i < trustlines_1.length; _i++) {
                        line = trustlines_1[_i];
                        trustline_key = "".concat(line.currency, ".").concat(line.account);
                        if (!authorized_trustlines.includes(trustline_key)) {
                            //console.log(`ALERT:  Unknown Trustline Customer Account: ${line.account}, Balance ${line.balance}`);
                        }
                        else {
                            //console.log(`Authorized Trustline ${trustline_key} Customer Account ${line.account}, Balance ${line.balance}`);
                        }
                    }
                    client.disconnect();
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error in account_lines request: ".concat(error_2));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function main() {
    var account = "rngdKd8BAM3etQcb12DvGxd5Ps9MocAvPa";
    var url = 'wss://s1.cbdc-sandbox.rippletest.net:51233';
    trustline_alert(account, url);
    trustline_alert_hard();
    return (0);
}
main();
