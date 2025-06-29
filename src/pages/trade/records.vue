<script setup lang="ts">
import { FilterMatchMode } from "@primevue/core/api";
import { DateTime } from "luxon";
import { useToast } from "primevue/usetoast";
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import path from "@/apis/path";
import { TradeAPI } from "@/apis/trade/trade";
import { ToastOpt } from "@/utils/toast";

import type { APIResponse } from "@chindada/panther/typescript/system/api";
import { OrderStatus, OrderType, Trade, TradeList } from "@chindada/panther/typescript/trade/trade";

let socket: WebSocket | null = null;

const { t } = useI18n();
const toast = useToast();

const isMounted = ref(false);
const retryID = ref(0);

const connecting = ref(true);
const connected = ref(false);

const dt = ref();
const filters = ref({
  global: { value: "", matchMode: FilterMatchMode.CONTAINS }
});

const items = ref<TradeList>(TradeList.create());
const selectedItems = ref<TradeList>(TradeList.create());

onBeforeMount(async () => {
  startDate.value = new Date(new Date().setHours(0, 0, 0, 0));
  startDate.value.setDate(startDate.value.getDate());
  endDate.value = new Date(new Date().setHours(0, 0, 0, 0));
  endDate.value.setDate(endDate.value.getDate() + 1);
  maxStartDate.value = new Date(new Date().setHours(0, 0, 0, 0));
  maxStartDate.value.setDate(maxStartDate.value.getDate());

  setToDay();
  await loadItems();
});

