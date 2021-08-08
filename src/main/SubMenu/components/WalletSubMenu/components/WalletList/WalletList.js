import React, {Fragment} from "react";
import classes from "../../WalletSubMenu.module.css";
import {images} from "../../../../../../assets/images";
import {useTranslation} from "react-i18next";
import WalletListItem from "../WalletListItem/WalletListItem";
import * as Routes from "../../../../../../routes/routes";
import WalletLoading from "../WalletLoading/WalletLoading";


const WalletList = (props) => {
    const {wallets, isLoading} = props
    const {t} = useTranslation();

    if (isLoading) {
        return <WalletLoading/>
    }
    if (!wallets) {
        return <div className="container row ai-center px-1 py-05 text-center" style={{height: "8.5vh"}}>{t('WalletSubMenu.error')}</div>
    }

    if (wallets.length === 0) {
        return (
            <div className="container row ai-center px-1 py-05" style={{height: "8.5vh"}}>
                <div className={` row jc-center ai-center ${classes.PairImage}`}>
                    <img
                        className={`img-md flex`}
                        src={images.safe}
                        alt="safe"
                        title="safe"
                    />
                </div>
                <div className={`row jc-between px-1 ${classes.pairDetails}`}>
                    <div className="column ai-start">
                        <span>{t("WalletSubMenu.totalValue")}</span>
                        <span className="font-size-sm">{t("WalletSubMenu.approximate")}</span>
                    </div>
                    <div className="column ai-end">
                          <span>0{" "}
                              <span className="font-size-sm">{t("currency.IRT")}</span>
                          </span>
                        <span className="font-size-sm text-color-gray">
                        <span>{t("WalletSubMenu.equivalent")} </span>0{" "}
                            <span>{t("currency.BTC")}</span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Fragment>
            <div className="container row ai-center px-1 py-05" style={{height: "8.5vh"}}>
                <div className={` row jc-center ai-center ${classes.PairImage}`}>
                    <img
                        className={`img-md flex`}
                        src={images.safe}
                        alt="safe"
                        title="safe"
                    />
                </div>
                <div className={`row jc-between px-1 ${classes.pairDetails}`}>
                    <div className="column ai-start">
                        <span>{t("WalletSubMenu.totalValue")}</span>
                        <span className="font-size-sm">{t("WalletSubMenu.approximate")}</span>
                    </div>
                    <div className="column ai-end">
                          <span>530،095،000{" "}
                              <span className="font-size-sm">{t("currency.IRT")}</span>
                          </span>
                        <span className="font-size-sm text-color-gray">
                            <span>{t("WalletSubMenu.equivalent")}</span>0.57{" "}
                            <span>{t("currency.BTC")}</span>
                        </span>
                    </div>
                </div>
            </div>
            {wallets.map(wallet => <WalletListItem name={wallet.asset.toUpperCase()} route={Routes.Wallet + "/" + wallet.asset.toUpperCase()} amount={wallet.free}/>)}
        </Fragment>
    )
}

export default WalletList;
