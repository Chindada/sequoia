import type { ToastMessageOptions } from "primevue/toast";

import { i18n } from "@/i18n";

const locale = i18n.global.tm;

const baseOpt: ToastMessageOptions = {
  life: 3000,
  contentStyleClass: "p-6"
};

const success = (message: string): ToastMessageOptions => {
  return {
    severity: "success",
    summary: locale("success"),
    detail: message,
    ...baseOpt
  };
};

const info = (message: string): ToastMessageOptions => {
  return {
    severity: "info",
    summary: locale("info"),
    detail: message,
    ...baseOpt
  };
};

const warn = (message: string): ToastMessageOptions => {
  return {
    severity: "warn",
    summary: locale("warn"),
    detail: message,
    ...baseOpt
  };
};

const error = (message: string): ToastMessageOptions => {
  return {
    severity: "error",
    summary: locale("error"),
    detail: message,
    ...baseOpt
  };
};

export const ToastOpt = {
  success: success,
  info: info,
  warn: warn,
  error: error
};
