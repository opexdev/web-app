import React, {useMemo} from 'react';
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useGetGatewaysByCurrency} from "../../../../../../../../../../../../queries";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../../../components/Error/Error";
import OnChainDeposit from "../Deposit/Module/OnChainDeposit/OnChainDeposit";
import OnChainWithdraw from "./Module/OnChainWithdraw/OnChainWithdraw";

const Withdrawal = () => {

    const {t} = useTranslation();
    const {id} = useParams();
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

    if (!currencies[id]?.withdrawAllowed) return <div className={`flex jc-center ai-center height-100`}>
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
            return <OnChainWithdraw gateways={data}/>;
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
};

export default Withdrawal;
