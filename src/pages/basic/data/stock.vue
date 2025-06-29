<script setup lang="ts">
import { FilterMatchMode } from "@primevue/core/api";
import { useToast } from "primevue/usetoast";
import { onBeforeMount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import { BasicAPI } from "@/apis/basic/basic";
import { ToastOpt } from "@/utils/toast";

import { StockDetailList } from "@chindada/panther/typescript/basic/stock";
import type { APIResponse } from "@chindada/panther/typescript/system/api";

const { t } = useI18n();
const toast = useToast();

const dt = ref();
const filters = ref({
  global: { value: "", matchMode: FilterMatchMode.CONTAINS }
});

const items = ref<StockDetailList>(StockDetailList.create());
const selectedItems = ref<StockDetailList>(StockDetailList.create());

onBeforeMount(async () => {
  await loadItems();
});

onMounted(async () => {
  document.title = `TBT Capitan - ${t("stock")}${t("basic_data")}`;
});

const loadItems = async () => {
  await BasicAPI.GetAllStockDetail()
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
      column-resize-mode="expand"
      :current-page-report-template="
        t('show')
          .concat(' ')
          .concat('{first}', ' ')
          .concat(t('to'), ' ')
          .concat('{last}', ' ')
          .concat(t('total'), ' ')
          .concat('{totalRecords}', ' ')
          .concat(t('stock'))
      "
      data-key="code"
      :export-filename="'Capitan_'.concat(t('stock'))"
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
            {{ t("stock") }}
          </span>
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
      <Column exportable field="code" :header="t('code')" sortable></Column>
      <Column exportable field="name" :header="t('name')" sortable></Column>
      <Column exportable field="exchange" :header="t('exchange')" sortable></Column>
      <Column exportable field="reference" :header="t('reference')" sortable>
        <template #body="slotProps">
          {{ slotProps.data.reference.toLocaleString() }}
        </template>
      </Column>
      <Column exportable field="day_trade" :header="t('day_trade')" sortable></Column>
      <Column exportable field="update_date" :header="t('update_date')" sortable></Column>
    </DataTable>
  </div>
</template>

<style lang="scss" scoped></style>
