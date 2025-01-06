<template>
  <div>
    <h2>Mixed Token Read</h2>
    <form @submit.prevent="handleReadSubmit">
      <label for="address">Contract Address: <input id="address" v-model="readAddress" type="text"
          :placeholder="zeroAddress" /></label>
      <button type="submit">Read</button>
    </form>
    <p>Get Raising Token: {{ readRaisingToken }}</p>
    <p>Get Admin: {{ readAdmin }}</p>
    <p>Get Metadata: {{ readMetadata }}</p>
    <p>Get Tax Rate: {{ readTaxRate }}</p>
    <p>Get Treasury: {{ readTreasury }}</p>
    <p>Get Estimate Mint: {{ readEstimateMint }}</p>
    <p>Get Estimate Burn: {{ readEstimateBurn }}</p>
    <p>Get Estimate Mint Need: {{ readEstimateMintNeed }}</p>

    <h2>Mixed Token Write</h2>
    <form @submit.prevent="handleWriteSubmit">
      <label for="address">
        Contract Address:
        <input id="address" v-model="writeAddress" type="text" :placeholder="zeroAddress">
      </label>

      <label for="raisingAmount">
        Raising Amount:
        <input id="raisingAmount" v-model="writeRaisingAmount" type="number" />
      </label>

      <label for="minMixedTokenAmount">
        Min Mixed Token Amount:
        <input id="minMixedTokenAmount" v-model="writeMinMixedTokenAmount" type="number" />
      </label>
      <label for="raisingAddress">
        Raising Address:
        <input id="raisingAddress" v-model="writeRaisingAddress" type="text" />
      </label>
      <button type="submit">Write</button>
    </form>
    <p>Mint Result: {{ writeMintResult }}</p>
    <p>Burn Result: {{ writeBurnResult }}</p>
  </div>
</template>

<script lang="ts" setup>
import { mixedToken } from '@solio/core';
import { Address, formatEther, parseEther, zeroAddress } from 'viem';
import { ref } from 'vue';
import { readClient, writeClient } from '../constant';

const readAddress = ref<Address>('' as Address);
const readRaisingToken = ref('');
const readAdmin = ref('');
const readMetadata = ref('');
const readTaxRate = ref('');
const readTreasury = ref('');
const readEstimateMint = ref('');
const readEstimateBurn = ref('');
const readEstimateMintNeed = ref('');

const writeAddress = ref<Address>('' as Address);
const writeRaisingAmount = ref(0);
const writeMinMixedTokenAmount = ref(0);
const writeRaisingAddress = ref<Address>('' as Address);
const writeMintResult = ref('');
const writeBurnResult = ref('');

const handleReadSubmit = async () => {
  const result = await mixedToken.read.getRaisingToken(readClient, {
    address: readAddress.value,
  });
  readRaisingToken.value = result;

  const admin = await mixedToken.read.getAdmin(readClient, {
    address: readAddress.value,
  });
  readAdmin.value = admin;

  const metadata = await mixedToken.read.getMetadata(readClient, {
    address: readAddress.value,
  });
  readMetadata.value = metadata;

  const taxRate = await mixedToken.read.getTaxRate(readClient, {
    address: readAddress.value,
  });
  readTaxRate.value = JSON.stringify(taxRate);

  const treasury = await mixedToken.read.getTreasury(readClient, {
    address: readAddress.value,
  });
  readTreasury.value = treasury;

  const estimateMint = await mixedToken.read.getEstimateMint(readClient, {
    address: readAddress.value,
    raisingAmount: parseEther('10'),
  });
  readEstimateMint.value = formatEther(estimateMint.mixedTokenAmount);

  const estimateBurn = await mixedToken.read.getEstimateBurn(readClient, {
    address: readAddress.value,
    mixedTokenAmount: parseEther('10000'),
  });
  readEstimateBurn.value = formatEther(estimateBurn.raisingAmount);

  const estimateMintNeed = await mixedToken.read.getEstimateMintNeed(readClient, {
    address: readAddress.value,
    mixedTokenAmount: parseEther('10000'),
  });
  readEstimateMintNeed.value = formatEther(estimateMintNeed.raisingAmount);
};

const handleWriteSubmit = async () => {
  const mintResult = await mixedToken.write.mint(writeClient, {
    address: writeAddress.value,
    raisingAmount: parseEther(writeRaisingAmount.value.toString()),
    raisingAddress: writeRaisingAddress.value,
    minMixedTokenAmount: 0n,
  });
  writeMintResult.value = mintResult;

  const burnResult = await mixedToken.write.burn(writeClient, {
    address: writeAddress.value,
    raisingAmount: parseEther(writeRaisingAmount.value.toString()),
    minMixedTokenAmount: parseEther(writeMinMixedTokenAmount.value.toString()),
  });
  writeBurnResult.value = burnResult;
};
</script>
