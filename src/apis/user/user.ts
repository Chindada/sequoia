import type { AxiosRequestConfig } from "axios";

import { ChangePasswordRequest } from "@chindada/panther/typescript/system/api";
import { BasicUser, User, UserList } from "@chindada/panther/typescript/system/user";

import httpClient from "../client";
import path from "../path";

const CreateUser = async (user: User): Promise<void> => {
  await httpClient.post(`${path.httpURLPrefix}/v1/user`, User.toBinary(user));
};

const GetAllUser = async (): Promise<UserList> => {
  const res = await httpClient.get(`${path.httpURLPrefix}/v1/user/list`);
  return UserList.fromBinary(res.data);
};

const UpdateUser = async (user: User): Promise<void> => {
  await httpClient.put(`${path.httpURLPrefix}/v1/user`, User.toBinary(user));
};

const DeleteUser = async (name: string): Promise<void> => {
  const cfg: AxiosRequestConfig = {
    data: User.toBinary(
      User.create({
        basic: BasicUser.create({
          username: name
        })
      })
    )
  };
  await httpClient.delete(`${path.httpURLPrefix}/v1/user`, cfg);
};

export const ChangePassword = async (
  username: string,
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  const body = ChangePasswordRequest.create({
    username: username,
    old_password: oldPassword,
    new_password: newPassword
  });
  await httpClient.post(
    `${path.httpURLPrefix}/v1/user/password`,
    ChangePasswordRequest.toBinary(body)
  );
};

export const UserAPI = {
  CreateUser,
  ChangePassword,
  GetAllUser,
  UpdateUser,
  DeleteUser
};
