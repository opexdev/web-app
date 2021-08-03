import {put} from "redux-saga/effects";
import * as actions from "../actions/index";

export function* setThemeSaga(action) {
    yield localStorage.setItem("isDark", action.isDark);
    yield put(actions.setTheme(action.isDark));
}

export function* setPanelTokens(action) {
    yield localStorage.setItem("panelAccessToken", action.panelAccessToken);
    yield localStorage.setItem("panelAccessTokenExpires", action.panelAccessTokenExpires);
    yield put(actions.setPanelTokens(action));
}

export function* loadConfig() {
    const isDark = yield localStorage.getItem("isDark");
    yield put(actions.setTheme(isDark === "true"));

    const tokens = {
        access_token: yield localStorage.getItem("access_token"),
        expires_in: yield localStorage.getItem("expires_in"),
        refresh_token: yield localStorage.getItem("refresh_token"),
        refresh_expires_in: yield localStorage.getItem("refresh_expires_in")
    };
    if (tokens.refresh_expires_in > Date.now()) {
        yield put(actions.login(tokens));
    } else {
        yield put(actions.setLogoutInitiate());
    }

    yield put(actions.setLoading(false));
}
