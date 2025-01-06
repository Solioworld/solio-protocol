<template>
  <div>
    <h1>Erc20 Contract</h1>
    <form>
      <label>
        Account Address:
        <input v-model="accountAddress" type="text" placeholder="" />
      </label>
      <label>
        Token Address:
        <input v-model="tokenAddress" type="text" placeholder="" />
      </label>
      <label>
        Spender Address:
        <input v-model="spenderAddress" type="text" placeholder="" />
      </label>
      <label>
        Amount:
        <input v-model="amount" type="text" />
      </label>
      <button @click="getBalanceOfChainToken">Get Balance Of Chain Token</button>
      <button @click="getBalanceOfErc20">Get Balance Of Erc20</button>
      <button @click="getBalanceOfMixedToken">Get Balance Of Mixed Token</button>

      <button @click="approveChainToken">Approve Chain Token</button>
      <button @click="approveErc20">Approve Erc20</button>
      <button @click="approveMixedToken">Approve Mixed Token</button>

      <button @click="checkAndApproveErc20">Check And Approve Erc20</button>
      <button @click="checkAndApproveMixedToken">Check And Approve Mixed Token</button>
    </form>
    <p>Result: {{ result }}</p>
  </div>
</template>

<script setup lang="ts">
import { erc20 } from '@solio/core';
import { Address, parseEther } from 'viem';
import { ref } from 'vue';
import { readClient, writeClient } from '../constant';

const accountAddress = ref<Address>('' as Address);
const tokenAddress = ref<Address>('' as Address);
const spenderAddress = ref<Address>('' as Address);
const amount = ref('');
const result = ref('');

async function getBalanceOfChainToken() {
  const res = await erc20.read.getBalanceOf(readClient, {
    account: accountAddress.value,
  });
  result.value = res.toString();
}

async function getBalanceOfErc20() {
  const res = await erc20.read.getBalanceOf(readClient, {
    address: tokenAddress.value,
    account: accountAddress.value,
  });
  result.value = res.toString();
}

async function getBalanceOfMixedToken() {
  const res = await erc20.read.getBalanceOf(readClient, {
    address: tokenAddress.value,
    account: accountAddress.value,
  });
  result.value = res.toString();
}

async function approveChainToken() {
  const res = await erc20.write.approve(writeClient, {
    account: accountAddress.value,
    spender: spenderAddress.value,
    address: tokenAddress.value,
  });
  result.value = res ?? '';
}

async function approveErc20() {
  const res = await erc20.write.approve(writeClient, {
    address: tokenAddress.value,
    spender: spenderAddress.value,
    amount: parseEther(amount.value),
  });
  result.value = res ?? '';
}

async function approveMixedToken() {
  const res = await erc20.write.approve(writeClient, {
    address: tokenAddress.value,
    spender: spenderAddress.value,
  });
  result.value = res ?? '';
}

async function checkAndApproveErc20() {
  const res = await erc20.write.checkAndApprove(writeClient, {
    address: tokenAddress.value,
    spender: spenderAddress.value,
    amount: parseEther(amount.value),
  });
  result.value = res ?? '';
}

async function checkAndApproveMixedToken() {
  const res = await erc20.write.checkAndApprove(writeClient, {
    address: tokenAddress.value,
    spender: spenderAddress.value,
  });
  result.value = res ?? '';
}
</script>
