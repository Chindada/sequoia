<script setup lang="ts">
import { usePrimeVue } from "primevue/config";
import { onMounted, ref, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { localeName } from "@/i18n";
import { enLocale } from "@/locales/primevue/us";
import { zhTWLocale } from "@/locales/primevue/zh_tw";

const { t, locale, availableLocales } = useI18n({ useScope: "global" });
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

const op = useTemplateRef("op");
const toggle = (event: MouseEvent) => {
  if (!op.value) return;
  op.value.toggle(event);
};
</script>

<template>
  <button class="layout-topbar-action" type="button" @click="toggle">
    <i class="pi pi-globe"></i>
    <span>{{ t("locales") }}</span>
    <Popover ref="op">
      <div class="flex flex-col gap-4">
        <div>
          <ul class="flex list-none flex-col gap-4">
            <button v-for="loc in availableLocales" :key="loc" @click="refLocale = loc">
              <li class="flex items-center justify-start gap-2">
                <div>
                  <span class="font-medium">{{ loc }}</span>
                </div>
              </li>
            </button>
          </ul>
        </div>
      </div>
    </Popover>
  </button>
</template>
