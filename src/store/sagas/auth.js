import {call, put} from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "axios";

export function* logout() {
    yield call([localStorage, 'removeItem'], "refreshToken")
    yield put(actions.logout());
}

export function* setUserTokens(action) {
    yield call([localStorage, 'setItem'], "refreshToken", action.refreshToken)
    yield put(actions.setUserTokens(action));
}

export function* getUserKYCStatus() {
    try {
        const {data} = yield call(axios.get, '/auth/realms/opex/user-profile/kyc/status')
        yield put(actions.setKYCStatus(data));
    } catch (e) {
        console.log(e)
    }
}

export function* getUserAccount() {
    const timestamp = Date.now()
    const params = new URLSearchParams();
    params.append('timestamp', timestamp.toString());
    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    }
    try {
        const {data} = yield call(axios.get, `/api/v3/account?timestamp=${timestamp.toString()}`, {
            data: params,
            headers
        })
        yield put(actions.setUserAccountInfo(parseWalletsResponse(data)));
    } catch (e) {
        console.log(e)
    }
}

export const parseWalletsResponse = (res) => {
    let wallets = {}
    res.balances.forEach((wallet) => {
        wallets[wallet.asset.toUpperCase()] = {
            free: parseFloat(wallet.free.toFixed(6)),
            locked: parseFloat(wallet.locked.toFixed(6)),
            withdraw: parseFloat(wallet.withdraw.toFixed(6)),
        }
    })
    delete res.balances;
    delete res.updateTime;
    return {
        ...res,
        wallets: wallets,
        isServerData : true
    };
}