<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { Login } from "@/apis/auth";
import { ToastOpt } from "@/utils/toast";

const { t } = useI18n();
const toast = useToast();

const router = useRouter();
const username = ref("");
const password = ref("");

onMounted(() => {
  document.title = `TBT Capitan - ${t("login")}`;
});

const login = async () => {
  if (username.value === "" || password.value === "") {
    return;
  }

  Login(username.value, password.value)
    .then(async () => {
      router.push({
        path: "/"
      });
    })
    .catch(() => {
      toast.add(ToastOpt.error(t("login_failed")));
    });
};
</script>

<template>
  <div class="bg-surface-50 dark:bg-surface-950 flex h-screen w-full">
    <div
      class="bg-surface-0 dark:bg-surface-950 flex min-h-[46rem] w-full flex-col justify-center gap-12 rounded px-8 py-20 md:w-6/12 md:px-12 lg:px-20"
    >
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <img alt="Logo" class="h-28 w-28" height="32" src="@/assets/svg/logo.svg" width="33" />
        </div>
        <div class="flex flex-col gap-2">
          <div class="text-surface-900 dark:text-surface-0 text-3xl leading-tight font-semibold">
            TBT Capitan
          </div>
          <div>
            <span class="text-surface-700 dark:text-surface-200">{{ t("login_to_continue") }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <label class="text-surface-900 dark:text-surface-0 font-medium" for="username">{{
            t("username")
          }}</label>
          <InputText
            id="username"
            v-model="username"
            class="w-full rounded-md"
            :placeholder="t('enter_username')"
            style="height: 3rem"
            type="text"
            @keyup.enter="login"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-surface-900 dark:text-surface-0 font-medium" for="password">{{
            t("password")
          }}</label>
          <Password
            id="password"
            v-model="password"
            class="w-full rounded-md"
            :feedback="false"
            :input-style="{ width: '100%' }"
            :placeholder="t('enter_password')"
            size="large"
            style="height: 3rem"
            toggle-mask
            type="password"
            @keyup.enter="login"
          />
        </div>
      </div>
      <div class="flex w-full items-center justify-between">
        <LocaleDropdown />
        <Button class="w-fit !px-12" :label="t('login')" @click="login" />
      </div>
    </div>
    <div
      class="hidden w-6/12 md:block"
      style="
        background:
          linear-gradient(0deg, var(--p-primary-500) 0%, var(--p-primary-500) 100%),
          url(&quot;https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/block.images/blocks/signin/signin-split.jpg&quot;)
            lightgray 50% / cover no-repeat;
        background-blend-mode: overlay, normal;
      "
    />
  </div>
</template>

<route lang="json">
{
  "meta": {
    "layout": "BlankLayout"
  }
}
</route>
