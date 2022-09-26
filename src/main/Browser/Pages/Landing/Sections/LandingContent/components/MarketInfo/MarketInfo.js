import React, {useState} from 'react';
import classes from './MarketInfo.module.css'
import Icon from "../../../../../../../../components/Icon/Icon";
import MarketInfoTable from "./components/MarketInfoTable/MarketInfoTable";
import MarketInfoCard from "./components/MarketInfoCard/MarketInfoCard";
import * as Routes from "../../../../../../Routes/routes";
import {Link} from "react-router-dom";
import {useOverview} from "../../../../../../../../queries";
import Loading from "../../../../../../../../components/Loading/Loading";
import {useSelector} from "react-redux";
import Error from "../../../../../../../../components/Error/Error";
import {useTranslation} from "react-i18next";
import i18n from "i18next";

const MarketInfo = () => {

    const {t} = useTranslation();
    const interval = "24h"
    const {data: overview, isLoading, error} = useOverview(null, interval)
    const [card, setCard] = useState(false)
    const [IRT, setIRT] = useState(true)
    const allSymbols = useSelector((state) => state.exchange.symbols)

    let USDTMarket, IRTMarket

    const baseCurrency = window.env.REACT_APP_ENV === "development" ? "USDT" : "BUSD";

    if (!isLoading) {
        const overviewWithPair = overview.map((o) => {
            o.pairInfo = allSymbols.find((s => s.symbol === o.symbol))
            return o
        })
        const USDTPrice = overview.find(s => s.symbol.includes(baseCurrency+"IRT")).lastPrice
        USDTMarket = overviewWithPair.filter(s => s.symbol.includes(baseCurrency)).sort((a, b) => b.lastPrice * b.volume * USDTPrice - a.lastPrice * a.volume * USDTPrice).slice(0, 5)
        IRTMarket = overviewWithPair.filter(s => s.symbol.includes("IRT")).sort((a, b) => b.lastPrice * b.volume - a.lastPrice * a.volume).slice(0, 5)
    }

    const content = () => {
        if (isLoading) return <div style={{height: "40vh"}}><Loading/></div>
        if (error) return <div style={{height: "40vh"}}><Error/></div>
        else return <>
            {card ?
                <MarketInfoCard data={IRT ? IRTMarket : USDTMarket}/>
                :
                <MarketInfoTable data={IRT ? IRTMarket : USDTMarket}/>
            }
        </>
    }


    return (
        <div className={`${classes.container} card-bg card-border width-90 my-4`}>
            <div className={`${classes.header} card-header-bg row jc-between ai-center px-2 py-2`}>
                <div className={`row jc-center ai-center`}>
                    <Icon iconName={`${card ? 'icon-row' : 'icon-grid'} fs-02 flex cursor-pointer hover-text`}
                          customClass={`ml-05`}
                          onClick={() => setCard(prevState => !prevState)}/>
                    <div className={`row jc-center ai-baseline mr-05 ml-1`}>
                        <h2 className={`ml-025`}>{t("market.title")}</h2>
                        <span className={`fs-0-8 mr-025`}>( {t("marketInterval." + interval)} )</span>
                    </div>
                    <div className={`row jc-center ai-center mr-1`}>
                        <span className={`px-2 py-1 rounded-5 cursor-pointer hover-text ${IRT && classes.active}`}
                              onClick={() => setIRT(true)}>{t("currency.IRT")}</span>
                        <span className={`px-2 py-1 rounded-5 cursor-pointer hover-text ${!IRT && classes.active}`}
                              onClick={() => setIRT(false)}>{t("currency."+baseCurrency)}</span>
                    </div>
                </div>
                <Link to={Routes.AllMarket} className={`row jc-center ai-center cursor-pointer hover-text`}>
                    <span className={`ml-05`}>{t("MarketInfo.viewAllMarket")}</span>
                    <Icon
                        iconName={`${i18n.language !== "fa" ? 'icon-right-open-1' : 'icon-left-open-1'} fs-01 flex`}
                        className={`mr-05`}/>
                </Link>
            </div>
            <div className={`${classes.content}`}>
                {content()}
            </div>
        </div>
    );
};

export default MarketInfo;
