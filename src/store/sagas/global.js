import {put, call} from "redux-saga/effects";
import * as actions from "../actions/index";
import jwtDecode from "jwt-decode";
import axios from "axios";
import {getUserAccount} from "./auth";

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
    if (isDark) yield put(actions.setTheme(JSON.parse(isDark)));
    if (activePair !== null) yield put(actions.setActivePair(JSON.parse(activePair), activeMarketTab));

    const refreshToken = localStorage.getItem("refreshToken")

    const params = new URLSearchParams();
    params.append('client_id', window.env.REACT_APP_CLIENT_ID);
    params.append('client_secret', window.env.REACT_APP_CLIENT_SECRET);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);

    try {
        const {data: {access_token}} = yield call(axios.post, '/auth/realms/opex/protocol/openid-connect/token', params)

        const jwt = jwtDecode(access_token)
        yield put(actions.setUserTokens({refreshToken, accessToken: access_token}));
        yield put(actions.setUserInfo(jwt));
        yield getUserAccount();
    } catch (e) {
        yield put(actions.setLogoutInitiate());
    }

    yield put(actions.setLoading(false));
}
