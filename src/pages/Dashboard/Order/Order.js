import React, {useState,useEffect} from 'react';
import classes from "./Order.module.css"
import AccordionBox from "../../../components/AccordionBox/AccordionBox";
import TextInput from "../../../components/TextInput/TextInput";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {decimalChecker} from "../../../utils/utils";

const Order = (props) => {
    const {t} = useTranslation();

    const [buyOrder,setBuyOrder]=useState({
        tradeFee:0.0,
        stopLimit: false,
        stopMarket: false,
        stopPrice:0.0,
        price: 0.0,
        pricePerUnit:0.0,
        totalPrice:0.0,
    })

    const buyPriceHandler = (value , key )=>{
        switch (key) {
            case 'price':
                if (!decimalChecker( value , props.activePair.baseMaxDecimal)) break
                const price = parseFloat(value);
                setBuyOrder({
                    ...buyOrder,
                    price: value,
                    totalPrice: (price * (buyOrder.pricePerUnit)).toFixed(props.activePair.quoteMaxDecimal),
                    tradeFee: (price * (props.auth.tradeFee[props.activePair.quote])).toFixed(props.activePair.baseMaxDecimal)
                });
                break
            case 'pricePerUnit':
                if (!decimalChecker( value , props.activePair.quoteMaxDecimal)) break
                const pricePerUnit = parseFloat(value);
                setBuyOrder({
                    ...buyOrder,
                    pricePerUnit: value,
                    totalPrice: (buyOrder.price * (pricePerUnit)).toFixed(props.activePair.quoteMaxDecimal),
                    tradeFee: (buyOrder.price * (props.auth.tradeFee[props.activePair.quote])).toFixed(props.activePair.baseMaxDecimal)
                });
                break
            case 'totalPrice':
                if (!decimalChecker( value , props.activePair.quoteMaxDecimal)) break
                const totalPrice = parseFloat(value)
                setBuyOrder({
                    ...buyOrder,
                    price: (totalPrice / buyOrder.pricePerUnit).toFixed(props.activePair.baseMaxDecimal),
                    totalPrice: value,
                    tradeFee: (( totalPrice / buyOrder.pricePerUnit ) * (props.auth.tradeFee[props.activePair.quote])).toFixed(props.activePair.baseMaxDecimal)
                });
                break
            default:
        }
    }

    useEffect(()=>{
        setBuyOrder(prevState => ({ ...buyOrder, tradeFee: prevState.totalPrice*(props.auth.tradeFee[props.activePair.quote])}));
    },[props.auth])

    useEffect(()=>{
        buyPriceHandler(props.activePairOrders.bestBuyPrice.toString() ,'pricePerUnit')
    },[buyOrder.stopMarket])

    const fillBuyByWallet=()=>{
        if(buyOrder.pricePerUnit === 0 ){
            const totalPrice = props.auth.wallet[props.activePair.quote]
            setBuyOrder({
                price: totalPrice / props.activePair.bestBuyPrice,
                pricePerUnit: props.activePair.bestBuyPrice,
                totalPrice: totalPrice,
                tradeFee: totalPrice * (props.auth.tradeFee[props.activePair.quote])
            });
        }else {
            buyPriceHandler(props.auth.wallet[props.activePair.quote] ,'totalPrice')
        }
    }

    const fillBuyByBestPrice = () => {
        buyPriceHandler(props.activePair.bestBuyPrice ,'pricePerUnit')
    }


    let Buy = <div className={classes.content}>
        <p onClick={() => fillBuyByWallet()}> موجودی قابل
            معامله: <span>{props.auth.wallet[props.activePair.quote]}</span> {t('currency.' + props.activePair.quote)}
        </p>
        <p onClick={() => fillBuyByBestPrice()}>بهترین
            پیشنهاد: <span>{props.activePairOrders.bestBuyPrice}</span> {t('currency.' + props.activePair.quote)}</p>

        <div>
            <span>سفارش متوقف</span>
            <input
                type="checkbox"
                checked={buyOrder.stopLimit}
                onChange={(e)=>setBuyOrder({...buyOrder ,stopLimit: e.target.checked})}
            />
        </div>
        {
            buyOrder.stopLimit  ?
                <TextInput lead="قیمت توقف" after={t('currency.' + props.activePair.base)}
                           value={buyOrder.stopPrice.toString()}
                           onchange={(e) => setBuyOrder({...buyOrder, stopPrice: e.target.value})}/>
                : ""
        }


        <TextInput
            lead="مقدار"
            after={t('currency.' + props.activePair.base)}
            value={buyOrder.price.toString()}
            onchange={(e) => buyPriceHandler(e.target.value, 'price')}
            onblur={(e)=>setBuyOrder({...buyOrder,price:parseFloat(e.target.value)})}
        />

        <TextInput
            lead="قیمت واحد"
            after={t('currency.' + props.activePair.quote)}
            value={buyOrder.pricePerUnit.toString()}
            onchange={(e) => buyPriceHandler(e.target.value, 'pricePerUnit')}
            onblur={(e)=>setBuyOrder({...buyOrder,pricePerUnit:parseFloat(e.target.value)})}
        />

        <div>
            <span>خرید به قیمت بازار</span>
            <input
                type="checkbox"
                checked={buyOrder.stopMarket}
                onChange={(e)=>setBuyOrder({...buyOrder ,stopMarket: e.target.checked})}
            />
        </div>
        <TextInput lead="قیمت کل" after={t('currency.' + props.activePair.quote)} value={buyOrder.totalPrice.toString()}
                   onchange={(e) => buyPriceHandler(e.target.value, 'totalPrice')}/>
        <p> کارمزد:{buyOrder.tradeFee} {t('currency.' + props.activePair.base)}</p>
        <p> دریافتی شما:{buyOrder.price - buyOrder.tradeFee} {t('currency.' + props.activePair.base)}</p>
        <button type="submit" className={` ${classes.button}`}>خرید</button>
        </div>

    let Sell = <div className={classes.content}>
            <p>موجودی قابل معامله: <span >{"data.CurrencyBalance"}</span> </p>
            <p>بهترین پیشنهاد: <span>{"data.BestOffer"}</span> </p>
            <TextInput lead={"مقدار"} after={"بیت کویین"} />
            <button type="submit" className={` ${classes.button}`}>خرید</button>
        </div>


    const data = [
        {id: 1 , title: "خرید" , body: Buy},
        {id: 2 , title: "فروش" , body: Sell},
    ]

    return (
        <div className="py-2">
            <div className={`container card-background card-border ${classes.container}`}>
                <AccordionBox title="سفارش" content={data}/>
            </div>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        activePair : state.global.activePair,
        activePairOrders : state.global.activePairOrders,
        auth : state.auth
    }
}

export default  connect( mapStateToProps , null )(Order);