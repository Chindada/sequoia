import axios from "axios";

import router from "@/router";

import { APIResponse } from "@chindada/panther/typescript/system/api";

const httpClient = axios.create({
  responseType: "arraybuffer",
  headers: {
    common: {
      "Content-Type": "application/x-protobuf",
      Accept: "application/x-protobuf",
      Authorization: localStorage.getItem("token") || ""
    }
  }
});

httpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    response.data = new Uint8Array(response.data);
    return response;
  },
  (error) => {
    if (error.code && error.code === "ERR_NETWORK") {
      window.location.reload();
      return;
    }
    if (error.response.status === 403) {
      router.replace("/403");
      return;
    }
    if (error.response.status === 401) {
      router.replace("/login");
      return;
    }
    return Promise.reject(APIResponse.fromBinary(new Uint8Array(error.response.data)));
  }
);

export default httpClient;
