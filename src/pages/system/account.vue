<script setup lang="ts">
import { FilterMatchMode } from "@primevue/core/api";
import { useToast } from "primevue/usetoast";
import { onBeforeMount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import { UserAPI } from "@/apis/user/user";
import { ToastOpt } from "@/utils/toast";

import type { APIResponse } from "@chindada/panther/typescript/system/api";
import { BasicUser, User, UserList, UserRole } from "@chindada/panther/typescript/system/user";

const { t } = useI18n();
const toast = useToast();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const userList = ref<UserList>(
  UserList.create({
    list: Array.from({ length: 25 }, () =>
      User.create({
        basic: BasicUser.create({
          username: ""
        })
      })
    )
  })
);

onMounted(async () => {
  document.title = `TBT Capitan - ${t("account_management")}`;
});

const loading = ref<boolean>(false);
const getUsers = async () => {
  loading.value = true;
  UserAPI.GetAllUser()
    .then((res) => {
      userList.value = res;
    })
    .catch((e: APIResponse) => {
      if (e.code === -1 && e.response && e.response !== "") {
        toast.add(ToastOpt.error(e.response));
      } else if (e.code !== -1) {
        toast.add(ToastOpt.error(e.code.toString()));
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

onBeforeMount(async () => {
  await preLoad();
});

const preLoad = async () => {
  newPassword.value = "";
  await getUsers();
};

const user = ref<User>(
  User.create({
    basic: BasicUser.create()
  })
);
const newOrEditUser = ref<User>(
  User.create({
    basic: BasicUser.create()
  })
);
const newPassword = ref<string>("");

const submitted = ref<boolean>(false);
const dialog = ref<boolean>(false);
const deleteDialog = ref<boolean>(false);

const openNew = () => {
  newOrEditUser.value = User.create({
    basic: BasicUser.create({
      role: UserRole.USER
    })
  });
  submitted.value = false;
  dialog.value = true;
};
const editUser = (prod: User) => {
  newOrEditUser.value = prod;
  dialog.value = true;
};
const confirmDelete = (prod: User) => {
  user.value = prod;
  deleteDialog.value = true;
};
const hideDialog = () => {
  dialog.value = false;
  submitted.value = false;
};

const roleToString = (role: UserRole) => {
  switch (role) {
    case UserRole.USER:
      return t("role_user");
    case UserRole.ADMIN:
      return t("role_admin");
    case UserRole.ROOT:
      return t("role_root");
    default:
      return "";
  }
};

const deleteble = (name: string) => {
  return name !== "root" && name !== "admin" && name !== "user";
};

const saveUser = async () => {
  submitted.value = true;
  if (newOrEditUser.value.basic!.username.trim()) {
    if (newOrEditUser.value.id) {
      await UserAPI.UpdateUser(newOrEditUser.value)
        .then(() => {
          toast.add(ToastOpt.success((t("user") as string).concat(" ", t("updated"))));
          dialog.value = false;
          newOrEditUser.value = User.create({
            basic: BasicUser.create()
          });
        })
        .catch((e: APIResponse) => {
          if (e.code === -1 && e.response && e.response !== "") {
            toast.add(ToastOpt.error(e.response));
          } else if (e.code !== -1) {
            toast.add(ToastOpt.error(e.code.toString()));
          }
        });
    } else {
      await UserAPI.CreateUser(newOrEditUser.value)
        .then(() => {
          toast.add(ToastOpt.success((t("user") as string).concat(" ", t("created"))));
          dialog.value = false;
          newOrEditUser.value = User.create({
            basic: BasicUser.create()
          });
        })
        .catch((e: APIResponse) => {
          if (e.code === -1 && e.response && e.response !== "") {
            toast.add(ToastOpt.error(e.response));
          } else if (e.code !== -1) {
            toast.add(ToastOpt.error(e.code.toString()));
          }
        });
    }
  }
};

const deleteUser = async () => {
  const index = userList.value.list.findIndex((val) => val.id === user.value.id);
  if (index < 0 || !user.value.basic) {
    return;
  }
  await UserAPI.DeleteUser(user.value.basic.username)
    .then(() => {
      userList.value.list.splice(index, 1);
      toast.add(ToastOpt.success((t("user") as string).concat(" ", t("deleted"))));
    })
    .catch((e: APIResponse) => {
      if (e.code === -1 && e.response && e.response !== "") {
        toast.add(ToastOpt.error(e.response));
      } else if (e.code !== -1) {
        toast.add(ToastOpt.error(e.code.toString()));
      }
    });
  deleteDialog.value = false;
  user.value = User.create({
    basic: BasicUser.create()
  });
};

const roleOptions = [UserRole.USER, UserRole.ADMIN];
</script>

<template>
  <div class="card">
    <Toolbar class="flex-nowrap overflow-hidden text-ellipsis whitespace-nowrap">
      <template #start>
        <Button
          class="mr-2"
          icon="pi pi-plus"
          :label="t('create')"
          severity="success"
          @click="openNew"
        />
      </template>
    </Toolbar>
  </div>

  <div class="card">
    <DataTable
      :current-page-report-template="
        t('show')
          .concat(' ')
          .concat('{first}', ' ')
          .concat(t('to'), ' ')
          .concat('{last}', ' ')
          .concat(t('total'), ' ')
          .concat('{totalRecords}', ' ')
          .concat(t('user'))
      "
      data-key="id"
      :filters="filters"
      paginator
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      removable-sort
      :rows="25"
      :rows-per-page-options="[25, 50, 100]"
      scrollable
      striped-rows
      :value="userList.list"
    >
      <template #empty>
        <div class="text-surface-400 flex items-center justify-center text-xl font-bold">
          {{ t("no_data") }}
        </div>
      </template>

      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2 pb-4">
          <span class="m-0 text-3xl font-semibold">{{ t("user") }}</span>
          <IconField icon-position="left">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" :placeholder="t('search').concat('...')" />
          </IconField>
        </div>
      </template>

      <Column :exportable="false">
        <template #body="slotProps">
          <Skeleton v-if="!slotProps.data.basic.username"></Skeleton>
          <Button
            v-if="slotProps.data.basic.username"
            v-tooltip.top="t('edit')"
            class="mr-2"
            icon="pi pi-pencil"
            outlined
            rounded
            @click="editUser(slotProps.data)"
          />
          <Button
            v-if="slotProps.data.basic.username && deleteble(slotProps.data.basic.username)"
            v-tooltip.top="t('delete')"
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="confirmDelete(slotProps.data)"
          />
        </template>
      </Column>
      <Column field="basic.username" :header="t('username')" sortable style="min-width: 8rem">
        <template #body="slotProps">
          <Skeleton v-if="!slotProps.data.basic.username"></Skeleton>
          <div v-else>
            {{ slotProps.data.basic.username }}
          </div>
        </template>
      </Column>
      <Column
        :filter-field="(rawData) => roleToString(rawData.basic.role)"
        :header="t('role')"
        sortable
        style="min-width: 12rem"
      >
        <template #body="slotProps">
          <Skeleton v-if="!slotProps.data.basic.username"></Skeleton>
          <div v-else>
            {{ roleToString(slotProps.data.basic.role) }}
          </div>
        </template>
      </Column>
      <Column field="basic.email" :header="t('email')" sortable style="min-width: 12rem">
        <template #body="slotProps">
          <Skeleton v-if="!slotProps.data.basic.username"></Skeleton>
          <div v-else>
            {{ slotProps.data.basic.email }}
          </div>
        </template></Column
      >
    </DataTable>
  </div>

  <Dialog
    v-model:visible="dialog"
    :closable="false"
    :draggable="false"
    :header="newOrEditUser?.id ? t('edit') : t('create')"
    modal
    style="width: 450px"
    @hide="preLoad"
  >
    <Fluid class="flex w-full flex-col gap-4">
      <div class="flex flex-col gap-1">
        <label for="role">{{ t("role") }}</label>
        <Select
          id="role"
          v-model="newOrEditUser.basic!.role"
          :options="roleOptions"
          :placeholder="[t('please_select'), t('role')].join(' ')"
        >
          <template #value="slotProps">
            {{ roleToString(slotProps.value) }}
          </template>
          <template #option="slotProps">
            {{ roleToString(slotProps.option) }}
          </template>
        </Select>
      </div>
      <div v-if="newOrEditUser.id == 0" class="flex flex-col gap-1">
        <label for="username">{{ t("username") }}*</label>
        <InputText id="username" v-model.trim="newOrEditUser.basic!.username" autofocus required />
        <small
          v-if="
            newOrEditUser.id == 0 &&
            newOrEditUser.basic!.username != '' &&
            newOrEditUser.basic!.username.length < 6
          "
          class="p-error"
          >{{ t("username_minimum_length_is_8") }}</small
        >
      </div>
      <div v-if="newOrEditUser.id == 0" class="flex flex-col gap-1">
        <label for="password">{{ t("new_password") }}*</label>
        <InputText
          id="password"
          v-model.trim="newOrEditUser.basic!.password"
          autofocus
          minlength="8"
          required
          type="password"
        />
        <small
          v-if="
            newOrEditUser.id == 0 &&
            newOrEditUser.basic!.password != '' &&
            newOrEditUser.basic!.password.length < 8
          "
          class="p-error"
          >{{ t("password_minimum_length_is_8") }}</small
        >
      </div>
      <div v-if="newOrEditUser.id == 0" class="flex flex-col gap-1">
        <label for="password">{{ t("confirm_new_password") }}*</label>
        <InputText
          id="password"
          v-model.trim="newPassword"
          autofocus
          minlength="8"
          required
          type="password"
        />
        <small
          v-if="
            newOrEditUser.id == 0 &&
            newPassword != '' &&
            newPassword !== newOrEditUser.basic!.password
          "
          class="p-error"
          >{{ t("confirm_password_is_not_same_as_password") }}</small
        >
      </div>
      <div class="flex flex-col gap-1">
        <label for="email">{{ t("email") }}*</label>
        <InputText id="email" v-model.trim="newOrEditUser.basic!.email" autofocus required />
      </div>
    </Fluid>

    <template #footer>
      <Button icon="pi pi-times" :label="t('cancel')" severity="danger" text @click="hideDialog" />
      <Button
        :disabled="
          (newOrEditUser.id == 0 &&
            (newOrEditUser.basic!.username.length < 8 ||
              newOrEditUser.basic!.password.length < 8 ||
              newPassword !== newOrEditUser.basic!.password)) ||
          newOrEditUser.basic!.email === ''
        "
        icon="pi pi-check"
        :label="t('save')"
        text
        @click="saveUser"
      />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="deleteDialog"
    :closable="false"
    :draggable="false"
    :header="t('confirm')"
    modal
    style="width: 450px"
  >
    <div class="flex flex-row items-center">
      <div class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem" />
      <div v-if="user">
        {{ t("are_you_sure_to_delete") }} <b>{{ user.basic!.username }}</b
        >?
      </div>
    </div>
    <template #footer>
      <Button
        icon="pi pi-times"
        :label="t('no')"
        severity="danger"
        text
        @click="deleteDialog = false"
      />
      <Button icon="pi pi-check" :label="t('yes')" text @click="deleteUser" />
    </template>
  </Dialog>
</template>
