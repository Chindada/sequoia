<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

onMounted(async () => {
  document.title = `TBT Capitan - ${t("unauthorized_operation")}`;
});
</script>

<template>
  <div
    class="bg-surface-50 flex min-h-screen min-w-full items-center justify-center overflow-hidden"
  >
    <div class="w-6/12 items-center justify-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            rgba(33, 150, 243, 0.4) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="bg-surface-0 flex flex-col items-center px-8 py-20 sm:px-20"
          style="border-radius: 53px"
        >
          <img alt="Logo" class="mb-8 w-24 shrink-0" src="@/assets/svg/logo.svg" />
          <span class="text-8xl font-bold text-blue-500">403</span>
          <h1 class="text-surface-900 mb-2 text-3xl font-bold lg:text-5xl">
            {{ t("unauthorized_operation") }}
          </h1>
          <RouterLink class="border-surface-300 flex items-center py-8" to="/">
            <span
              class="rounded-border flex items-center justify-center bg-cyan-400"
              style="height: 3.5rem; width: 3.5rem"
            >
              <i class="pi pi-fw pi-home text-surface-50" style="font-size: 2rem"></i>
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="json">
{
  "meta": {
    "layout": "BlankLayout"
  }
}
</route>
