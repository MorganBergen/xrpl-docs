#  AuthTrustline

###  contents

1.  [summary](#summary)
2.  [source code explaination](#source-code-explaination)
3.  [result](#result)
4.  [references](#references)

###  summary

In this `main.ts` we will be using TypeScript and the following library objects provide functionality to interaction, settings modification, account instantiation, and enum flag operations. 

**xrpl imported modules**

-  Client
-  Wallet
-  TrustSet
-  AccountSet
-  TrustSetFlags
-  AccountSetAsfFlags

**high level overview**

1.  Establishes a wallet `create_account`:  Creates a new account on XRP TestNet via websockets and using `fundWallet()` method.

2.  Print issuer account info `account_info`:  Asynchronous method that retrives the issuer account info `r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59`

3.  AccountSet asfRequireAuth `set_require_auth`: Sets the newly created account to require authorization with the account flag `AccountSetAsfFlags.asfRequireAuth` to require authorization.  This means that the newly created account only accepts incoming trustlines that are explicitly approved.

4.  Create trustline `create_trustline`:  Asynchronous method that uses the Trustset TransactionType to prepare, sign, and submit a trustline with the flags `TrustSetFlags.tfSetAuth` pipped with `TrustSetFlags.tfSetFreeze`.  This represents an agreement that the two accounts have explicit approval to old the issuer's currency which is `PSC` and limit at `100`.  The tfSetFreeze flag can freeze all trustlines for a currency issued by an account.  **This fails to be validated because the issuer I choose did not have asfRequireAuth turned on for our newly created account**.

5.  `main`:  In the main function, these are all pieced together. An account is created, the account flag is set to require authorization, and then a trustline is created.

**notes**

I used (new Promise(resolve => setTimeout(resolve, 5000))) so that before another function is called we make sure that the ledger can process and finalize the transaction to be validated before we proceed.  The output of each operation is printed to the console, showing the account and transaction details after each step.

**todo**

We need to implement a method to freeze the newly created account.

###  references

1.  [trustset](https://xrpl.org/trustset.html#trustset)

Authorize the other party to hold currency issued by this account. (No effect unless using the asfRequireAuth AccountSet flag.) Cannot be unset.

###  source code explaination

View comments made in [`main.ts`](./main.ts) for explaination for the methods called.

###  result

```JSON
---------------------------------------New Account Wallet Info---------------------------------------
{
  wallet: Wallet {
    publicKey: 'ED6519F923B62AC71CDE858ADA0B4943CCA5277E28ED10C585ACD641FE57841683',
    privateKey: 'ED2ACE0E7FC68420767382CC30FFD2A42829B8034FDAD42E717C518E14E1F3C407',
    classicAddress: 'r4E8kHK2V4JmhVDGyj1oNAPt8xE9RPavqs',
    seed: 'sEdTSSHVBXuDHWthvHhPnJB9pfsMhma'
  },
  balance: 10000
}



---------------------------------------Account r4E8kHK2V4JmhVDGyj1oNAPt8xE9RPavqs Info Response ---------------------------------------
{
  api_version: 1,
  id: 2,
  result: {
    account_data: {
      Account: 'r4E8kHK2V4JmhVDGyj1oNAPt8xE9RPavqs',
      Balance: '10000000000',
      Flags: 0,
      LedgerEntryType: 'AccountRoot',
      OwnerCount: 0,
      PreviousTxnID: 'C0E3D30D09E206A0795DE025A0E6C159CA58F934BD8070F15835E845AF25F1B1',
      PreviousTxnLgrSeq: 39592778,
      Sequence: 39592778,
      index: '0D741F18E65055C983F58080846DA3B75802814A4EB8677C7166EF78140D803F'
    },
    account_flags: {
      defaultRipple: false,
      depositAuth: false,
      disableMasterKey: false,
      disallowIncomingCheck: false,
      disallowIncomingNFTokenOffer: false,
      disallowIncomingPayChan: false,
      disallowIncomingTrustline: false,
      disallowIncomingXRP: false,
      globalFreeze: false,
      noFreeze: false,
      passwordSpent: false,
      requireAuthorization: false,
      requireDestinationTag: false
    },
    ledger_hash: 'DED4BA48F393564239852BE02EA9DD74061571E8E5D0AF3E399030129DA025B0',
    ledger_index: 39592778,
    validated: true
  },
  type: 'response'
}
---------------------------------------Issuer Account r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59 Info Response---------------------------------------
{
  api_version: 1,
  id: 2,
  result: {
    account_data: {
      Account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
      Balance: '92662879587',
      Flags: 0,
      LedgerEntryType: 'AccountRoot',
      OwnerCount: 0,
      PreviousTxnID: '3C188FB82E13CCBAF34E36D6229A7CC9FC7BBE50CD76E9852002FB0E90EC27A6',
      PreviousTxnLgrSeq: 39592500,
      Sequence: 1,
      index: '4F83A2CF7E70F77F79A307E6A472BFC2585B806A70833CCD1C26105BAE0D6E05'
    },
    account_flags: {
      defaultRipple: false,
      depositAuth: false,
      disableMasterKey: false,
      disallowIncomingCheck: false,
      disallowIncomingNFTokenOffer: false,
      disallowIncomingPayChan: false,
      disallowIncomingTrustline: false,
      disallowIncomingXRP: false,
      globalFreeze: false,
      noFreeze: false,
      passwordSpent: false,
      requireAuthorization: false,
      requireDestinationTag: false
    },
    ledger_hash: 'DED4BA48F393564239852BE02EA9DD74061571E8E5D0AF3E399030129DA025B0',
    ledger_index: 39592778,
    validated: true
  },
  type: 'response'
}
---------------------------------------Account Set Response---------------------------------------
{
  id: 4,
  result: {
    Account: 'r4E8kHK2V4JmhVDGyj1oNAPt8xE9RPavqs',
    ClearFlag: 0,
    Fee: '12',
    Flags: 0,
    LastLedgerSequence: 39592798,
    Sequence: 39592778,
    SetFlag: 2,
    SigningPubKey: 'ED6519F923B62AC71CDE858ADA0B4943CCA5277E28ED10C585ACD641FE57841683',
    TransactionType: 'AccountSet',
    TxnSignature: 'D3621467CBDEA6C0D9FBC39BB8AF07A9F2974A55EFDED79AFFBA98C4118DE725799DDC36652259620448FFA72E251A660B28A2E9E12F7E88E9EAC0D2D7049205',
    date: 743011160,
    hash: '6FE8EC6F719D946FF1390F822CC21584757DADF91549E473BB285A91B6D48115',
    inLedger: 39592780,
    ledger_index: 39592780,
    meta: {
      AffectedNodes: [Array],
      TransactionIndex: 0,
      TransactionResult: 'tesSUCCESS'
    },
    validated: true
  },
  type: 'response'
}



---------------------------------------Updated Account r4E8kHK2V4JmhVDGyj1oNAPt8xE9RPavqs Info Response ---------------------------------------
{
  api_version: 1,
  id: 2,
  result: {
    account_data: {
      Account: 'r4E8kHK2V4JmhVDGyj1oNAPt8xE9RPavqs',
      Balance: '9999999988',
      Flags: 262144,
      LedgerEntryType: 'AccountRoot',
      OwnerCount: 0,
      PreviousTxnID: '6FE8EC6F719D946FF1390F822CC21584757DADF91549E473BB285A91B6D48115',
      PreviousTxnLgrSeq: 39592780,
      Sequence: 39592779,
      index: '0D741F18E65055C983F58080846DA3B75802814A4EB8677C7166EF78140D803F'
    },
    account_flags: {
      defaultRipple: false,
      depositAuth: false,
      disableMasterKey: false,
      disallowIncomingCheck: false,
      disallowIncomingNFTokenOffer: false,
      disallowIncomingPayChan: false,
      disallowIncomingTrustline: false,
      disallowIncomingXRP: false,
      globalFreeze: false,
      noFreeze: false,
      passwordSpent: false,
      requireAuthorization: true,
      requireDestinationTag: false
    },
    ledger_hash: '280604621885C5F867A685B74B307EB05E128CAD3D254D0476C3EC10D110BBEC',
    ledger_index: 39592781,
    validated: true
  },
  type: 'response'
}
---------------------------------------Trustline Set Response---------------------------------------
{
  id: 4,
  result: {
    Account: 'r4E8kHK2V4JmhVDGyj1oNAPt8xE9RPavqs',
    Fee: '12',
    Flags: 1114112,
    LastLedgerSequence: 39592801,
    LimitAmount: {
      currency: 'PSC',
      issuer: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
      value: '100'
    },
    Sequence: 39592779,
    SigningPubKey: 'ED6519F923B62AC71CDE858ADA0B4943CCA5277E28ED10C585ACD641FE57841683',
    TransactionType: 'TrustSet',
    TxnSignature: '353765A32E793EE91EF20B3F96AD67FA2B324C0D6E53A8558EAB46801734412F9FD3AA009268E9B3085F4CE9B0E8D4D57940A043582B0C044D6AA87CACFAFE0C',
    hash: '69AEFA3C32CBD0BB3577E1A4A376929A574118DA962F99E194466721AD58BBB8',
    validated: false
  },
  type: 'response'
}
```



rhEyPWdFFoAM58jgXPghbPuAaVMzvAK21K 
rAuSUyfhqkYC99K6c4eiGMc5zJhrYS983 
rUqzJuoP77oHBEf6jM8qvR4EZQHkiHZg65 
rJ1a56NmWQ7DhCL8fvtfSsumSdkt4t6Y6i 
rUbypLjDwGKyRXdYqL3NetEUuBEBHnoJtc 
rYsFGN65DbTQnCit5yZbhUoLgVEwHAFoc 
raTZrymPTpigsUtjaNEBWktiAssrXHoTa7 
rBqVuZpMuDNYcdsyUGvJfUu8hV3vyNXvrv 
rfXgCLQ1QSTktMJm31efY8ZUDJCyEYPynY 
rsg9FuDMChKv4GihTYh79iGHtHzVuoZMpW 
rEe7JnPaaxZB8MUfvi4VJRRLfyaHw2gfdV 
rHxQvtATzCa1VFPUFSu5t9Mv6mPgT8Kk3c 
rfNTzMpoCGtov9JDk27YacsqKWfEFL4F9o 
rvbiHqdRf29dZ3hJFqXaEivkgDSfgwZUN 
rJnoUhw8G1wzcviZKryjEddjpCRhhX2VKL 
