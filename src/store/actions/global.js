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

export const setActivePair = (pair) => {
  return {
    type: actionTypes.SET_ACTIVE_PAIR,
    pair: pair,
  };
};

export const loadConfig = () => {
  return {
    type: actionTypes.LOAD_CONFIG,
  };
};

export const setBuyOrder = (selected) => {
  return {
    type: actionTypes.SET_BUY_ORDERS,
    selected: selected,
  };
};
export const setSellOrder = (selected) => {
  return {
    type: actionTypes.SET_SELL_ORDERS,
    selected: selected,
  };
};

export const setBestSellPrice = (bestBuyPrice) => {
  return {
    type: actionTypes.SET_BEST_SELL_PRICE,
    bestSellPrice: bestBuyPrice,
  };
};

export const setBestBuyPrice = (bestBuyPrice) => {
  return {
    type: actionTypes.SET_BEST_BUY_PRICE,
    bestBuyPrice: bestBuyPrice,
  };
};
