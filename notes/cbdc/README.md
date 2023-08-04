#  Palau Monitoring Requierments

###  contents

1.  [enviroments](#enviroments)
2.  [variables](#variables)
3.  [issues](#issues)
4.  [unknown trustline #1](#unknown-trustline--1)

##  enviroments

| type | test | production |
|:----|:----|:----|
| wss | [wss://s1.cbdc-sandbox.rippletest.net:51233](wss://s1.cbdc-sandbox.rippletest.net:51233) | XRPL Mainnet |
| rpc | [https://s1.cbdc-sandbox.rippletest.net:51234](http://s1.cbdc-sandbox.rippletest.net:51234) | XRPL Mainnet |
| toml | undefined | undefined |
| `issuer_account` | `rngdKd8BAM3etQcb12DvGxd5Ps9MocAvPa` | `rwekfW4MiS5yZjXASRBDzzPPWYKuHvKP7E` |
| `currency` | PSC | PSC |

##  variables

| identifier | definition |
|:----------|:----------|
| `issuer_account` | the account issued the currency being monitored |
| `currency` | the currency being monitored |
| `internal_accounts` | accounts in the DCM owned by MOF |
| `retail_accounts` | accounts of the retailers |
| `pilot_accounts` | accounts of teh pilot participants |
| `test_accounts` | accounts owned by Ripple, MoF, Retailers used for tests |
| `psc_accounts` | every non issuing account with a known psc trustline |
| `nautilus_accounts` | any wallet created by nautilus |

##  issues

<details><summary>1.  call <code>account_lines</code> api for <code>issuer_account</code></summary>

-  any trustlines not known to pilot alert
-  alert message must include psc balance and need to freeze

find the api or the list of function calls i can use in order
to make this alert message that will probably be within serverInfo.ts
go through the list of accounts 
if an account != a psc_account
then provide console log alert regarding transaction





Sequelize CLI [Node: 20.2.0, CLI: 6.6.1, ORM: 6.32.1]

Loaded configuration file "src/db/config/config.js".
Using environment "development".
== 20230623152716-dev: migrating =======
{
  "tenant1": {
    "tenant_id": "7a614d2f-b21b-4bfb-bec5-74405041dfb2",
    "tenant_name": "Oceana",
    "tenant_ws_endpoint": "wss://s1.ripple.com",
    "tenant_process_endpoint": "http://localhost:4001",
    "tenant_active": true
  },
  "tenant2": {
    "tenant_id": "0a0178d3-e3b0-4f89-b2d0-7f48cb475188",
    "tenant_name": "Althea",
    "tenant_ws_endpoint": "wss://s1.cbdc-sandbox.rippletest.net:51233",
    "tenant_process_endpoint": "http://localhost:4002",
    "tenant_active": false
  },
  "tenant3": {
    "tenant_id": "6121e2cd-973c-4957-aac0-ff538a695082",
    "tenant_name": "London",
    "tenant_ws_endpoint": "wss://s1.cbdc-sandbox.rippletest.net:51233",
    "tenant_process_endpoint": "http://localhost:4003",
    "tenant_active": true
  },
  "tenant4": {
    "tenant_id": "0d1e373c-5595-4eed-b115-28e7dc97f363",
    "tenant_name": "Rai",
    "tenant_ws_endpoint": "wss://s1.cbdc-sandbox.rippletest.net:51233",
    "tenant_process_endpoint": "http://localhost:4001",
    "tenant_active": true
  }
}
== 20230623152716-dev: migrated (0.087s)

Done. Press any key to close the terminal.

###  cbdc wallet

universal payment identifier morganbergen$dev.cbdc.xpring.money
seed ssPNH2tK2qayLKBL3M47ZAgRgcsDH
