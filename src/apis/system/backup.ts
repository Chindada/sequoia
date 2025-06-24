import { Backup, BackupList } from "@chindada/panther/typescript/system/backup";
import type { AxiosRequestConfig } from "axios";

import httpClient from "../client";
import path from "../path";

const CreateBackup = async (): Promise<void> => {
  await httpClient.put(`${path.httpURLPrefix}/v1/system/backup`);
};

const GetAllBackup = async (): Promise<BackupList> => {
  const res = await httpClient.get(`${path.httpURLPrefix}/v1/system/backup`);
  return BackupList.fromBinary(res.data);
};

const DownloadBackup = async (name: string) => {
  const cfg: AxiosRequestConfig = {
    headers: {
      "backup-name": name,
      "Cache-Control": "no-cache"
    }
  };
  const res = await httpClient.get(`${path.httpURLPrefix}/v1/system/backup/download`, cfg);
  return res;
};

const RestoreBackup = async (name: string) => {
  const data = Backup.create({
    name: name
  });
  await httpClient.post(`${path.httpURLPrefix}/v1/system/backup`, Backup.toBinary(data));
};

const DeleteBackup = async (name: string) => {
  const cfg: AxiosRequestConfig = {
    headers: {
      "backup-name": name
    }
  };
  await httpClient.delete(`${path.httpURLPrefix}/v1/system/backup`, cfg);
};

export const BackupAPI = {
  CreateBackup,
  GetAllBackup,
  DownloadBackup,
  DeleteBackup,
  RestoreBackup
};
