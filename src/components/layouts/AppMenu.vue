<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import AppMenuItem from "./AppMenuItem.vue";
import type { MenuItem } from "./composables/layout";

const { t } = useI18n();

const model = ref<MenuItem[]>([
  {
    label: t("realtime"),
    items: [
      { label: t("future"), icon: "fas fa-chart-line", to: "/realtime/future" },
      { label: t("stock"), icon: "fas fa-chart-line", to: "/realtime/stock" }
    ]
  },
  {
    label: t("trade"),
    items: [
      {
        label: t("place_order"),
        icon: "fas fa-cart-shopping",
        to: "/trade/order"
      },
      {
        label: t("position"),
        icon: "fas fa-warehouse",
        to: "/trade/records"
      },
      {
        label: t("profit_loss"),
        icon: "fas fa-plus-minus",
        to: "/trade/records"
      },
      {
        label: t("trade_record"),
        icon: "fas fa-table-list",
        to: "/trade/records"
      }
    ]
  },
  {
    label: t("basic_data"),
    items: [
      {
        label: t("stock"),
        icon: "fas fa-cube",
        to: "/basic/data/stock"
      },
      {
        label: t("future"),
        icon: "fas fa-cube",
        to: "/basic/data/future"
      },
      {
        label: t("option"),
        icon: "fas fa-cube",
        to: "/basic/data/option"
      }
    ]
  },
  {
    label: t("historical_data"),
    items: [
      {
        label: t("ticks"),
        icon: "fas fa-chart-line",
        to: "/historical/ticks"
      },
      {
        label: t("kbar"),
        icon: "fas fa-chart-line",
        to: "/historical/kbar"
      }
    ]
  },
  {
    label: t("system"),
    items: [
      {
        label: t("quota"),
        icon: "fas fa-dollar-sign",
        to: "/system/quota"
      },
      {
        label: t("trade_agent"),
        icon: "fas fa-robot",
        to: "/system/robot"
      },
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
