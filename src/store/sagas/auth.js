import {call, put} from "redux-saga/effects";
import * as actions from "../actions/index";

export function* logout() {
  yield call([localStorage, 'removeItem'], "refreshToken")
  yield put(actions.logout());
}

export function* setUserTokens(action) {
  yield call([localStorage, 'setItem'], "refreshToken", action.refreshToken)
  yield put(actions.setUserTokens(action));
}