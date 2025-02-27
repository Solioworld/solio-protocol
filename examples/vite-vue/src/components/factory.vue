<template>
  <div>
    <h1>Factory Test</h1>
    <form>
      <label>Contract Address: <input v-model="address" type="text" :placeholder="zeroAddress" /></label>
      <label>Mixed Token Index: <input v-model="mixedTokenIndex" type="number" /></label>
      <label>Mixed Token:</label>
      <div>
        <label>Type: <input v-model="mixedToken.type" type="text" /></label>
        <label>Bonding Curve Type: <input v-model="mixedToken.bondingCurve.type" type="text" /></label>
        <label>Init Price: <input v-model="mixedToken.bondingCurve.param.initPrice" type="number" /></label>
        <label>Final Price: <input v-model="mixedToken.bondingCurve.param.finalPrice" type="number" /></label>
        <label>Final Supply: <input v-model="mixedToken.bondingCurve.param.finalSupply" type="number" /></label>
        <label>Name: <input v-model="mixedToken.name" type="text" /></label>
        <label>Symbol: <input v-model="mixedToken.symbol" type="text" /></label>
        <label>Metadata URL: <input v-model="mixedToken.metadataUrl" type="text" /></label>
        <label>Raising Address: <input v-model="mixedToken.raisingAddress" type="text" /></label>
        <label>Mint Tax Rate: <input v-model="mixedToken.mintTaxRate" type="number" /></label>
        <label>Burn Tax Rate: <input v-model="mixedToken.burnTaxRate" type="number" /></label>
        <label>Fast Mint Amount: <input v-model="mixedToken.fastMintAmount" type="number" /></label>
      </div>
      <label>
        <button @click="getMixedTokenWithIndex">Get Mixed Token With Index</button>
        <button @click="launchMixedToken">Launch Mixed Token</button>
      </label>
    </form>
    <p>Result: {{ result }}</p>
  </div>
</template>

<script lang="ts" setup>
import { MixedTokenParam, factory } from '@solio/core';
import { Address, zeroAddress } from 'viem';
import { ref } from 'vue';
import { readClient, writeClient } from '../constant';

const address = ref<Address>('' as Address);
const mixedTokenIndex = ref(0);
const mixedToken = ref({
  type: '',
  bondingCurve: {
    type: '',
    param: {
      initPrice: 0,
      finalPrice: 0,
      finalSupply: 0,
    },
  },
  name: '',
  symbol: '',
  metadataUrl: '',
  raisingAddress: '',
  mintTaxRate: 0,
  burnTaxRate: 0,
  fastMintAmount: BigInt(0),
});
const result = ref('');

const getMixedTokenWithIndex = async () => {
  const res = await factory.read.getMixedTokenWithIndex(readClient, {
    address: address.value,
    mixedTokenIndex: BigInt(mixedTokenIndex.value),
  });
  result.value = res;
};

const launchMixedToken = async () => {
  const res = await factory.write.launchMixedToken(writeClient, {
    address: address.value,
    mixedToken: mixedToken.value as MixedTokenParam,
  });
  result.value = res;
};
</script>
