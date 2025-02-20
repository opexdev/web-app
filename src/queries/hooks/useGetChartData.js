import { useQuery } from "@tanstack/react-query";
import { fetchChartData } from "js-api-client";
import axios from "axios";

const apiBaseUrl = window.env.REACT_APP_API_BASE_URL


/*export const useGetChartData = (symbols = [], period = "WEEKLY", config = {}) => {
    return useQuery({
        queryKey: ["chartData", symbols, period],
        queryFn: async () => {
            const { data } = await fetchChartData({ symbols, period });
            return data;
        },
        enabled: symbols.length > 0,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        ...config,
    });
};*/

export const useGetChartData = (symbols = [], period = "WEEKLY", config = {}) => {
    return useQuery({
        queryKey: ["chartData", symbols, period],

        queryFn: async () => {
            const params = new URLSearchParams();
            params.append("symbols", symbols.join(","));
            params.append("period", period);

            const { data } = await axios.get(`${apiBaseUrl}/market/v1/chart/spark-line?${params.toString()}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return data;
        },
        enabled: symbols.length > 0,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        ...config,
    });
};

