import {call, put} from "redux-saga/effects";
import * as actions from "../actions/index";
import jwtDecode from "jwt-decode";
import axios from "axios";

export function* setThemeSaga(action) {
    yield call([localStorage, 'setItem'], "isDark", action.isDark)
    yield put(actions.setTheme(action.isDark));
}

export function* setActivePair(action) {
    yield call([localStorage, 'setItem'], "activePair", action.pair.symbol)
    yield call([localStorage, 'setItem'], "activeMarketTab", action.activeTab)
    yield put(actions.setActivePair(action.pair));
}

export function* setIPGLock(action) {
    yield call([localStorage, 'setItem'], "lockTime", action.lockTime)
    yield put(actions.setIPG(action.lockTime));
}

export function* setVerifyEmailLock(action) {
    yield call([localStorage, 'setItem'], "verifyEmailLockTime", action.verifyEmailLockTime)
    yield put(actions.setVerifyEmailLock(action.verifyEmailLockTime));
}

export function* getExchangeLastPrice() {
    const newPrices = {}
    try {
        const {data} = yield call(axios.get, `/api/v3/ticker/price`)
        for (const price of data) {
            newPrices[price.symbol] = price.price
        }
        yield put(actions.setLastPrice(newPrices));
    } catch (e) {
        console.log(e)
    }
}

export function* loadConfig(action) {

    yield put(actions.setLoading(true))
    yield put(actions.setError(false))

    const pairs = [];
    const assets = [];
    const wallets = {};
    const tradeFee = {};
    const lastPrice = {};

    try {
        const {data: {symbols}} = yield call(axios.get, '/api/v3/exchangeInfo')
        for (const symbol of symbols) {
            if (symbol.symbol.toUpperCase().includes("NLN")) continue
            if (!assets.includes(symbol.baseAsset)) {
                assets.push(symbol.baseAsset)
                wallets[symbol.baseAsset] = {free: 0.0, locked: 0.0, withdraw: 0.0}
                tradeFee[symbol.baseAsset] = 0.01
            }
            if (!assets.includes(symbol.quoteAsset)) {
                assets.push(symbol.quoteAsset)
                wallets[symbol.quoteAsset] = {free: 0.0, locked: 0.0, withdraw: 0.0}
                tradeFee[symbol.quoteAsset] = 0.01
            }
            if (!pairs.includes(symbol.symbol)) pairs.push(symbol.symbol)
            symbol.baseRange = {min: 0.000001, max: 100000, step: 0.00001}
            symbol.quoteRange = {min: 0.000001, max: 100000, step: 0.00001}
            symbol.name = symbol.baseAsset+"/"+symbol.quoteAsset
            lastPrice[symbol.symbol] = 0
        }
        yield put(actions.setExchange({pairs, assets, symbols, lastPrice}));
        yield put(actions.setUserAccountInfo({wallets, tradeFee}));

        const activePair = yield call([localStorage, 'getItem'], 'activePair')
        const lastActivePair = symbols.find(symbol => symbol.symbol === activePair)
        yield put(actions.setActivePair(lastActivePair || symbols[0]));

    } catch (e) {
        yield put(actions.setError(true))
        return yield put(actions.setLoading(false));
    }

    const isDark = yield call([localStorage, 'getItem'], 'isDark')
    if (isDark) yield put(actions.setTheme(JSON.parse(isDark)));

    if (action.token) {
        yield put(actions.setUserTokens({refreshToken : null, accessToken: action.token}));
        yield call([localStorage, 'removeItem'], "refreshToken")
        const jwt = jwtDecode(action.token)
        yield put(actions.setUserInfo(jwt));
        yield put(actions.setKYCStatusInitiate());
        return yield put(actions.setLoading(false));
    }

    const lockTime = yield call([localStorage, 'getItem'], 'lockTime')
    if (lockTime) yield put(actions.setIPG(lockTime));

    const verifyEmailLockTime = yield call([localStorage, 'getItem'], 'verifyEmailLockTime')
    if (verifyEmailLockTime) yield put(actions.setVerifyEmailLock(verifyEmailLockTime));

    const refreshToken = localStorage.getItem("refreshToken")

    if (refreshToken) {
        const params = new URLSearchParams();
        params.append('client_id', window.env.REACT_APP_CLIENT_ID);
        params.append('client_secret', window.env.REACT_APP_CLIENT_SECRET);
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken);

        try {
            const {data: {access_token}} = yield call(axios.post, '/auth/realms/opex/protocol/openid-connect/token', params)
            const jwt = jwtDecode(access_token)
            yield call([localStorage, 'setItem'], "refreshToken", refreshToken)
            yield put(actions.setUserTokens({refreshToken, accessToken: access_token}));
            yield put(actions.setUserInfo(jwt));
            yield put(actions.setKYCStatusInitiate());
        } catch (e) {
            yield put(actions.setLogoutInitiate());
        }
    }

    yield put(actions.setLoading(false));
}
