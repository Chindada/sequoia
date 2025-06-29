<script setup lang="ts">
import { computed, ref, watch } from "vue";

import AppFooter from "@/components/layouts/AppFooter.vue";
import AppSidebar from "@/components/layouts/AppSidebar.vue";
import AppTopbar from "@/components/layouts/AppTopbar.vue";
import { useLayout } from "@/components/layouts/composables/layout";

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref();

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});

const containerClass = computed(() => {
  return {
    "layout-overlay": layoutConfig.menuMode === "overlay",
    "layout-static": layoutConfig.menuMode === "static",
    "layout-static-inactive":
      layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === "static",
    "layout-overlay-active": layoutState.overlayMenuActive,
    "layout-mobile-active": layoutState.staticMenuMobileActive
  };
});

function bindOutsideClickListener() {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event: MouseEvent) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive = false;
        layoutState.staticMenuMobileActive = false;
        layoutState.menuHoverActive = false;
      }
    };
    document.addEventListener("click", outsideClickListener.value);
  }
}

function unbindOutsideClickListener() {
  if (outsideClickListener.value) {
    document.removeEventListener("click", outsideClickListener.value);
    outsideClickListener.value = null;
  }
}

function isOutsideClicked(event: MouseEvent) {
  const sidebarEl = document.querySelector(".layout-sidebar");
  const topbarEl = document.querySelector(".layout-menu-button");
  if (sidebarEl && topbarEl && event.target instanceof Node) {
    return !(
      sidebarEl.isSameNode(event.target) ||
      sidebarEl.contains(event.target) ||
      topbarEl.isSameNode(event.target) ||
      topbarEl.contains(event.target)
    );
  }
}
</script>

<template>
  <div class="layout-wrapper" :class="containerClass">
    <app-topbar></app-topbar>
    <app-sidebar></app-sidebar>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
      <app-footer></app-footer>
    </div>
    <div class="layout-mask animate-fadein"></div>
  </div>
  <CustomToast></CustomToast>
</template>
