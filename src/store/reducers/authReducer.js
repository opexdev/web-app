import * as actionTypes from '../actions/actionTypes';

const initialState = {
    firstName: null,
    lastName: null,
    token:null,
    wallet: {
        IRT: 0,
        BTC: 0,
        ETH: 0
    },
    isLogin: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN :
            return {
                ...state,
                isLogin: true
            }
        case actionTypes.LOGOUT :
            return {
                ...state,
                isLogin: false
            }
        case actionTypes.STORE_USER_DATA :
            return {
                firstName: "امیرحسین",
                lastName: "فردوسی زاده نائینی",
                wallet: {
                    IRT: 10000,
                    BTC: 0.005,
                    ETH: 0.2
                },
                isLogin: true
            }
        case actionTypes.CLEAR_USER_DATA :
            return {
                firstName: null,
                lastName: null,
                wallet: {
                    irr: null,
                    btc: null,
                    eth: null
                },
                isLogin: false
            }
        default:
            return state;
    }
};

export default reducer;