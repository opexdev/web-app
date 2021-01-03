import React from 'react';
import classes from "./OrderBook.module.css";
import OrderBookTable from "./OrderBookTable/OrderBookTable";
import {OrderBookData} from "../../../FakeData/FakeData";


const OrderBook = () => {


    return (
        <div className=" py-2">
            <div className={`container card-background card-border column ${classes.container}`}>
                <div className={`column border-bottom jc-between ${classes.header}`}>
                    <div className="row jc-start">
                        <h3>دفتر پیشنهادها (بیتکوین/تومان)</h3>
                    </div>
                    <div className="row jc-center">
                        <span className="text-red">فروش</span>
                        <span className="text-green">خرید</span>
                    </div>
                </div>
                <div className={`row container ${classes.content}`}>
                    <OrderBookTable tableDetailes={OrderBookData}/>
                    <OrderBookTable tableDetailes={OrderBookData} type="buy"/>
                </div>
            </div>
        </div>
    );
};

export default OrderBook;
