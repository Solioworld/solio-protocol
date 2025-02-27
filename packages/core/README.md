# @solio/core

## Introduction

The Bonding Core SDK is a JavaScript library that provides a simple and efficient way to interact with the Solio Protocol. It allows developers to easily integrate the protocol into their applications and build custom solutions on top of it.

## Installation

```bash
npm install @solio/core viem
```

## Usage

- [CHANGELOG](./CHANGELOG.md)

### Create clients

- Create a client instance with the createClient function:

```ts copy filename="constant.ts"
import { http, createClient, createWalletClient, custom } from 'viem';
import { sepolia } from 'viem/chains';
export const readClient = createClient({
  chain: sepolia,
  transport: http(),
});
export const writeClient = createWalletClient({
  chain: sepolia,
  transport: custom(window.ethereum),
});
```

### Use module

- The bondingCurve module provides a read.getMintAmount function to read the mixed token mint amount

```ts copy filename="read.ts"
import { parseEther } from "viem";
import { bondingCurve } from "@solio/core";
import { readClient } from "./constant";

const amountWei = await bondingCurve.read.getMintAmount(readClient, {
  address: `0x...`, // Address of the bonding curve contract
  type: "linear",
  param: {
    initPrice: 0.001,
    finalPrice: 1000,
    finalSupply: 1e32,
  },
  raisingAmount: parseEther('10'),
});
console.log(amountWei);

```

- The mixedToken module provides a write.mint function to mint mixed token

```tsx filename="write.ts"
import { parseEther } from "viem";
import { mixedToken } from "@solio/core";
import { writeClient } from "./constant";

const hash = await mixedToken.write.mint(writeClient, {
  address: `0x...`, // Address of the mixed token contract
  raisingAmount: parseEther('10'),
  minMixedTokenAmount: parseEther('9.8'),
  raisingAddress: `0x...`, // Address of the raising token contract
});
console.log(hash);
```

## Contract Api

- contract -> read | write -> function(readClient|writeClient,props):values|hash
