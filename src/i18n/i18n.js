import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonEn from "../locales/en/common.json";
import commonPt from "../locales/pt/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { common: commonEn },
    pt: { common: commonPt },
  },
  lng: "pt", // Default language
  fallbackLng: "en", // Fallback language if the translation is missing
  interpolation: {
    escapeValue: false, // React already escapes values, so no need to escape again
  },
});

export default i18n;
