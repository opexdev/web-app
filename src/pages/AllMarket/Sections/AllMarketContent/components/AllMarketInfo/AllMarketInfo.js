import React, {useState} from 'react';
import classes from './AllMarketInfo.module.css'
import Icon from "../../../../../../components/Icon/Icon";
import {Link} from "react-router-dom";
import * as Routes from "../../../../../../routes/routes";
import MarketInfoCard
    from "../../../../../Landing/Sections/LandingContent/components/PopularCryptocurrencies/components/MarketInfoCard/MarketInfoCard";
import MarketInfoTable
    from "../../../../../Landing/Sections/LandingContent/components/PopularCryptocurrencies/components/MarketInfoTable/MarketInfoTable";
import AllMarketInfoCard from "./components/AllMarketInfoCard/AllMarketInfoCard";
import AllMarketInfoTable from "./components/AllMarketInfoTable/AllMarketInfoTable";

const AllMarketInfo = () => {

    const [card, setCard] = useState(false)


    const marketData = [
        {symbol: "BTCBUSD", baseAsset: "BTC", quoteAsset: "BUSD", price: "20,515.85", marketCap: "386,159,595,216", lowPrice: "15000", highPrice: "300050", volume: "44,351,555,144", pcp24h: "-8.58", pcp7d: "-15.58"},
        {symbol: "ETHBUSD", baseAsset: "ETH", quoteAsset: "BUSD", price: "1,054.71", marketCap: "124,977,581,341", lowPrice: "15000", highPrice: "300050", volume: "26,939,396,426", pcp24h: "-11.48", pcp7d: "+14.58"},
        {symbol: "USDT", baseAsset: "USDT", quoteAsset: "BUSD", price: "0.9985", marketCap: "70,750,495,039", lowPrice: "15000", highPrice: "300050", volume: "71,102,864,297", pcp24h: "+1.03", pcp7d: "-125.58"},
        {symbol: "BNB", baseAsset: "BNB", quoteAsset: "BUSD", price: "204.98", marketCap: "32,812,595,330", lowPrice: "15000", highPrice: "300050", volume: "1,681,153,480", pcp24h: "-8.18", pcp7d: "-5.58"},
        {symbol: "BUSD", baseAsset: "BUSD", quoteAsset: "BUSD", price: "1.00", marketCap: "17,437,053,356", lowPrice: "15000", highPrice: "300050", volume: "6,734,823,937", pcp24h: "-0.14", pcp7d: "-5.8"},

        {symbol: "BTCBUSD", baseAsset: "DOGE", quoteAsset: "BUSD", price: "20,515.85", marketCap: "386,159,595,216", lowPrice: "15000", highPrice: "300050", volume: "44,351,555,144", pcp24h: "-8.58", pcp7d: "-1.58"},
        {symbol: "ETHBUSD", baseAsset: "LTC", quoteAsset: "BUSD", price: "1,054.71", marketCap: "124,977,581,341", lowPrice: "15000", highPrice: "300050", volume: "26,939,396,426", pcp24h: "-11.48", pcp7d: "-19.58"},

    ]

    return (
        <div className={`${classes.container} card-background card-border width-90 my-4`}>
            <div className={`${classes.header} card-header-bg row jc-between ai-center px-2 py-2`}>
                <div className={`row jc-center ai-center`}>

                    <Icon iconName={`${card ? 'icon-row' : 'icon-grid'} font-size-md-01 flex cursor-pointer hover-text`} onClick={()=>setCard(prevState => !prevState)}/>
                    <h1 className={`mr-1 ml-1`}>بازار</h1>

                </div>

                <div className={`row jc-center ai-center mr-1`}>
                    <span className={`px-2 py-1 rounded cursor-pointer hover-text icon-active ${classes.title}`}>تومان</span>
                    {/*<span className={`text-orange px-05`} style={{userSelect:"none"}}>|</span>*/}
                    <span className={`pr-2 py-1 rounded cursor-pointer hover-text`}>تتر</span>
                </div>
            </div>
            <div className={`${classes.content}`}>
                {card ?
                    <AllMarketInfoCard data={marketData.sort((a , b) => b.marketCap - a.marketCap)}/>
                    :
                    <AllMarketInfoTable data={marketData.sort((a , b) => b.marketCap - a.marketCap)}/>
                }
            </div>
        </div>
    );
};

export default AllMarketInfo;
