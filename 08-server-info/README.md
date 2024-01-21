#  feature request

Amendment ID 47C3002ABA31628447E8E9A8B315FAA935CE30183F9A9B86845E469CA2CDC3DF

the following code will only work in admin mode, to enable admin mode 

Admin Access

The API methods are divided into Public Methods and Admin Methods so that organizations can offer public servers for the benefit of the community. To access admin methods, or admin functionality of public methods, you must connect to the API on a port and IP address marked as admin in the server's config file.

The example config file  listens for connections on the local loopback network (127.0.0.1), with JSON-RPC (HTTP) on port 5005 and WebSocket (WS) on port 6006, and treats all connected clients as admin.


CONTAINER ID   IMAGE                           COMMAND            CREATED          STATUS          PORTS                                                          NAMES
79414cebb3f3   xrpllabsofficial/xrpld:latest   "/entrypoint.sh"   6 minutes ago    Up 6 minutes    443/tcp, 5005/tcp, 6006/tcp, 51235/tcp, 0.0.0.0:8080->80/tcp   rippled2
a2746bb4dfb7   xrpllabsofficial/xrpld:latest   "/entrypoint.sh"   22 minutes ago   Up 22 minutes   443/tcp, 5005/tcp, 6006/tcp, 0.0.0.0:80->80/tcp, 51235/tcp     xrpld
❯ docker exec rippled2 rippled feature 47C3002ABA31628447E8E9A8B315FAA935CE30183F9A9B86845E469CA2CDC3DF accept

Loading: "/etc/opt/ripple/rippled.cfg"
2023-Jul-19 16:34:21.749398168 UTC HTTPClient:WRN Warning: No peer protocol configured
2023-Jul-19 16:34:21.753885918 UTC HTTPClient:NFO Connecting to 127.0.0.1:5005

{
   "result" : {
      "47C3002ABA31628447E8E9A8B315FAA935CE30183F9A9B86845E469CA2CDC3DF" : {
         "enabled" : false,
         "name" : "DisallowIncoming",
         "supported" : true,
         "vetoed" : false
      },
      "status" : "success"
   }
}
❯ docker exec rippled2 server_info
Args:
    >> [server_info]

Env Args:
    >> []

Env:
_=/usr/bin/printenv
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
SHLVL=2
HOME=/root
PWD=/
HOSTNAME=79414cebb3f3

Existing rippled config at host /config/, using.
Existing validator config at host /config/, using.
Loading: "/etc/opt/ripple/rippled.cfg"
2023-Jul-19 16:35:29.433396922 UTC HTTPClient:WRN Warning: No peer protocol configured
2023-Jul-19 16:35:29.438113964 UTC HTTPClient:NFO Connecting to 127.0.0.1:5005

