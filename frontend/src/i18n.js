// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Static imports (CRA/Vite friendly)
import en from "./locales/en.json";
import hi from "./locales/hi.json";

const resources = {
  en: { translation: en },
  hi: { translation: hi },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ["en", "hi"],
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "querystring", "cookie", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false }, // since we bundle JSONs, no need for Suspense
  });

// keep <html lang=".."> and direction in sync
const RTL_LANGS = ["ar", "fa", "ur", "he"];
i18n.on("languageChanged", (lng) => {
  const html = document.documentElement;
  html.lang = lng;
  html.dir = RTL_LANGS.includes(lng) ? "rtl" : "ltr";
});

export default i18n;
