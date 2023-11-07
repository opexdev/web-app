import {call, put} from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "axios";
import i18n from "i18next";
import jwtDecode from "jwt-decode";

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
}export function* getUserConfigs() {
    try {
        const {
            data: {
                theme: userTheme,
                language,
                ...userConfigs
            }
        } = yield call(axios.get, '/config/user/v1')
        i18n.changeLanguage(language)
        yield put(actions.setUserConfig(userConfigs));
        if (userTheme) yield put(actions.setTheme(userTheme));
    } catch (e) {
        console.log(e)
    }
}

export function* setFavPair(action) {
    try {
        yield put(actions.setFavPair(action.favoritePairs));
        yield call(axios.post, '/config/user/v1', {
            favoritePairs: action.favoritePairs
        })
    } catch (e) {
        console.log(e)
    }
}