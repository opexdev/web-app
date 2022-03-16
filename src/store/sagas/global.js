import {put,call} from "redux-saga/effects";
import * as actions from "../actions/index";
import jwtDecode from "jwt-decode";

export function* setThemeSaga(action) {
    yield call([localStorage, 'setItem'], "isDark", action.isDark)
    yield put(actions.setTheme(action.isDark));
}

export function* setActivePair(action) {
    yield call([localStorage, 'setItem'], "activePair", JSON.stringify(action.pair))
    yield call([localStorage, 'setItem'], "activeMarketTab", action.activeTab)
    yield put(actions.setActivePair(action.pair));
}

export function* setIPGLock(action) {
    yield call([localStorage, 'setItem'], "activeMarketTab", action.activeTab)
    yield call([localStorage, 'setItem'], "lockTime", action.lockTime)
    yield put(actions.setIPG(action.lockTime));
}

export function* loadConfig() {
    const isDark = yield call([localStorage, 'getItem'], 'isDark')
    const activePair = yield call([localStorage, 'getItem'], 'activePair')
    const activeMarketTab = yield call([localStorage, 'getItem'], 'activeMarketTab')
    const lockTime = yield call([localStorage, 'getItem'], 'lockTime')

    if (lockTime) yield put(actions.setIPG(lockTime));
    if (isDark === "true") yield put(actions.setTheme(true));
    if (activePair !== null ) yield put(actions.setActivePair(JSON.parse( activePair ) ,activeMarketTab));

    const tokens = {
        accessToken: yield localStorage.getItem("accessToken"),
        accessTokenExpires: yield localStorage.getItem("accessTokenExpires"),
        refreshToken: yield localStorage.getItem("refreshToken"),
        refreshTokenExpires: yield localStorage.getItem("refreshTokenExpires")
    };

    if (tokens.accessToken && tokens.accessTokenExpires > Date.now()) {
        const jwt = jwtDecode(tokens.accessToken)
        yield put(actions.setUserTokens(tokens));
        yield put(actions.setUserInfo(jwt));

    } else {
        yield put(actions.setLogoutInitiate());
    }

    yield put(actions.setLoading(false));
}
