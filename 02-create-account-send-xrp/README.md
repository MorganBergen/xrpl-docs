#  token test harness

[webpage](../02-create-account-send-xrp/1-get-accounts-send-xrpl.html)

get accounts from seeds -> standby account & operational account

| name             | standby account | operational account |
|:-----------------|:----------------|:--------------------|
| `account`        |                 |                     |
| `public_key`     |                 |                     |
| `private_key`    |                 |                     |
| `seed`           |                 |                     |
| `xrp_balance`    |                 |                     |
| `amount`         |                 |                     |
| `destination`    |                 |                     |

```javascript
const xrpl = require('xrpl');

async function main() {

    const client = new xrpl.Client("wss://s.altnet.rippletest.net.51233");

    await client.connect();

    const response = await client.request({
        "command": "account_info".
        "account": "address",
        "ledger_index": "validated"
    )};

    console.log(response, "response");

    client.disconnect();

}

main();
```
