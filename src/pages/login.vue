<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { Login } from "@/apis/auth";

const { t } = useI18n();

const checked2 = ref(true);
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
      // toast.add(ToastOpt.error(t("login_failed")));
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
          <svg
            class="h-14 w-14"
            fill="none"
            height="32"
            viewBox="0 0 33 32"
            width="33"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="fill-surface-700 dark:fill-surface-200"
              clip-rule="evenodd"
              d="M7.09219 2.87829C5.94766 3.67858 4.9127 4.62478 4.01426 5.68992C7.6857 5.34906 12.3501 5.90564 17.7655 8.61335C23.5484 11.5047 28.205 11.6025 31.4458 10.9773C31.1517 10.087 30.7815 9.23135 30.343 8.41791C26.6332 8.80919 21.8772 8.29127 16.3345 5.51998C12.8148 3.76014 9.71221 3.03521 7.09219 2.87829ZM28.1759 5.33332C25.2462 2.06 20.9887 0 16.25 0C14.8584 0 13.5081 0.177686 12.2209 0.511584C13.9643 0.987269 15.8163 1.68319 17.7655 2.65781C21.8236 4.68682 25.3271 5.34013 28.1759 5.33332ZM32.1387 14.1025C28.2235 14.8756 22.817 14.7168 16.3345 11.4755C10.274 8.44527 5.45035 8.48343 2.19712 9.20639C2.0292 9.24367 1.86523 9.28287 1.70522 9.32367C1.2793 10.25 0.939308 11.2241 0.695362 12.2356C0.955909 12.166 1.22514 12.0998 1.50293 12.0381C5.44966 11.161 11.0261 11.1991 17.7655 14.5689C23.8261 17.5991 28.6497 17.561 31.9029 16.838C32.0144 16.8133 32.1242 16.7877 32.2322 16.7613C32.2441 16.509 32.25 16.2552 32.25 16C32.25 15.358 32.2122 14.7248 32.1387 14.1025ZM31.7098 20.1378C27.8326 20.8157 22.5836 20.5555 16.3345 17.431C10.274 14.4008 5.45035 14.439 2.19712 15.1619C1.475 15.3223 0.825392 15.5178 0.252344 15.7241C0.250782 15.8158 0.25 15.9078 0.25 16C0.25 24.8366 7.41344 32 16.25 32C23.6557 32 29.8862 26.9687 31.7098 20.1378Z"
              fill-rule="evenodd"
            />
          </svg>
        </div>
        <div class="flex flex-col gap-2">
          <div class="text-surface-900 dark:text-surface-0 text-2xl leading-tight font-semibold">
            Welcome Back
          </div>
          <div>
            <span class="text-surface-700 dark:text-surface-200">Don't have an account?</span>
            <a class="text-primary hover:text-primary-emphasis cursor-pointer font-medium">
              Create today!</a
            >
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <label class="text-surface-900 dark:text-surface-0 font-medium" for="email2"
            >Email Address</label
          >
          <InputText
            id="email2"
            v-model="username"
            class="w-full rounded-md p-3 shadow-sm"
            placeholder="Email address"
            type="text"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-surface-900 dark:text-surface-0 font-medium" for="password2"
            >Password</label
          >
          <InputText
            id="password2"
            v-model="password"
            class="w-full rounded-md p-3 shadow-sm"
            placeholder="Password"
            type="password"
          />
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Checkbox id="rememberme2" v-model="checked2" :binary="true" />
            <label class="text-surface-900 dark:text-surface-0" for="rememberme2"
              >Remember me</label
            >
          </div>
          <a
            class="text-surface-500 dark:text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 cursor-pointer font-medium"
            >Forgot your password?</a
          >
        </div>
      </div>
      <div>
        <Button class="w-fit !px-12" label="Sign In" @click="login" />
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
