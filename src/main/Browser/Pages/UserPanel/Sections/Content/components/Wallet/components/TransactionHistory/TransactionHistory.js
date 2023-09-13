import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../components/Error/Error";
import {useTransactionHistory} from "../../../../../../../../../../queries/hooks/useTransactionHistory";
import {useSelector} from "react-redux";
import TransactionHistoryTable from "./components/TransactionHistoryTable/TransactionHistoryTable";
import TextInput from "../../../../../../../../../../components/TextInput/TextInput";
import classes from "../DepositWithdraw/DepositWithdraw.module.css";
import Button from "../../../../../../../../../../components/Button/Button";
import moment from "moment-jalaali";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import i18n from "../../../../../../../../../../i18n/i18n";

const TransactionHistory = () => {
    const {t} = useTranslation();
    const user_id = useSelector((state) => state.auth.id)
    const coins = useSelector((state) => state.exchange.assets)
    const [query, setQuery] = useState({
        "coin": null, // optional
        "category": null, // optional [DEPOSIT, FEE, TRADE, WITHDRAW, ORDER_CANCEL, ORDER_CREATE, ORDER_FINALIZED]
        "startTime": moment().subtract(1, 'months').startOf("day").valueOf(),
        "endTime": moment().endOf("day").valueOf(),
        "limit": 10,
        "offset": 0
    });

    const {data, isLoading, error} = useTransactionHistory(user_id, query);
    const pagination = {
        page: (query.offset / query.limit) + 1,
        isLastPage: data?.length < query.limit
    }

    const categories = ['DEPOSIT', 'FEE', 'TRADE', 'WITHDRAW', 'ORDER_CANCEL', 'ORDER_CREATE', 'ORDER_FINALIZED'];

    const coinsOptions = [{value: null, label: t('all')}]
    const categoryOptions = [{value: null, label: t('all')}]
    const size = [10, 20, 30, 40, 50]

    categories.forEach((o) => {
        categoryOptions.push({value: o, label: t('TransactionCategory.' + o)})
    })

    coins.forEach((o) => {
        coinsOptions.push({value: o, label: o})
    })

    if (isLoading) return <Loading/>
    if (error) return <Error/>

    //if (data.length === 0) return <div className="width-100 height-100 flex ai-center jc-center">{t("noTx")}</div>
    const pageSizeHandler = (e) => {
        setQuery({
            ...query,
            limit: e.value,
            offset: 0
        })
    }

    const nextPage = () => {
        setQuery({
            ...query,
            offset: query.offset + query.limit
        })
    }
    const prevPage = () => {
        setQuery({
            ...query,
            offset: query.offset - query.limit
        })
    }
    const startDateHandler = (dateRange) => {
        if (dateRange.length === 2) {
            setQuery({
                ...query,
                startTime: moment.unix(dateRange[0].toUnix()).startOf("day").valueOf(),
                endTime: moment.unix(dateRange[1].toUnix()).endOf("day").valueOf()
            })
        }
    }

    return <>
        <div className="width-100">
            <TextInput
                select={true}
                placeholder={t('TransactionHistory.coin')}
                options={coinsOptions}
                lead={t('TransactionHistory.coin')}
                type="select"
                value={{
                    value: query?.coin,
                    label: query?.coin || t('all'),
                }}
                onchange={(e) => setQuery({...query, coin: e.value})}
                customClass={`width-64 ${classes.thisInput}`}
            />
            <TextInput
                select={true}
                placeholder={t('TransactionHistory.category')}
                options={categoryOptions}
                lead={t('TransactionHistory.category')}
                type="select"
                value={{
                    value: query?.category,
                    label: query?.category || t('all'),
                }}
                onchange={(e) => setQuery({...query, category: e.value})}
                customClass={`width-64 ${classes.thisInput}`}
            />
            <TextInput
                select={true}
                placeholder={t('TransactionHistory.size')}
                options={size.map(s => {
                    return {label: s, value: s}
                })}
                lead={t('TransactionHistory.size')}
                type="select"
                value={{
                    value: query?.limit,
                    label: query?.limit,
                }}
                onchange={pageSizeHandler}
                customClass={`width-64 ${classes.thisInput}`}
            />

            <DatePicker
                locale={i18n.language === "fa" ? persian_fa : null}
                onChange={startDateHandler}
                value={[query.startTime, query.endTime]}
                calendar={i18n.language === "fa" ? persian : null}
                render={<TextInput className="width-100"/>}
                dateSeparator={" " + t('to') + " "}
                range
            />

            <Button
                buttonClass={`${classes.thisButton} ${classes.withdrawal}`}
                buttonTitle={t('next')}
                disabled={pagination.isLastPage}
                type="button"
                onClick={nextPage}
            />
            <Button
                buttonClass={`${classes.thisButton} ${classes.withdrawal}`}
                buttonTitle={t('prev')}
                disabled={pagination.page === 1}
                type="button"
                onClick={prevPage}
            />
        </div>
        <div className="width-100">
            <TransactionHistoryTable txs={data}/>
        </div>
    </>
};

export default TransactionHistory;