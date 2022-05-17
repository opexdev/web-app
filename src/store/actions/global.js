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

export const setActivePairInitiate = (pair, activeTab) => {
  return {
    type: actionTypes.SET_ACTIVE_PAIR_INITIATE,
    activeTab: activeTab,
    pair: pair,
  };
};

export const setActivePair = (pair , activeTab) => {
  return {
    type: actionTypes.SET_ACTIVE_PAIR,
    activeTab: activeTab,
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
export const setLastTradePrice = (lastTradePrice) => {
  return {
    type: actionTypes.SET_LAST_TRADE_PRICE,
    lastTradePrice: lastTradePrice,
  };
};

export const setPanelTokens = (token) => {
  return {
    type: actionTypes.SET_PANEL_TOKENS,
    panelAccessToken: token.panelAccessToken,
    panelAccessTokenExpires: token.panelAccessTokenExpires,
  };
};

export const setPanelTokensInitiate = (token) => {
  return {
    type: actionTypes.SET_PANEL_TOKENS_INITIATE,
    panelAccessToken: token.panelAccessToken,
    panelAccessTokenExpires: token.panelAccessTokenExpires,
  };
};

export const setIPG = (lockTime) => {
  return {
    type: actionTypes.SET_IPG,
    lockTime,
  };
};

export const setInfoMessage = (messageType, message) => {
  return {
    type: actionTypes.SET_INFO_MESSAGE,
    messageType,
    message,
  };
};

export const setIPGInitiate = (lockTime) => {
  return {
    type: actionTypes.SET_IPG_INITIATE,
    lockTime,
  };
};