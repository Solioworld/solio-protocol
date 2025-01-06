<template>
  <div>
    <h1>Router</h1>
    <form>
      <label>
        Contract Address:
        <input v-model="address" type="text" :placeholder="zeroAddress" />
      </label>
      <label>
        Pay Address:
        <input v-model="payAddress" type="text" :placeholder="zeroAddress" />
      </label>
      <label>
        Receive Address:
        <input v-model="receiveAddress" type="text" :placeholder="zeroAddress" />
      </label>
      <label>
        Pay Amount:
        <input v-model="payAmount" type="text" placeholder="" />
      </label>
      <label>
        Receive Amount:
        <input v-model="receiveAmount" type="text" placeholder="" />
      </label>
      <label>
        Raising Amount:
        <input v-model="raisingAmount" type="text" placeholder="" />
      </label>
      <label>
        Raising Token:
        <input v-model="raisingToken" type="text" placeholder="" />
      </label>
      <label>
        Mixed Token Index:
        <input v-model="mixedTokenIndex" type="text" placeholder="" />
      </label>
      <label>
        Min Mixed Token Amount:
        <input v-model="minMixedTokenAmount" type="text" placeholder="" />
      </label>
      <label>
        Pay Index:
        <input v-model="payIndex" type="text" placeholder="" />
      </label>
      <label>
        Receive Index:
        <input v-model="receiveIndex" type="text" placeholder="" />
      </label>
      <label>
        Min Receive Amount:
        <input v-model="minReceiveAmount" type="text" placeholder="" />
      </label>
      <label>
        Admin Address:
        <input v-model="adminAddress" type="text" placeholder="" />
      </label>
      <button @click="getFactory">Get Factory</button>
      <button @click="getAmountOut">Get Amount Out</button>
      <button @click="mint">Mint</button>
      <button @click="swap">Swap</button>
    </form>
    <p>Result: {{ result }}</p>
  </div>
</template>

<script setup lang="ts">
import { router } from '@solio/core';
import { Address, parseEther, zeroAddress } from 'viem';
import { ref } from 'vue';
import { readClient, writeClient } from '../constant';

const address = ref<Address>('' as Address);
const payAddress = ref<Address>('' as Address);
const receiveAddress = ref<Address>('' as Address);
const payAmount = ref('');
const receiveAmount = ref('');
const raisingAmount = ref('');
const raisingToken = ref<Address>('' as Address);
const mixedTokenIndex = ref('');
const minMixedTokenAmount = ref('');
const payIndex = ref('');
const receiveIndex = ref('');
const minReceiveAmount = ref('');
const adminAddress = ref<Address>('' as Address);
const result = ref('');

const getFactory = async () => {
  const resultValue = await router.read.getFactory(readClient, {
    address: address.value,
  });
  result.value = `Get Factory: ${resultValue}`;
};

const getAmountOut = async () => {
  const { receiveAmount: receiveAmountValue, raisingAmount: raisingAmountValue } = await router.read.getAmountOut(
    readClient,
    {
      address: address.value,
      payAddress: payAddress.value,
      receiveAddress: receiveAddress.value,
      payAmount: parseEther(payAmount.value),
    },
  );
  result.value = `Get Amount Out: receiveAmount=${receiveAmountValue}, raisingAmount=${raisingAmountValue}`;
};

const mint = async () => {
  const resultValue = await router.write.mint(writeClient, {
    address: address.value,
    raisingToken: raisingToken.value,
    raisingAmount: parseEther(raisingAmount.value),
    mixedTokenIndex: BigInt(mixedTokenIndex.value),
    minMixedTokenAmount: parseEther(minMixedTokenAmount.value),
  });
  result.value = `Mint: ${resultValue}`;
};

const swap = async () => {
  const resultValue = await router.write.swap(writeClient, {
    address: address.value,
    raisingToken: raisingToken.value,
    payAddress: payAddress.value,
    payIndex: BigInt(payIndex.value),
    payAmount: parseEther(payAmount.value),
    receiveAddress: receiveAddress.value,
    receiveIndex: BigInt(receiveIndex.value),
    minReceiveAmount: parseEther(minReceiveAmount.value),
  });
  result.value = `Swap: ${resultValue}`;
};
</script>
