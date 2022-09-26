import React, {useState} from 'react';
import classes from './AllMarketInfo.module.css'
import Icon from "../../../../../../../../components/Icon/Icon";
import AllMarketInfoCard from "./components/AllMarketInfoCard/AllMarketInfoCard";
import AllMarketInfoTable from "./components/AllMarketInfoTable/AllMarketInfoTable";
import {useOverview} from "../../../../../../../../queries";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../components/Error/Error";
import {setMarketInterval} from "../../../../../../../../store/actions";
import {useTranslation} from "react-i18next";

const AllMarketInfo = () => {

    const {t} = useTranslation();
    const interval = useSelector((state) => state.global.marketInterval)
    const {data:overview, isLoading, error} = useOverview(null , interval)
    const [card, setCard] = useState(false)
    const [IRT, setIRT] = useState(true)
    const allSymbols = useSelector((state) => state.exchange.symbols)
    const dispatch = useDispatch();

    let USDTMarket,IRTMarket
    const baseCurrency = window.env.REACT_APP_ENV === "development" ? "USDT" : "BUSD";

    if (!isLoading) {
        const overviewWithPair = overview.map((o)=>{
            o.pairInfo = allSymbols.find((s => s.symbol === o.symbol))
            return o
        })
        const USDTPrice = overview.find(s => s.symbol.includes(baseCurrency+"IRT")).lastPrice
        USDTMarket = overviewWithPair.filter(s => s.symbol.includes(baseCurrency)).sort((a , b) => b.lastPrice * b.volume * USDTPrice - a.lastPrice * a.volume * USDTPrice)
        IRTMarket = overviewWithPair.filter(s => s.symbol.includes("IRT")).sort((a , b) => b.lastPrice * b.volume - a.lastPrice * a.volume)
    }


    const content = () => {
        if (isLoading) return <div style={{height: "40vh"}}><Loading/></div>
        if (error) return <div style={{height: "40vh"}}><Error/></div>
        else return <>
            {card ?
                <AllMarketInfoCard data={ IRT ? IRTMarket : USDTMarket}/>
                :
                <AllMarketInfoTable data={ IRT ? IRTMarket : USDTMarket}/>
            }
        </>
    }

    return (
        <div className={`${classes.container} card-bg card-border width-90 my-4`}>
            <div className={`${classes.header} card-header-bg row jc-between ai-center px-2 py-2`}>
                <div className={`row jc-center ai-center`}>
                    <Icon iconName={`${card ? 'icon-row' : 'icon-grid'} fs-02 flex cursor-pointer hover-text`} customClass={`ml-05`} onClick={()=>setCard(prevState => !prevState)}/>
                    <h1 className={`mr-05 ml-1`}>{t("market.title")}</h1>
                    <div className={`row jc-center ai-center fs-0-8 mr-1`}>
                        <span className={`px-1 py-1 rounded-5 cursor-pointer hover-text ${interval === "24h" && classes.active}`} onClick={()=>dispatch(setMarketInterval("24h"))}>{t("marketInterval.24h")}</span>
                        <span className={`px-1 py-1 rounded-5 cursor-pointer hover-text ${interval === "7d" && classes.active}`} onClick={()=>dispatch(setMarketInterval("7d"))}>{t("marketInterval.7d")}</span>
                        <span className={`px-1 py-1 rounded-5 cursor-pointer hover-text ${interval === "1M" && classes.active}`} onClick={()=>dispatch(setMarketInterval("1M"))}>{t("marketInterval.1M")}</span>
                    </div>
                </div>
                <div className={`row jc-center ai-center mr-1`}>
                    <span className={`px-2 py-1 rounded-5 cursor-pointer hover-text ${IRT && classes.active}`} onClick={()=>setIRT(true)}>{t("currency.IRT")}</span>
                    <span className={`px-2 py-1 rounded-5 cursor-pointer hover-text ${!IRT && classes.active}`} onClick={()=>setIRT(false)}>{t("currency."+baseCurrency)}</span>
                </div>
            </div>
            <div className={`${classes.content}`}>
                {content()}
            </div>
        </div>
    );
};

export default AllMarketInfo;
