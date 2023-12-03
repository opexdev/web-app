import {takeEvery} from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

import {getExchangeLastPrice, loadConfig, setActivePair, setIPGLock, setThemeSaga, setVerifyEmailLock} from "./global";

import {getUserConfigs, getUserKYCStatus, logout, setFavPair, setUserTokens} from "./auth";

export function* watchGlobal() {
  yield takeEvery(actionTypes.LOGOUT_INITIATE, logout);
  yield takeEvery(actionTypes.LOAD_CONFIG, loadConfig);
  yield takeEvery(actionTypes.SET_THEME_INITIATE, setThemeSaga);
  yield takeEvery(actionTypes.SET_ACTIVE_PAIR_INITIATE, setActivePair);
  yield takeEvery(actionTypes.SET_USER_TOKENS_INITIATE, setUserTokens);
  yield takeEvery(actionTypes.SET_IPG_INITIATE, setIPGLock);
  yield takeEvery(actionTypes.SET_VERIFY_EMAIL_LOCK_INITIATE, setVerifyEmailLock);
  yield takeEvery(actionTypes.SET_KYC_STATUS_INITIATE, getUserKYCStatus);
  yield takeEvery(actionTypes.SET_LAST_PRICE_INITIATE, getExchangeLastPrice);
  yield takeEvery(actionTypes.SET_FAV_PAIR_INITIATE, setFavPair);
  yield takeEvery(actionTypes.GET_USER_CONFIGS_INITIATE, getUserConfigs);
}
