import * as actionTypes from '../actions/actionTypes';

const initialState = {
    activePair: "BTC/IRT",
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
            return {
                ...state,
                activePeer: "ETH/IRR"
            }
        default:
            return state;
    }
};

export default globalReducer;