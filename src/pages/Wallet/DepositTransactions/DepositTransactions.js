import React, {Fragment, useState, useEffect} from 'react';
import classes from "./DepositTransactions.module.css"
import ScrollBar from "../../../components/ScrollBar";
import AccordionBox from "../../../components/AccordionBox/AccordionBox";
import moment from "moment-jalaali";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

import {DTAllTransactionsData, MyOrderStopData, MyOrderHistoryData, MyOrderTradeData} from "../../../FakeData/FakeData";
import Icon from "../../../components/Icon/Icon";

const DepositTransactions = (props) => {

    const {t} = useTranslation();
    const [openItem, setOpenItem] = useState({
        all: null,
        deposit: null,
        withdrawal: null
    })
    const [customData, setCustomData] = useState({
        allTransactions: [],

    })
    useEffect(() => {
        setCustomData({
            allTransactions: DTAllTransactionsData(),

        })
    }, [])

    const allTransactionsTable = <ScrollBar>
        <table className="text-center double-striped" cellSpacing="0" cellPadding="0">
            <thead>
            <tr>
                <th className="pt-1">{t('time')}</th>
                <th>{t('date')}</th>
                <th>{t('DepositTransactions.transactionType')}</th>
                <th>{t('DepositTransactions.destination')}</th>
                <th>{t('volume')}({props.activePair.base})</th>
                <th>{t('DepositTransactions.inventory')}({props.activePair.base})</th>
                <th>{t('status')}</th>
                <th>{t('DepositTransactions.details')}</th>
            </tr>
            </thead>
            <tbody>
            {
                customData.allTransactions.map((tr, index) =>
                    <Fragment key={index}>
                        <tr className={(tr.transactionType === "deposit" || tr.transactionType ==="Received") ? "text-green" : "text-red"}>
                            <td>{moment(tr.timestamp).format('HH:mm:ss')}</td>
                            <td>{moment(tr.timestamp).format('jYY/jMM/jDD')}</td>
                            <td>{t("transactionType." + tr.transactionType)}</td>
                            <td className="direction-ltr">{tr.destination}</td>
                            <td>{tr.volume} {(tr.transactionType === "deposit" || tr.transactionType ==="Received") ? "+" : "-"}</td>
                            <td>{tr.inventory}</td>
                            <td>{t("ordersStatus." + tr.status)}</td>

                            {
                                openItem.all === index ?
                                    <td onClick={() => setOpenItem({...openItem, all: null})}>
                                        {/*<i className="icon-up flex jc-center  text-blue font-size-md"/>*/}
                                        <Icon iconName="icon-up-open icon-blue font-size-sm" customClass={classes.iconBG}/>
                                    </td>
                                    :
                                    <td onClick={() => setOpenItem({...openItem, all: index})}>
                                        {/*<i className="icon-down flex jc-center  text-blue font-size-md"/>*/}
                                        <Icon iconName="icon-down-open icon-blue font-size-sm" customClass={classes.iconBG}/>
                                    </td>
                            }
                        </tr>
                        <tr style={{display: openItem.all === index ? "revert" : "none"}}>
                            <td colSpan="9" className={`py-1 px-2`}>
                                <div className="row jc-around  ai-center" style={{width: "100%"}}>
                                    <p className="col-46 row jc-between">{t('DepositTransactions.transactionId')} : <span>{tr.transactionId}</span></p>
                                    <p className="col-46 row jc-between">{t('DepositTransactions.blockchainTransactionId')} : <span>{tr.blockchainTransactionId}</span></p>
                                </div>
                            </td>
                        </tr>
                    </Fragment>)
            }
            </tbody>
        </table>
    </ScrollBar>

    const depositTransactionsTable = <ScrollBar>
        <table className="text-center double-striped" cellSpacing="0" cellPadding="0">
            <thead>
            <tr>
                <th className="pt-1">{t('time')}</th>
                <th>{t('date')}</th>
                <th>{t('DepositTransactions.transactionType')}</th>
                <th>{t('DepositTransactions.destination')}</th>
                <th>{t('volume')}({props.activePair.base})</th>
                <th>{t('DepositTransactions.inventory')}({props.activePair.base})</th>
                <th>{t('status')}</th>
                <th>{t('DepositTransactions.details')}</th>
            </tr>
            </thead>
            <tbody>
            {
                customData.allTransactions.filter(tx => ((tx.transactionType === "deposit" || tx.transactionType ==="Received") )).map((tr, index) =>
                    <Fragment key={index}>
                        <tr className={(tr.transactionType === "deposit" || tr.transactionType ==="Received") ? "text-green" : "text-red"}>
                            <td>{moment(tr.timestamp).format('HH:mm:ss')}</td>
                            <td>{moment(tr.timestamp).format('jYY/jMM/jDD')}</td>
                            <td>{t("transactionType." + tr.transactionType)}</td>
                            <td className="direction-ltr">{tr.destination}</td>
                            <td>{tr.volume} {(tr.transactionType === "deposit" || tr.transactionType ==="Received") ? "+" : "-"}</td>
                            <td>{tr.inventory}</td>
                            <td>{t("ordersStatus." + tr.status)}</td>

                            {
                                openItem.deposit === index ?
                                    <td onClick={() => setOpenItem({...openItem, deposit: null})}>
                                        {/*<i className="icon-up flex jc-center  text-blue font-size-md"/>*/}
                                        <Icon iconName="icon-up-open icon-blue font-size-sm" customClass={classes.iconBG}/>
                                    </td>
                                    :
                                    <td onClick={() => setOpenItem({...openItem, deposit: index})}>
                                        {/*<i className="icon-down flex jc-center  text-blue font-size-md"/>*/}
                                        <Icon iconName="icon-down-open icon-blue font-size-sm" customClass={classes.iconBG}/>
                                    </td>
                            }
                        </tr>
                        <tr style={{display: openItem.deposit === index ? "revert" : "none"}}>
                            <td colSpan="9" className={`py-1 px-2`}>
                                <div className="row jc-around  ai-center" style={{width: "100%"}}>
                                    <p className="col-46 row jc-between">{t('DepositTransactions.transactionId')} : <span>{tr.transactionId}</span></p>
                                    <p className="col-46 row jc-between">{t('DepositTransactions.blockchainTransactionId')} : <span>{tr.blockchainTransactionId}</span></p>
                                </div>
                            </td>
                        </tr>
                    </Fragment>)
            }
            </tbody>
        </table>
    </ScrollBar>


    const withdrawalTransactionsTable = <ScrollBar>
        <table className="text-center double-striped" cellSpacing="0" cellPadding="0">
            <thead>
            <tr>
                <th className="pt-1">{t('time')}</th>
                <th>{t('date')}</th>
                <th>{t('DepositTransactions.transactionType')}</th>
                <th>{t('DepositTransactions.destination')}</th>
                <th>{t('volume')}({props.activePair.base})</th>
                <th>{t('DepositTransactions.inventory')}({props.activePair.base})</th>
                <th>{t('status')}</th>
                <th>{t('DepositTransactions.details')}</th>
            </tr>
            </thead>
            <tbody>
            {
                customData.allTransactions.filter(tx => ((tx.transactionType === "withdrawal" || tx.transactionType ==="send") )).map((tr, index) =>
                    <Fragment key={index}>
                        <tr className={(tr.transactionType === "deposit" || tr.transactionType ==="Received") ? "text-green" : "text-red"}>
                            <td>{moment(tr.timestamp).format('HH:mm:ss')}</td>
                            <td>{moment(tr.timestamp).format('jYY/jMM/jDD')}</td>
                            <td>{t("transactionType." + tr.transactionType)}</td>
                            <td className="direction-ltr">{tr.destination}</td>
                            <td>{tr.volume} {(tr.transactionType === "deposit" || tr.transactionType ==="Received") ? "+" : "-"}</td>
                            <td>{tr.inventory}</td>
                            <td>{t("ordersStatus." + tr.status)}</td>

                            {
                                openItem.withdrawal === index ?
                                    <td onClick={() => setOpenItem({...openItem, withdrawal: null})}>
                                        {/*<i className="icon-up flex jc-center  text-blue font-size-md"/>*/}
                                        <Icon iconName="icon-up-open icon-blue font-size-sm" customClass={classes.iconBG}/>
                                    </td>
                                    :
                                    <td onClick={() => setOpenItem({...openItem, withdrawal: index})}>
                                        {/*<i className="icon-down flex jc-center  text-blue font-size-md"/>*/}
                                        <Icon iconName="icon-down-open icon-blue font-size-sm" customClass={classes.iconBG}/>
                                    </td>
                            }
                        </tr>
                        <tr style={{display: openItem.withdrawal === index ? "revert" : "none"}}>
                            <td colSpan="9" className={`py-1 px-2`}>
                                <div className="row jc-around  ai-center" style={{width: "100%"}}>
                                    <p className="col-46 row jc-between">{t('DepositTransactions.transactionId')} : <span>{tr.transactionId}</span></p>
                                    <p className="col-46 row jc-between">{t('DepositTransactions.blockchainTransactionId')} : <span>{tr.blockchainTransactionId}</span></p>
                                </div>
                            </td>
                        </tr>
                    </Fragment>)
            }
            </tbody>
        </table>
    </ScrollBar>




    const data = [
        {id: 1, title: t('all'), body: allTransactionsTable },
        {id: 2, title: t('DepositTransactions.depositWithdrawal'), body: depositTransactionsTable },
        {id: 3, title: t('DepositTransactions.withdrawalSend'), body: withdrawalTransactionsTable },

    ]

    return (
        <div className="container py-2">
            <div className={`container card-background card-border column ${classes.container}`}>
                <AccordionBox title={t('DepositTransactions.title')} content={data} safari={classes.safariFlexSize}/>
            </div>
        </div>

    );
};


const mapStateToProps = state => {
    return {
        activePair: state.global.activePair,
    }
}

export default connect(mapStateToProps, null)(DepositTransactions);
