import * as actionTypes from "./actionTypes";

export const setThemeInitiate = (isDark) => {
  return {
    type: actionTypes.SET_THEME_INITIATE,
    isDark,
  };
};

export const setTheme = (isDark) => {
  return {
    type: actionTypes.SET_THEME,
    isDark,
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