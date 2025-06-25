<script setup lang="ts">
import type { APIResponse } from "@chindada/panther/typescript/system/api";
import { SystemInfo } from "@chindada/panther/typescript/system/system";
import { useToast } from "primevue/usetoast";
import { onBeforeMount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import { SystemAPI } from "@/apis/system/system";
import { ToastOpt } from "@/utils/toast";

const { t } = useI18n();
const toast = useToast();

onMounted(() => {
  document.title = `TBT Capitan - ${t("home")}`;
});

onBeforeMount(async () => {
  await getHomeKanban();
});

const upTime = ref();
const sysInfo = ref<SystemInfo>(SystemInfo.create());
const getHomeKanban = async () => {
  await SystemAPI.GetSystemInfo()
    .then((res) => {
      sysInfo.value = res;
      const gap = new Date().getTime() - new Date(res.launch_time!.seconds * 1000).getTime();
      const totalSeconds = Math.floor(gap / 1000);
      const remSeconds = totalSeconds % 60;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const remMinutes = totalMinutes % 60;
      const totalHours = Math.floor(totalMinutes / 60);
      const remHours = totalHours % 24;
      const totalDays = Math.floor(totalHours / 24);
      upTime.value =
        totalDays > 0
          ? `${totalDays}day ${remHours}hr ${remMinutes}min ${remSeconds}sec`
          : totalHours > 0
            ? `${remHours}hr ${remMinutes}min ${remSeconds}sec`
            : totalMinutes > 0
              ? `${remMinutes}min ${remSeconds}sec`
              : `${remSeconds}sec`;
    })
    .catch((e: APIResponse) => {
      if (e.code === -1 && e.response && e.response !== "") {
        toast.add(ToastOpt.error(e.response));
      } else if (e.code !== -1) {
        toast.add(ToastOpt.error(e.code.toString()));
      }
    });
};
const showCommit = ref(false);
</script>

<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12 lg:col-span-8 xl:col-span-8">
      <HomeEvent />
    </div>
    <div class="col-span-12 lg:col-span-4 xl:col-span-4">
      <div class="card flex-col shadow-xs select-none">
        <div class="text-surface-500 mb-4 block font-medium">
          {{ t("disk_usage") }}
        </div>
        <ProgressBar :value="sysInfo.disk_usage">{{ sysInfo.disk_usage.toFixed(2) }}%</ProgressBar>
      </div>
      <div class="card flex-col shadow-xs select-none">
        <div class="text-surface-500 mb-4 block font-medium">
          {{ t("uptime") }}
        </div>
        <div class="text-surface-900 text-xl font-medium">
          {{ upTime }}
        </div>
      </div>
      <div class="card flex-col shadow-xs" @click="showCommit = !showCommit">
        <div class="text-surface-500 mb-4 block font-medium select-none">
          {{ t("system_version") }}
        </div>
        <div class="text-surface-900 flex justify-between text-lg font-medium">
          <div class="flex">
            {{ t("core") }}:
            {{ showCommit ? sysInfo.core?.commit.slice(0, 8) || "-" : sysInfo.core?.version }}
          </div>
          <div class="flex">
            {{ t("web") }}:
            {{ showCommit ? sysInfo.web?.commit.slice(0, 8) || "-" : sysInfo.web?.version }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
