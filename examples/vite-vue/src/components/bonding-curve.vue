<template>
  <div>
    <h1>Bonding Curve Contract</h1>
    <form @submit.prevent="handleReadMintAmount">
      <h2>Read Mint Amount</h2>
      <label>
        Contract Address:
        <input v-model="readMintAmountForm.address" type="text" :placeholder="zeroAddress" />
      </label>
      <label>
        Type:
        <select v-model="readMintAmountForm.type">
          <option value="linear">Linear</option>
          <option value="exponential">Exponential</option>
        </select>
      </label>
      <label v-if="readMintAmountForm.type === 'linear'">
        Init Price:
        <input v-model="(readMintAmountForm.param as ParseLinearParam).initPrice" type="number" />
      </label>
      <label v-if="readMintAmountForm.type === 'linear'">
        Final Price:
        <input v-model="(readMintAmountForm.param as ParseLinearParam).finalPrice" type="number" />
      </label>
      <label v-if="readMintAmountForm.type === 'linear'">
        Supply:
        <input v-model="(readMintAmountForm.param as ParseLinearParam).finalSupply" type="number" />
      </label>
      <label v-if="readMintAmountForm.type === 'exponential'">
        aValue:
        <input v-model="(readMintAmountForm.param as ParseExponentialParam).aValue" type="number" />
      </label>
      <label v-if="readMintAmountForm.type === 'exponential'">
        initPrice:
        <input v-model="(readMintAmountForm.param as ParseExponentialParam).initPrice" type="number" />
      </label>
      <label>
        Raising Amount:
        <input v-model="readMintAmountForm.raisingAmount" type="number" />
      </label>
      <button type="submit">Get Mint Amount</button>
    </form>

    <form @submit.prevent="handleReadBurnAmount">
      <h2>Read Burn Amount</h2>
      <label>
        Contract Address:
        <input v-model="readBurnAmountForm.address" type="text" :placeholder="zeroAddress" />
      </label>
      <label>
        Type:
        <select v-model="readBurnAmountForm.type">
          <option value="linear">Linear</option>
          <option value="exponential">Exponential</option>
        </select>
      </label>
      <label v-if="readBurnAmountForm.type === 'linear'">
        Init Price:
        <input v-model="(readBurnAmountForm.param as ParseLinearParam).initPrice" type="number" />
      </label>
      <label v-if="readBurnAmountForm.type === 'linear'">
        Final Price:
        <input v-model="(readBurnAmountForm.param as ParseLinearParam).finalPrice" type="number" />
      </label>
      <label v-if="readBurnAmountForm.type === 'linear'">
        Final Supply:
        <input v-model="(readBurnAmountForm.param as ParseLinearParam).finalSupply" type="number" />
      </label>
      <label v-if="readBurnAmountForm.type === 'exponential'">
        aValue:
        <input v-model="(readBurnAmountForm.param as ParseExponentialParam).aValue" type="number" />
      </label>
      <label v-if="readBurnAmountForm.type === 'exponential'">
        initPrice:
        <input v-model="(readBurnAmountForm.param as ParseExponentialParam).initPrice" type="number" />
      </label>
      <label>
        Mixed Token Amount:
        <input v-model="readBurnAmountForm.mixedTokenAmount" type="number" />
      </label>
      <button type="submit">Get Burn Amount</button>
    </form>

    <p>Result: {{ result }}</p>
  </div>
</template>

<script lang="ts" setup>
import {
  BondingCurveGetBurnAmountProps,
  BondingCurveGetMintAmountProps,
  ParseExponentialParam,
  ParseLinearParam,
  bondingCurve,
} from '@solio/core';
import { Address, zeroAddress } from 'viem';
import { ref } from 'vue';
import { readClient } from '../constant';

const readMintAmountForm = ref({
  address: '' as Address,
  type: 'linear',
  param: {
    initPrice: 0,
    finalPrice: 0,
    finalSupply: 0,
  },
  raisingAmount: 0n,
} as BondingCurveGetMintAmountProps);

const readBurnAmountForm = ref({
  address: '' as Address,
  type: 'linear',
  param: {
    initPrice: 0,
    finalPrice: 0,
    finalSupply: 0,
  },
  mixedTokenAmount: 0n,
} as BondingCurveGetBurnAmountProps);

const result = ref('');

const handleReadMintAmount = async () => {
  const res = await bondingCurve.read.getMintAmount(readClient, readMintAmountForm.value);
  result.value = res.toString();
};

const handleReadBurnAmount = async () => {
  const res = await bondingCurve.read.getBurnAmount(readClient, readBurnAmountForm.value);
  result.value = res.toString();
};
</script>
