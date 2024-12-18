#  getting started using python library

walks through the basics of building an xrp ledger connected application using [`xrpl-py`](https://github.com/XRPLF/xrpl-py), a pure python library to interact with the xrp ledger using native python models and methods.  this tutorial is intended for beginners and should take no longer than 30 minutes to complete.

####  learning goals

basic building blocks of xrp ledger based applications

how to connect to the xrp ledger using `xrpl-py`

how to get an account on the [testnet](https://xrpl.org/resources/dev-tools/xrp-faucets) using `xrpl-py`

how to use the `xrpl-py` library to look up information about an account on the xrp ledger

how to put these steps together to create a python app

####  requirements

the `xrpl-py` library supports > python 3.7 and later

####  installation

the `xrpl-py` cab be installed with `pip3 install xrpl-py`

####  start building

when you're working with the xrp ledger, there are a few things you'll need to manage, whether you're adding xrp to your account, integrating with the decentralized exchange, or issuing tokens.  this tutorial walks you through basic patterns common to getting started with all of these use cases and provides sample code for implementing them.  here are the basic steps you'll need to cover for almost any xrp ledger project

[1.  connect to the xrp ledger](#1--connect-to-the-xrp-ledger)  
[2.  get an account](#2--get-an-account)  
[3.  query the xrp ledger](#3--query-the-xrp-ledger)    
[4.  putting it all together](#4--putting-it-all-together)  

####  1.  connect to the xrp ledger

in order to make queries and submit transactions, you need to connect to the xrp ledger.  to do this with `xrpl-py`, use the [`xrpl.clients.module`](https://xrpl-py.readthedocs.io/en/latest/source/xrpl.clients.html)


```Python
#  Define the network client
from xrpl.clients import JsonRpcClient

JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"

client = JsonRpcClient(JSON_RPC_URL)
```

####  connect to the production xrp ledger

the sample code previously shows how to connect to the testnet, which is a parallel network for testing where the money has no real value.  when you're ready to integrate with the production xrp ledger, you'll need to connect to the mainnet. 

(option 1)  by installing the core server (`rippled`) and running a node yourself.  the core server connects to the mainnet by default, but you can change the configuration to use testnet or devnet.  there are good reasons to run your own core server.  if you run your own server you can connect to it as follows

```Python
from xrpl.clients import JsonRpcClient

JSON_RPC_URL = "http://localhost:5005/"

client = JsonRpcClient(JSON_RPC_URL)
```

(option 2)  by using one of the available public servers.

```Python
from xrpl.clients import JsonRpcClient

JSON_RPC_URL = "https://s2.ripple.com:51234/"

client = JsonRpcClient(JSON_RPC_URL)
```

####  2.  get an account

to store value and execute transactions on the xrp ledger, you need an account:  a set of keys and an address that's been funded with enough xrp to meet account reserve.  the address is the identifier of your account and you use the private key to sign transactions that you submit to the xrp ledger.

for testing and development purpose, you can use the xrp faucets to generate keys and fund the account on the testnet or devnet.  for production purposes, you should take care to store your keys and set up a secure signing method.  another difference in production is that xrp has real worth, so you can't get it for free from a faucet.  

to create and fund an account on the testnet, `xrpl-py` provides the `generate_faucet_wallet` method

```Python
#  create a wallet using the testnet faucet
#  https://xrpl.org/xrp-testnet-faucet.html

from xrpl.wallet import generate_faucet_wallet

test_wallet = generate_faucet_wallet(client, debug=True)

print(test_wallet)

'''
print output

public_key:: 022FA613294CD13FFEA759D0185007DBE763331910509EF8F1635B4F84FA08AEE3
private_key:: -HIDDEN-
classic_address: raaFKKmgf6CRZttTVABeTcsqzRQ51bNR6Q
'''
```

####  using the account  

in this tutorial we only query details about the generated account from the xrp ledger, but you can use the values in the `Wallet` instance to prepare, sign, and submit transactions with `xrpl-py`

####  prepare 

to prepare the transaction

```Python
#  prepare payment

from xrpl.models.transactions import Payment

from xrpl.utils import xrp_to_drops

my_tx_payment = Payment(
    account = test_account,
    amount = xrp_to_drops(22),
    destination = "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
)
```

####  sign and submit

to sign and submit the transaction

```Python
#  sign and submit the transaction

from xrpl.transaction import submit_and_wait

tx_response = submit_and_wait(my_tx_payment, client, test_wallet)
```

####  derive an x-address

you can use `xrpl-py`'s `xrpl.core.addresscodec` module to derive an x-address from the `Wallet.address` field

```Python
#  derive an x-address from the classic address
#  https://xrpaddress.info/

from xrpl.core import addresscodec

test_xaddress = addresscodec.classic_address_to_xaddress(test_account, tag = 12345, is_test_network = True)

print("\nclassic address:\n\n", test_account)

print("x-address:\n\n", test_xaddress)
```

the x-address format packs the address and destination tag into a more user friendly value

####  3.  query the xrp ledger

you can query the xrp ledger to get information about a specific account, a specific transaction, the state of the current or historical ledger, and the xrp ledger's decentralized exchange.  you need to make these queries, among other reasons, to look up account info to follow best practice for reliable transaction submission.

here we use the `xrpl-py`'s `xrpl.account` module to look up information about the account we got in the previous step

```Python
#  look up account info
from xrpl.models.requests.account_info import AccountInfo
import json

acct_info = AccountInfo(
    account = test_account.classic_address,
    ledger_index = "validated",
    strict = True,
)

response = client.request(acct_info)
result = response.result

print("response.status:", response.status)

print(json.dumps(response.result, indent = 4, sort_keys = True))
```

####  4.  putting it all together

using these building blocks we can create a python app that,

1.  gets an account on the testnet
2.  connects to the xrp ledger
3.  looks up and prints information about the account you created

```Python
#  define the network client
from xrpl.clients import JsonRpcClient
from xrpl.wallet import generate_faucet_wallet
from xrpl.core import addresscodec
from xrpl.models.requests.account_info import AccountInfo
import json

#  define network client
JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"
client = JsonRpcClient(JSON_PRC_URL)

#  create a wallet using the testnet faucet https://xrpl.org/xrp-testnet-faucet.html
test_wallet = generate_faucet_wallet(client, debug=True)

#  initialize an account str from the wallet
test_account = test_wallet.classic_address

#  derive x address from the classic address https://xrpaddress.info/
test_xaddress = addresscodec.classic_address_to_xaddress(test_account, tag = 12345, is_test_network = True)
print("nclassic address:", test_account)
print("x-address:", test_xaddress)

#  lookup account info about your account
acct_info = AccountInfo(
    account = test_account,
    ledger_index = "validated",
    strict = True,
)

response = client.request(acct_info)
result = response.result

print("response.status:", response.status)
print(json.dumps(response.result, indent = 4, sort_keys = True))

'''
expected output

Classic address:

 rnQLnSEA1YFMABnCMrkMWFKxnqW6sQ8EWk
X-address:

 T7dRN2ktZGYSTyEPWa9SyDevrwS5yDca4m7xfXTGM3bqff8
response.status:  ResponseStatus.SUCCESS
{
    "account_data": {
        "Account": "rnQLnSEA1YFMABnCMrkMWFKxnqW6sQ8EWk",
        "Balance": "1000000000",
        "Flags": 0,
        "LedgerEntryType": "AccountRoot",
        "OwnerCount": 0,
        "PreviousTxnID": "5A5203AFF41503539D11ADC41BE4185761C5B78B7ED382E6D001ADE83A59B8DC",
        "PreviousTxnLgrSeq": 16126889,
        "Sequence": 16126889,
        "index": "CAD0F7EF3AB91DA7A952E09D4AF62C943FC1EEE41BE926D632DDB34CAA2E0E8F"
    },
    "ledger_current_index": 16126890,
    "queue_data": {
        "txn_count": 0
    },
    "validated": false
}
'''
```

####  interpreting the response

the response fields that you want to inspect in most cases are `account_data.Sequence`, `account_data.Balance`, and `validated`.

`account_data.Sequence` -  this is the sequence number of the next valid transaction for the account.  you need to specify the sequence number when you prepare transactions.  with `xrpl-py`, you can use the `get_next_valid_seq_number` to get this automatically from the xrp ledger.

`account_data.Balance` -  the account's balance of the xrp in drops. you can use this to confirm that you have enough xrp to send (if you're making a payment) and to meet the current transaction cost for a given transaction.

`validated` -  indicates whether the returned data is from a validated ledger.  when inspecting transactions, it's important to confirm that the results are final before further processing the transaction.  if `validated` is `true`, then you know for sure the results won't change.

--------------------------------------------------

#  build a desktop wallet app

0.  install dependencies
1.  hello world
2.  show ledger updates
3.  display an account
4.  show account's transactions
5.  send xrp
6.  domain verification and polish


####  development environment

building and running application in a containerized environment.  
a container is a standard unit of software that packages up code and 
dependencies and runs them in an isolated environment.

`docker init`

```
~/wallet-desktop
❯ docker init

Welcome to the Docker Init CLI!

This utility will walk you through creating the following files with sensible defaults for your project:
  - .dockerignore
  - Dockerfile
  - compose.yaml
  - README.Docker.md

Let's get started!

? What application platform does your project use?  [Use arrows to move, type to filter]
  Go - suitable for a Go server application
> Python - suitable for a Python server application
  Node - suitable for a Node server application
  Rust - suitable for a Rust server application
  ASP.NET Core - suitable for an ASP.NET Core application
  PHP with Apache - suitable for a PHP web application
  Java - suitable for a Java application that uses Maven and packages as an uber jar
  Other - general purpose starting point for containerizing your application
  Don't see something you need? Let us know!

  ? What application platform does your project use? Python
  ? What version of Python do you want to use? (3.10.11) 
  ? What port do you want your app to listen on? 8000
  ? What is the command you use to run your app (e.g., gunicorn 'myapp.example:app' --bind=0.0.0.0:8000)? python main.py

✔ Created → .dockerignore
✔ Created → Dockerfile
✔ Created → compose.yaml
✔ Created → README.Docker.md

✔ Created → .dockerignore
✔ Created → Dockerfile
✔ Created → compose.yaml
✔ Created → README.Docker.md

→ Your Docker files are ready!
  Review your Docker files and tailor them to your application.
  Consult README.Docker.md for information about using the generated files.

  What's next?
    Start your application by running → docker compose up --build
    Your application will be available at http://localhost:8000

  Quit
```

docker file is a text document that contains all of the commands to assemble an image.  

[`Dockerfile`](https://docs.docker.com/reference/dockerfile/)

[`docker-compose.yml`](https://docs.docker.com/reference/compose-file/)

[`README.Docker.md`](https://docs.docker.com/reference/compose-file/)

`docker init`

`docker-compose up --build`


`docker ps`

`docker exec -it <container_id_or_name> /bin/bash`