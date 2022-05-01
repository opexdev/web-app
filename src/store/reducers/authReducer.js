import * as actionTypes from "../actions/actionTypes";

const initialState = {
    username: null,
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    accessToken: null,
    refreshToken: null,
    makerCommission: 0,
    takerCommission: 0,
    buyerCommission: 0,
    sellerCommission: 0,
    canTrade: false,
    canWithdraw: false,
    canDeposit: false,
    accountType: null,
    kyc: null,
    permissions: [],
    lastTransaction: null,
    wallets: {
        IRT: {free: 0.0, locked: 0.0, withdraw: 0.0},
        BTC: {free: 0.0, locked: 0.0, withdraw: 0.0},
        ETH: {free: 0.0, locked: 0.0, withdraw: 0.0},
        TBTC: {free: 0.0, locked: 0.0, withdraw: 0.0},
        TETH: {free: 0.0, locked: 0.0, withdraw: 0.0},
        TUSDT: {free: 0.0, locked: 0.0, withdraw: 0.0},
        USDT: {free: 0.0, locked: 0.0, withdraw: 0.0},
    },
    tradeFee: {
        IRT: 0.01,
        BTC: 0.01,
        ETH: 0.01,
        TBTC: 0.01,
        TETH: 0.01,
        TUSDT: 0.01,
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
        case actionTypes.SET_CHANGE_USER_INFO:
            return {
                ...state,
                firstName: action.firstName,
                lastName: action.lastName,
            };
        case actionTypes.SET_KYC_STATUS:
            return {
                ...state,
                kyc: action.status
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
                refreshToken: action.refreshToken,
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
