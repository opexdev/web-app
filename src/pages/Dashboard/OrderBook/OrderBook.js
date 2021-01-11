import React from 'react';
import classes from "./OrderBook.module.css";
import OrderBookTable from "./OrderBookTable/OrderBookTable";
import {OrderBookBuyData,OrderBookSellData} from "../../../FakeData/FakeData";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";


const OrderBook = (props) => {
    const {t} = useTranslation();
    const [p1,p2]= props.activePair.split("/")
    return (
        <div className=" py-2">
            <div className={`container card-background card-border  column ${classes.container}`}>
                <div className={`column border-bottom jc-between header-radius card-header-bg ${classes.header}`}>
                    <div className="row jc-start">
                        <h3>{t('orderBook.title')} ({t('currency.'+p1)}/{t('currency.'+p2)})</h3>
                    </div>
                    <div className="row jc-center">
                        <span className="text-red">{t('orderBook.sell')}</span>
                        <span className="text-green">{t('orderBook.buy')}</span>
                    </div>
                </div>
                <div className={`row container ${classes.content}`}>
                    <OrderBookTable data={OrderBookSellData()}/>
                    <OrderBookTable data={OrderBookBuyData()} type="buy"/>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        activePair: state.global.activePair
    }
}

export default connect(mapStateToProps, null)(OrderBook);
