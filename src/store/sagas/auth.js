import { put ,delay } from "redux-saga/effects";
import * as actions from "../actions/index";

export function* login() {
    yield delay(1000);
    yield put(actions.login())
}