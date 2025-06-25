<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";

import { Logout } from "@/apis/auth";
import router from "@/router";

const { t } = useI18n();

const userPop = useTemplateRef("op");
const toggle = (event: MouseEvent) => {
  if (userPop.value) userPop.value.toggle(event);
};
const showChangePassword = ref(false);
const logout = () => {
  Logout();
  router.push("/login");
};
</script>

<template>
  <button class="layout-topbar-action" type="button" @click="toggle">
    <i class="pi pi-user"></i>
    <span>{{ t("user") }}</span>
    <Popover ref="op">
      <div class="flex w-full flex-col gap-4">
        <div>
          <ul class="m-0 flex list-none flex-col gap-4 p-0">
            <button class="p-link layout-topbar-button" text @click="showChangePassword = true">
              <li class="flex items-center gap-6">
                <div>
                  <span class="font-medium">{{ t("change_password") }}</span>
                </div>
                <div class="text-muted-color ml-auto">
                  <i class="pi pi-key"></i>
                </div>
              </li>
            </button>
          </ul>
        </div>
        <div>
          <ul class="m-0 flex list-none flex-col gap-4 p-0">
            <button class="p-link layout-topbar-button" text @click="logout">
              <li class="flex items-center gap-6">
                <div>
                  <span class="font-medium">{{ t("logout") }}</span>
                </div>
                <div class="text-muted-color ml-auto">
                  <i class="pi pi-sign-out"></i>
                </div>
              </li>
            </button>
          </ul>
        </div>
      </div>
    </Popover>
  </button>
  <DialogChangePassword v-model:visible="showChangePassword" />
</template>

<style lang="scss" scoped></style>
