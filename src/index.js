import React from "react";
import {createRoot} from 'react-dom/client';
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import globalReducer from "./store/reducers/globalReducer";
import "normalize.css";
import "./index.css";
import authReducer from "./store/reducers/authReducer";
import {watchGlobal} from "./store/sagas";
import "./assets/fontIcon/opex-icon/css/opex-icon.css";
import Main from "./main/main";
import setupAxios from "./setup/axios/setupAxios";
import axios from "axios";
import exchangeReducer from "./store/reducers/exchangeReducer";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import 'react-tooltip/dist/react-tooltip.css';
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import {initReactI18next} from "react-i18next";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    exchange: exchangeReducer,
    global: globalReducer,
    auth: authReducer,
});


/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {PUBLIC_URL} = process.env

const composeEnhancers = (process.env.NODE_ENV === "development" &&
        typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(watchGlobal);

setupAxios(axios, store);

const {exchange: {defaultLanguage}} = store.getState()

i18n
    .use(LanguageDetector)
    .use(Backend)
    .use(initReactI18next)
    .init({
        preload: [defaultLanguage],
        fallbackLng: defaultLanguage,
        debug: process.env.NODE_ENV === "development",
        detection: {
            order: ["localStorage"],
            lookupLocalStorage: "language",
            caches: ["localStorage"],
        },
        backend: {
            loadPath: process.env.PUBLIC_URL + '/assets/locales/{{lng}}/{{ns}}.json',
        },
        interpolation: {
            escapeValue: false,
        },
    });



//React query client
const queryClient = new QueryClient()

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        {/*<StyleRoot>*/}
        <QueryClientProvider client={queryClient}>
            <Main baseURL={PUBLIC_URL}/>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
        {/*</StyleRoot>*/}
    </Provider>
);
