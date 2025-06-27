<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import path from "@/apis/path";

import { FutureBidAsk, FutureStream, FutureTick } from "@chindada/panther/typescript/stream/stream";

let socket: WebSocket | null = null;

const connecting = ref(true);
const connected = ref(false);
const retryID = ref(0);

const { t } = useI18n();
const isMounted = ref(false);

onMounted(async () => {
  document.title = `TBT Capitan - ${t("realtime")}${t("future")}`;
  isMounted.value = true;
  await connectWS();
});

onUnmounted(() => {
  isMounted.value = false;
});

onBeforeUnmount(async () => {
  if (socket) {
    socket.close();
    socket = null;
  }
  if (retryID.value !== 0) {
    window.clearTimeout(retryID.value);
  }
});

const futures = ref<Map<string, Future>>(new Map());

const connectWS = async () => {
  retryID.value = 0;
  const prototol = window.location.protocol === "https:" ? "wss" : "ws";
  const token = localStorage.getItem("token")?.replace("Bearer ", "");
  if (!token) {
    return;
  }
  const host = window.location.host;
  const url = `${prototol}://${host}${path.wsURLPrefix}/v1/stream/futures/trigger?token=${token}`;
  socket = new WebSocket(url);
  socket.binaryType = "arraybuffer";

  socket.onmessage = (event) => {
    const data = FutureStream.fromBinary(new Uint8Array(event.data));
    switch (data.data.oneofKind) {
      case "tick":
        if (!futures.value.has(data.code)) {
          futures.value.set(data.code, {
            code: data.code,
            tick: data.data.tick
          });
        } else {
          futures.value.get(data.code)!.delay =
            new Date().getTime() - Date.parse(data.data.tick.date_time);
          futures.value.get(data.code)!.tick = data.data.tick;
        }
        break;
      case "bid_ask":
        if (!futures.value.has(data.code)) {
          futures.value.set(data.code, {
            code: data.code,
            bidAsk: data.data.bid_ask
          });
        } else {
          futures.value.get(data.code)!.bidAsk = data.data.bid_ask;
        }
        break;
      default:
        return;
    }
  };

  socket.onopen = async () => {
    connecting.value = false;
    connected.value = true;
  };

  socket.onclose = () => {
    connected.value = false;
    retryID.value = window.setTimeout(async () => {
      if (isMounted.value) await connectWS();
    }, 2500);
  };
};
</script>

<script lang="ts">
export interface Future {
  code: string;
  delay?: number;
  tick?: FutureTick;
  bidAsk?: FutureBidAsk;
}
</script>

<template>
  <RealtimeFutures v-model:futures="futures" />
</template>

<style lang="scss" scoped></style>
