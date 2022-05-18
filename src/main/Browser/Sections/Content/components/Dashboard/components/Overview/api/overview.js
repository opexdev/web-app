import axios from "axios";

export const getOverview = async (activePair, period, controller) => {
    const params = new URLSearchParams();
    params.append('symbol', activePair.symbol);
    return await axios.get(`/api/v3/ticker/${period}?${params.toString()}`, {
        signal: controller.signal,
        data: params,
    })
}
