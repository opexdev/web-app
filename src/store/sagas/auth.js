import {put} from "redux-saga/effects";
import * as actions from "../actions/index";

export function* logout() {
  yield localStorage.removeItem("accessToken");
  yield localStorage.removeItem("accessTokenExpires");
  yield localStorage.removeItem("refreshToken");
  yield localStorage.removeItem("refreshTokenExpires");
  yield put(actions.logout());
}

export function* setUserTokens(action) {
  yield localStorage.setItem("accessToken", action.accessToken);
  yield localStorage.setItem("accessTokenExpires", action.accessTokenExpires);
  yield localStorage.setItem("refreshToken", action.refreshToken);
  yield localStorage.setItem("refreshTokenExpires", action.refreshTokenExpires);
  yield put(actions.setUserTokens(action));
}