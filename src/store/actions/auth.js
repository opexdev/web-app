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

export const setUserTokens = (token) => {
  return {
    type: actionTypes.SET_USER_TOKENS,
    accessToken: token.accessToken,
    accessTokenExpires: token.accessTokenExpires,
    refreshToken: token.refreshToken,
    refreshTokenExpires:token.refreshTokenExpires,
  };
};

export const setUserAccountInfo = (info) => {
  return {
    type: actionTypes.SET_USER_ACCOUNT_INFO,
    info: info,
  };
};

export const setUserTokensInitiate = (token) => {
  return {
    type: actionTypes.SET_USER_TOKENS_INITIATE,
    accessToken: token.accessToken,
    accessTokenExpires: token.accessTokenExpires,
    refreshToken: token.refreshToken,
    refreshTokenExpires:token.refreshTokenExpires,
  };
};

export const setUserInfo = (info) => {
  return {
    type: actionTypes.SET_USER_INFO,
    id: info.id,
    username: info.username,
    emailVerified: info.emailVerified,
    firstName: info.firstName,
    lastName: info.lastName,
    email: info.email,
  };
};

export const setUserInfoInitiate = (info) => {
  return {
    type: actionTypes.SET_USER_INFO_INITIATE,
    id: info.id,
    username: info.username,
    emailVerified: info.emailVerified,
    firstName: info.firstName,
    lastName: info.lastName,
    email: info.email,
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


