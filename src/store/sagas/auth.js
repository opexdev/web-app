import {put} from "redux-saga/effects";
import * as actions from "../actions/index";

export function* logout() {
  const isDark = localStorage.getItem('isDark');
  yield localStorage.clear();
  yield localStorage.setItem('isDark',isDark);
  yield put(actions.logout());
}

export function* setUserTokens(action) {
  yield localStorage.setItem("accessToken", action.accessToken);
  yield localStorage.setItem("accessTokenExpires", action.accessTokenExpires);
  yield localStorage.setItem("refreshToken", action.refreshToken);
  yield localStorage.setItem("refreshTokenExpires", action.refreshTokenExpires);
  yield put(actions.setUserTokens(action));
}