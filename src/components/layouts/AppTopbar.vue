<script setup lang="ts">
import { useLayout } from "./composables/layout";

const { toggleMenu } = useLayout();
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
        <i class="pi pi-bars"></i>
      </button>
      <router-link class="layout-topbar-logo" to="/">
        <img alt="Logo" height="10" src="@/assets/svg/logo.svg" width="50" />
        <span>TBT Capitan</span>
      </router-link>
    </div>

    <div class="layout-topbar-actions">
      <button
        v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          enterActiveClass: 'animate-scalein',
          leaveToClass: 'hidden',
          leaveActiveClass: 'animate-fadeout',
          hideOnOutsideClick: true
        }"
        class="layout-topbar-menu-button layout-topbar-action"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          <PopperUser />
          <PopperLocale />
        </div>
      </div>
    </div>
  </div>
</template>
