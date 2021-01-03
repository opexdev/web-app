import React from 'react';
import classes from "./OrderBook.module.css";
import OrderBookTable from "./OrderBookTable/OrderBookTable";


const OrderBook = () => {
    const data = [
        {
            totalPrice: '413،990،000',
            Amount: "0.01",
            Count: "413،990،000",
            Percent:10
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.5",
            Count: "413،990،000",
            Percent:15
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.00",
            Count: "413،990،000",
            Percent :25
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.00",
            Count: "413،990،000",
            Percent: 26
        },

        {
            totalPrice: '413،990،000',
            Amount: "0.01",
            Count: "413،990،000",
            Percent:28
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.5",
            Count: "413،990،000",
            Percent:30
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.00",
            Count: "413،990،000",
            Percent :38
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.00",
            Count: "413،990،000",
            Percent :45
        },{
            totalPrice: '413،990،000',
            Amount: "0.01",
            Count: "413،990،000",
            Percent:47
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.5",
            Count: "413،990،000",
            Percent:50
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.00",
            Count: "413،990،000",
            Percent :55
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.00",
            Count: "413،990،000",
            Percent :54
        },{
            totalPrice: '413،990،000',
            Amount: "0.01",
            Count: "413،990،000",
            Percent:56
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.5",
            Count: "413،990،000",
            Percent:60
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.00",
            Count: "413،990،000",
            Percent :20
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.00",
            Count: "413،990،000",
            Percent :42
        },{
            totalPrice: '413،990،000',
            Amount: "0.01",
            Count: "413،990،000",
            Percent:5
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.5",
            Count: "413،990،000",
            Percent:10
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.00",
            Count: "413،990،000",
            Percent :20
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.00",
            Count: "413،990،000",
            Percent :42
        },{
            totalPrice: '413،990،000',
            Amount: "0.01",
            Count: "413،990،000",
            Percent:5
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.5",
            Count: "413،990،000",
            Percent:10
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.00",
            Count: "413،990،000",
            Percent :20
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.00",
            Count: "413،990،000",
            Percent :42
        },{
            totalPrice: '413،990،000',
            Amount: "0.01",
            Count: "413،990،000",
            Percent:5
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.5",
            Count: "413،990،000",
            Percent:10
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.00",
            Count: "413،990،000",
            Percent :20
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.00",
            Count: "413،990،000",
            Percent :42
        },{
            totalPrice: '413،990،000',
            Amount: "0.01",
            Count: "413،990،000",
            Percent:5
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.5",
            Count: "413،990،000",
            Percent:10
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.00",
            Count: "413،990،000",
            Percent :20
        },
        {
            totalPrice: '413،990،000',
            Amount: "0.00",
            Count: "413،990،000",
            Percent :42
        },
    ];

    return (
        <div className="container mt-2">
            <div className={`column card-border  ${classes.container}`}>
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
                    <OrderBookTable tableDetailes={data}/>
                    <OrderBookTable tableDetailes={data} type="buy"/>
                </div>
            </div>
        </div>
    );
};

export default OrderBook;
