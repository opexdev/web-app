import React, {Fragment, useState, useEffect} from 'react';
import classes from "./MyOrders.module.css"
import ScrollBar from "../../../components/ScrollBar";
import AccordionBox from "../../../components/AccordionBox/AccordionBox";
import moment from "moment-jalaali";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

import {MyOrderCurrentData, MyOrderStopData, MyOrderHistoryData, MyOrderTradeData} from "../../../FakeData/FakeData";

const MyOrders = (props) => {

    const {t} = useTranslation();
    const [openItem, setOpenItem] = useState({
        current: null,
        history: null,
        trade: null
    })
    const [customData, setCustomData] = useState({
        current: [],
        history: [],
        trade: [],
        stop: []
    })
    useEffect(() => {
        setCustomData({
            current: MyOrderCurrentData(),
            stop: MyOrderStopData(),
            history: MyOrderHistoryData(),
            trade: MyOrderTradeData()
        })
    }, [])

    const CurrentOrdersTable = <ScrollBar>
        <table className="text-center double-striped pt-1" cellSpacing="0" cellPadding="0">
            <thead>
            <tr>
                <th>{t('time')}</th>
                <th>{t('date')}</th>
                <th>{t('volume')}({props.activePair.base})</th>
                <th>{t('pricePerUnit')}({props.activePair.quote})</th>
                <th>{t('totalPrice')}</th>
                <th>{t('myOrders.donePercentage')}</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {
                customData.current.map((tr, index) =>
                    <Fragment key={index}>
                        <tr className={tr.type === "buy" ? "text-green" : "text-red"}>
                            <td>{moment(tr.timestamp).format('HH:mm:ss')}</td>
                            <td>{moment(tr.timestamp).format('jYY/jMM/jDD')}</td>
                            <td>{tr.amount}</td>
                            <td>{tr.price}</td>
                            <td>{tr.totalPrice}</td>
                            <td>{tr.progress}</td>
                            <td>
                                <i className="icon-delete flex jc-center text-red font-size-md"/>
                            </td>
                            {
                                openItem.current === index ?
                                    <td onClick={() => setOpenItem({...openItem, current: null})}>
                                        <i className="icon-up flex jc-center  text-blue font-size-md"/>
                                    </td>
                                    :
                                    <td onClick={() => setOpenItem({...openItem, current: index})}>
                                        <i className="icon-down flex jc-center  text-blue font-size-md"/>
                                    </td>
                            }
                        </tr>
                        <tr style={{display: openItem.current === index ? "revert" : "none"}}>
                            <td colSpan="8">
                                <div className="row jc-around  ai-center" style={{width: "100%"}}>
                                    <p>{t('myOrders.orderId')} : <span>{tr.orderId}</span></p>
                                    <p>{t('myOrders.tradedAmount')} : <span>{tr.tradedAmount}</span></p>
                                </div>
                                <div className="row jc-around  ai-center" style={{width: "100%"}}>
                                    <p>{t('myOrders.avgTradedAmount')} : <span>{tr.avgTradedAmount}</span></p>
                                    <p>{t('myOrders.tradedPrice')} : <span>{tr.tradedPrice}</span></p>
                                </div>
                            </td>
                        </tr>
                    </Fragment>)
            }
            </tbody>
        </table>
    </ScrollBar>
    const StopTable = <ScrollBar>
        <table className="text-center striped pt-1" cellSpacing="0" cellPadding="0">
            <thead>
            <tr>
                <th>{t('time')}</th>
                <th>{t('date')}</th>
                <th>{t('volume')}({props.activePair.base})</th>
                <th>{t('pricePerUnit')}({props.activePair.quote})</th>
                <th>{t('totalPrice')}</th>
                <th>{t('myOrders.stoppedPrice')}</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {customData.stop.map((tr, index) =>
                <tr key={index} className={tr.type === "buy" ? "text-green" : "text-red"}>
                    <td>{moment(tr.timestamp).format('HH:mm:ss')}</td>
                    <td>{moment(tr.timestamp).format('jYY/jMM/jDD')}</td>
                    <td>{tr.amount}</td>
                    <td>{tr.price}</td>
                    <td>{tr.totalPrice}</td>
                    <td>{tr.stopPrice}</td>
                    <td>
                        <td><i className="icon-delete flex jc-center  text-red font-size-md"/></td>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    </ScrollBar>
    const OrderHistoryTable = <ScrollBar>
        <table className="text-center double-striped pt-1" cellSpacing="0" cellPadding="0">
            <thead>
            <tr>
                <th>{t('time')}</th>
                <th>{t('date')}</th>
                <th>{t('volume')}({props.activePair.base})</th>
                <th>{t('pricePerUnit')}({props.activePair.quote})</th>
                <th>{t('totalPrice')}</th>
                <th>{t('status')}</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {customData.history.map((tr, index) =>
                <Fragment key={index}>
                    <tr className={tr.type === "buy" ? "text-green" : "text-red"}>
                        <td>{moment(tr.timestamp).format('HH:mm:ss')}</td>
                        <td>{moment(tr.timestamp).format('jYY/jMM/jDD')}</td>
                        <td>{tr.amount}</td>
                        <td>{tr.price}</td>
                        <td>{tr.totalPrice}</td>
                        <td>{t("ordersStatus." + tr.status)}</td>
                        {
                            openItem.history === index ?
                                <td onClick={() => setOpenItem({...openItem, history: null})}>
                                    <i className="icon-up flex jc-center  text-blue font-size-md"/>
                                </td>
                                :
                                <td onClick={() => setOpenItem({...openItem, history: index})}>
                                    <i className="icon-down flex jc-center  text-blue font-size-md"/>
                                </td>
                        }
                    </tr>
                    <tr style={{display: openItem.history === index ? "revert" : "none"}}>
                        <td colSpan="8">
                            <div className="row jc-around  ai-center" style={{width: "100%"}}>
                                <p>{t('myOrders.orderId')} : <span>{tr.orderId}</span></p>
                                <p>{t('orderType')} : <span>{t(tr.type) + " " + t('orderTypes.' + tr.orderType)}</span>
                                </p>
                            </div>
                            <div className="row jc-around  ai-center" style={{width: "100%"}}>
                                <p>{t('myOrders.stopOrderTime')} : <span>{moment(tr.stopOrderTime).format('jYY/jMM/jDD HH:mm:ss')}</span>
                                </p>
                                <p>{t('myOrders.startOrderTime')} : <span>{moment(tr.stopOrderTime).format('jYY/jMM/jDD HH:mm:ss')}</span>
                                </p>
                            </div>
                            <div className="row jc-around  ai-center" style={{width: "100%"}}>
                                <p>{t('myOrders.stoppedPrice')} : <span>{tr.stoppedPrice}</span></p>
                            </div>
                        </td>
                    </tr>
                </Fragment>)}
            </tbody>
        </table>
    </ScrollBar>
    const TradesTable = <ScrollBar>
        <table className="text-center double-striped pt-1" cellSpacing="0" cellPadding="0">
            <thead>
            <tr>
                <th>{t('time')}</th>
                <th>{t('date')}</th>
                <th>{t('volume')}({props.activePair.base})</th>
                <th>{t('pricePerUnit')}({props.activePair.quote})</th>
                <th>{t('totalPrice')}</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {customData.trade.map((tr, index) =>
                <Fragment key={index}>
                    <tr className={tr.type === "buy" ? "text-green" : "text-red"}>
                        <td>{moment(tr.timestamp).format('HH:mm:ss')}</td>
                        <td>{moment(tr.timestamp).format('jYY/jMM/jDD')}</td>
                        <td>{tr.amount}</td>
                        <td>{tr.price}</td>
                        <td>{tr.totalPrice}</td>
                        {
                            openItem.trade === index ?
                                <td onClick={() => setOpenItem({...openItem, trade: null})}>
                                    <i className="icon-up flex jc-center  text-blue font-size-md"/>
                                </td>
                                :
                                <td onClick={() => setOpenItem({...openItem, trade: index})}>
                                    <i className="icon-down flex jc-center  text-blue font-size-md"/>
                                </td>
                        }
                    </tr>
                    <tr style={{display: openItem.trade === index ? "revert" : "none"}}>
                        <td colSpan="6">
                            <div className="row jc-around  ai-center" style={{width: "100%"}}>
                                <p>{t('myOrders.orderId')} : <span>{tr.orderId}</span></p>
                                <p>{t('myOrders.tradeId')} : <span>{tr.tradeId}</span></p>
                            </div>
                        </td>
                    </tr>
                </Fragment>)}
            </tbody>
        </table>
    </ScrollBar>


    const data = [
        {id: 1, title: t('myOrders.aliveOrder'), body: CurrentOrdersTable},
        {id: 2, title: t('myOrders.stoppedOrder'), body: StopTable},
        {id: 3, title: t('myOrders.orderHistory'), body: OrderHistoryTable},
        {id: 4, title: t('myOrders.orders'), body: TradesTable},
    ]

    return (
        <div className={`container card-background card-border column ${classes.container}`}>
            <AccordionBox title={t('myOrders.title')} content={data}/>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        activePair: state.global.activePair,
    }
}

export default connect(mapStateToProps, null)(MyOrders);
