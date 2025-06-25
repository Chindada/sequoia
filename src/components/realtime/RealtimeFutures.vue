<script setup lang="ts">
import { computed } from "vue";

import type { Future } from "@/pages/realtime/future.vue";

const futures = defineModel<Map<string, Future>>("futures", { required: true });

const futuresArray = computed(() => {
  return Array.from(futures.value.values());
});
</script>

<template>
  <div v-for="future in futuresArray" :key="future.code" class="mb-6 flex flex-col">
    <div class="card">
      <div class="mb-2 text-center text-2xl font-bold">{{ future.code }}</div>
      <div v-if="future.tick" class="mb-2 text-center text-xl">
        <div>{{ future.tick.close }}</div>
        <div>{{ future.tick.price_chg }}</div>
      </div>
      <div v-if="future.bidAsk" class="flex flex-row justify-center gap-10">
        <BidAsk :reverse="true" :values="[future.bidAsk.bid_price, future.bidAsk.bid_volume]" />
        <BidAsk :values="[future.bidAsk.ask_price, future.bidAsk.ask_volume]" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
