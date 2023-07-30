import React from "react";
import {createRoot} from 'react-dom/client';
import "./i18n/i18n";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, combineReducers, compose} from "redux";
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
import {StyleRoot} from "radium";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import 'react-tooltip/dist/react-tooltip.css';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    exchange: exchangeReducer,
    global: globalReducer,
    auth: authReducer,
});

//add custom title & meta
const meta = document.getElementsByTagName('meta')
document.title = window.env.REACT_APP_TITLE ? window.env.REACT_APP_TITLE : " ";
meta.description.content = window.env.REACT_APP_DESCRIPTION_CONTENT ? window.env.REACT_APP_DESCRIPTION_CONTENT : " "

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

//React query client
const queryClient = new QueryClient()

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <StyleRoot>
            <QueryClientProvider client={queryClient}>
                <Main baseURL={PUBLIC_URL}/>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </StyleRoot>
    </Provider>
);
