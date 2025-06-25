import { SystemInfo } from "@chindada/panther/typescript/system/system";

import httpClient from "../client";
import path from "../path";

const GetSystemInfo = async (): Promise<SystemInfo> => {
  const res = await httpClient.get(`${path.httpURLPrefix}/v1/system/info`);
  return SystemInfo.fromBinary(res.data);
};

export const SystemAPI = {
  GetSystemInfo
};
