#  run `rippled` unix executable

<img src="https://github.com/MorganBergen/notes/assets/65584733/32a11739-5b36-48a9-8bb6-2125f97b8ffa" width=200px>

###  `./rippled [options] <command> <parameters>`

1.  `./rippled --unittest`

2.  `./rippled server_info --conf testnet_rippled.cfg`


####  `./rippled --h`

```
❯ ./rippled --help
rippled [options] <command> <params>

General Options:
  --conf arg             Specify the configuration file.
  --debug                Enable normally suppressed debug logging
  -h [ --help ]          Display this message.
  --newnodeid            Generate a new node identity for this server.
  --nodeid arg           Specify the node identity for this server.
  --quorum arg           Override the minimum validation quorum.
  --reportingReadOnly    Run in read-only reporting mode
  --silent               No output to the console after startup.
  -a [ --standalone ]    Run with no peers.
  -v [ --verbose ]       Verbose logging.
  --version              Display the build version.

RPC Client Options:
  --rpc                  Perform rpc command - see below for available
                         commands. This is assumed if any positional parameters
                         are provided.
  --rpc_ip arg           Specify the IP address for RPC command. Format:
                         <ip-address>[':'<port-number>]
  --rpc_port arg         DEPRECATED: include with rpc_ip instead. Specify the
                         port number for RPC command.

Ledger/Data Options:
  --import               Import an existing node database (specified in the
                         [import_db] configuration file section) into the
                         current node database (specified in the [node_db]
                         configuration file section).
  --ledger arg           Load the specified ledger and start from the value
                         given.
  --ledgerfile arg       Load the specified ledger file.
  --load                 Load the current ledger from the local DB.
  --net                  Get the initial ledger from the network.
  --nodetoshard          Import node store into shards
  --replay               Replay a ledger close.
  --start                Start from a fresh Ledger.
  --startReporting arg   Start reporting from a fresh Ledger.
  --vacuum               VACUUM the transaction db.
  --valid                Consider the initial ledger a valid network ledger.

Unit Test Options:
  -q [ --quiet ]         Suppress test suite messages, including suite/case
                         name (at start) and test log messages.
  -u [ --unittest ] arg  Perform unit tests. The optional argument specifies
                         one or more comma-separated selectors. Each selector
                         specifies a suite name, full-name (lib.module.suite),
                         module, or library (checked in that order).
  --unittest-arg arg     Supplies an argument string to unit tests. If
                         provided, this argument is made available to each
                         suite that runs. Interpretation of the argument is
                         handled individually by any suite that accesses it --
                         as such, it typically only make sense to provide this
                         when running a single suite.
  --unittest-ipv6        Use IPv6 localhost when running unittests (default is
                         IPv4).
  --unittest-log         Force unit test log message output. Only useful in
                         combination with --quiet, in which case log messages
                         will print but suite/case names will not.
  --unittest-jobs arg    Number of unittest jobs to run in parallel (child
                         processes).

Commands:
     account_currencies <account> [<ledger>] [strict]
     account_info <account>|<seed>|<pass_phrase>|<key> [<ledger>] [strict]
     account_lines <account> <account>|"" [<ledger>]
     account_channels <account> <account>|"" [<ledger>]
     account_objects <account> [<ledger>] [strict]
     account_offers <account>|<account_public_key> [<ledger>] [strict]
     account_tx accountID [ledger_index_min [ledger_index_max [limit ]]] [binary]
     book_changes [<ledger hash|id>]
     book_offers <taker_pays> <taker_gets> [<taker [<ledger> [<limit> [<proof> [<marker>]]]]]
     can_delete [<ledgerid>|<ledgerhash>|now|always|never]
     channel_authorize <private_key> <channel_id> <drops>
     channel_verify <public_key> <channel_id> <drops> <signature>
     connect <ip> [<port>]
     consensus_info
     deposit_authorized <source_account> <destination_account> [<ledger>]
     download_shard [[<index> <url>]]
     feature [<feature> [accept|reject]]
     fetch_info [clear]
     gateway_balances [<ledger>] <issuer_account> [ <hotwallet> [ <hotwallet> ]]
     get_counts
     json <method> <json>
     ledger [<id>|current|closed|validated] [full]
     ledger_accept
     ledger_cleaner
     ledger_closed
     ledger_current
     ledger_request <ledger>
     log_level [[<partition>] <severity>]
     logrotate
     manifest <public_key>
     node_to_shard [status|start|stop]
     peers
     ping
     random
     peer_reservations_add <public_key> [<description>]
     peer_reservations_del <public_key>
     peer_reservations_list
     ripple ...
     ripple_path_find <json> [<ledger>]
     server_info [counters]
     server_state [counters]
     sign <private_key> <tx_json> [offline]
     sign_for <signer_address> <signer_private_key> <tx_json> [offline]
     stop
     submit <tx_blob>|[<private_key> <tx_json>]
     submit_multisigned <tx_json>
     tx <id>
     validation_create [<seed>|<pass_phrase>|<key>]
     validator_info
     validators
     validator_list_sites
     version
     wallet_propose [<passphrase>]
```
