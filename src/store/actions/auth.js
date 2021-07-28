import * as actionTypes from "./actionTypes";

export const login = (token) => {
  return {
    type: actionTypes.LOGIN,
    access_token: token.access_token,
    expires_in: token.expires_in,
    refresh_token: token.refresh_token,
    refresh_expires_in: token.refresh_expires_in,
  };
};

export const setLoginInitiate = (token) => {
  return {
    type: actionTypes.LOGIN_INITIATE,
    access_token: token.access_token,
    expires_in: Date.now() + token.expires_in * 1000,
    refresh_token: token.refresh_token,
    refresh_expires_in: Date.now() + token.refresh_expires_in * 1000,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
export const setLogoutInitiate = () => {
  return {
    type: actionTypes.LOGOUT_INITIATE,
  };
};


