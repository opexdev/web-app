import * as actionTypes from "./actionTypes";


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