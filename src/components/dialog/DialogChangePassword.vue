<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import { ChangePassword } from "@/apis/user/user";
import { GetUsername } from "@/utils/jwt";
import { ToastOpt } from "@/utils/toast";

import type { APIResponse } from "@chindada/panther/typescript/system/api";

const { t } = useI18n();
const toast = useToast();

const visible = defineModel<boolean>("visible", { required: true });

const oldPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");

watch(visible, async (val) => {
  if (val) {
    oldPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
  }
});

const changePassword = async () => {
  const username = GetUsername();
  await ChangePassword(username, oldPassword.value, newPassword.value)
    .then(() => {
      visible.value = false;
      toast.add(ToastOpt.success(t("password_changed")));
    })
    .catch((e: APIResponse) => {
      if (e.code === -1 && e.response && e.response !== "") {
        toast.add(ToastOpt.error(e.response));
      } else if (e.code !== -1) {
        toast.add(ToastOpt.error(e.code.toString()));
      }
    });
};
</script>

<template>
  <Dialog
    v-model:visible="visible"
    append-to="body"
    :closable="false"
    :draggable="false"
    modal
    style="width: 25vw"
  >
    <template #header>
      <div class="flex flex-col gap-2">
        <span class="text-surface-900 m-0 text-xl leading-normal font-semibold">
          {{ t("change_password") }}
        </span>
      </div>
    </template>
    <form class="mt-4 flex flex-col gap-4">
      <div>
        <label class="text-color mb-2 block text-lg" for="old">{{ t("old_password") }}</label>
        <span class="p-input-icon-left w-full">
          <InputText
            id="old"
            v-model="oldPassword"
            class="w-full"
            minlength="8"
            name="old"
            :placeholder="t('enter_old_password')"
            type="password"
          />
        </span>
      </div>
      <div>
        <label class="text-color mb-2 block text-lg" for="new">{{ t("new_password") }}</label>
        <span class="p-input-icon-left w-full">
          <InputText
            id="new"
            v-model="newPassword"
            class="w-full"
            name="new"
            :placeholder="t('enter_new_password')"
            type="password"
          />
          <small v-if="newPassword && newPassword.length < 8" class="p-error">{{
            t("password_minimum_length_is_8")
          }}</small>
        </span>
      </div>
      <div>
        <label class="text-color mb-2 block text-lg" for="new">{{
          t("confirm_new_password")
        }}</label>
        <span class="p-input-icon-left w-full">
          <InputText
            id="new"
            v-model="confirmNewPassword"
            class="w-full"
            minlength="8"
            name="new"
            :placeholder="t('enter_new_password')"
            type="password"
          />
          <small v-if="confirmNewPassword && confirmNewPassword !== newPassword" class="p-error">{{
            t("confirm_password_is_not_same_as_password")
          }}</small>
        </span>
      </div>
    </form>
    <template #footer>
      <div class="border-surface flex justify-end gap-4 pt-8">
        <Button
          icon="pi pi-times"
          :label="t('cancel')"
          severity="danger"
          text
          @click="
            () => {
              visible = false;
            }
          "
        ></Button>
        <Button
          :disabled="
            !oldPassword ||
            !newPassword ||
            !confirmNewPassword ||
            newPassword.length < 8 ||
            confirmNewPassword.length < 8 ||
            newPassword !== confirmNewPassword
          "
          icon="pi pi-check"
          :label="t('change')"
          text
          @click="changePassword"
        ></Button>
      </div>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped></style>
