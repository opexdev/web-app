import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import Backend from "i18next-http-backend";


i18n
    .use(LanguageDetector)
    .use(Backend)
    .use(initReactI18next)
    .init({
        preload: [window.env.REACT_APP_PRELOAD_LANG],
        fallbackLng: window.env.REACT_APP_PRELOAD_LANG,
        debug: process.env.NODE_ENV === "development",
        detection: {
            order: ["localStorage"],
            lookupLocalStorage: "language",
            caches: ["localStorage"],
        },
        backend: {
            loadPath: process.env.PUBLIC_URL+'/assets/locales/{{lng}}/{{ns}}.json',
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
