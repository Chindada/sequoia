import type { I18n, I18nOptions } from "vue-i18n";
import { createI18n } from "vue-i18n";

import us from "@/locales/us.json";
import zhTW from "@/locales/zh_tw.json";

type LocaleSchema = {
  name: string;
  locale: typeof zhTW;
};

const localeNameZhTW = "正體中文";
const localeNameEn = "English";

export const localeName = {
  localeNameZhTW,
  localeNameEn
};

const supportLocales: LocaleSchema[] = [
  {
    name: localeNameZhTW,
    locale: zhTW
  },
  {
    name: localeNameEn,
    locale: us
  }
];

const setupI18n = (): I18n => {
  const options: I18nOptions = {
    globalInjection: true,
    legacy: false,
    locale: supportLocales[0].name,
    fallbackLocale: supportLocales[1].name,
    messages: {}
  };

  supportLocales.forEach((locale) => {
    options.messages![locale.name] = locale.locale;
  });

  const locale = localStorage.getItem("locale");
  if (locale) {
    options.locale = locale;
  } else {
    localStorage.setItem("locale", supportLocales[0].name);
  }
  const i18n = createI18n(options);
  return i18n;
};

export const i18n = setupI18n();
