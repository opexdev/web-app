import {put, delay} from "redux-saga/effects";
import * as actions from "../actions/index";

export function* login(action) {
  yield localStorage.setItem("access_token", action.access_token);
  yield localStorage.setItem("expires_in", action.expires_in);
  yield localStorage.setItem("refresh_token", action.refresh_token);
  yield localStorage.setItem("refresh_expires_in", action.refresh_expires_in);
  yield put(actions.login(action));
}
export function* logout() {
  yield localStorage.removeItem("access_token");
  yield localStorage.removeItem("expires_in");
  yield localStorage.removeItem("refresh_token");
  yield localStorage.removeItem("refresh_expires_in");
  yield put(actions.logout());
}


