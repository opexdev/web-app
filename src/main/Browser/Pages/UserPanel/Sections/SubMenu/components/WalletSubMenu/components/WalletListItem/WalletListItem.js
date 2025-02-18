import React from "react";
import classes from "../../WalletSubMenu.module.css";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../../../assets/images";
import * as Routes from "../../../../../../../../Routes/routes";
import {BN, formatWithPrecision, getCurrencyNameOrAlias} from "../../../../../../../../../../utils/utils";
import {useGetUserAccount} from "../../../../../../../../../../queries/hooks/useGetUserAccount";
import {useGetUserAssets} from "../../../../../../../../../../queries";
import {useSelector} from "react-redux";
import i18n from "i18next";

const WalletListItem = ({symbol, data, assetName, freeWallet, showZero}) => {

    const {t} = useTranslation();
    const language = i18n.language
    const currencies = useSelector((state) => state.exchange.currencies)

    const refCurrency = useSelector((state) => state.exchange.baseCurrency)
    const {data: userAccount} = useGetUserAccount()
    const free = userAccount?.wallets[assetName]?.free || 0

    const {data: estimateValue , isLoading, error} = useGetUserAssets(refCurrency)
    const freeEstimateValue = (isLoading || error) ?  0 : (estimateValue?.find( q => q.asset === symbol )?.free || 0)

    const active = currencies[symbol]?.isActive

    if (showZero && free === 0) return <></>

    return (
        <NavLink
            className={({isActive}) =>
                isActive ? `width-100 row ai-center cursor-pointer position-relative px-1 py-105 ${!active && 'text-gray'} ${classes.selected}` : `width-100 row ai-center cursor-pointer position-relative px-1 py-105 ${!active && 'text-gray'}`
            }
            to={Routes.Wallet + "/" + symbol}>
            <div className={` row jc-start ai-center ${classes.PairImage}`}>
                <img
                    className={`img-md flex ${!active && classes.iconDisabled}`}
                    src={currencies[assetName]?.icon}
                    alt={assetName}
                    title={assetName}
                />
            </div>
            <div className={`row jc-between px-05 ${classes.pairDetails}`}>
                <div className="column ai-start">
                    <span>{symbol}</span>
                    <span className="fs-0-7">{getCurrencyNameOrAlias(currencies[symbol], language)}</span>
                </div>
                <div className="column ai-end">
                    <span>{new BN(freeWallet).decimalPlaces(currencies[symbol]?.precision ?? 0).toFormat() + " "} <span className="fs-0-7">{getCurrencyNameOrAlias(currencies[symbol], language)}</span></span>
                    <span className="fs-0-7 text-gray" >
                        <span>~ </span> {refCurrency === assetName ? formatWithPrecision(free, currencies[refCurrency]?.precision ?? 0) : formatWithPrecision(freeEstimateValue, currencies[refCurrency]?.precision ?? 0)}<span> {t("currency."+refCurrency)}</span>
                    </span>
                </div>
            </div>
        </NavLink>
    )
}

export default WalletListItem;