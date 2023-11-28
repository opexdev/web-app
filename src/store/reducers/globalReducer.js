import * as actionTypes from "../actions/actionTypes";

const initialState = {
    theme: "LIGHT",
    isLoading: true,
    hasError: false,
    marketInterval: "24h",
    info: {
        type: null,
        message: null,
    }
};

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_THEME:
            return {
                ...state,
                theme: action.theme,
            };
        case actionTypes.SET_INFO_MESSAGE:
            return {
                ...state,
                info: {
                    type: action.messageType,
                    message: action.message,
                }
            };
        case actionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        case actionTypes.SET_ERROR:
            return {
                ...state,
                hasError: action.error,
            };
        case actionTypes.SET_MARKET_INTERVAL:
            return {
                ...state,
                marketInterval: action.interval
            };
        default:
            return state;
    }
};

export default globalReducer;
