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
    {{ t("quota") }}
  </div>
</template>

<style lang="scss" scoped></style>
