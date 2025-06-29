<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

onMounted(async () => {
  document.title = `TBT Capitan - ${t("trade_agent")}`;
});
</script>

<template>
  <div class="card">
    {{ t("trade_agent") }}
  </div>
</template>

<style lang="scss" scoped></style>
