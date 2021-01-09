import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';


const options = {
    order: ['localStorage'],
    lookupLocalStorage: 'language',
    caches: ['localStorage'],
}

i18n
    .use(LanguageDetector)
    .use(Backend)
    .use(initReactI18next)
    .init({
        preload : ["fa"],
        fallbackLng: 'fa',
        debug: true,
        detection: options,
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;