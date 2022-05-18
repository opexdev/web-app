import React, {useState, useEffect, Fragment} from "react";
import classes from "./OrderBook.module.css";
import OrderBookTable from "./components/OrderBookTable/OrderBookTable";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import OrderBookTableSafari from "./components/OrderBookTableSafari/OrderBookTableSafari";
import {isSafari} from "react-device-detect";
import {getOrderBook} from "./api/orderBook";
import useInterval from "../../../../../../../../Hooks/useInterval";
import Error from "../../../../../../../../components/Error/Error";
import Loading from "../../../../../../../../components/Loading/Loading";


const OrderBook = (props) => {

    const {t} = useTranslation();
    const {activePair} = props
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [orderBookData, setOrderBookData] = useState({
        lastUpdateId: null,
        bids: [],
        asks: [],
    });

    const getOrderBookData = async () => {
        const orderBookReq = await getOrderBook(activePair);
        if (orderBookReq.status === 200) {
            setOrderBookData(orderBookReq.data)
            setIsLoading(false)
            setError(false)
        } else {
            //setError(true)
            setIsLoading(false)
        }
    };

    useEffect(async () => {
        await getOrderBookData();
    }, [props.activePair]);

    useInterval(async () => {
        await getOrderBookData();
    }, props.activePair ? 1500 : null);

    const tableRender = () => {
        if (error)  return <Error/>
        if (isLoading)  return <Loading/>

        if (isSafari) {
            return <Fragment>
                <OrderBookTableSafari data={orderBookData.asks}/>
                <OrderBookTableSafari data={orderBookData.bids} type="buy"/>
            </Fragment>
        } else {
            return  <Fragment>
                <OrderBookTable data={orderBookData.asks}/>
                <OrderBookTable data={orderBookData.bids} type="buy"/>
            </Fragment>
        }
    }

    return (
        <div className={`container card-background card-border my-2 column ${classes.container}`}>
            <div className={`column border-bottom jc-between header-radius card-header-bg ${classes.header}`}>
                <div className="row jc-start">
                    <h3>
                        {t("orderBook.title")} ({t("currency." + activePair.baseAsset)}/
                        {t("currency." + activePair.quoteAsset)})
                    </h3>
                </div>
                <div className="row jc-center">
                    <span className="text-red">{t("sell")}</span>
                    <span className="text-green">{t("buy")}</span>
                </div>
            </div>
            <div className={`row container ${classes.content}`}>
                {tableRender()}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        activePair: state.exchange.activePair,
    };
};

export default connect(mapStateToProps, null)(OrderBook);
