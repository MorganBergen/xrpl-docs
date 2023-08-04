const xrpl = require("xrpl");

async function test() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  console.log("connected");
  const { wallet: issuer } = await client.fundWallet();
  const { wallet: customer } = await client.fundWallet();

  const accountSet = {
    TransactionType: 'AccountSet',
    Account: issuer.address,
    SetFlag: xrpl.AccountSetAsfFlags.asfRequireAuth,
  }
  console.log(await client.submitAndWait(accountSet, {autofill: true, wallet: issuer}))

  const customerTrust = {
    TransactionType: 'TrustSet',
    Account: customer.address,
    LimitAmount: {currency: "USD", issuer: issuer.address, value: "2"}
  }
  console.log(await client.submitAndWait(customerTrust, {autofill: true, wallet: customer}))

  const issuerTrust = {
    TransactionType: 'TrustSet',
    Account: issuer.address,
    LimitAmount: {currency: "USD", issuer: customer.address, value: "0"},
    Flags: xrpl.TrustSetFlags.tfSetfAuth,
  }
  console.log(await client.submitAndWait(issuerTrust, {autofill: true, wallet: issuer}))

  console.log((await client.request({
    command: 'account_objects',
    account: issuer.address,
  })).result.account_objects)

  console.log((await client.request({
    command: 'account_objects',
    account: customer.address,
  })).result.account_objects)

  const issuerDelete = {
    TransactionType: 'TrustSet',
    Account: issuer.address,
    LimitAmount: {currency: "USD", issuer: customer.address, value: "0"},
    Flags: 0,
  }
  console.log(await client.submitAndWait(issuerDelete, {autofill: true, wallet: issuer}))

  console.log((await client.request({
    command: 'account_objects',
    account: issuer.address,
  })).result.account_objects)

  console.log((await client.request({
    command: 'account_objects',
    account: customer.address,
  })).result.account_objects)

  await client.disconnect()
}

test()
