import axios from "axios";

export const getOrderBook = async (activePair) => {
    const params = new URLSearchParams();
    params.append('symbol', activePair.symbol);
    params.append('limit', "20");
    return await axios.get(`/api/v3/depth?${params.toString()}`, {
        data:params,
    }).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}
