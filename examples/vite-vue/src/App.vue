<script setup lang="ts">
import BondingCurve from './components/bonding-curve.vue';
import Erc20 from './components/erc20.vue';
import Factory from './components/factory.vue';
import MixedToken from './components/mixed-token.vue';
import Router from './components/router.vue';
</script>

<template>
  <h1>Vite + Vue + Matcha css</h1>
  <div>
    <a href="#bonding-curve">Bonding-Curve</a> * <a href="#erc20">Erc20</a>
    * <a href="#factory">Factory</a> * <a href="#mixed-token">Mixed Token</a>
    * <a href="#router">Router</a>
    <!-- bonding-curve  -->
    <div id="bonding-curve">
      <BondingCurve />
    </div>
    <!-- erc20 -->
    <div id="erc20">
      <Erc20 />
    </div>
    <!-- factory -->
    <div id="factory">
      <Factory />
    </div>
    <!-- mixed-token -->
    <div id="mixed-token">
      <MixedToken />
    </div>
    <!-- router  -->
    <div id="router">
      <Router />
    </div>
  </div>
</template>

<style scoped></style>
