"use strict";
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
 * @function        trustline_info
 * @description     displays an alert message if any trustlines are not authorized to the pilot
 * @param           {string} p_account - the account to check for unauthorized trustlines
 * @param           {string} p_url - the url of the rippled server to connect to
 * @returns         {string} - the account of the unauthorized trustline
 */
function account_line_info(p_account, p_url) {
    return __awaiter(this, void 0, void 0, function () {
        var account_line_request, issuer_account_info_request, client, account_info_response, account_line_response, issuer_account_response, trustlines, allowed_accounts, _i, _a, line, allowed_currency_1, authorized_trustlines_1, _b, _c, line, trustline_key, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    account_line_request = {
                        id: 1,
                        command: "account_lines",
                        account: p_account,
                    };
                    issuer_account_info_request = {
                        id: 2,
                        command: "account_info",
                        account: p_account,
                        strict: true,
                        ledger_index: "current",
                        queue: true
                    };
                    client = new xrpl_1.Client(p_url);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _d.sent();
                    return [4 /*yield*/, client.request(issuer_account_info_request)];
                case 3:
                    account_info_response = _d.sent();
                    return [4 /*yield*/, client.request(account_line_request)];
                case 4:
                    account_line_response = _d.sent();
                    return [4 /*yield*/, client.request(account_line_request)];
                case 5:
                    issuer_account_response = _d.sent();
                    trustlines = account_line_response.result.lines;
                    console.log("---------------------TRUSTLINE RESPONSE--------------------------------------------");
                    console.log(issuer_account_response);
                    console.log("---------------------ISSUER ACCOUNT RESPONSE--------------------------------------------");
                    console.log(issuer_account_response);
                    console.log("---------------------ACCOUNT LINE RESPONSE--------------------------------------------");
                    console.log(account_line_response);
                    console.log("---------------------ACCOUNT LINE RESPONSE RESULTS--------------------------------------------");
                    console.log(account_line_response.result);
                    console.log("---------------------ACCOUNT INFO RESPONSE--------------------------------------------");
                    console.log(account_info_response);
                    console.log("----------------------TRUSTLINES RESPONSE---------------------------------------------");
                    console.log(trustlines);
                    allowed_accounts = [];
                    for (_i = 0, _a = account_line_response.result.lines; _i < _a.length; _i++) {
                        line = _a[_i];
                        allowed_accounts.push(line.account);
                    }
                    allowed_currency_1 = "PSC";
                    authorized_trustlines_1 = [];
                    allowed_accounts.forEach(function (allowed_account) {
                        authorized_trustlines_1.push("".concat(allowed_currency_1, ".").concat(allowed_account));
                    });
                    for (_b = 0, _c = account_line_response.result.lines; _b < _c.length; _b++) {
                        line = _c[_b];
                        trustline_key = "".concat(line.currency, ".").concat(line.account);
                        if (!authorized_trustlines_1.includes(trustline_key)) {
                            console.log("ALERT:  Unknown Trustline ".concat(trustline_key, " for Account ").concat(line.account, ", Balance ").concat(line.balance));
                        }
                        else {
                            console.log("Authorized Trustline ".concat(trustline_key, " for Account ").concat(line.account, ", Balance ").concat(line.balance));
                        }
                    }
                    client.disconnect();
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _d.sent();
                    console.error("Error in account_lines request: ".concat(error_1));
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
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
    var account = "rngdKd8BAM3etQcb12DvGxd5Ps9MocAvPa";
    var url = 'wss://s1.cbdc-sandbox.rippletest.net:51233';
    account_line_info(account, url);
}
main();
