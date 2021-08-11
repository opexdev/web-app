import React, {Fragment, useState} from "react";
import classes from "../../WalletSubMenu.module.css";
import {images} from "../../../../../../assets/images";
import {useTranslation} from "react-i18next";
import WalletListItem from "../WalletListItem/WalletListItem";
import * as Routes from "../../../../../../routes/routes";
import WalletLoading from "../WalletLoading/WalletLoading";
import Error from "../../../../../../components/Error/Error";
import ToggleSwitch from "../../../../../../components/ToggleSwitch/ToggleSwitch";


const WalletList = (props) => {
    let {wallets, isLoading} = props
    const {t} = useTranslation();
    const [showZero, setShowZero] = useState(false);

    if (isLoading) {
        return <WalletLoading/>
    }
    if (!wallets) {
        return <Error/>
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
            <div className={`container row jc-around ai-center py-2 border-bottom`}>
                <span className={`font-size-sm`}>{t("WalletSubMenu.showZeroBalance")}</span>
                <ToggleSwitch onchange={(e)=>setShowZero(prevState => !prevState)} checked={showZero}/>
            </div>
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
            {Object.keys(wallets).map((name) => {
                if(wallets[name].free !== 0.0 || !showZero   ) {
                    return <WalletListItem name={name} route={Routes.Wallet + "/" + name} amount={wallets[name].free}/>
                }
            })}
        </Fragment>
    )
}

export default WalletList;
