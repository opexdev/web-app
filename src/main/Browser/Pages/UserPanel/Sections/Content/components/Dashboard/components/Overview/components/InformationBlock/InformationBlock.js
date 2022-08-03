import React from "react";
import classes from "../../Overview.module.css";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../../../components/Error/Error";
import {useOverview} from "../../../../../../../../../../../../queries";


const InformationBlock = ({period}) => {

    const {t} = useTranslation();
    const activePair = useSelector((state) => state.exchange.activePair)
    const {data, isLoading, error} = useOverview(activePair.symbol, period)

    if (isLoading) return <Loading/>
    if (error) return <Error/>

    return (<div className={`${classes.content} column jc-between px-1 py-2`}>
        <p>
            {t("overview.change")}:{" "}
            <span className={data.priceChange > 0 ? "text-green" : "text-red"}>
            %{data.priceChangePercent.toFixed(2)}
          </span>
        </p>
        <p>
            {t("min")}:{" "}
            <span className="text-red">{data.lowPrice.toLocaleString()}</span>{" "}
            {t(`currency.${activePair.quoteAsset}`)}
        </p>
        <p>
            {t("max")}:{" "}
            <span className="text-green">{data.highPrice.toLocaleString()}</span>{" "}
            {t(`currency.${activePair.quoteAsset}`)}
        </p>
        <p>
            {t("overview.volume")}: <span>{data.volume.toLocaleString()} </span>
            {t(`currency.${activePair.baseAsset}`)}
        </p>
    </div>)
}

export default InformationBlock;