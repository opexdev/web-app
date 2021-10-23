import * as actionTypes from "../actions/actionTypes";

const initialState = {
    username: null,
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    accessToken: null,
    accessTokenExpires: null,
    refreshToken: null,
    refreshTokenExpires: null,
    makerCommission: 0,
    takerCommission: 0,
    buyerCommission: 0,
    sellerCommission: 0,
    canTrade: false,
    canWithdraw: false,
    canDeposit: false,
    accountType: null,
    permissions: [],
    lastTransaction: null,
    wallets: {
        //IRT: {free: 0.0, locked: 0.0, inWithdrawalProcess: 0.0},
        BTC: {free: 0.0, locked: 0.0, inWithdrawalProcess: 0.0},
        ETH: {free: 0.0, locked: 0.0, inWithdrawalProcess: 0.0},
        //LTC: {free: 0.0, locked: 0.0, inWithdrawalProcess: 0.0},
        //DOGE: {free: 0.0, locked: 0.0, inWithdrawalProcess: 0.0},
        //BCH: {free: 0.0, locked: 0.0, inWithdrawalProcess: 0.0},
        USDT: {free: 0.0, locked: 0.0, inWithdrawalProcess: 0.0},
    },
    tradeFee: {
        IRT: 0.01,
        BTC: 0.01,
        ETH: 0.01,
        LTC: 0.01,
        DOGE: 0.01,
        BCH: 0.01,
        USDT: 0.01,
    },
    isLogin: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGOUT:
            return {
                ...initialState,
            };
        case actionTypes.SET_USER_INFO:
            return {
                ...state,
                id: action.id,
                username: action.username,
                emailVerified: action.emailVerified,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
            };
        case actionTypes.SET_IMPERSONATE_TOKENS:
            return {
                ...state,
                accessToken: action.accessToken,
                isLogin: true,
            }
        case actionTypes.SET_USER_TOKENS:
            return {
                ...state,
                accessToken: action.accessToken,
                accessTokenExpires: action.accessTokenExpires,
                refreshToken: action.refreshToken,
                refreshTokenExpires: action.refreshTokenExpires,
                isLogin: true,
            }
        case actionTypes.SET_USER_ACCOUNT_INFO:
            return {
                ...state,
                ...action.info,
                wallets: {
                    ...state.wallets,
                    ...action.info.wallets
                }
            }
        case actionTypes.SET_LAST_TRANSACTION:
            return {
                ...state,
                lastTransaction : action.time
            }
        default:
            return state;
    }
};

export default reducer;
