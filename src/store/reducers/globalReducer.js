import * as actionTypes from '../actions/actionTypes';

const initialState = {
    activePair: {
        pair : "BTC/IRT",
        base : "BTC",
        quote : "IRT",
        baseMaxDecimal : 6,
        quoteMaxDecimal : 0,
        min : 0.00001,
        max : 10,
    },
    activePairOrders :{
        bestBuyPrice: 52300.0,
        bestSellPrice: 52300.0,
        selectedPrice:1000.0
    },
    isLoading: true,
    isDark: false
}

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_THEME :
            return {
                ...state,
                isDark: action.isDark
            }
        case actionTypes.SET_LOADING :
            return {
                ...state,
                isLoading: action.isLoading
            }
        case actionTypes.SET_ACTIVE_PEER :
            const [base,quote]= "ETH/IRR".split("/")
            return {
                ...state,
                activePeer: {
                    pair : "ETH/IRR",
                    base : base,
                    quote : quote
                },
            }
        default:
            return state;
    }
};

export default globalReducer;