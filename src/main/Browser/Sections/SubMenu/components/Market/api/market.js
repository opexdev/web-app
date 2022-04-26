import axios from "axios";

export const getExchange = async () => {
    return await axios.get(`/api/v3/exchangeInfo`)
        .then((res) => {
            return res;
        }).catch((e) => {
            if (!e.response) {
                return false;
            }
            return e.response;
        })
}

export const getPrice = async () => {
    return await axios.get(`/api/v3/ticker/price`)
        .then((res) => {
            return res;
        }).catch((e) => {
            if (!e.response) {
                return false;
            }
            return e.response;
        })
}