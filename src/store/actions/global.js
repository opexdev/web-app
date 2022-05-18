import * as actionTypes from "./actionTypes";

export const setThemeInitiate = (isDark) => {
  return {
    type: actionTypes.SET_THEME_INITIATE,
    isDark: isDark,
  };
};

export const setTheme = (isDark) => {
  return {
    type: actionTypes.SET_THEME,
    isDark: isDark,
  };
};

export const setLoading = (isLoading) => {
  return {
    type: actionTypes.SET_LOADING,
    isLoading: isLoading,
  };
};

export const loadConfig = () => {
  return {
    type: actionTypes.LOAD_CONFIG,
  };
};
