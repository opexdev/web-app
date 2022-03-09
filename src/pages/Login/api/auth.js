import axios from "axios";
import {apiBaseUrl} from "../../../constants/global";

/*
const Auth = axios.create({
    baseURL: apiBaseUrl,
    responseType: "json"
});

*/

import userAxios from "../../../setup/axios/setupAxios";
import {adminAxios} from "../../../setup/axios/setupAxios";

const authClientSecret = process.env.REACT_APP_CLIENT_SECRET
const authClientId = process.env.REACT_APP_CLIENT_ID
const authLoginClientId = process.env.REACT_APP_LOGIN_CLIENT_ID


export const getToken = async () => {
    const params = new URLSearchParams();
    params.append('client_id', authClientId);
    params.append('client_secret', authClientSecret);
    params.append('grant_type', 'client_credentials');

    return await adminAxios.post('/auth/realms/opex/protocol/openid-connect/token', params)
        .then((res) => {
            return res;
        }).catch((e) => {
            if (!e.response) {
                return false;
            }
            return e.response;
        })
}

export const login = async (credential) => {
    const params = new URLSearchParams();
    params.append('client_id', authLoginClientId);
    params.append('username', credential.username);
    params.append('password', credential.password);
    params.append('grant_type', 'password');

    return await adminAxios.post('/auth/realms/opex/protocol/openid-connect/token', params)
        .then((res) => {
            return res;
        }).catch((e) => {
            if (!e.response) {
                return false;
            }
            return e.response;
        })
};

export const register = async (token, user) => {
    adminAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return await adminAxios.post('/auth/admin/realms/opex/users', {
        "createdTimestamp": Date.now(),
        "username": user.username,
        "enabled": true,
        "totp": false,
        "emailVerified": false,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "disableableCredentialTypes": [],
        "requiredActions": ["VERIFY_EMAIL", "UPDATE_PASSWORD"],
        "notBefore": 0,
        "access": {
            "manageGroupMembership": true,
            "view": true,
            "mapRoles": true,
            "impersonate": true,
            "manage": true
        },
        "realmRoles": ["mb-user"]
    }).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })

}

export const getUser = async (token, key , value) => {
    adminAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return await adminAxios.get(`/auth/admin/realms/opex/users?${key}=${value}`,)
        .then((res) => {
            return res;
        }).catch((e) => {
            if (!e.response) {
                return false;
            }
            return e.response;
        })
}


export const sendVerifyEmail = async (token, userId) => {
    adminAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return await adminAxios.put(`/auth/admin/realms/opex/users/${userId}/send-verify-email`,)
        .then((res) => {
            console.log(res.data);
        }).catch((e) => {
            console.log(e);
        })
}

export const sendForgetPasswordEmail = async (token, userId) => {
    adminAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    adminAxios.defaults.headers.common['Content-Type'] = "application/json";
    return await adminAxios.put(`/auth/admin/realms/opex/users/${userId}/execute-actions-email`,
        ["UPDATE_PASSWORD"]
    ).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const parseToken = ( data ) => {
    return {
        accessToken: data.access_token,
        accessTokenExpires: Date.now() + data.expires_in * 1000,
        refreshToken: data.refresh_token,
        refreshTokenExpires: Date.now() + data.refresh_expires_in * 1000,
    }
}
export const parsePanelToken = ( data ) => {
    return {
        panelAccessToken: data.access_token,
        panelAccessTokenExpires: Date.now() + data.expires_in * 1000,
    }
}

export const sendUpdateProfileReq = async (token, user, attributes ) => {

    adminAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    adminAxios.defaults.headers.common['Content-Type'] = 'application/json';

    return await adminAxios.put(`auth/admin/realms/opex/users/${user}`,{
        attributes ,
    }).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}
export const sendUserFile = async (token, user, file ) => {

    adminAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    adminAxios.defaults.headers.common['Content-Type'] = 'application/json';

    const data = new FormData();
    data.append('file', file);

    return await adminAxios.post(`/storage/${user}`, data
    ).then((res) => {
        console.log(res)
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const addToKycGroup = async (token, userId) => {

    adminAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    adminAxios.defaults.headers.common['Content-Type'] = 'application/json';

    return await adminAxios.put(`/auth/admin/realms/opex/users/${userId}/groups/24200655-dfef-4ed0-a8b8-925918793552`)
        .then((res) => {
            return res;
        }).catch((e) => {
            if (!e.response) {
                return false;
            }
            return e.response;
        })
};

