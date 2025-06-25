<script setup lang="ts">
import { DateTime } from "luxon";
import { useToast } from "primevue/usetoast";
import { onBeforeMount, ref } from "vue";
import { useI18n } from "vue-i18n";

import { EventAPI } from "@/apis/event/event";
import { ToastOpt } from "@/utils/toast";

import type { APIResponse } from "@chindada/panther/typescript/system/api";
import { LoginEventList } from "@chindada/panther/typescript/system/event";

const { t } = useI18n();

const toast = useToast();
const loginEvents = ref<LoginEventList>(LoginEventList.create());

const getLoginEvents = async () => {
  EventAPI.GetLoginEvents()
    .then((res) => {
      loginEvents.value = LoginEventList.create({ list: res.list });
    })
    .catch((e: APIResponse) => {
      if (e.code === -1 && e.response && e.response !== "") {
        toast.add(ToastOpt.error(e.response));
      } else if (e.code !== -1) {
        toast.add(ToastOpt.error(e.code.toString()));
      }
    });
};

onBeforeMount(() => {
  getLoginEvents();
});
</script>

<template>
  <div class="card overflow-scroll shadow-xs select-none">
    <div class="text-surface-500 mb-4 block font-medium">
      <div>{{ t("system_event") }}</div>
    </div>
    <ul class="mx-0 mt-0 mb-6 list-none p-0">
      <li
        v-for="(item, i) in loginEvents.list"
        :key="i"
        class="border-surface flex items-center border-b py-2"
      >
        <div
          class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100"
        >
          <i
            class="pi pi-calendar"
            :class="item.resp_code === 0 ? 'text-green-500' : 'text-red-500'"
            style="font-size: 1.5rem"
          ></i>
        </div>
        <div class="flex w-full justify-between">
          <span class="text-surface-900 leading-normal"
            >{{ item.resp_code === 0 ? t("login_success") : t("login_failed") }}
            <span class="text-surface-700">
              -
              {{ item.user && item.user.basic ? item.user.basic.username : t("unknown_user") }}
              - {{ item.ip }}</span
            >
          </span>
          <div class="mono">
            {{ DateTime.fromSeconds(item.created_at!.seconds).toFormat("yyyy/MM/dd HH:mm") }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.mono {
  font-family: "Roboto Mono";
}
</style>
