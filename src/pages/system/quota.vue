<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

onMounted(async () => {
  document.title = `TBT Capitan - ${t("quota")}`;
});
</script>

<template>
  <div class="card">
    <h3>{{ t("quota") }}</h3>
  </div>
</template>

<style lang="scss" scoped></style>
