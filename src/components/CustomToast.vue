<script setup lang="ts">
import Toast from "primevue/toast";
</script>

<template>
  <Toast style="width: 30rem">
    <template #message="{ message }">
      <div class="mr-4 flex flex-1 items-start self-center">
        <img src="@/assets/svg/logo.svg" style="width: 56px; height: 56px" />
        <div class="ml-4">
          <span class="text-surface-900 text-xl font-medium">{{ message.summary }}</span>
          <p class="text-surface-600 mt-2 mb-4">
            {{ message.detail }}
          </p>
        </div>
      </div>
    </template>
  </Toast>
</template>
