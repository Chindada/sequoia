<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

onMounted(async () => {
  document.title = `TBT Capitan - ${t("profit_loss")}`;
});
</script>

<template>
  <div class="card">
    <h3>{{ t("profit_loss") }}</h3>
  </div>
</template>

<style lang="scss" scoped></style>
