"use strict";
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
exports.serverInfo = void 0;
var xrpl_1 = require("xrpl");
var fs = require("fs");
var WebSocket = require("ws");
var sendRequest = function () {
    var url = 'wss://s1.cbdc-sandbox.rippletest.net:51233';
    var payload = JSON.stringify({
        command: 'account_lines',
        account: "rngdKd8BAM3etQcb12DvGxd5Ps9MocAvPa"
    });
    var socket = new WebSocket(url);
    socket.on('open', function () {
        socket.send(payload);
    });
    socket.on('open', function () {
        socket.send(payload);
    });
    socket.on('message', function (data) {
        fs.writeFileSync('./response.json', data);
        console.log('response written to response.json');
        (0, exports.serverInfo)();
        socket.close();
    });
    socket.on('error', function (error) {
        console.error(error);
    });
};
sendRequest();
var blob = function (path) {
    var content = fs.readFileSync(path, 'utf-8');
    var data = JSON.parse(content);
    return (data);
};
var serverInfo = function () { return __awaiter(void 0, void 0, void 0, function () {
    var client, path, response, _i, _a, line, account, balance, no_ripple, no_ripple_peer;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                client = new xrpl_1.Client("wss://s1.cbdc-sandbox.rippletest.net:51233");
                return [4 /*yield*/, client.connect()];
            case 1:
                _b.sent();
                path = ('./response.json');
                response = blob(path);
                for (_i = 0, _a = response.result.lines; _i < _a.length; _i++) {
                    line = _a[_i];
                    account = line.account, balance = line.balance, no_ripple = line.no_ripple, no_ripple_peer = line.no_ripple_peer;
                    if (no_ripple || no_ripple_peer) {
                        console.log("\u001B[41mALERT\u001B[0m Unknown Trustline Account: \"".concat(account, "\" Balance: ").concat(balance));
                    }
                }
                client.disconnect();
                return [2 /*return*/];
        }
    });
}); };
exports.serverInfo = serverInfo;
