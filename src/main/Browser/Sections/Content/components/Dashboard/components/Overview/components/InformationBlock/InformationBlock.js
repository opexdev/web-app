import React, {useEffect, useState} from "react";
import classes from "../../Overview.module.css";
import {useTranslation} from "react-i18next";
import {getOverview} from "../../api/overview";
import {useSelector} from "react-redux";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../components/Error/Error";


const InformationBlock = ({period}) => {

    const {t} = useTranslation();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [information, setInformation] = useState(null)
    const activePair = useSelector((state) => state.exchange.activePair)

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true)
        setError(false)
        const infoBlockController = new AbortController();
        getOverview(activePair, period, infoBlockController)
            .then((res) => {
                isMounted && setInformation(res.data[0])
            }).catch(() => {
                setError(true)
            }).finally(() => {
                setIsLoading(false)
            });
        return () => {
            isMounted = false;
            infoBlockController.abort();
        }
    }, [activePair, period]);

    if (isLoading) {
        return <Loading/>
    }

    if (error) {
        return <Error/>
    }

    return (<div className={`${classes.content} column jc-between px-1 py-2`}>
        <p>
            {t("overview.change")}:{" "}
            <span className={information.priceChange > 0 ? "text-green" : "text-red"}>
            %{information.priceChangePercent.toFixed(2)}
          </span>
        </p>
        <p>
            {t("min")}:{" "}
            <span className="text-red">{information.lowPrice.toLocaleString()}</span>{" "}
            {t(`currency.${activePair.quoteAsset}`)}
        </p>
        <p>
            {t("max")}:{" "}
            <span className="text-green">{information.highPrice.toLocaleString()}</span>{" "}
            {t(`currency.${activePair.quoteAsset}`)}
        </p>
        <p>
            {t("overview.volume")}: <span>{information.volume.toLocaleString()} </span>
            {t(`currency.${activePair.baseAsset}`)}
        </p>
    </div>)
}

export default InformationBlock;