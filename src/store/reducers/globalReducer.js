import * as actionTypes from "../actions/actionTypes";

const initialState = {
  panelAccessToken: null,
  panelAccessTokenExpires: null,
  activePair: {
    pair: "BTC/USDT",
    symbol: "BTCUSDT",
    base: "BTC",
    quote: "USDT",
    baseMaxDecimal: 6,
    quoteMaxDecimal: 0,
    baseRange: {
      min: 0.0004,
      max: 1000,
      step: 0.005,
    },
    quoteRange: {
      min: 1,
      max: 10,
      step: 0.005,
    },
    orderTypes: ["MARKET"],
  },
  activePairOrders: {
    bestBuyPrice: 765121689.0,
    bestSellPrice: 765022879.0,
    selectedBuyOrder: {
      pricePerUnit: null,
      amount: null,
    },
    selectedSellOrder: {
      pricePerUnit: null,
      amount: null,
    },
  },
  isLoading: true,
  isDark: false,
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_THEME:
      return {
        ...state,
        isDark: action.isDark,
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case actionTypes.SET_ACTIVE_PAIR:
      const [base, quote] = action.pair.split("/");
      return {
        ...state,
        activePair: {
          ...state.activePair,
          pair: action.pair,
          base: base,
          quote: quote,
        },
      };
    case actionTypes.SET_BEST_BUY_PRICE:
      return {
        ...state,
        activePairOrders: {
          ...state.activePairOrders,
          bestBuyPrice: action.bestBuyPrice,
        },
      };
    case actionTypes.SET_BEST_SELL_PRICE:
      return {
        ...state,
        activePairOrders: {
          ...state.activePairOrders,
          bestSellPrice: action.bestSellPrice,
        },
      };
    case actionTypes.SET_BUY_ORDERS:
      return {
        ...state,
        activePairOrders: {
          ...state.activePairOrders,
          selectedBuyOrder: {
            pricePerUnit: action.selected.pricePerUnit,
            amount: action.selected.amount,
          },
        },
      };
    case actionTypes.SET_SELL_ORDERS:
      return {
        ...state,
        activePairOrders: {
          ...state.activePairOrders,
          selectedSellOrder: {
            pricePerUnit: action.selected.pricePerUnit,
            amount: action.selected.amount,
          },
        },
      };
      case actionTypes.SET_PANEL_TOKENS:
      return {
        ...state,
        panelAccessToken: action.panelAccessToken,
        panelAccessTokenExpires: action.panelAccessTokenExpires,
      };
    default:
      return state;
  }
};

export default globalReducer;
