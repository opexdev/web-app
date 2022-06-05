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
    kycReason: null,
    permissions: [],
    lastTransaction: null,
    wallets: {},
    tradeFee: {},
    isLogin: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGOUT:
            const resetWallet = {...state.wallets}
            Object.keys(resetWallet).forEach(key => {
                resetWallet[key] = {free: 0.0, locked: 0.0, withdraw: 0.0};
            });
            return {
                ...initialState,
                tradeFee : {...state.tradeFee},
                wallets: resetWallet
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
                kyc: action.status,
                kycReason: action.reason
            };
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
                lastTransaction: action.time
            }
        default:
            return state;
    }
};

export default reducer;
