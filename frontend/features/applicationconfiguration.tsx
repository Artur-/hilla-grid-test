import { setDefaultOptions } from "date-fns";
import { fi, enUS } from "date-fns/locale";
// var setDefaultOptions = require("date-fns/setDefaultOptions");
let appLocale = "en-US";

export const setLocale = (locale: string) => {
  appLocale = locale;
  if (locale === "fi") {
    setDefaultOptions({ locale: fi });
  } else {
    setDefaultOptions({ locale: enUS });
  }
};

export const getLocale = () => {
  return appLocale;
};
