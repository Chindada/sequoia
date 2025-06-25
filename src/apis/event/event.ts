import { LoginEventList } from "@chindada/panther/typescript/system/event";

import httpClient from "../client";
import path from "../path";

const GetLoginEvents = async (): Promise<LoginEventList> => {
  const res = await httpClient.get(`${path.httpURLPrefix}/v1/event/login`);
  return LoginEventList.fromBinary(res.data);
};

export const EventAPI = {
  GetLoginEvents
};
