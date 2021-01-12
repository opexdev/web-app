import * as actionTypes from '../actions/actionTypes';

const initialState = {
    activePair: {
        pair : "BTC/IRT",
        base : "BTC",
        quote :"IRT"
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
            //const [p1,p2]= action.activePair.split("/")
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