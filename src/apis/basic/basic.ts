import { FutureDetailList } from "@chindada/panther/typescript/basic/future";
import { OptionDetailList } from "@chindada/panther/typescript/basic/option";
import { StockDetailList } from "@chindada/panther/typescript/basic/stock";

import httpClient from "../client";
import path from "../path";

const GetAllStockDetail = async (): Promise<StockDetailList> => {
  const res = await httpClient.get(`${path.httpURLPrefix}/v1/basic/stocks`);
  return StockDetailList.fromBinary(res.data);
};

// GetAllFutureDetail
const GetAllFutureDetail = async (): Promise<FutureDetailList> => {
  const res = await httpClient.get(`${path.httpURLPrefix}/v1/basic/futures`);
  return FutureDetailList.fromBinary(res.data);
};

// GetAllOptionDetail
const GetAllOptionDetail = async (): Promise<OptionDetailList> => {
  const res = await httpClient.get(`${path.httpURLPrefix}/v1/basic/options`);
  return OptionDetailList.fromBinary(res.data);
};

export const BasicAPI = {
  GetAllStockDetail,
  GetAllFutureDetail,
  GetAllOptionDetail
};