{
   "result" : {
      "info" : {
         "build_version" : "1.10.1",
         "closed_ledger" : {
            "base_fee_xrp" : 1e-05,
            "hash" : "F7745CB80D9BE8952F6AA77DAAC2EA924A8E2DD02C5E7ABCC07242AB0291E088",
            "reserve_base_xrp" : 200,
            "reserve_inc_xrp" : 50,
            "seq" : 105
         },
         "complete_ledgers" : "empty",
         "fetch_pack" : 15121,
         "hostid" : "79414cebb3f3",
         "io_latency_ms" : 1,
         "jq_trans_overflow" : "0",
         "last_close" : {
            "converge_time_s" : 2.025,
            "proposers" : 35
         },
         "load" : {
            "job_types" : [
               {
                  "avg_time" : 4,
                  "job_type" : "clientConsensus",
                  "peak_time" : 13
               },
               {
                  "in_progress" : 1,
                  "job_type" : "clientRPC"
               },
               {
                  "job_type" : "untrustedValidation",
                  "peak_time" : 9,
                  "per_second" : 33
               },
               {
                  "avg_time" : 1,
                  "job_type" : "transaction",
                  "peak_time" : 12,
                  "per_second" : 11
               },
               {
                  "job_type" : "batch",
                  "peak_time" : 1,
                  "per_second" : 4
               },
               {
                  "avg_time" : 361,
                  "in_progress" : 3,
                  "job_type" : "ledgerData",
                  "peak_time" : 1908,
                  "per_second" : 8,
                  "waiting" : 8
               },
               {
                  "job_type" : "advanceLedger",
                  "peak_time" : 4,
                  "per_second" : 25
               },
               {
                  "job_type" : "fetchTxnData",
                  "peak_time" : 5,
                  "per_second" : 6
               },
               {
                  "avg_time" : 1,
                  "job_type" : "trustedValidation",
                  "peak_time" : 10,
                  "per_second" : 11
               },
               {
                  "job_type" : "trustedProposal",
                  "peak_time" : 8,
                  "per_second" : 15
               },
               {
                  "avg_time" : 27,
                  "job_type" : "heartbeat",
                  "peak_time" : 90
               },
               {
                  "job_type" : "peerCommand",
                  "peak_time" : 31,
                  "per_second" : 1434
               },
               {
                  "job_type" : "processTransaction",
                  "peak_time" : 1,
                  "per_second" : 5
               },
               {
                  "job_type" : "SyncReadNode",
                  "peak_time" : 54,
                  "per_second" : 6667
               },
               {
                  "job_type" : "AsyncReadNode",
                  "peak_time" : 36,
                  "per_second" : 5237
               },
               {
                  "job_type" : "WriteNode",
                  "peak_time" : 49,
                  "per_second" : 6652
               }
            ],
            "threads" : 6
         },
         "load_factor" : 1,
         "node_size" : "small",
         "peer_disconnects" : "0",
         "peer_disconnects_resources" : "0",
         "peers" : 21,
         "pubkey_node" : "n9J5CvAFN8vpQm8u4w8Bt3mqpCGmg5VQWME1FFbuGuhEYU5LB8rk",
         "pubkey_validator" : "none",
         "published_ledger" : "none",
         "server_state" : "connected",
         "server_state_duration_us" : "497301006",
         "state_accounting" : {
            "connected" : {
               "duration_us" : "498315001",
               "transitions" : "2"
            },
            "disconnected" : {
               "duration_us" : "1480363",
               "transitions" : "2"
            },
            "full" : {
               "duration_us" : "0",
               "transitions" : "0"
            },
            "syncing" : {
               "duration_us" : "0",
               "transitions" : "0"
            },
            "tracking" : {
               "duration_us" : "0",
               "transitions" : "0"
            }
         },
         "time" : "2023-Jul-19 16:35:29.478452 UTC",
         "uptime" : 499,
         "validation_quorum" : 28,
         "validator_list" : {
            "count" : 1,
            "expiration" : "2024-Apr-28 00:00:00.000000000 UTC",
            "status" : "active"
         }
      },
      "status" : "success"
   }
}


```TypeScript
/**
 * @file            amend.ts
 * @author          Morgan Bergen
 * @description     request from mainnet the current amendments enabled
 */

import { Client, LedgerEntry } from "xrpl";

interface feature_response {
    result: {
        features: {
            [amendmentId: string]: {
                enabled: boolean;
                name?: string;
                supported: boolean;
                vetoed: boolean | string;
            };
        };
    };
};

async function main() {
    const client = new Client('wss://s1.ripple.com/');
    await client.connect();

    try {
        
        const feature_response = await client.request({
            id: 'list_all_features',
            command: 'feature'
        });

        console.log(feature_response.result);

    } catch (error) {
        console.log(error);
    }


    client.disconnect();
    return(0);
}

main();

```

```
❯ node amend.js
RippledError: Unknown method.
    at RequestManager.handleResponse (/Users/mbergen/node_modules/xrpl/dist/npm/client/RequestManager.js:80:27)
    at Connection.onMessage (/Users/mbergen/node_modules/xrpl/dist/npm/client/connection.js:236:37)
    at WebSocket.<anonymous> (/Users/mbergen/node_modules/xrpl/dist/npm/client/connection.js:255:53)
    at WebSocket.emit (node:events:511:28)
    at Receiver.receiverOnMessage (/Users/mbergen/node_modules/ws/lib/websocket.js:1184:20)
    at Receiver.emit (node:events:511:28)
    at Receiver.dataMessage (/Users/mbergen/node_modules/ws/lib/receiver.js:541:14)
    at Receiver.getData (/Users/mbergen/node_modules/ws/lib/receiver.js:459:17)
    at Receiver.startLoop (/Users/mbergen/node_modules/ws/lib/receiver.js:158:22)
    at Receiver._write (/Users/mbergen/node_modules/ws/lib/receiver.js:84:10) {
  data: {
    error: 'unknownCmd',
    error_code: 32,
    error_message: 'Unknown method.',
    status: 'error',
    type: 'response',
    id: 'list_all_features',
    request: { id: 'list_all_features', command: 'feature' },
    warnings: [ [Object] ]
  }
}

~/Documents/Github/notes/notes/server_info on main ⇣3⇡1 !8 ?3                             at 11:38:38 AM
❯
```
