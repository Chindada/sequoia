import { LoginRequest, LoginResponse } from "@chindada/panther/typescript/system/api";

import httpClient from "./client";
import path from "./path";

export const Login = async (username: string, password: string): Promise<void> => {
  const body = LoginRequest.create({
    username: username,
    password: password
  });
  const res = await httpClient.post(`${path.httpURLPrefix}/v1/login`, LoginRequest.toBinary(body));
  const response = LoginResponse.fromBinary(res.data);
  httpClient.defaults.headers.common.Authorization = response.token;
  localStorage.setItem("token", response.token);
};

export const Logout = () => {
  localStorage.removeItem("token");
  delete httpClient.defaults.headers.common.Authorization;
};

export const Refresh = async (): Promise<void> => {
  const res = await httpClient.get(`${path.httpURLPrefix}/v1/refresh`);
  const response = LoginResponse.fromBinary(res.data);
  if (res.status === 200) {
    httpClient.defaults.headers.common.Authorization = response.token;
    localStorage.setItem("token", response.token);
  }
};
