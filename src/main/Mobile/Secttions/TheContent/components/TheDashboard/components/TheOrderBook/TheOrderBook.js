import React, {Fragment, useEffect, useState} from "react";
import classes from "./TheOrderBook.module.css";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {getOrderBook} from "../../../../../../../Browser/Sections/Content/components/Dashboard/components/OrderBook/api/orderBook";
import useInterval from "../../../../../../../../Hooks/useInterval";
import Error from "../../../../../../../../components/Error/Error";
import {isIOS} from "react-device-detect";
import TheOrderBookTable from "./components/TheOrderBookTable/TheOrderBookTable";
import Loading from "../../../../../../../../components/Loading/Loading";
import OrderBookTableSafari
    from "../../../../../../../Browser/Sections/Content/components/Dashboard/components/OrderBook/components/OrderBookTableSafari/OrderBookTableSafari";
import OrderBookTable
    from "../../../../../../../Browser/Sections/Content/components/Dashboard/components/OrderBook/components/OrderBookTable/OrderBookTable";
import TheOrderBookTableSafari from "./components/TheOrderBookTableSafari/TheOrderBookTableSafari";


const TheOrderBook = (props) => {

    const {t} = useTranslation();
    const {activePair , orderLayout} = props
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
        if (error)  return <Error/>


        if (isIOS) {
            return <Fragment>
                <TheOrderBookTableSafari data={orderBookData.asks}/>
                <TheOrderBookTableSafari data={orderBookData.bids} type="buy"/>
            </Fragment>
        } else {
            return  <Fragment>
                <TheOrderBookTable data={orderBookData.asks}/>
                <TheOrderBookTable data={orderBookData.bids} type="buy"/>
            </Fragment>
        }
    }

    return (
        <div className={`container card-background card-border column ${classes.container}`}>
            <div className={`column border-bottom jc-between header-radius card-header-bg ${classes.header}`}>
                {orderLayout ? "" :<div className="row jc-center">
                    <h3>
                        {t("orderBook.title")} ({t("currency." + activePair.baseAsset)}/
                        {t("currency." + activePair.quoteAsset)})
                    </h3>
                </div>}
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

export default connect(mapStateToProps, null)(TheOrderBook);
