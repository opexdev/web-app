import * as actionTypes from "../actions/actionTypes";

const initialState = {
  firstName: null,
  lastName: null,
  access_token: null,
  expires_in: null,
  refresh_token: null,
  refresh_expires_in: null,
  wallet: {
    IRT: 0.0,
    BTC: 0.0,
    ETH: 0.0,
    LTC: 0.0,
    DOGE: 0.0,
    BCH: 0.0,
    USDT: 0.0,
  },
  tradeFee: {
    IRT: 0.0,
    BTC: 0.0,
    ETH: 0.0,
    LTC: 0.0,
    DOGE: 0.0,
    BCH: 0.0,
    USDT: 0.0,
  },
  isLogin: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        firstName: "سیاوش",
        lastName: "تفضلی",
        access_token: action.access_token,
        expires_in: Date.now() + action.expires_in * 1000,
        refresh_token: action.refresh_token,
        refresh_expires_in: Date.now() + action.refresh_expires_in * 1000,
        wallet: {
          IRT: 100000,
          BTC: 0.5,
          ETH: 10.2,
          LTC: 6.0,
          DOGE: 50000.0,
          BCH: 56.0,
          USDT: 100.0,
        },
        tradeFee: {
          IRT: 0.0001,
          BTC: 0.0002,
          ETH: 0.0003,
          LTC: 0.0,
          DOGE: 0.0,
          BCH: 0.0,
          USDT: 0.0,
        },
        token: action.token,
        isLogin: true,
      };
    case actionTypes.LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
