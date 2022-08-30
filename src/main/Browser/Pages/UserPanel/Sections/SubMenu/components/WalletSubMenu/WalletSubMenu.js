import React, {useState} from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import classes from "./WalletSubMenu.module.css";
import ToggleSwitch from "../../../../../../../../components/ToggleSwitch/ToggleSwitch";
import WalletListItem from "./components/WalletListItem/WalletListItem";
import WalletBalance from "./components/WalletBalance/WalletBalance";
import ScrollBar from "../../../../../../../../components/ScrollBar";

const WalletSubMenu = () => {
    const {t} = useTranslation();
    const [showZero, setShowZero] = useState(false);
    const assets = useSelector((state) => state.exchange.assets)

    return (
        <div className={`container card-background column ${classes.container}`}>
            <div className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                <div className="row jc-start ">
                    <h2>{t("WalletSubMenu.title")}</h2>
                </div>
            </div>
            <div className={`column container ${classes.content}`}>
                <div className={`container row jc-around ai-center py-2 border-bottom`}>
                    <span className={`font-size-sm`}>{t("WalletSubMenu.showZeroBalance")}</span>
                    <ToggleSwitch onchange={()=>setShowZero(prevState => !prevState)} checked={showZero}/>
                </div>
                <WalletBalance/>
                <ScrollBar customClass={`column`}>
                    { assets.map((name) => <WalletListItem key={name} assetName={name} showZero={showZero}/> )}
                </ScrollBar>
            </div>
            <div className={`${classes.footer} flex jc-center ai-centerpx-1 text-color-gray font-size-sm px-1 py-05`} style={{lineHeight:"3vh"}}>
                <span>{t("WalletSubMenu.estimateAlert")}</span>
            </div>
        </div>
    );
};

export default WalletSubMenu;
