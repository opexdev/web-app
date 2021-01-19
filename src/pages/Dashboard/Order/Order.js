import React, {useState,useEffect} from 'react';
import classes from "./Order.module.css"
import AccordionBox from "../../../components/AccordionBox/AccordionBox";
import TextInput from "../../../components/TextInput/TextInput";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

const Order = (props) => {
    const {t} = useTranslation();

    const [buyOrder,setBuyOrder]=useState({
        tax:0.0,
        type:"limit",
        stopPrice:0.0,
        price: 0.0,
        pricePerUnit:0.0,
        totalPrice:0.0,
    })

    const buyPriceHandler = (value , key )=>{
        switch (key) {
            case 'price':
                const price = value;

                setBuyOrder({
                    ...buyOrder,
                    price: price,
                    totalPrice: price * (buyOrder.pricePerUnit),
                    tax: price * (props.auth.tax[props.activePair.quote])
                });
                break
            case 'pricePerUnit':
                const pricePerUnit = parseFloat(value);
                setBuyOrder({
                    ...buyOrder,
                    pricePerUnit: pricePerUnit,
                    totalPrice: buyOrder.price * (pricePerUnit),
                    tax: buyOrder.price * (props.auth.tax[props.activePair.quote])
                });
                break
            case 'totalPrice':
                const totalPrice = parseFloat(value)
                setBuyOrder({
                    ...buyOrder,
                    price: totalPrice / buyOrder.pricePerUnit,
                    totalPrice: totalPrice,
                    tax: ( totalPrice / buyOrder.pricePerUnit ) * (props.auth.tax[props.activePair.quote])
                });
                break
            default:
        }
    }
    useEffect(()=>{
        setBuyOrder(prevState => ({ ...buyOrder, tax: prevState.totalPrice*(props.auth.tax[props.activePair.quote])}));
    },[props.auth])

    const fillBuyByWallet=()=>{
        if(buyOrder.pricePerUnit === 0 ){
            const totalPrice = props.auth.wallet[props.activePair.quote]
            setBuyOrder({
                price: totalPrice / props.activePair.bestBuyPrice,
                pricePerUnit: props.activePair.bestBuyPrice,
                totalPrice: totalPrice,
                tax: totalPrice * (props.auth.tax[props.activePair.quote])
            });
        }else {
            buyPriceHandler(props.auth.wallet[props.activePair.quote] ,'totalPrice')
        }
    }

    const fillBuyByBestPrice = () => {
        buyPriceHandler(props.activePair.bestBuyPrice ,'pricePerUnit')
    }

    const stopMarketHandler = (e) => {
        setBuyOrder({...buyOrder ,type: e.target.checked ? "stopMarket" : "limit" })
        if(e.target.checked){
            buyPriceHandler(props.activePairOrders.bestBuyPrice ,'pricePerUnit')
        }
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
                checked={buyOrder.type === "stopLimit"}
                onChange={(e)=>setBuyOrder({...buyOrder ,type: e.target.checked ? "stopLimit" : "limit" })}
            />
        </div>
        {
            buyOrder.type === "stopLimit" ?
                <TextInput lead="قیمت توقف" after={t('currency.' + props.activePair.base)}
                           value={buyOrder.stopPrice.toString()}
                           onchange={(e) => setBuyOrder({...buyOrder, stopPrice: e.target.value})}/>
                : ""
        }



        <TextInput lead="مقدار" after={t('currency.' + props.activePair.base)} value={buyOrder.price.toString()}
                   onchange={(e) => buyPriceHandler(e.target.value, 'price')}/>
        <TextInput lead="قیمت واحد" after={t('currency.' + props.activePair.quote)}
                   value={buyOrder.pricePerUnit.toString()}
                   onchange={(e) => buyPriceHandler(e.target.value, 'pricePerUnit')}/>

        <div>
            <span>خرید به قیمت بازار</span>
            <input
                type="checkbox"
                checked={buyOrder.type === "stopMarket"}
                onChange={(e)=>stopMarketHandler(e)}
            />
        </div>
        <TextInput lead="قیمت کل" after={t('currency.' + props.activePair.quote)} value={buyOrder.totalPrice.toString()}
                   onchange={(e) => buyPriceHandler(e.target.value, 'totalPrice')}/>
        <p> کارمزد:{buyOrder.tax} {t('currency.' + props.activePair.base)}</p>
        <p> دریافتی شما:{buyOrder.price - buyOrder.tax} {t('currency.' + props.activePair.base)}</p>
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