import React, {useMemo} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Error from "../../../../../../../../../../../../components/Error/Error";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import {useGetGatewaysByCurrency} from "../../../../../../../../../../../../queries";
import OnChainDeposit from "./Module/OnChainDeposit/OnChainDeposit";
import {useSelector} from "react-redux";

const Deposit = ({currency}) => {

    const {t} = useTranslation();
    let  {id} = useParams();
    if (currency) {
        id = currency;
    }
    const currencies = useSelector((state) => state.exchange.currencies)

    const { data, isLoading, error } = useGetGatewaysByCurrency(id, {
        includeManualGateways: false,
        includeOffChainGateways: true,
        includeOnChainGateways: true
    });

    const { hasOnChain, hasOffChain } = useMemo(() => ({
        hasOnChain: data?.some(gateway => gateway.type === "OnChain"),
        hasOffChain: data?.some(gateway => gateway.type === "OffChain")
    }), [data]);

    if (!currencies[id]?.depositAllowed) return <div className={`flex jc-center ai-center height-100`}>
        <span>{t("noData")}</span>
    </div>
    if (isLoading) return <Loading/>
    if (error) return <Error/>
    if (data.length <= 0 ) return <div className={`flex jc-center ai-center height-100`}>
        <span>{t("noData")}</span>
    </div>

    switch (true) {
        case hasOnChain && hasOffChain:
            return <div className="flex jc-center ai-center height-100">
                <span>{t("comingSoon")}</span>
            </div>;
        case hasOnChain:
            return <OnChainDeposit gateways={data} currency={currency}/>;
        case hasOffChain:
            return <div className="flex jc-center ai-center height-100">
                <span>{t("comingSoon")}</span>
            </div>;
        default:
            return (
                <div className="flex jc-center ai-center height-100">
                    <span>{t("noData")}</span>
                </div>
            );
    }
}
export default Deposit;
