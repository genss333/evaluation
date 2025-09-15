import { enUS, th } from "date-fns/locale";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  th: () => import("@/dictionaries/th.json").then((module) => module.default),
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
