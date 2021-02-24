import React, {Fragment, useState, useEffect} from 'react';
import classes from "./DepositWithdrawTx.module.css"
import ScrollBar from "../../../components/ScrollBar";
import moment from "moment-jalaali";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {DTAllTransactionsData} from "../../../FakeData/FakeData";
import Icon from "../../../components/Icon/Icon";
import NumberInput from "../../../components/NumberInput/NumberInput";
import TextInput from "../../../components/TextInput/TextInput";

const DepositWithdrawTx = (props) => {

    const {t} = useTranslation();
    const [filterOpen, setFilterOpen] = useState(false)
    const [openItem, setOpenItem] = useState(false)
    const [filters, setFilters] = useState({
        fromTime: null,
        fromDate: null,
        toTime: null,
        toDate: null,
        type: null,
        address: null
    })

    const [alert, setAlert] = useState({
        fromTime: null,
        fromDate: null,
        toTime: null,
        toDate: null,
    })
    const [tx, setTx] = useState([])

    useEffect(() => {
        setTx(DTAllTransactionsData())
    }, [])

    function timeValidator(inputField, key) {
        const isValid = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/.test(inputField);
        if (isValid) {
            setAlert({...alert, [key]: null})
            setFilters({...filters, [key]: inputField})
        } else {
            setAlert({...alert, [key]: "ساعت وارد شده صحیح نمیباشد"})
        }
    }

    function dateValidator(inputField, key) {
        const isValid = /^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|31|([1-2][0-9])|(0[1-9]))))$/.test(inputField);
        if (isValid) {
            setAlert({...alert, [key]: null})
        } else {
            setAlert({...alert, [key]: "تاریخ وارد شده صحیح نمیباشد"})
        }
    }
    const options = [
        {value: 'all', label: 'همه'},
        {value: 'deposit', label: 'واریز'},
        {value: 'withdraw', label: 'برداشت'},
    ]
    return (
        <div className="container py-2">
            <div className={`container card-background card-border column ${classes.container}`}>
                <div className="flex jc-between card-header-bg py-2 px-1">
                    <h3>{t('DepositWithdrawTx.title')}</h3>
                    <div>
                        <span style={{color:"var(--bgGreen)"}} className="font-size-md-plus">
                            <i className="icon-microsoft_excel"/>
                        </span>
                        <span  style={{color:"var(--orange)"}} className="font-size-md-plus" onClick={() => setFilterOpen(prev => !prev)}>
                            <i className="icon-filter"/>
                        </span>
                    </div>
                </div>
                <ScrollBar>
                    {
                        filterOpen ?
                            <Fragment>
                                <div className={classes.filterBox}>
                                    <NumberInput
                                        lead="از ساعت" after=<i className="icon-clock"/>
                                        customClass={classes.filterInput}
                                        format="##:##" placeholder="HH:mm" mask={['H', 'H', 'm', 'm']}
                                        alert={alert.fromTime}
                                        onchange={(input) => timeValidator(input.target.value, "fromTime")}
                                    />
                                    <NumberInput
                                        lead="تاریخ" after=<i className="icon-calendar-1"/>
                                        customClass={classes.filterInput}
                                        format="####/##/##" placeholder="YYYY/MM/DD"
                                        mask={['Y', 'Y', 'Y', 'Y', 'M', 'M', 'D', 'D']}
                                        alert={alert.fromDate}
                                        onchange={(input) => dateValidator(input.target.value, "fromDate")}
                                    />
                                    <NumberInput
                                        lead="تا ساعت" after=<i className="icon-clock"/>
                                        customClass={classes.filterInput}
                                        format="##:##" placeholder="HH:mm" mask={['H', 'H', 'm', 'm']}
                                        alert={alert.toTime}
                                        onchange={(input) => timeValidator(input.target.value, "toTime")}
                                    />
                                    <NumberInput
                                        lead="تاریخ" after=<i className="icon-calendar-1"/>
                                        customClass={classes.filterInput}
                                        format="####/##/##" placeholder="YYYY/MM/DD"
                                        mask={['Y', 'Y', 'Y', 'Y', 'M', 'M', 'D', 'D']}
                                        alert={alert.toDate}
                                        onchange={(input) => dateValidator(input.target.value, "toDate")}
                                    />
                                </div>
                                <div className={classes.filterBox}>
                                    <TextInput
                                        select={true}
                                        placeholder="نوع تراکنش"
                                        options={options}
                                        value={filters.type}
                                        lead="نوع تراکنش"
                                        customClass={classes.filterInput}
                                        onchange={(e) => setFilters({...filters, type: e.value})}
                                    />
                                    <TextInput
                                        placeholder=" آدرس مبدا/مقصد را وارد کنید"
                                        options={options}
                                        value={filters.address}
                                        lead="مبدا/مقصد"
                                        customClass={`${classes.filterInput} ${classes.address}`}
                                        onchange={(e) => setFilters({...filters, address: e.target.value})}
                                    />
                                </div>
                                <div className={classes.btnBox}>
                                    <button className={`${classes.button} ${classes.submit}`}
                                            onClick={() => setFilterOpen(prev => !prev)}>اعمال فیلتر
                                    </button>
                                    <button className={`${classes.button} ${classes.reset}`}
                                            onClick={() => setFilterOpen(prev => !prev)}>حذف فیلتر
                                    </button>
                                    <button className={`${classes.button} ${classes.return}`}
                                            onClick={() => setFilterOpen(prev => !prev)}>بازگشت
                                    </button>
                                </div>
                            </Fragment>
                            :
                            <table className="text-center double-striped" cellSpacing="0" cellPadding="0">
                                <thead>
                                <tr>
                                    <th className="pt-1">{t('time')}</th>
                                    <th>{t('date')}</th>
                                    <th>{t('DepositWithdrawTx.transactionType')}</th>
                                    <th>{t('destination')}</th>
                                    <th>{t('volume')}({props.activePair.base})</th>
                                    <th>{t('DepositWithdrawTx.inventory')}({props.activePair.base})</th>
                                    <th>{t('status')}</th>
                                    <th>{t('details')}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    tx.map((tr, index) =>
                                        <Fragment key={index}>
                                            <tr className={(tr.transactionType === "deposit" || tr.transactionType === "Received") ? "text-green" : "text-red"}>
                                                <td>{moment(tr.timestamp).format('HH:mm:ss')}</td>
                                                <td>{moment(tr.timestamp).format('jYY/jMM/jDD')}</td>
                                                <td>{t("transactionType." + tr.transactionType)}</td>
                                                <td className="direction-ltr">{tr.destination}</td>
                                                <td>{tr.volume} {(tr.transactionType === "deposit" || tr.transactionType === "Received") ? "+" : "-"}</td>
                                                <td>{tr.inventory}</td>
                                                <td>{t("ordersStatus." + tr.status)}</td>
                                                {
                                                    openItem.all === index ?
                                                        <td onClick={() => setOpenItem(null)}>
                                                            <Icon iconName="icon-up-open icon-blue font-size-sm"
                                                                  customClass={classes.iconBG}/>
                                                        </td>
                                                        :
                                                        <td onClick={() => setOpenItem(index)}>
                                                            <Icon iconName="icon-down-open icon-blue font-size-sm"
                                                                  customClass={classes.iconBG}/>
                                                        </td>
                                                }
                                            </tr>
                                            <tr style={{display: openItem.all === index ? "revert" : "none"}}>
                                                <td colSpan="9" className={`py-1 px-2`}>
                                                    <div className="row jc-around  ai-center" style={{width: "100%"}}>
                                                        <p className="col-46 row jc-between">{t('DepositWithdrawTx.transactionId')} : <span>{tr.transactionId}</span>
                                                        </p>
                                                        <p className="col-46 row jc-between">{t('DepositWithdrawTx.blockchainTransactionId')} : <span>{tr.blockchainTransactionId}</span>
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </Fragment>)
                                }
                                </tbody>
                            </table>
                    }

                </ScrollBar>
            </div>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        activePair: state.global.activePair,
    }
}

export default connect(mapStateToProps, null)(DepositWithdrawTx);
