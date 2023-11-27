import * as actionTypes from "./actionTypes";

export const setThemeInitiate = (theme, isLogin) => {
    return {
        type: actionTypes.SET_THEME_INITIATE,
        isLogin,
        theme,
    };
};

export const setTheme = (theme) => {
    return {
        type: actionTypes.SET_THEME,
        theme: theme.toUpperCase(),
    };
};

export const setLoading = (isLoading) => {
    return {
        type: actionTypes.SET_LOADING,
        isLoading,
    };
};

export const setError = (error) => {
    return {
        type: actionTypes.SET_ERROR,
        error,
    };
};

export const loadConfig = (token) => {
    return {
        type: actionTypes.LOAD_CONFIG,
        token
    };
};

export const setInfoMessage = (messageType, message) => {
    return {
        type: actionTypes.SET_INFO_MESSAGE,
        messageType,
        message,
    };
};

export const setMarketInterval = (interval) => {
    return {
        type: actionTypes.SET_MARKET_INTERVAL,
        interval,
    };
};