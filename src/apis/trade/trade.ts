import { Timestamp } from "@chindada/panther/typescript/google/protobuf/timestamp";
import { QueryTradeRequest, TradeList } from "@chindada/panther/typescript/trade/trade";

import httpClient from "../client";
import path from "../path";

const GetAllTrades = async (): Promise<TradeList> => {
  const res = await httpClient.get(`${path.httpURLPrefix}/v1/trade/records`);
  return TradeList.fromBinary(res.data);
};

const GetTradesByTime = async (startDate: Date, endDate: Date): Promise<TradeList> => {
  const res = await httpClient.post(
    `${path.httpURLPrefix}/v1/trade/records`,
    QueryTradeRequest.toBinary(
      QueryTradeRequest.create({
        start_time: Timestamp.create({
          seconds: Math.floor(startDate.getTime() / 1000),
          nanos: Math.floor(startDate.getTime() % 1000) * 1000 * 1000
        }),
        end_time: Timestamp.create({
          seconds: Math.floor(endDate.getTime() / 1000),
          nanos: Math.floor(endDate.getTime() % 1000) * 1000 * 1000
        })
      })
    )
  );
  return TradeList.fromBinary(res.data);
};

const TriggerUpdateTrades = async () => {
  await httpClient.put(`${path.httpURLPrefix}/v1/trade/records`);
};

export const TradeAPI = {
  GetAllTrades,
  GetTradesByTime,
  TriggerUpdateTrades
};
