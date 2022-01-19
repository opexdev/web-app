import * as actionTypes from "../actions/actionTypes";

const initialState = {
    panelAccessToken: null,
    panelAccessTokenExpires: null,
    activePair: {
        name: "BTC/USDT",
        baseAsset: "BTC",
        baseAssetPrecision: 7,
        filters: [],
        icebergAllowed: false,
        isMarginTradingAllowed: false,
        isSpotTradingAllowed: false,
        ocoAllowed: false,
        orderTypes: ["LIMIT", "MARKET"],
        permissions: ["SPOT"],
        quoteAsset: "USDT",
        quoteAssetPrecision: 2,
        status: "TRADING",
        symbol: "BTCUSDT",
        baseRange: {
            min: 0.000001,
            max: 1000,
            step: 0.000001,
        },
        quoteRange: {
            min: 0.01,
            max: 1000000,
            step: 0.01,
        },
    },
    activePairOrders: {
        bestBuyPrice: 0,
        bestSellPrice: 0,
        lastTradePrice: 0,
        selectedBuyOrder: {
            pricePerUnit: 0,
            amount: 0,
        },
        selectedSellOrder: {
            pricePerUnit: 0,
            amount: 0,
        },
    },
    activeMarketTab: 0,
    isLoading: true,
    isDark: true,
    ipgLock: null,
};

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_THEME:
            return {
                ...state,
                isDark: action.isDark,
            };

        case actionTypes.SET_IPG:
            return {
                ...state,
                ipgLock: action.lockTime,
            };

        case actionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        case actionTypes.SET_ACTIVE_PAIR:
            return {
                ...state,
                activePair: {
                    ...state.activePair,
                    ...action.pair,
                    name:action.pair.baseAsset+"/"+action.pair.quoteAsset
                },
                activePairOrders: {
                    ...state.activePairOrders,
                    bestBuyPrice: 0,
                    bestSellPrice: 0,
                    lastTradePrice: 0,
                },
                activeMarketTab: action.activeTab,
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
        case actionTypes.SET_LAST_TRADE_PRICE:
            return {
                ...state,
                activePairOrders: {
                    ...state.activePairOrders,
                    lastTradePrice: action.lastTradePrice
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
