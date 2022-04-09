import axios from "axios";

const clientSecret = process.env.REACT_APP_CLIENT_SECRET
const clientId = process.env.REACT_APP_CLIENT_ID


export const getToken = async () => {
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', 'client_credentials');

    return await axios.post('/auth/realms/opex/protocol/openid-connect/token', params)
        .then((res) => {
            return  res.data.access_token;
        }).catch((e) => {
            if (!e.response) {
                return false;
            }
            return e.response;
        })
}

export const login = async (credential) => {
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('username', credential.username);
    params.append('password', credential.password);
    params.append('otp', credential.otp);
    params.append('grant_type', 'password');
    params.append('client_secret', clientSecret);

    return await axios.post('/auth/realms/opex/protocol/openid-connect/token', params)
        .then((res) => {
            return res;
        }).catch((e) => {
            if (!e.response) {
                return false;
            }
            return e.response;
        })
};

export const register = async (user , panelToken) => {
    return await axios.post('/auth/realms/opex/user-management/user', user ,{
        headers : {
            "Authorization" : "Bearer "+ panelToken
        }
    }).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

//Todo Remove getUser
export const getUser = async (token, key , value) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return await axios.get(`/auth/admin/realms/opex/users?${key}=${value}`,)
        .then((res) => {
            return res;
        }).catch((e) => {
            if (!e.response) {
                return false;
            }
            return e.response;
        })
}


export const sendForgetPasswordEmail = async (panelToken , email) => {
    return await axios.post(`/auth/realms/opex/user-management/user/forgot?${email}`,null,{
        headers : {
            "Authorization" : "Bearer "+ panelToken
        }
    }).then((res) => {
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

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    return await axios.put(`auth/admin/realms/opex/users/${user}`,{
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

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    const data = new FormData();
    data.append('file', file);

    return await axios.post(`/storage/${user}`, data
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

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    return await axios.put(`/auth/admin/realms/opex/users/${userId}/groups/24200655-dfef-4ed0-a8b8-925918793552`)
        .then((res) => {
            return res;
        }).catch((e) => {
            if (!e.response) {
                return false;
            }
            return e.response;
        })
};

