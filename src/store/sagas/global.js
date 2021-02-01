import { put } from "redux-saga/effects";
import * as actions from "../actions/index";

export function* setThemeSaga(action) {
    yield localStorage.setItem("isDark" ,action.isDark);
    yield put(actions.setTheme(action.isDark));
}

export function* loadConfig() {
    const isDark = yield localStorage.getItem("isDark");
    const token = yield localStorage.getItem("token");
    yield put(actions.setTheme(isDark === 'true'));
    yield put(actions.setLoading(false));
    if(token !== "null") return yield put(actions.login(token))
}