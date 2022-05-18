import React, {useState} from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import classes from "./WalletSubMenu.module.css";
import ToggleSwitch from "../../../../../../components/ToggleSwitch/ToggleSwitch";
import WalletListItem from "./components/WalletListItem/WalletListItem";
import WalletLoading from "./components/WalletLoading/WalletLoading";


const WalletSubMenu = () => {
    const {t} = useTranslation();
    const [showZero, setShowZero] = useState(false);
    const assets = useSelector((state) => state.exchange.assets)
    const isServerData = useSelector((state) => state.auth.isServerData)

    return (
        <div className={`container card-background column ${classes.container}`}>
            <div className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                <div className="row jc-start ">
                    <h2>{t("WalletSubMenu.title")}</h2>
                </div>
            </div>
            <div className={`column container  ${classes.content}`}>
                <div className={`container row jc-around ai-center py-2 border-bottom`}>
                    <span className={`font-size-sm`}>{t("WalletSubMenu.showZeroBalance")}</span>
                    <ToggleSwitch onchange={()=>setShowZero(prevState => !prevState)} checked={showZero}/>
                </div>
                { isServerData ? assets.map((name) => <WalletListItem key={name} name={name} showZero={showZero}/> ) : <WalletLoading/>}
            </div>
        </div>
    );
};

export default WalletSubMenu;
