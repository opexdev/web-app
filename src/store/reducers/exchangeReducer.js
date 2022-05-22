import * as actionTypes from "../actions/actionTypes";

const initialState = {
    assets: [],
    pairs: [],
    symbols: [],
    activePair: {},
    lastPrice:{},
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
    ipgLock: null,
};

const exchangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_IPG:
            return {
                ...state,
                ipgLock: action.lockTime,
            };
        case actionTypes.SET_ACTIVE_PAIR:
            return {
                ...state,
                activePair: {
                    ...state.activePair,
                    ...action.pair,
                    name: action.pair.baseAsset + "/" + action.pair.quoteAsset
                },
                activePairOrders: {
                    ...state.activePairOrders,
                    bestBuyPrice: 0,
                    bestSellPrice: 0,
                    lastTradePrice: 0,
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
        case actionTypes.SET_EXCHANGE:
            return {
                ...state,
               ...action.exchangeInfo
            };
        case actionTypes.SET_LAST_PRICE:
            return {
                ...state,
                lastPrice: {
                    ...state.lastPrice,
                    ...action.lastPrice
                }
            };
        default:
            return state;
    }
};

export default exchangeReducer;
