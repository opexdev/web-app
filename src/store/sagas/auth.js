import {call, put} from "redux-saga/effects";
import * as actions from "../actions/index";

export function* logout() {
  yield call([localStorage, 'removeItem'], "accessToken")
  yield call([localStorage, 'removeItem'], "accessTokenExpires")
  yield call([localStorage, 'removeItem'], "refreshToken")
  yield call([localStorage, 'removeItem'], "refreshTokenExpires")
  yield put(actions.logout());
}

export function* setUserTokens(action) {
  yield call([localStorage, 'setItem'], "accessToken", action.accessToken)
  yield call([localStorage, 'setItem'], "accessTokenExpires", action.accessTokenExpires)
  yield call([localStorage, 'setItem'], "refreshToken", action.refreshToken)
  yield call([localStorage, 'setItem'], "refreshTokenExpires", action.refreshTokenExpires)
  yield put(actions.setUserTokens(action));
}