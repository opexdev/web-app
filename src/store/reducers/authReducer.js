import * as actionTypes from '../actions/actionTypes';

const initialState = {
    firstName: null,
    lastName: null,
    token:null,
    wallet: {
        IRT: 0.0,
        BTC: 0.0,
        ETH: 0.0
    },
    tradeFee:{
        IRT: 0.0,
        BTC: 0.0,
        ETH: 0.0
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
                ...state,
                firstName: "امیرحسین",
                lastName: "فردوسی زاده نائینی",
                wallet: {
                    IRT: 100000,
                    BTC: 0.005,
                    ETH: 0.2
                },
                tradeFee:{
                    IRT: 0.0001,
                    BTC: 0.0002,
                    ETH: 0.0003
                },
            }
        case actionTypes.CLEAR_USER_DATA :
            return {
                ...state,
                firstName: null,
                lastName: null,
                wallet: {
                    IRT: 0.0,
                    BTC: 0.0,
                    ETH: 0.0
                },
                tradeFee:{
                    IRT: 0.0,
                    BTC: 0.0,
                    ETH: 0.0
                },
            }
        default:
            return state;
    }
};

export default reducer;