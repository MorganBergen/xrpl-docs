#  AMM Automated Market Maker

>  What is an automated market maker

#### Table of contents

1. [What do automated market makers (AMMs) do?](#what-do-automated-market-makers-amms-do)
2. [How do AMMs work?](#how-do-amms-work)
3. [Automated pricing and continuous trading](#automated-pricing-and-continuous-trading)
4. [How does the XRPL order book differ from a typical AMM?](#how-does-the-xrpl-order-book-differ-from-a-typical-amm)

#### What do automated market makers (AMMs) do?

An automated market maker is a type of decentralized exchange dex protocol that facilitates the exchange of cryptocurrencies without the need for traditional order books and intermediaries.  AMMs use mathematical algorithms and smart contracts to automatically match buyers and selleers, determine prices, and provide liquidity to the market.

In summary, automated market makers are systems that let you exchange assets without needing a middle man.  Each AMM holds a pool of two assets and enables users to swap between them at an exchange rate set by a formula.  They're the most common way to implement a decentralized exchange to allow everyday traders to exchange assets of various sorts for fair rates.  The main alternative to AMMs are the Central Limit Order Books (CLOBs).  

As a note decentralization i cryptocurrencies entail the absence of a central authority, with security through cryptography and blockchain technology, allowing a distirbuted community to collectively control the currency, fostering fairness, security, resilience, and transparency in transactions.

#### How do AMMs work?

At its heart, an AMM works by pooling two tokens together in a pair of liquidity pools.  Oncce enough currency is pooled together, the AMM automatically picks a fiar exchange rate bwteen the different currencies.  A liqudity pool is a decentralized smart contract or protocol that holds a supply of two or more different cryptocurrencies or tokens.  AMM's figure out the fair exchange rate with a powerful formula called a "constant function formula" which tries to model the price that a traditional market would discover on its own.  Liquidity pools are handy for two reasons.  First, because the prices are chosen automatically, everyday token holders can contirbute without having to know what a "fair" exchange rate is.  They're also useful because they can provide constant liquidity as the pool is always willing to trade.  Think of it like the exchnage rate that is always available at your bank.

#### Automated pricing and continuous trading

As people trade within the pool, the AMM's algorithm adjusts the prices of the assets to keep everything in balance.  If one asset is in high demand, its price goes up, an dthe other asset's price drops.  This algoirthm uses the constant function formula to keep things in balance.  

1.  Sets a price that follows supply and demand for the various tokens.  If there's a large supply of a token, exchanging for it will be easier.  Conversley with small amounts of a token in the liqudity pool, it will cost a lot to trade for the remaining tokens.

2.  On the demand side, trading more of a token at once is more expensive.  You can think of the price updating automatically as you buy more and more of the token, reducing the supply as you go.

#### How does the XRPL order book differ from a typical AMM?

A traditional order book system functions differently than an AMM, which relies on math formulas to leverage the liqudity pools in completing a trade.  In the order book, trades occur when buy and sell orders, match, allowing for more specific pricing, but can struggle to discover a fair market price if there are few traders.  Traders on the Order Book happen when a buyer's bid matches a seller's ask.  While an AMM executes trades instantly based on teh current formula based prices.  

AMMs calculate a fiar exchange rate between tokens automatically.
