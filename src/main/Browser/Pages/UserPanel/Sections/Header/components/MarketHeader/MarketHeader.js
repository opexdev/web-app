import React, {useEffect, useState} from "react";
import classes from "./MarketHeader.module.css";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {BN} from "../../../../../../../../utils/utils";
import Icon from "../../../../../../../../components/Icon/Icon";
import Popup from "../../../../../../../../components/Popup/Popup";
import {useGetUserAccount} from "../../../../../../../../queries/hooks/useGetUserAccount";
import {useGetLastPrices} from "../../../../../../../../queries/hooks/useGetLastPrices";


const MarketHeader = () => {
    const {t} = useTranslation();

    const activePair = useSelector((state) => state.exchange.activePair)
    const {data: lastPrices} = useGetLastPrices()
    const {data: userAccount} = useGetUserAccount()

    const base = userAccount?.wallets[activePair.baseAsset]?.free || 0
    const quote = userAccount?.wallets[activePair.quoteAsset]?.free || 0

    const [showPopUp, setShowPopUp] = useState(false);
    const [showPopUpAsset, setShowPopUpAsset] = useState(null);

    const ClickHandler = (currency) => {
        if (currency === showPopUpAsset || !showPopUpAsset) {
            setShowPopUp(true)
        }
        setShowPopUpAsset(currency)
    }

    useEffect(() => {
        setShowPopUp(false)
        setShowPopUpAsset(null)
    }, [activePair]);

    const closePopup = () => {
        setShowPopUp(false)
        setShowPopUpAsset(null)
    }

    return (
        <>
            <div className={`col-25 column ai-start`}>
                <h2 className="mb-05">{t("currency." + activePair.baseAsset)}/{t("currency." + activePair.quoteAsset)}</h2>
                <p>{t("header.lastPrice")}:{" "}<span/>{" "}{new BN(lastPrices[activePair.symbol] || 0).toFormat()+" "+t("currency." + activePair.quoteAsset)}</p>
            </div>
            <div className={`col-50 column ai-center`}>
                <p className="mb-05">{t("header.availableBalance")}</p>
                <div className={`container row ai-center ${classes.inventory}`}>
                    <div className="col-50 flex ai-center jc-end">
                        <Icon iconName="icon-plus icon-white font-size-sm flex" customClass={`mx-05 cursor-pointer ${classes.iconBG}`} onClick={()=>ClickHandler(activePair.baseAsset)}/>
                        <span>{ new BN (base).decimalPlaces(activePair.baseAssetPrecision).toFormat()}</span>
                        <span>{t("currency." + activePair.baseAsset)}</span>
                    </div>
                    <div className="col-50 flex ai-center  jc-start">
                        <span>{ new BN(quote).decimalPlaces(activePair.quoteAssetPrecision).toFormat()}</span>
                        <span>{t("currency." + activePair.quoteAsset)}</span>
                        <Icon iconName="icon-plus icon-white font-size-sm flex" customClass={`mx-05 cursor-pointer ${classes.iconBG}`} onClick={()=>ClickHandler(activePair.quoteAsset)}/>
                    </div>

                </div>
            </div>
            {showPopUp ? <Popup currency={showPopUpAsset} closePopup={closePopup}/> : ""}
        </>
    );
};

export default MarketHeader;