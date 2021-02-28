import { put ,delay } from "redux-saga/effects";
import * as actions from "../actions/index";

export function* login(action) {
    yield delay(1000);
    yield localStorage.setItem("token" ,action.token);
    yield put(actions.login())
}
export function* logout() {
    yield localStorage.removeItem("token");
    yield put(actions.logout())
}