import React from "react";
import classes from "../../WalletSubMenu.module.css";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../../../assets/images";
import * as Routes from "../../../../../../../../Routes/routes";
import {BN} from "../../../../../../../../../../utils/utils";
import {useGetUserAccount} from "../../../../../../../../../../queries/hooks/useGetUserAccount";
import {useGetUserAssets} from "../../../../../../../../../../queries";

const WalletListItem = ({assetName, showZero}) => {
    const {t} = useTranslation();

    console.log("assetName",  assetName)

    const {data: userAccount} = useGetUserAccount()
    const free = userAccount?.wallets[assetName]?.free || 0

    const {data: estimateValue , isLoading, error} = useGetUserAssets("IRT")

    const freeEstimateValue = (isLoading || error) ?  0 : (estimateValue?.find( q => q.asset === assetName )?.free || 0)

    if (showZero && free === 0) return <></>

    return (
        <NavLink
            className={({isActive}) =>
                isActive ? "container row ai-center cursor-pointer position-relative px-1 py-105 " + classes.selected : "container row ai-center cursor-pointer position-relative px-1 py-105"
            }
            to={Routes.Wallet + "/" + assetName}>
            <div className={` row jc-start ai-center ${classes.PairImage}`}>
                <img
                    className={`img-md flex`}
                    src={images[assetName]}
                    alt={assetName}
                    title={assetName}
                />
            </div>
            <div className={`row jc-between px-05 ${classes.pairDetails}`}>
                <div className="column ai-start">
                    <span>{assetName}</span>
                    <span className="font-size-sm">{t("currency." + assetName)}</span>
                </div>
                <div className="column ai-end">
                    <span>{new BN(free).toFormat() + " "} <span className="font-size-sm">{t("currency." + assetName)}</span></span>
                    <span className="font-size-sm text-color-gray">
                        <span>{t("WalletSubMenu.equivalent")} </span> {new BN(freeEstimateValue).toFormat()} <span>{t("currency.IRT")}</span>
                    </span>
                </div>
            </div>
        </NavLink>
    )
}

export default WalletListItem;