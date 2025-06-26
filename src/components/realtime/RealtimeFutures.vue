<script setup lang="ts">
import { computed } from "vue";

import type { Future } from "@/pages/realtime/future.vue";

const futures = defineModel<Map<string, Future>>("futures", { required: true });

const futuresArray = computed(() => {
  return Array.from(futures.value.values());
});
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div v-for="future in futuresArray" :key="future.code">
      <div class="card">
        <div class="mb-2 text-center text-2xl font-bold">{{ future.code }}</div>
        <div class="mb-2 flex flex-col gap-2 text-center text-xl">
          <div>{{ future.tick ? future.tick.close : "--" }}</div>
          <div>{{ future.tick ? future.tick.price_chg : "--" }}</div>
        </div>
        <div v-if="future.bidAsk">
          <div class="flex max-w-full flex-row justify-center gap-6">
            <div class="text-center text-lg font-bold">
              {{ future.bidAsk.first_derived_bid_price }}
            </div>
            <div class="text-center text-lg font-bold">
              {{ future.bidAsk.first_derived_ask_price }}
            </div>
          </div>
          <div class="flex max-w-full flex-row justify-center">
            <BidAsk :reverse="true" :values="[future.bidAsk.bid_price, future.bidAsk.bid_volume]" />
            <BidAsk :values="[future.bidAsk.ask_price, future.bidAsk.ask_volume]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