onMounted(async () => {
  document.title = `TBT Capitan - ${t("trade_record")}`;
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

const connectWS = async () => {
  retryID.value = 0;
  const prototol = window.location.protocol === "https:" ? "wss" : "ws";
  const token = localStorage.getItem("token")?.replace("Bearer ", "");
  if (!token) {
    return;
  }
  const host = window.location.host;
  const url = `${prototol}://${host}${path.wsURLPrefix}/v1/trade/trigger?token=${token}`;
  socket = new WebSocket(url);
  socket.binaryType = "arraybuffer";

  socket.onmessage = (event) => {
    const data = Trade.fromBinary(new Uint8Array(event.data));
    const index = items.value.list.findIndex((item) => item.order_id === data.order_id);
    if (index !== -1) {
      items.value.list[index] = data;
    } else {
      items.value.list.unshift(data);
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

const loadItems = async () => {
  if (!startDate.value || !endDate.value) return;
  await TradeAPI.GetTradesByTime(startDate.value, endDate.value)
    .then((res) => {
      items.value = res;
    })
    .catch((e: APIResponse) => {
      if (e.code === -1 && e.response && e.response !== "") {
        toast.add(ToastOpt.error(e.response));
      } else if (e.code !== -1) {
        toast.add(ToastOpt.error(e.code.toString()));
      }
    });
};

const triggerUpate = async () => {
  await TradeAPI.TriggerUpdateTrades().catch((e: APIResponse) => {
    if (e.code === -1 && e.response && e.response !== "") {
      toast.add(ToastOpt.error(e.response));
    } else if (e.code !== -1) {
      toast.add(ToastOpt.error(e.code.toString()));
    }
  });
};

const startDate = ref<Date>();
const endDate = ref<Date>();
const maxStartDate = ref<Date>();
const maxEndDate = ref<Date>(new Date());
const selectedPeriod = ref("");

const setToDay = () => {
  selectedPeriod.value = "day";
  endDate.value = new Date(new Date().setHours(23, 59, 59, 999));
  startDate.value = new Date(new Date().setHours(0, 0, 0, 0));
  startDate.value.setDate(new Date().getDate());
};

const setToWeek = () => {
  selectedPeriod.value = "week";
  endDate.value = new Date(new Date().setHours(23, 59, 59, 999));
  startDate.value = new Date(new Date().setHours(0, 0, 0, 0));
  startDate.value.setDate(new Date().getDate() - 6);
};

const setToMonth = () => {
  selectedPeriod.value = "month";
  endDate.value = new Date(new Date().setHours(23, 59, 59, 999));
  startDate.value = new Date(new Date().setHours(0, 0, 0, 0));
  startDate.value.setMonth(new Date().getMonth() - 1);
};

const setToAll = async () => {
  selectedPeriod.value = "all";
  // items.value.list = [];
  await TradeAPI.GetAllTrades()
    .then((res) => {
      startDate.value = items.value.list[items.value.list.length - 1].order_time
        ? new Date(items.value.list[items.value.list.length - 1].order_time!.seconds * 1000)
        : new Date();
      endDate.value = items.value.list[0].order_time
        ? new Date(items.value.list[0].order_time.seconds * 1000)
        : new Date();
      items.value = res;
    })
    .catch((e: APIResponse) => {
      if (e.code === -1 && e.response && e.response !== "") {
        toast.add(ToastOpt.error(e.response));
      } else if (e.code !== -1) {
        toast.add(ToastOpt.error(e.code.toString()));
      }
    });
};

const exportCSV = () => {
  dt.value.exportCSV();
};

const getOrderType = (type: OrderType) => {
  switch (type) {
    case OrderType.TYPE_STOCK_LOT:
      return t("stock_lot");
    case OrderType.TYPE_STOCK_SHARE:
      return t("stock_share");
    case OrderType.TYPE_FUTURE:
      return t("future");
    case OrderType.TYPE_OPTION:
      return t("option");
    default:
      return t("unknown");
  }
};

const getOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.UNKNOWN:
      return t("order_status_unknown");
    case OrderStatus.CANCELLED:
      return t("order_status_cancelled");
    case OrderStatus.FILLED:
      return t("order_status_filled");
    case OrderStatus.PART_FILLED:
      return t("order_status_part_filled");
    case OrderStatus.INACTIVE:
      return t("order_status_inactive");
    case OrderStatus.FAILED:
      return t("order_status_failed");
    case OrderStatus.PENDING_SUBMIT:
      return t("order_status_pending_submit");
    case OrderStatus.PRE_SUBMITTED:
      return t("order_status_pre_submitted");
    case OrderStatus.SUBMITTED:
      return t("order_status_submitted");
    default:
      return t("order_status_unknown");
  }
};

// const getName = (data: Trade) => {
//   if (data.stock) return data.stock.name;
//   if (data.future) return data.future.name;
//   if (data.option) return data.option.name;
//   return "-";
// };
</script>

<template>
  <div class="card">
    <Toolbar class="flex-nowrap overflow-hidden text-ellipsis whitespace-nowrap">
      <template #start>
        <Button
          class="mr-1"
          :label="t('abbr_day')"
          :outlined="selectedPeriod !== 'day'"
          @click="
            async () => {
              setToDay();
              await loadItems();
            }
          "
        />
        <Button
          class="mr-1"
          :label="t('abbr_week')"
          :outlined="selectedPeriod !== 'week'"
          @click="
            async () => {
              setToWeek();
              await loadItems();
            }
          "
        />
        <Button
          class="mr-1"
          :label="t('abbr_month')"
          :outlined="selectedPeriod !== 'month'"
          @click="
            async () => {
              setToMonth();
              await loadItems();
            }
          "
        />
        <Button
          :label="t('all')"
          :outlined="selectedPeriod !== 'all'"
          @click="
            async () => {
              await setToAll();
            }
          "
        />
      </template>
      <template #center>
        <label class="mr-2 block font-bold" for="startDate">
          {{ t("start_date") }}
        </label>
        <DatePicker
          v-model="startDate"
          class="mr-2"
          date-format="yy/mm/dd"
          icon-display="input"
          input-id="startDate"
          :manual-input="false"
          :max-date="maxStartDate"
          select-other-months
          show-button-bar
          show-icon
        />
        <label class="mr-2 block font-bold" for="endDate">
          {{ t("end_date") }}
        </label>
        <DatePicker
          v-model="endDate"
          class="mr-12"
          date-format="yy/mm/dd"
          icon-display="input"
          input-id="endDate"
          :manual-input="false"
          :max-date="maxEndDate"
          select-other-months
          show-button-bar
          show-icon
          @date-select="
            (value: Date) => {
              endDate = new Date(value.setHours(23, 59, 59, 999));
            }
          "
        />
      </template>
      <template #end>
        <Button
          class="mr-2"
          :disabled="endDate! < startDate!"
          icon="pi pi-search"
          :label="t('search')"
          severity="info"
          @click="
            async () => {
              if (!startDate || !endDate) return;
              await loadItems();
            }
          "
        />
      </template>
    </Toolbar>
  </div>

  <div class="card">
    <DataTable
      ref="dt"
      v-model:selection="selectedItems.list"
      column-resize-mode="expand"
      :current-page-report-template="
        t('show')
          .concat(' ')
          .concat('{first}', ' ')
          .concat(t('to'), ' ')
          .concat('{last}', ' ')
          .concat(t('total'), ' ')
          .concat('{totalRecords}', ' ')
          .concat(t('trade_record'))
      "
      data-key="order_id"
      :export-filename="
        !startDate || !endDate
          ? 'Capitan_'.concat(t('trade_record'))
          : 'Capitan_'.concat(
              t('trade_record'),
              '_',
              startDate!.toISOString().split('T')[0],
              '_',
              endDate!.toISOString().split('T')[0]
            )
      "
      :filters="filters"
      paginator
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      removable-sort
      :rows="50"
      :rows-per-page-options="[25, 50, 100]"
      selection-mode="multiple"
      striped-rows
      :value="items.list"
    >
      <template #empty>
        <div class="text-surface-400 flex items-center justify-center text-xl font-bold">
          {{ t("no_data") }}
        </div>
      </template>

      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2 pb-4">
          <span class="m-0 text-3xl font-semibold">
            {{ t("trade_record") }}
          </span>
          <div class="flex flex-row items-center justify-end gap-2">
            <Button
              class="mr-2"
              icon="pi pi-refresh"
              :label="t('refresh')"
              severity="secondary"
              text
              @click="triggerUpate"
            />
            <IconField icon-position="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                v-model="filters['global'].value"
                :class="filters['global'].value ? 'mr-2' : ''"
                :placeholder="t('search').concat('...')"
              />
              <Button
                v-if="filters['global'].value"
                class="p-button-outlined p-button-secondary"
                icon="pi pi-times"
                @click="
                  () => {
                    filters['global'].value = '';
                  }
                "
              />
            </IconField>
            <Button
              v-tooltip.top="`${t('export')} CSV`"
              :disabled="!items || !items.list.length"
              icon="pi pi-upload"
              :label="t('export')"
              severity="help"
              @click="exportCSV()"
            />
          </div>
        </div>
      </template>
      <Column selection-mode="multiple"></Column>
      <Column
        exportable
        field="type"
        :filter-field="(rawData) => getOrderType(rawData.type)"
        :header="t('type')"
        :sort-field="(rawData) => getOrderType(rawData.type)"
        sortable
      >
        <template #body="slotProps">
          {{ getOrderType(slotProps.data.type) }}
        </template>
      </Column>
      <!-- <Column
        exportable
        :filter-field="(rawData) => getName(rawData)"
        :header="t('name')"
        :sort-field="(rawData) => getName(rawData)"
        sortable
      >
        <template #body="slotProps">
          {{ getName(slotProps.data) }}
        </template>
      </Column> -->
      <Column exportable field="code" :header="t('code')" sortable></Column>
      <Column exportable field="order_id" :header="t('order_id')" sortable></Column>
      <Column exportable field="price" :header="t('price')" sortable>
        <template #body="slotProps">
          {{ slotProps.data.price.toLocaleString() }}
        </template></Column
      >
      <Column exportable field="quantity" :header="t('quantity')" sortable>
        <template #body="slotProps">
          {{ slotProps.data.quantity.toLocaleString() }}
        </template></Column
      >
      <Column exportable field="filled_quantity" :header="t('filled_quantity')" sortable>
        <template #body="slotProps">
          {{ slotProps.data.filled_quantity.toLocaleString() }}
        </template></Column
      >
      <Column
        exportable
        field="status"
        :filter-field="(rawData) => getOrderStatus(rawData.status)"
        :header="t('status')"
        :sort-field="(rawData) => getOrderStatus(rawData.status)"
        sortable
      >
        <template #body="slotProps">
          <!-- {{ getOrderStatus(slotProps.data.status) }} -->
          <Tag class="shadow-sm" severity="info" style="user-select: none">{{
            getOrderStatus(slotProps.data.status)
          }}</Tag>
        </template>
      </Column>
      <Column
        exportable
        field="order_time"
        :filter-field="
          (rawData) =>
            DateTime.fromSeconds(rawData.order_time.seconds).toFormat('yyyy-MM-dd HH:mm:ss')
        "
        :header="t('order_time')"
        sortable
      >
        <template #body="slotProps">
          {{
            DateTime.fromSeconds(slotProps.data.order_time.seconds).toFormat("yyyy-MM-dd HH:mm:ss")
          }}
        </template></Column
      >
    </DataTable>
  </div>
</template>

<style lang="scss" scoped></style>
