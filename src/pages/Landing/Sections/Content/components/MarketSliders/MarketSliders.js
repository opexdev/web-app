import React, {useState} from 'react';
import classes from './MarketSliders.module.css'
import MarketSlider from "./components/MarketSlider/MarketSlider";
import Radium from "radium";

const MarketSliders = () => {

    const [stop, setStop] = useState(false)


    let movingXKeyframes = Radium.keyframes({
        '0%': {transform: 'translateX(0)'},
        '100%': {transform: 'translateX(20vw)'},
    }, 'pulse');
    const Style = {
        width: 6 * 20 + "vw",
        animationName: movingXKeyframes,
        animationDuration: "2.5s",
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
        animationPlayState: stop ? "paused" : "running",
    }

    const marketData = [
        {symbol: "BTCBUSD", baseAsset: "BTC", quoteAsset: "BUSD", price: "4500025680", lowPrice: "15000", highPrice: "300050", volume: "300050", priceChangePercent: "10"},
        {base: "ETH", price: "4500025680", min: "6520", max: "5555"},
        {base: "USDT", price: "350002", min: "15000", max: "154423"},
        {base: "BNB", price: "582000", min: "150400", max: "5451"},
        {base: "BUSD", price: "56300", min: "8500", max: "56454"},
        {base: "TBTC", price: "4500025680", min: "1400", max: "15545"},

    ]

    const MouseEnterEventHandler = () => {
        setStop(true)
    }
    const MouseLeaveEventHandler = () => {
        setStop(false)
    }

    return (
        <div className={`${classes.container} row jc-start ai-center`} style={Style}
             onMouseEnter={MouseEnterEventHandler} onMouseLeave={MouseLeaveEventHandler}>

            {marketData.map(asset => <MarketSlider base={asset.base} price={asset.price} min={asset.min}
                                                   max={asset.max}/>)}


        </div>
    );
};

export default Radium(MarketSliders);