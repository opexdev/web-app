import React from 'react';
import classes from "./LastTrades.module.css"
import LastTradesTable from "./LastTradesTable/LastTradesTable";
import {useTranslation} from "react-i18next";


const LastTrades = () => {
    const {t} = useTranslation();
    const data = [
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            Type: 'sell'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            Type: 'sell'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            Type: 'sell'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            Type: 'sell'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            Type: 'sell'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            Type: 'sell'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            Type: 'sell'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            Type: 'sell'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            Type: 'buy'
        },

    ];

    return (
        <div className={`container ${classes.container}`}>
            <div className={`column card-border  ${classes.container}`}>
                <div className={`column border-bottom jc-center ${classes.header}`}>
                    <div className="row jc-start">
                        <h3>{t('LastTrades.title')}</h3>
                    </div>
                </div>
                <div className={`row container ${classes.content}`}>
                    <LastTradesTable tableDetailes={data}/>
                </div>
            </div>
        </div>
    );
};

export default LastTrades;