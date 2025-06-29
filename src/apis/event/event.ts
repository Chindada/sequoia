import { ShioajiEventList } from "@chindada/panther/typescript/stream/stream";
import { LoginEventList } from "@chindada/panther/typescript/system/event";

import httpClient from "../client";
import path from "../path";

const GetLoginEvents = async (): Promise<LoginEventList> => {
  const res = await httpClient.get(`${path.httpURLPrefix}/v1/event/login`);
  return LoginEventList.fromBinary(res.data);
};

const GetShioajiEvents = async (): Promise<ShioajiEventList> => {
  const res = await httpClient.get(`${path.httpURLPrefix}/v1/event/shioaji`);
  return ShioajiEventList.fromBinary(res.data);
};

export const EventAPI = {
  GetLoginEvents,
  GetShioajiEvents
};
