import axios from "axios";

export const getExchange = () => {
    return axios.get(`/api/v3/exchangeInfo`)
}

export const getPrice = async () => {
    return axios.get(`/api/v3/ticker/price`)
}