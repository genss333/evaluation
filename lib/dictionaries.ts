import { enUS, th } from "date-fns/locale";
import Cookies from "js-cookie";

const dictionaries = {
  en: () =>
    import("@/lib/dictionaries/en.json").then((module) => module.default),
  th: () =>
    import("@/lib/dictionaries/th.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en" | "th") =>
  dictionaries[locale]();

export const getLocale = () => {
  if (typeof window === "undefined") {
    return enUS;
  }
  const lang = localStorage.getItem("lang");
  switch (lang) {
    case "en":
      return enUS;
    case "th":
      return th;
    default:
      return enUS;
  }
};

export function switchLang(lang: "en" | "th") {
  Cookies.set("lang", lang, { secure: true, sameSite: "lax", expires: 365 });
  window.location.reload();
}
