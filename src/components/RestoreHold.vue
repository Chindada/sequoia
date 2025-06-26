<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { onBeforeUnmount, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import path from "@/apis/path";
import { BackupAPI } from "@/apis/system/backup";
import { ToastOpt } from "@/utils/toast";

import type { APIResponse } from "@chindada/panther/typescript/system/api";

const { t } = useI18n();
const toast = useToast();
const isMounted = ref(false);

const restorDone = ref<boolean>(false);
const restoring = ref<boolean>(false);
let socket: WebSocket | null = null;

const props = defineProps({
  backupName: {
    type: String,
    required: true
  },
  show: {
    type: Boolean,
    required: true
  }
});

const restoreBackup = () => {
  connectWS();
};

const connectWS = () => {
  const prototol = window.location.protocol === "https:" ? "wss" : "ws";
  const url = `${prototol}://${window.location.host}${path.wsURLPrefix}/v1/health`;
  socket = new WebSocket(url);
  socket.binaryType = "arraybuffer";

  socket.onopen = async () => {
    if (restoring.value) {
      restorDone.value = true;
      return;
    }
    await BackupAPI.RestoreBackup(props.backupName).catch((e: APIResponse) => {
      if (e.code === -1 && e.response && e.response !== "") {
        toast.add(ToastOpt.error(e.response));
      } else if (e.code !== -1) {
        toast.add(ToastOpt.error(e.code.toString()));
      }
    });
  };

  socket.onclose = () => {
    socket?.close();
    restoring.value = true;
    socket = null;
    retryID.value = window.setTimeout(() => {
      if (isMounted.value) connectWS();
    }, 1500);
  };
};
const retryID = ref(0);

onBeforeUnmount(() => {
  if (retryID.value !== 0) {
    window.clearTimeout(retryID.value);
  }
});

onMounted(() => {
  isMounted.value = true;
});

onUnmounted(() => {
  isMounted.value = false;
  if (socket) {
    socket.close();
    socket = null;
  }
});

const emit = defineEmits(["done"]);
const submitted = ref(false);
</script>

<template>
  <Dialog :closable="false" :close-on-escape="false" :draggable="false" modal :visible="props.show">
    <div v-if="!restoring && !restorDone" class="flex flex-row items-center">
      <div class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem" />
      <div>
        {{ t("are_you_sure_to_restore") }} <b>{{ props.backupName }}</b
        >?
      </div>
    </div>
    <div
      v-if="restoring && !restorDone"
      class="flex flex-row items-center justify-center"
      style="width: 200px"
    >
      <div class="pi pi-spin pi-spinner text-blue-500" style="font-size: 2.5rem"></div>
    </div>
    <div v-if="restorDone" class="flex flex-row items-center" style="width: 200px">
      <div class="pi pi-info-circle mr-4" style="font-size: 1.5rem" />
      <div>{{ t("restore_done") }}</div>
    </div>
    <template #footer>
      <Button
        v-if="!restoring && !restorDone"
        :disabled="submitted"
        icon="pi pi-times"
        :label="t('no')"
        severity="danger"
        text
        @click="
          () => {
            emit('done');
          }
        "
      />
      <Button
        v-if="!restoring && !restorDone"
        icon="pi pi-check"
        :label="t('yes')"
        :loading="submitted"
        text
        @click="
          () => {
            submitted = true;
            restoreBackup();
          }
        "
      />
      <Button
        v-if="restorDone"
        icon="pi pi-check"
        :label="t('yes')"
        text
        @click="
          () => {
            emit('done');
          }
        "
      />
    </template>
  </Dialog>
</template>

<style lang="scss" scoped></style>
