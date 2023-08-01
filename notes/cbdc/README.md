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


###  view settings of a trustline 

1.  trust line settings
-  the trust line settings are specific to each account on the trust line and are stored as part of the trust line's metadata
-  to view the trustline settinsg, you can use the `account_lines` method in the ripple api
-  the 










</details>

<details><summary>2.  subscribe to all <code>pilot_accounts</code> & <code>test_accounts</code></summary></details>

<details><summary>3.  subscribe to all <code>retail_accounts</code></summary></details>

<details><summary>4.  subscribe to all <code>internal_accounts</code></summary></details>

<details><summary>5.  subscribe to <code>issuer_account</code></summary>
-  any trustline from an unknown account
    -  alert
    -  pseudocode
-  any transaction outside workflow
    -  alert
    -  allowed trxs
        -  payment
            -  currency - <code>issuer_account</code>
        -  TrustSet
            -  <code>tfSetFreeze</code>
            -  <code>tfClearFreeze</code>
        -  SingerListSet
            -  <code>SingerQuorum</code>
            -  <code>SignerEntries</code>
        - pseudocode
</details>

<details><summary>6.  call free endpoint</summary>
-  fees higher than 10 drops
    -  alert
    -  pseudocode
</details>


###  questions to address 

call account_lines api for issuer_account
any trustline not known to pilot alert
alert message must include psc balance and need to freeze

1.  what does he mean by call an api?

declare preprocessor directive of library `xrpl`





