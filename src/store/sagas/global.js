import { put ,delay } from "redux-saga/effects";
import * as actions from "../actions/index";

export function* setThemeSaga(action) {
    yield localStorage.setItem("isDark" ,action.isDark);
    yield put(actions.setTheme(action.isDark));
}

export function* loadConfig() {
    const isDark = yield localStorage.getItem("isDark");
    yield put(actions.setTheme(isDark === 'true' ));
    yield put(actions.setLoading(false));
    yield delay(5000);
    yield put(actions.storeUserData())
}