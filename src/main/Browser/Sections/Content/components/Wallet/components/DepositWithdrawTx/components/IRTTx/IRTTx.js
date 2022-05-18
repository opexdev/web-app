import React, {Fragment, useState, useEffect} from "react";
import classes from "../../DepositWithdrawTx.module.css";
import moment from "moment-jalaali";
import {connect, useSelector} from "react-redux";
import {Trans, useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {cancelIRTDepositReq, getAllPayments} from "../../../../api/wallet";
import useInterval from "../../../../../../../../../../Hooks/useInterval";
import ScrollBar from "../../../../../../../../../../components/ScrollBar";
import NumberInput from "../../../../../../../../../../components/NumberInput/NumberInput";
import TextInput from "../../../../../../../../../../components/TextInput/TextInput";
import {BN} from "../../../../../../../../../../utils/utils";
import Button from "../../../../../../../../../../components/Button/Button";
import {toast} from "react-hot-toast";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../components/Error/Error";



const IRTTx = (props) => {
    const {t} = useTranslation();
    const [filterOpen, setFilterOpen] = useState(null);
    const [openItem, setOpenItem] = useState(false);
    const [cancel, setCancel] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [filters, setFilters] = useState({
        fromTime: null,
        fromDate: null,
        toTime: null,
        toDate: null,
        type: null,
        address: null,
    });
    const {id} = useParams();
    const [alert, setAlert] = useState({
        fromTime: null,
        fromDate: null,
        toTime: null,
        toDate: null,
    });
    const [tx, setTx] = useState([]);
    const [error, setError] = useState(false);

    function timeValidator(inputField, key) {
        const isValid = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/.test(inputField);
        if (isValid) {
            setAlert({...alert, [key]: null});
            setFilters({...filters, [key]: inputField});
        } else {
            setAlert({...alert, [key]: "ساعت وارد شده صحیح نمیباشد"});
        }
    }

    function dateValidator(inputField, key) {
        const isValid = /^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|31|([1-2][0-9])|(0[1-9]))))$/.test(
            inputField,
        );
        if (isValid) {
            setAlert({...alert, [key]: null});
        } else {
            setAlert({...alert, [key]: "تاریخ وارد شده صحیح نمیباشد"});
        }
    }
    const options = [
        {value: "all", label: "همه"},
        {value: "deposit", label: "واریز"},
        {value: "withdraw", label: "برداشت"},
    ];


    const getIRTTx = async () => {

        let newTx = []
        const IRTTxData = await getAllPayments()
        if (IRTTxData && IRTTxData.status === 200 ){
            setError(false)
            newTx = IRTTxData.data.map((d)=>{
               // d.time = d.createDate
                d.time = new Date(d.createDate).getTime()- new Date(d.createDate).getTimezoneOffset()*60*1000
                d.isDeposit = true
                return d
            })
        } else {
            return setError(true)
        }

        /*const withdraw = await getWithdraw(id)
        if (withdraw && withdraw.status === 200 ){
            setError(false)
            newTx = [...newTx , ...withdraw.data.map(w => {
                w.time = new Date(w.applyTime).getTime()- new Date(w.applyTime).getTimezoneOffset()*60*1000
                w.isDeposit = false
                return w
            })]
        } else {
            return setError(true)
        }*/
        setTx(newTx.sort((a,b) => b.time - a.time))
    }

    useEffect(() => {
        setIsLoading(true)
        getIRTTx().then(()=>{
            setIsLoading(false)
        })
    }, [id]);

    useInterval(async () => {
        await getIRTTx();
    }, id ? 3000 : null);


    const IRTtxStatusClassHandler = (status) => {
        switch (status) {
            case 'Open':
                return 'text-orange';

            case 'Canceled':
                return 'text-red';

            case 'Expired':
                return 'text-red';

            case 'Done':
                return 'text-green';

            case 'Failed':
                return 'text-red';

            case 'Undefined':
                return 'text-color';

            default:
                return 'text-color';
        }
    };

    const payButton = (status , id) => {

        if(status === "Open") {
            return <Button
                buttonClass={`${classes.thisButton} ${classes.pay}`}
                buttonTitle={t("DepositWithdraw.pay")}
                //disabled={!(new BN(amount.value).minus(new BN(calculateFee(id))).isGreaterThan(0)) || address.value.length <= 0 }
                type="submit"
                onClick={()=>window.open(`https://ipg.vandar.io/v3/${id}`)}
            />
        }
    };

    const cancelIRTTx = async (reference) => {
        const cancelIRTReq = await cancelIRTDepositReq(reference);
        if (cancelIRTReq && cancelIRTReq.status === 200) {
            setCancel(true)
            toast.success(<Trans
                i18nKey="DepositWithdrawTx.cancelPayment"
                /*values={{
                    asset: t("currency." + id),
                    amount: amount.value,
                }}*/
            />);
            //await getIRTTx()
        } else {

        }
    }


    const content = () => {
        if(isLoading) {
            return <Loading/>
        }
        if (error) {
            return <Error/>
        }

        if( tx.length === 0) {
            return <div className="container height-100 flex ai-center jc-center">{t("noTx")}</div>
        }
        return <table
            className="text-center striped"
            cellSpacing="0"
            cellPadding="0">
            <thead className="th-border-y">
            <tr>
                <th>{t("date")}</th>
                <th>{t("time")}</th>
                <th>{t("DepositWithdrawTx.transactionType")}</th>
                <th>{t("volume")} ({id})</th>
                <th>{t("unit")}</th>
                <th>{t("status")}</th>

                {/*<th></th>
                        <th></th>*/}

                {/*<th>{t("details")}</th>*/}
            </tr>
            </thead>
            <tbody>{tx.map((tr, index) => (
                <Fragment key={index}>
                    <tr>
                        <td>{moment(tr.time).format("jYY/jMM/jDD")}</td>
                        <td>{moment(tr.time).format("HH:mm:ss")}</td>
                        <td className={tr.isDeposit === true ? "text-green" : "text-red"}>{tr.isDeposit === true ? t("deposit") : t("withdrawal")}</td>
                        <td className={tr.isDeposit === true ? "text-green" : "text-red"}>{new BN(tr.amount).multipliedBy(0.1).toFormat()}{" "}{tr.isDeposit === true ? "+" : "-"}</td>
                        <td>{t("currency." + id)}</td>
                        <td className={`${IRTtxStatusClassHandler(tr.status)}`}>{t("paymentStatus." + tr.status)}</td>

                        {/* <td>{payButton(tr.status , tr.id)}</td>
                                <td>{cancelButton(tr.status, tr.reference)}</td>*/}

                        {/*
                                {openItem === index ? (
                                    <td onClick={() => setOpenItem(null)}>
                                        <Icon
                                            iconName="icon-up-open icon-blue font-size-sm cursor-pointer"
                                            customClass={classes.iconBG}
                                        />
                                    </td>
                                ) : (
                                    <td onClick={() => setOpenItem(index)}>
                                        <Icon
                                            iconName="icon-down-open icon-blue font-size-sm cursor-pointer"
                                            customClass={classes.iconBG}
                                        />
                                    </td>
                                )}
                                */}
                    </tr>
                </Fragment>
            ))}
            </tbody>
        </table>

    }



    return (

        <ScrollBar>
            {filterOpen ? (
                <Fragment>
                    <div className={classes.filterBox}>
                        <NumberInput
                            lead="از ساعت"
                            after=<i className="icon-clock" />
                        customClass={classes.filterInput}
                        format="##:##"
                        placeholder="HH:mm"
                        mask={["H", "H", "m", "m"]}
                        alert={alert.fromTime}
                        onchange={(input) =>
                        timeValidator(input.target.value, "fromTime")
                    }
                        />
                        <NumberInput
                            lead="تاریخ"
                            after=<i className="icon-calendar-1" />
                        customClass={classes.filterInput}
                        format="####/##/##"
                        placeholder="YYYY/MM/DD"
                        mask={["Y", "Y", "Y", "Y", "M", "M", "D", "D"]}
                        alert={alert.fromDate}
                        onchange={(input) =>
                        dateValidator(input.target.value, "fromDate")
                    }
                        />
                        <NumberInput
                            lead="تا ساعت"
                            after=<i className="icon-clock" />
                        customClass={classes.filterInput}
                        format="##:##"
                        placeholder="HH:mm"
                        mask={["H", "H", "m", "m"]}
                        alert={alert.toTime}
                        onchange={(input) =>
                        timeValidator(input.target.value, "toTime")
                    }
                        />
                        <NumberInput
                            lead="تاریخ"
                            after=<i className="icon-calendar-1" />
                        customClass={classes.filterInput}
                        format="####/##/##"
                        placeholder="YYYY/MM/DD"
                        mask={["Y", "Y", "Y", "Y", "M", "M", "D", "D"]}
                        alert={alert.toDate}
                        onchange={(input) =>
                        dateValidator(input.target.value, "toDate")
                    }
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
                            onchange={(e) =>
                                setFilters({...filters, address: e.target.value})
                            }
                        />
                    </div>
                    <div className={classes.btnBox}>
                        <button
                            className={`${classes.button} ${classes.submit} cursor-pointer`}
                            onClick={() => setFilterOpen((prev) => !prev)}>
                            اعمال فیلتر
                        </button>
                        <button
                            className={`${classes.button} ${classes.reset} cursor-pointer`}
                            onClick={() => setFilterOpen((prev) => !prev)}>
                            حذف فیلتر
                        </button>
                        <button
                            className={`${classes.button} ${classes.return} cursor-pointer`}
                            onClick={() => setFilterOpen((prev) => !prev)}>
                            بازگشت
                        </button>
                    </div>
                </Fragment>
            ) : (
                content()
            )}
        </ScrollBar>
    );
};

const mapStateToProps = (state) => {
    return {
        activePair: state.exchange.activePair,
    };
};

export default connect(mapStateToProps, null)(IRTTx);
