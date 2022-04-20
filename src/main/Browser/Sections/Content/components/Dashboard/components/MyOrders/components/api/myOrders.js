import axios from "axios";

export const getOpenOrder = async (activePair) => {
    const timestamp = Date.now()

    const params = new URLSearchParams();
    params.append('symbol', activePair.symbol);
    params.append('recvWindow', "1");
    params.append('timestamp', timestamp.toString());

    return await axios.get(`/api/v3/openOrders?${params.toString()}`, {
        data:params,
        headers : {
            'content-type': 'application/x-www-form-urlencoded'
        },
    }).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const getOrdersHistory = async (activePair) => {
    const timestamp = Date.now()
    const params = new URLSearchParams();
    params.append('symbol', activePair.symbol);
    params.append('recvWindow', "1");
    params.append('timestamp', timestamp.toString());
    params.append('limit', "25");
    return await axios.get(`/api/v3/allOrders?${params.toString()}`, {
        data:params,
        headers : {
            'content-type': 'application/x-www-form-urlencoded'
        },
    }).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const getTrades = async (activePair) => {
    const timestamp = Date.now()

    const params = new URLSearchParams();
    params.append('symbol', activePair.symbol);
    params.append('startTime', "");
    params.append('endTime', "");
    params.append('timestamp', timestamp.toString());
    params.append('limit', "25");

    return await axios.get(`/api/v3/myTrades?${params.toString()}`, {
        data:params,
        headers : {
            'content-type': 'application/x-www-form-urlencoded'
        },
    }).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const cancelOpenOrders = async (activePair ,orderId ) => {
    const timestamp = Date.now()

    const params = new URLSearchParams();
    params.append('symbol', activePair.symbol);
    params.append('orderId', orderId);
    //params.append('origClientOrderId', "");
    params.append('timestamp', timestamp.toString());

    return await axios.delete(`/api/v3/order?${params.toString()}`, {
        data:params,
        headers : {
            'content-type': 'application/x-www-form-urlencoded'
        },
    }).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}