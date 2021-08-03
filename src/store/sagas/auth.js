import {put} from "redux-saga/effects";
import * as actions from "../actions/index";

export function* login(action) {
  yield localStorage.setItem("access_token", action.access_token);
  yield localStorage.setItem("expires_in", action.expires_in);
  yield localStorage.setItem("refresh_token", action.refresh_token);
  yield localStorage.setItem("refresh_expires_in", action.refresh_expires_in);
  yield put(actions.login(action));
}
export function* logout() {
  yield localStorage.removeItem("accessToken");
  yield localStorage.removeItem("accessTokenExpires");
  yield localStorage.removeItem("refreshToken");
  yield localStorage.removeItem("refreshTokenExpires");
  yield put(actions.logout());
}

export function* setUserInfo(action) {
  yield localStorage.setItem("id", action.id);
  yield localStorage.setItem("emailVerified", action.emailVerified);
  yield localStorage.setItem("firstName", action.firstName);
  yield localStorage.setItem("lastName", action.lastName);
  yield localStorage.setItem("email", action.email);
  yield put(actions.setUserInfo(action));
}

export function* setUserTokens(action) {
  yield localStorage.setItem("accessToken", action.accessToken);
  yield localStorage.setItem("accessTokenExpires", action.accessTokenExpires);
  yield localStorage.setItem("refreshToken", action.refreshToken);
  yield localStorage.setItem("refreshTokenExpires", action.refreshTokenExpires);
  yield put(actions.setUserTokens(action));
}