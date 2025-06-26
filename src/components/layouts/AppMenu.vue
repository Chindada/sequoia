<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import AppMenuItem from "./AppMenuItem.vue";
import type { MenuItem } from "./composables/layout";

const { t } = useI18n();

const model = ref<MenuItem[]>([
  {
    label: t("realtime"),
    items: [{ label: t("future"), icon: "fas fa-chart-line", to: "/realtime/future" }]
  },
  {
    label: t("system"),
    items: [
      {
        label: t("account_management"),
        icon: "fas fa-users",
        to: "/system/account"
      },
      {
        label: t("backup"),
        icon: "fas fa-sliders",
        to: "/system/backup"
      }
    ]
  }
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :index="i" :item="item"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
