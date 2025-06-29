<script setup lang="ts">
import { usePrimeVue } from "primevue/config";
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { localeName } from "@/i18n";
import { enLocale } from "@/locales/primevue/us";
import { zhTWLocale } from "@/locales/primevue/zh_tw";

const { locale, availableLocales } = useI18n({ useScope: "global" });
const router = useRouter();
const primevue = usePrimeVue();
const refLocale = ref(locale);

onMounted(() => {
  const locale = localStorage.getItem("locale");
  if (locale) {
    if (locale === localeName.localeNameZhTW) {
      primevue.config.locale = zhTWLocale;
    } else if (locale === localeName.localeNameEn) {
      primevue.config.locale = enLocale;
    }
  }
});

watch(refLocale, (newVal) => {
  localStorage.setItem("locale", newVal);
  router.go(0);
});
</script>

<template>
  <Select
    :key="`locale-${refLocale}`"
    v-model="refLocale"
    :options="availableLocales"
    scroll-height="30rem"
  >
  </Select>
</template>
