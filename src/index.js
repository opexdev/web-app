import React, {Suspense} from "react";
import ReactDOM from "react-dom";
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

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback={"loading"}>
            <Provider store={store}>
                <StyleRoot>
                    <Main baseURL={PUBLIC_URL}/>
                </StyleRoot>
            </Provider>
        </Suspense>
    </React.StrictMode>,
    document.getElementById("root"),
);
