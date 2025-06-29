<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="card">
    {{ t("place_order") }}
  </div>
</template>

<style lang="scss" scoped></style>
