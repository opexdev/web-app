import {takeEvery} from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

import {
    setThemeSaga,
    loadConfig
} from "./global"

export function* watchGlobal() {
    yield takeEvery(actionTypes.SET_THEME_INITIATE, setThemeSaga);
    yield takeEvery(actionTypes.LOAD_CONFIG, loadConfig);
}
