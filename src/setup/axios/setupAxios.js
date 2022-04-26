export default function setupAxios(axios , store) {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
    axios.defaults.headers.Accept = 'application/json';
    axios.defaults.timeout = 15000;
    axios.interceptors.request.use(
        (config) => {
            const {auth: {accessToken}} = store.getState()
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
            return config
        },
        (err) => Promise.reject(err)
    )
}
