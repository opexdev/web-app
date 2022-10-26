import React from 'react';
import classes from '../../WalletSubMenu.module.css'
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../../../assets/images";
import {BN} from "../../../../../../../../../../utils/utils";
import {useGetUserAssetsEstimatedValue} from "../../../../../../../../../../queries";

const WalletBalance = () => {

    const {t} = useTranslation();
    const refCurrency = window.env.REACT_APP_REFERENCE_FIAT_CURRENCY
    const {data , isLoading, error} = useGetUserAssetsEstimatedValue(refCurrency)
    const totalValue = (isLoading || error) ?  0 : data.value

    return ( <div className={"container row ai-center cursor-pointer position-relative px-1 py-105"} style={{cursor:"initial"}}>
            <div className={` row jc-start ai-center ${classes.PairImage}`}>
                <img
                    className={`img-md flex`}
                    src={images.safe}
                    alt="safe"
                    title="safe"
                />
            </div>
            <div className={`row jc-between px-05 ${classes.pairDetails}`}>
                <div className="column ai-start">
                    <span>{t("WalletSubMenu.totalValue")}</span>
                    <span className="fs-0-7">{t("WalletSubMenu.approximate")}</span>
                </div>
                <div className="column ai-end">
                    <span>{new BN(totalValue).toFormat()}{" "}<span className="fs-0-7">{t("currency."+refCurrency)}</span></span>
                </div>
            </div>
        </div>

    );
};

export default WalletBalance;
