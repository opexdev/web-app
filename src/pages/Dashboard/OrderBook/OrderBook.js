import React, {useState , useEffect , Fragment} from 'react';
import classes from "./OrderBook.module.css";
import OrderBookTable from "./OrderBookTable/OrderBookTable";
import {OrderBookData} from "../../../FakeData/FakeData";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import axios from "axios";


const OrderBook = (props) => {
    const {t} = useTranslation();

    const [orderBookData, setOrderBookData] = useState({
        "lastUpdateId": null,
        "bids": [],
        "asks": []
    })

    const getOrderBookData = (activePair)=>{
        //console.log( activePair.base + activePair.quote )
        const axiosInstance = axios.create({
            //proxy: {host:"217.97.101.134",port:80},
            baseURL: 'https://api.binance.com',
            timeout: 5000,
            headers: {'X-Custom-Header': 'foobar'}
        });
        axiosInstance.get('/api/v3/depth',{
            params:{
                'symbol' : props.activePair.base+ ( props.activePair.quote === "IRT" ? "USDT" : props.activePair.quote),
                'limit' : 100,
            }})
            .then(function (response) {
                //console.log(response.data['ask']);
                setOrderBookData( response.data )
            })
            .catch(function (error) {
                //console.log("Error : " , error);
                setOrderBookData( OrderBookData() )
                clearInterval()
            })
            .then(function () {
                // always executed
            });
    }


    useEffect(() => {
        const interval = setInterval(() => {
            getOrderBookData(props.activePair)
        }, 2000);
        return () => clearInterval(interval);

    },[props.activePair])

    return (
        <div className=" py-2">
            <div className={`container card-background card-border  column ${classes.container}`}>
                <div className={`column border-bottom jc-between header-radius card-header-bg ${classes.header}`}>
                    <div className="row jc-start">
                        <h3>{t('orderBook.title')} ({t('currency.' + props.activePair.base)}/{t('currency.' + props.activePair.quote)})</h3>
                    </div>
                    <div className="row jc-center">
                        <span className="text-red">{t('sell')}</span>
                        <span className="text-green">{t('buy')}</span>
                    </div>
                </div>
                <div className={`row container ${classes.content}`}>
                    {orderBookData.asks.length || orderBookData.bids.length > 0
                        ?
                        <Fragment>
                            <OrderBookTable data={orderBookData.asks}/>
                            <OrderBookTable data={orderBookData.bids} type="buy"/>
                        </Fragment>
                        :
                        <div className="container flex ai-center jc-center flashit">در حال دریافت اطلاعات...</div> }

                    {/*<OrderBookTable data={OrderBookBuyData()} type="buy"/>*/}
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
