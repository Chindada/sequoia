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
      <div>{{ future.code }}</div>
      <div v-if="future.tick">
        <div>{{ future.tick.close }}</div>
        <div>{{ future.tick.price_chg }}</div>
      </div>
      <div v-if="future.bidAsk">
        <div>{{ future.bidAsk.ask_price }} - {{ future.bidAsk.bid_price }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
