import {takeEvery} from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

import {
    setThemeSaga,
    loadConfig
} from "./global"

import {
    login,
    logout
} from "./auth"

export function* watchGlobal() {
    yield takeEvery(actionTypes.SET_THEME_INITIATE, setThemeSaga);
    yield takeEvery(actionTypes.LOGIN_INITIATE, login);
    yield takeEvery(actionTypes.LOGOUT_INITIATE, logout);
    yield takeEvery(actionTypes.LOAD_CONFIG, loadConfig);
}
