#  mainnet response

###  test

```javascript
const xrpl = require('xrpl')

async function main() {
    const api = new xrpl.Client('wss://xrplcluster.com/')
    await api.connect()

    let responses = await api.request({
        "command" : "ledger",
        "ledger_index" : "validated",
        "transactions" : true || false
    });
    console.log(response);

}

main();
```

###  response

the response is a ledger header of a specific ledger version, this ledger version is indexed at 80269545 and it's hash value is `210A9662E43552FC8418829AC513B76D4387A0C6EDFD7A01F2F3369B00D521DB`.  key value pairs represented as objects

```JSON
{
  id: 0,
  result: {
    ledger: {
      accepted: true,
      account_hash: '9D872B09A3E88268BB989A7E3C774C354140CEBC1F41D0F96A334E3D8BCC96CD',
      close_flags: 0,
      close_time: 739316342,
      close_time_human: '2023-Jun-05 21:39:02.000000000 UTC',
      close_time_resolution: 10,
      closed: true,
      hash: '210A9662E43552FC8418829AC513B76D4387A0C6EDFD7A01F2F3369B00D521DB',
      ledger_hash: '210A9662E43552FC8418829AC513B76D4387A0C6EDFD7A01F2F3369B00D521DB',
      ledger_index: '80269545',
      parent_close_time: 739316341,
      parent_hash: 'F0F5946220BA805A09866F31F0D2F27654E0243028376CA50E33CBED0763404E',
      seqNum: '80269545',
      totalCoins: '99988857380344119',
      total_coins: '99988857380344119',
      transaction_hash: '0638C6A5EF568463173DC9921448740156751C7B39C6C0A8E07CCE173502E538',
      transactions: [Array]
    },
    ledger_hash: '210A9662E43552FC8418829AC513B76D4387A0C6EDFD7A01F2F3369B00D521DB',
    ledger_index: 80269545,
    validated: true,
    _nodepref: 'nonfh'
  },
  type: 'response'
}
```
