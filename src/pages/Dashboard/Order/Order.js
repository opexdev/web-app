import React, {useState} from 'react';
import classes from "./Order.module.css"
import AccordionBox from "../../../components/AccordionBox/AccordionBox";
import TextInput from "../../../components/TextInput/TextInput";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

const Order = (props) => {
    const {t} = useTranslation();

    const [buyOrder,setBuyOrder]=useState({
        price: 0.0,
        pricePerUnit:0.0,
        totalPrice:0.0
    })

    const buyPriceHandler = (value , key )=>{
        switch (key){
            case 'price':
                const price = parseFloat(value);
                setBuyOrder({ ...buyOrder , price: price, totalPrice: price*(buyOrder.pricePerUnit)});
                break
            case 'pricePerUnit':
                const pricePerUnit = parseFloat(value);
                setBuyOrder({ ...buyOrder, pricePerUnit: pricePerUnit, totalPrice: buyOrder.price*(pricePerUnit)});
                break
            case 'totalPrice':
                const totalPrice = parseFloat(value)
                setBuyOrder({ ...buyOrder, price: totalPrice/buyOrder.pricePerUnit, totalPrice: totalPrice});
                break
            default:
        }
        console.log("dd")

    }



    let Buy = <div className={classes.content}>
            <p onClick={()=>buyPriceHandler(props.auth.wallet[props.activePair.quote] ,'totalPrice')}> موجودی قابل معامله: <span>{props.auth.wallet[props.activePair.quote]}</span> {t('currency.'+props.activePair.quote)}</p>
            <p>بهترین پیشنهاد: <span>{"data.BestOffer"}</span> </p>
            <TextInput lead="مقدار" after={t('currency.'+props.activePair.base)} value={buyOrder.price.toString()} onchange={(e)=>buyPriceHandler(e.target.value,'price')}/>
            <TextInput lead="قیمت واحد" after={t('currency.'+props.activePair.quote)} value={buyOrder.pricePerUnit.toString()} onchange={(e)=>buyPriceHandler(e.target.value,'pricePerUnit')}/>
            <TextInput lead="قیمت کل" after={t('currency.'+props.activePair.quote)} value={buyOrder.totalPrice.toString()} onchange={(e)=>buyPriceHandler(e.target.value,'totalPrice')}/>
            <p>کارمزد:</p>
            <p>دریافتی شما:</p>
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
        auth : state.auth
    }
}

export default  connect( mapStateToProps , null )(Order);