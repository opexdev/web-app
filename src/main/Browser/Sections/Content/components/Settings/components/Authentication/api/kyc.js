import axios from "axios";
import {apiBaseUrl} from "../../../../../../../../../constants/global";

const kyc = axios.create({
    baseURL: apiBaseUrl,
});

