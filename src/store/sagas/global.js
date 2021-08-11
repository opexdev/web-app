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
        accessToken: yield localStorage.getItem("accessToken"),
        accessTokenExpires: yield localStorage.getItem("accessTokenExpires"),
        refreshToken: yield localStorage.getItem("refreshToken"),
        refreshTokenExpires: yield localStorage.getItem("refreshTokenExpires")
    };

    if (tokens.accessToken && tokens.accessTokenExpires > Date.now()) {
        yield put(actions.setUserTokens(tokens));
    } else {
        yield put(actions.setLogoutInitiate());
    }

    yield put(actions.setLoading(false));
}
