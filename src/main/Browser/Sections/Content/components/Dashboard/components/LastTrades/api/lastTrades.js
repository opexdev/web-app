import axios from "axios";

export const getLastTrades = async (activePair) => {
    const params = new URLSearchParams();
    params.append('symbol', activePair.symbol);
    params.append('limit', "25");
    return await axios.get(`/api/v3/trades?${params.toString()}`, {
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
