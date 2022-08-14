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

const MarketInfo = () => {

    const {data:overview, isLoading, error} = useOverview(null , "24h")
    const [card, setCard] = useState(false)
    const [IRT, setIRT] = useState(true)
    const allSymbols = useSelector((state) => state.exchange.symbols)

    let USDTMarket,IRTMarket

    if (!isLoading) {
        const overviewWithPair = overview.map((o)=>{
            o.pairInfo = allSymbols.find((s => s.symbol === o.symbol))
            return o
        })
        const USDTPrice = overview.find(s => s.symbol.includes("USDTIRT")).lastPrice
        USDTMarket = overviewWithPair.filter(s => s.symbol.includes("USDT")).sort((a , b) => b.lastPrice * b.volume * USDTPrice - a.lastPrice * a.volume * USDTPrice).slice(0 , 5)
        IRTMarket = overviewWithPair.filter(s => s.symbol.includes("IRT")).sort((a , b) => b.lastPrice * b.volume - a.lastPrice * a.volume).slice(0 , 5)
    }

    const content = () => {
        if (isLoading) return <div style={{height: "40vh"}}><Loading/></div>
        if (error) return <div style={{height: "40vh"}}><Error/></div>
        else return <>
            {card ?
                <MarketInfoCard data={ IRT ? IRTMarket : USDTMarket}/>
                :
                <MarketInfoTable data={ IRT ? IRTMarket : USDTMarket}/>
            }
        </>
    }


    return (
        <div className={`${classes.container} card-background card-border width-90 my-4`}>
            <div className={`${classes.header} card-header-bg row jc-between ai-center px-2 py-2`}>
                <div className={`row jc-center ai-center`}>
                    <Icon iconName={`${card ? 'icon-row' : 'icon-grid'} font-size-md-01 flex cursor-pointer hover-text`} onClick={()=>setCard(prevState => !prevState)}/>
                    <h1 className={`mr-1 ml-1`}>بازار</h1>
                    <div className={`row jc-center ai-center mr-1`}>
                        <span className={`px-2 py-1 rounded cursor-pointer hover-text ${IRT && classes.active}`} onClick={()=>setIRT(true)}>تومان</span>
                        {/*<span className={`text-orange px-05`} style={{userSelect:"none"}}>|</span>*/}
                        <span className={`px-2 py-1 rounded cursor-pointer hover-text ${!IRT && classes.active}`} onClick={()=>setIRT(false)}>تتر</span>
                    </div>
                </div>
                <div className={`row jc-center ai-center cursor-pointer hover-text`}>
                    <Link to={"/"} className={`ml-05 hover-text`}>نمایش تمام بازار</Link>
                    {/*<Link to={Routes.AllMarket} className={`ml-05 hover-text`}>نمایش تمام بازار</Link>*/}
                    <Icon iconName="icon-left-open-1 font-size-md flex" className={`mr-05`}/>
                </div>
            </div>
            <div className={`${classes.content}`}>
                {content()}
            </div>
        </div>
    );
};

export default MarketInfo;
