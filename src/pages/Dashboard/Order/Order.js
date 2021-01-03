import React from 'react';
import classes from "./Order.module.css"
import AccordionBox from "../../../components/AccordionBox/AccordionBox";

const Order = (props) => {

    const bodyBuilder =(data)=> {
        return <div className={classes.content}>
            <p>موجودی قابل معامله: <span >{data.CurrencyBalance}</span> </p>
            <p>بهترین پیشنهاد: <span>{data.BestOffer}</span> </p>
        </div>
    }

    const data = [
        {id: 1 , title: "خرید" , body: bodyBuilder(props.data.Buy)},
        {id: 2 , title: "فروش" , body: bodyBuilder(props.data.sale)},

    ]

    return (
        <div className="py-2">

            <div className={`container card-background card-border ${classes.container}`}>

                <AccordionBox title="سفارش" content={data}/>

            </div>


        </div>
    );
};

export default Order;