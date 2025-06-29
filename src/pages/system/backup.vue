<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import path from "@/apis/path";
import { BackupAPI } from "@/apis/system/backup";
import { ToastOpt } from "@/utils/toast";

import type { APIResponse } from "@chindada/panther/typescript/system/api";
import { Backup, BackupList } from "@chindada/panther/typescript/system/backup";

const { t } = useI18n();
const toast = useToast();
const router = useRouter();

onMounted(async () => {
  document.title = `TBT Capitan - ${t("backup")}`;
  await getAllBackup();
});

const backupList = ref<BackupList>(BackupList.create());

const getAllBackup = async () => {
  BackupAPI.GetAllBackup()
    .then((res) => {
      backupList.value = res;
    })
    .catch((e: APIResponse) => {
      if (e.code === -1 && e.response && e.response !== "") {
        toast.add(ToastOpt.error(e.response));
      } else if (e.code !== -1) {
        toast.add(ToastOpt.error(e.code.toString()));
      }
    });
};

const creating = ref(false);
const createBackup = async () => {
  creating.value = true;
  BackupAPI.CreateBackup()
    .then(() => {
      getAllBackup();
    })
    .catch((e: APIResponse) => {
      if (e.code === -1 && e.response && e.response !== "") {
        toast.add(ToastOpt.error(e.response));
      } else if (e.code !== -1) {
        toast.add(ToastOpt.error(e.code.toString()));
      }
    })
    .finally(() => {
      creating.value = false;
    });
};

const deleteBackup = async (name: string) => {
  BackupAPI.DeleteBackup(name)
    .then(() => {
      getAllBackup();
    })
    .catch((e: APIResponse) => {
      if (e.code === -1 && e.response && e.response !== "") {
        toast.add(ToastOpt.error(e.response));
      } else if (e.code !== -1) {
        toast.add(ToastOpt.error(e.code.toString()));
      }
    });
};

const restoring = ref(false);
const restoreName = ref("");
const showRestoreDialog = computed(() => restoring.value && restoreName.value !== "");

const downloading = ref(false);
const downloadingMap = ref<Map<string, boolean>>(new Map());
const downloadBackup = (prod: Backup) => {
  downloading.value = true;
  downloadingMap.value.set(prod.name, true);
  BackupAPI.DownloadBackup(prod.name)
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", prod.name.concat(".zip"));
      document.body.appendChild(link);
      link.click();
    })
    .catch((e: APIResponse) => {
      if (e.code === -1 && e.response && e.response !== "") {
        toast.add(ToastOpt.error(e.response));
      } else if (e.code !== -1) {
        toast.add(ToastOpt.error(e.code.toString()));
      }
    })
    .finally(() => {
      downloading.value = false;
      downloadingMap.value.set(prod.name, false);
    });
};

const uploadURL = computed(() => {
  const token = localStorage.getItem("token")?.replace("Bearer ", "");
  return `${path.httpURLPrefix}/v1/system/backup/upload?token=${token}`;
});
const maxUploadSize = 1024 * 1000000;
</script>

<template>
  <div class="card">
    <div class="text-surface-900 mt-0 mb-2 text-3xl font-bold">
      {{ t("backup") }}
    </div>
    <ul class="m-0 list-none p-0">
      <li class="flex flex-wrap items-center justify-center px-2 py-4">
        <Button
          class="mr-12"
          icon="pi pi-plus"
          :label="t('backup')"
          :loading="creating"
          severity="success"
          @click="createBackup"
        />
        <FileUpload
          accept=".zip"
          auto
          choose-icon="pi pi-upload"
          :choose-label="t('upload')"
          :disabled="creating || restoring || downloading"
          :file-limit="1"
          :invalid-file-size-message="`${t('backup_size_exceeds_limit')}(${maxUploadSize / 1000 / 1000} mb)`"
          :invalid-file-type-message="t('backup_file_extension_not_allowed')"
          :max-file-size="maxUploadSize"
          mode="basic"
          name="file"
          :url="uploadURL"
          @error="
            (e) => {
              if (e.xhr.response) {
                toast.add(ToastOpt.error(e.xhr.status.toString()));
              }
            }
          "
          @upload="getAllBackup"
        />
      </li>
    </ul>
  </div>
  <div v-if="backupList.list.length !== 0" class="card">
    <div class="text-surface-900 mt-12 mb-2 text-3xl font-bold">
      {{ t("backup_list") }}
    </div>
    <ul class="m-0 list-none p-0">
      <div class="text-surface-500 mt-6 flex justify-center font-medium"></div>
      <li
        v-for="backup in backupList.list"
        :key="backup.name"
        class="flex flex-nowrap items-center px-2 py-4"
      >
        <div class="text-surface-500 w-6/12 font-medium md:w-2/12">
          {{ t("backup_name") }}
        </div>
        <div class="text-surface-900 order-1 w-full md:order-none md:w-8/12">
          {{ backup.name }}
        </div>
        <div class="flex w-full justify-end">
          <Button
            class="p-button-text"
            :disabled="creating || restoring || downloading"
            icon="pi pi-play"
            :label="t('restore')"
            severity="success"
            @click="
              () => {
                restoreName = backup.name;
                restoring = true;
              }
            "
          ></Button>
          <Button
            class="p-button-text"
            :disabled="backup.name.includes('-auto-')"
            icon="pi pi-download"
            :label="t('download')"
            :loading="downloadingMap.get(backup.name)"
            @click="downloadBackup(backup)"
          ></Button>
          <Button
            class="p-button-text"
            :disabled="downloadingMap.get(backup.name) || backup.name.includes('-auto-')"
            icon="pi pi-trash"
            :label="t('delete')"
            severity="danger"
            @click="deleteBackup(backup.name)"
          ></Button>
        </div>
      </li>
    </ul>
  </div>

  <RestoreHold
    :backup-name="restoreName"
    :show="showRestoreDialog"
    @done="
      () => {
        restoring = false;
        router.go(0);
      }
    "
  />
</template>

<style lang="scss" scoped></style>
