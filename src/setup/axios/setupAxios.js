import axios from "axios";
import {useSelector} from "react-redux";


const accessToken = useSelector((state) => state.auth.accessToken)

const userAxios = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    responseType: "json"
});

if (accessToken) {
    userAxios.defaults.headers.use['Authorization'] = `Bearer ${accessToken}`;
}

export const adminAxios = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    responseType: "json"
});

export default userAxios;






