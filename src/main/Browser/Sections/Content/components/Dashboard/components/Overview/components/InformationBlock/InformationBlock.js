import React, {useEffect, useState} from "react";
import classes from "../../Overview.module.css";
import {useTranslation} from "react-i18next";
import {getOverview} from "../../api/overview";
import {connect} from "react-redux";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../components/Error/Error";


const InformationBlock = (props) => {

    const {t} = useTranslation();
    const {activePair,period} = props
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [information , setInformation] = useState(null)

    useEffect(async () => {
        setIsLoading(true)
        setError(false)
        const info = await getOverview(activePair,period);
        if (info.status === 200) {
            setInformation(info.data[0])
        } else {
            setError(true)
        }
        setIsLoading(false)
    }, [activePair,period]);


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
            {t(`currency.${activePair.quoteAsset}`)}
        </p>
    </div>)
}

const mapStateToProps = (state) => {
    return {
        activePair: state.global.activePair,
    };
};

export default connect(mapStateToProps, null)(InformationBlock);