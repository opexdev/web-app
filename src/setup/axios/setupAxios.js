import axios from "axios";

const defaultAxios = axios.create({
    timeout :15000,
    baseURL:window.env.REACT_APP_API_BASE_URL,
    headers : {
        Accept : 'application/json'
    }
})

export default function setupAxios(axios , store) {
    axios.defaults.baseURL = window.env.REACT_APP_API_BASE_URL;
    axios.defaults.headers.Accept = 'application/json';
    axios.defaults.timeout = 15000;
    axios.interceptors.request.use(
        (config) => {
            const {auth: {accessToken}} = store.getState()
            const {global: {info: {message}} } = store.getState()
            if (message === "offline") {
                throw new axios.Cancel('Operation canceled by the user.');
            }
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
            return config
        },
        (err) => Promise.reject(err)
    )

    axios.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 401 && prevRequest.headers['Authorization'] && !prevRequest?.sent ) {
                prevRequest.sent = true;
                const newAccessToken = await refresh(store);
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                if (newAccessToken) {
                    return axios(prevRequest);
                }
            }
            return Promise.reject(error);
        }
    )
}

const refresh = async (store) => {
    let {auth: {refreshToken}} = store.getState()
    const params = new URLSearchParams();
    params.append('client_id', window.env.REACT_APP_CLIENT_ID);
    params.append('client_secret', window.env.REACT_APP_CLIENT_SECRET);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken );

    const response = await defaultAxios.post('/auth/realms/opex/protocol/openid-connect/token', params);
    refreshToken = response?.data?.refresh_token;
    const accessToken = response?.data?.access_token;
    localStorage.setItem("refreshToken", refreshToken)
    return accessToken
}
