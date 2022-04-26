import axios from "axios";

export const getOverview = async (activePair,period) => {
    const params = new URLSearchParams();
    params.append('symbol', activePair.symbol);
    return await axios.get(`/api/v3/ticker/${period}?${params.toString()}`, {
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
