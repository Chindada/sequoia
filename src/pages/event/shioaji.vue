<script setup lang="ts">
import { FilterMatchMode } from "@primevue/core/api";
import { DateTime } from "luxon";
import { useToast } from "primevue/usetoast";
import { onBeforeMount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import { EventAPI } from "@/apis/event/event";
import { ToastOpt } from "@/utils/toast";

import { ShioajiEventList } from "@chindada/panther/typescript/stream/stream";
import type { APIResponse } from "@chindada/panther/typescript/system/api";

const { t } = useI18n();
const toast = useToast();

const dt = ref();
const filters = ref({
  global: { value: "", matchMode: FilterMatchMode.CONTAINS }
});

const items = ref<ShioajiEventList>(ShioajiEventList.create());
const selectedItems = ref<ShioajiEventList>(ShioajiEventList.create());

onBeforeMount(async () => {
  await loadItems();
});

onMounted(async () => {
  document.title = `TBT Capitan - Shioaji ${t("event")}`;
});

const loadItems = async () => {
  await EventAPI.GetShioajiEvents()
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

const exportCSV = () => {
  dt.value.exportCSV();
};
</script>

<template>
  <div class="card">
    <DataTable
      ref="dt"
      v-model:selection="selectedItems.list"
      :current-page-report-template="
        t('show')
          .concat(' ')
          .concat('{first}', ' ')
          .concat(t('to'), ' ')
          .concat('{last}', ' ')
          .concat(t('total'), ' ')
          .concat('{totalRecords}', ' ')
          .concat(t('event'))
      "
      data-key="created_at"
      :export-filename="'Capitan_'.concat('_Shioaji_', t('event'))"
      :filters="filters"
      paginator
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      removable-sort
      :rows="50"
      :rows-per-page-options="[25, 50, 100]"
      :scrollable="true"
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
          <span class="m-0 text-3xl font-semibold"> Shioaji {{ t("event") }} </span>
          <div class="flex flex-row items-center justify-end gap-2">
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
        field="event_code"
        :header="t('event_code')"
        sortable
        style="min-width: 8rem"
      ></Column>
      <Column
        exportable
        field="event"
        :header="t('event')"
        sortable
        style="min-width: 20rem"
      ></Column>
      <Column exportable field="info" :header="t('info')" sortable></Column>
      <Column
        exportable
        field="created_at"
        :filter-field="
          (rawData) =>
            DateTime.fromSeconds(rawData.created_at.seconds).toFormat('yyyy-MM-dd HH:mm:ss')
        "
        :header="t('created_at')"
        sortable
        style="min-width: 18rem"
      >
        <template #body="slotProps">
          {{
            DateTime.fromSeconds(slotProps.data.created_at.seconds).toFormat("yyyy-MM-dd HH:mm:ss")
          }}
        </template></Column
      >
    </DataTable>
  </div>
</template>

<style lang="scss" scoped></style>
