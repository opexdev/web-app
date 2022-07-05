import React from 'react';
import classes from './MarketInfo.module.css'
import AccordionBox from "../../../../../../../../components/AccordionBox/AccordionBox";
import MarketInfoTable from "./components/MarketInfoTable/MarketInfoTable";
import {useTranslation} from "react-i18next";

const MarketInfo = () => {

    const {t} = useTranslation();

    const marketData = [
        {symbol: "BTCBUSD", baseAsset: "BTC", quoteAsset: "BUSD", price: "4500025680", lowPrice: "15000", highPrice: "300050", volume: "300050", priceChangePercent: "10"},
        {symbol: "ETHBUSD", baseAsset: "ETH", quoteAsset: "BUSD", price: "4500025680", lowPrice: "15000", highPrice: "300050", volume: "300050", priceChangePercent: "-3"},
        {symbol: "BTCBUSD", baseAsset: "BTC", quoteAsset: "BUSD", price: "4500025680", lowPrice: "15000", highPrice: "300050", volume: "300050", priceChangePercent: "10"},
        {symbol: "ETHBUSD", baseAsset: "ETH", quoteAsset: "BUSD", price: "4500025680", lowPrice: "15000", highPrice: "300050", volume: "300050", priceChangePercent: "10"},
        {symbol: "BTCBUSD", baseAsset: "BTC", quoteAsset: "BUSD", price: "4500025680", lowPrice: "15000", highPrice: "300050", volume: "300050", priceChangePercent: "10"},
        {symbol: "ETHBUSD", baseAsset: "ETH", quoteAsset: "BUSD", price: "4500025680", lowPrice: "15000", highPrice: "300050", volume: "300050", priceChangePercent: "10"},
        {symbol: "BTCBUSD", baseAsset: "BTC", quoteAsset: "BUSD", price: "4500025680", lowPrice: "15000", highPrice: "300050", volume: "300050", priceChangePercent: "10"},
        {symbol: "ETHBUSD", baseAsset: "ETH", quoteAsset: "BUSD", price: "4500025680", lowPrice: "15000", highPrice: "300050", volume: "300050", priceChangePercent: "10"},
        {symbol: "BTCBUSD", baseAsset: "BTC", quoteAsset: "BUSD", price: "4500025680", lowPrice: "15000", highPrice: "300050", volume: "300050", priceChangePercent: "10"},
        {symbol: "ETHBUSD", baseAsset: "ETH", quoteAsset: "BUSD", price: "4500025680", lowPrice: "15000", highPrice: "300050", volume: "300050", priceChangePercent: "10"},
        {symbol: "BTCBUSD", baseAsset: "BTC", quoteAsset: "BUSD", price: "4500025680", lowPrice: "15000", highPrice: "300050", volume: "300050", priceChangePercent: "10"},
        {symbol: "ETHBUSD", baseAsset: "ETH", quoteAsset: "BUSD", price: "4500025680", lowPrice: "15000", highPrice: "300050", volume: "300050", priceChangePercent: "10"},


    ]


    const data = [
        {id: 1, title: t("currency.IRT"), body: <MarketInfoTable data={marketData}/>},
        {id: 4, title: t("currency.USDT"), body: ""},
    ];
    return (
        <div
            className={`container card-background card-border column ${classes.container}`}>
            <AccordionBox
                title={t("MarketInfo.title")}
                content={data}
                safari={classes.safariFlexSize}
            />
        </div>
    );
};

export default MarketInfo;
