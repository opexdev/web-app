import {takeEvery} from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

import {setThemeSaga, loadConfig, setPanelTokens} from "./global";

import {logout, setUserTokens} from "./auth";

export function* watchGlobal() {
  yield takeEvery(actionTypes.LOGOUT_INITIATE, logout);
  yield takeEvery(actionTypes.LOAD_CONFIG, loadConfig);
  yield takeEvery(actionTypes.SET_THEME_INITIATE, setThemeSaga);
  yield takeEvery(actionTypes.SET_USER_TOKENS_INITIATE, setUserTokens);
  yield takeEvery(actionTypes.SET_PANEL_TOKENS_INITIATE, setPanelTokens);
}
