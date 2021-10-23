import axios from "axios";
import {apiBaseUrl} from "../../../constants/global";
import {authClientId, authClientSecret, authLoginClientId} from '../../../constants/auth';


const Auth = axios.create({
    baseURL: apiBaseUrl,
    responseType: "json"
});

export const getToken = async () => {
    const params = new URLSearchParams();
    params.append('client_id', authClientId);
    params.append('client_secret', authClientSecret);
    params.append('grant_type', 'client_credentials');

    return await Auth.post('/auth/realms/opex/protocol/openid-connect/token', params)
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

    return await Auth.post('/auth/realms/opex/protocol/openid-connect/token', params)
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
    Auth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return await Auth.post('/auth/admin/realms/opex/users', {
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
    Auth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return await Auth.get(`/auth/admin/realms/opex/users?${key}=${value}`,)
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
    Auth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return await Auth.put(`/auth/admin/realms/opex/users/${userId}/send-verify-email`,)
        .then((res) => {
            console.log(res.data);
        }).catch((e) => {
            console.log(e);
        })
}

export const sendForgetPasswordEmail = async (token, userId) => {
    Auth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    Auth.defaults.headers.common['Content-Type'] = "application/json";
    return await Auth.put(`/auth/admin/realms/opex/users/${userId}/execute-actions-email`,
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

    Auth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    Auth.defaults.headers.common['Content-Type'] = 'application/json';

    return await Auth.put(`auth/admin/realms/opex/users/${user}`,{
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

    Auth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    Auth.defaults.headers.common['Content-Type'] = 'application/json';

    const data = new FormData();
    data.append('file', file);

    return await axios.post(`http://192.168.2.119/storage/${user}`, data
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

