import * as actionTypes from "../actions/actionTypes";

const initialState = {
    isDark: true,
    isLoading: true,
    hasError: false,
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
                isDark: action.isDark,
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
        default:
            return state;
    }
};

export default globalReducer;
