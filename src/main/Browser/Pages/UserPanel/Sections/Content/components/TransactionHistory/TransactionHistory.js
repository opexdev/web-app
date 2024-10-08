import React, {useEffect, useRef, useState} from 'react';
import classes from './TransactionHistory.module.css';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import moment from "moment-jalaali";
import {useTransactionHistory} from "../../../../../../../../queries/hooks/useGetTransactionsHistory";
import Loading from "../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../components/Error/Error";
import TextInput from "../../../../../../../../components/TextInput/TextInput";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Button from "../../../../../../../../components/Button/Button";
import Date from "../../../../../../../../components/Date/Date";
import TransactionHistoryTable from "./components/TransactionHistoryTable/TransactionHistoryTable";
import ToggleSwitch from "../../../../../../../../components/ToggleSwitch/ToggleSwitch";
import i18n from "i18next";

const TransactionHistory = () => {

    const {t} = useTranslation();
    const user_id = useSelector((state) => state.auth.id)
    const coins = useSelector((state) => state.exchange.assets)

    /*const [ascending, setAscending] = useState(true);*/

    const [query, setQuery] = useState({
        "coin": null, // optional
        "category": null, // optional [DEPOSIT, FEE, TRADE, WITHDRAW, ORDER_CANCEL, ORDER_CREATE, ORDER_FINALIZED]
        "startTime": null,
        "endTime": null,
        "ascendingByTime": false,
        "limit": 10,
        "offset": 0
    });

    const {data, isLoading, error, refetch} = useTransactionHistory(user_id, query);
    const pagination = {
        page: (query.offset / query.limit) + 1,
        isLastPage: data?.length < query.limit
    }

    const isFirst = useRef(true);

    useEffect(() => {
        if (!isFirst.current) scrollRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [data]);

    const categories = ['DEPOSIT', 'FEE', 'TRADE', 'WITHDRAW', 'ORDER_CANCEL', 'ORDER_CREATE', 'ORDER_FINALIZED'];

    const coinsOptions = [{value: null, label: t('all')}]
    const categoryOptions = [{value: null, label: t('all')}]
    const size = [10, 20, 30, 40, 50]

    categories.forEach((o) => {
        categoryOptions.push({value: o, label: t('TransactionCategory.' + o)})
    })

    coins.forEach((o) => {
        coinsOptions.push({value: o, label: t('currency.' + o)})
    })


    const scrollRef = useRef(null);


    const pageSizeHandler = (e) => {
        setQuery({
            ...query,
            limit: e.value,
            offset: 0
        })
    }

    const firstPage = () => {
        setQuery({
            ...query,
            offset: 0
        })
    }
    const nextPage = () => {
        isFirst.current = false;
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
        const start = dateRange[0]  ? moment.unix(dateRange[0].toUnix()).startOf("day").valueOf() : null;
        const end = dateRange[1]  ? moment.unix(dateRange[1].toUnix()).endOf("day").valueOf() : null;
        setQuery({
            ...query,
            startTime: start,
            endTime: end
        })
    }


    const content = () => {
        if (isLoading) return <div style={{height: "40vh"}}><Loading/></div>
        if (error) return <div style={{height: "40vh"}}><Error/></div>
        if (data?.length === 0) return <div style={{height: "40vh"}} className={`flex jc-center ai-center`}>{t("noTx")}</div>
        else return <>
            <TransactionHistoryTable txs={data} offset={query?.offset} />
        </>
    }

    const periodTextHandler = () => {
        if (query?.startTime && query?.endTime) return <>
            <span className={`mx-05`}>{t("from")}</span>
            <span><Date date={query?.startTime}/></span>
            <span className={`mx-05`}>{t("until")}</span>
            <span><Date date={query?.endTime}/></span>
        </>
        if (query?.startTime) return <>
            <span className={`mx-05`}>{t("from")}</span>
            <span><Date date={query?.startTime}/></span>
            <span className={`mx-05`}>{t("until")}</span>
            <span><Date date={moment().endOf("day").valueOf()}/></span>
        </>
    }



    return <div className={`column px-1 pt-1`}>


        <div className={`width-100 border card-bg px-2 py-5 rounded-8 row jc-between ai-center`}>
            <TextInput
                select={true}
                placeholder={t('TransactionHistory.coin')}
                options={coinsOptions}
                lead={t('TransactionHistory.coin')}
                type="select"
                value={{
                    value: query?.coin,
                    label:  query?.coin ? t('currency.'+ query?.coin) : t('all'),
                }}
                onchange={(e) => setQuery({...query, coin: e.value, offset:0})}
                customClass={`width-24 ${classes.thisInput}`}
            />
            <TextInput
                select={true}
                placeholder={t('TransactionHistory.category')}
                options={categoryOptions}
                lead={t('TransactionHistory.category')}
                type="select"
                value={{
                    value: query?.category,
                    label: query?.category ? t('TransactionCategory.'+ query?.category) : t('all'),
                }}
                onchange={(e) => setQuery({...query, category: e.value, offset:0})}
                customClass={`width-24 ${classes.thisInput}`}
            />
            <TextInput
                select={true}
                placeholder={t('TransactionHistory.size')}
                options={size?.map(s => {
                    return {label: s, value: s}
                })}
                lead={t('TransactionHistory.size')}
                type="select"
                value={{
                    value: query?.limit,
                    label: query?.limit,
                }}
                onchange={pageSizeHandler}
                customClass={`width-24 ${classes.thisInput}`}
            />

            <TextInput
                datePicker={true}
                //placeholder={t('TransactionHistory.size')}
                //numberOfMonths={2}
                plugins={[
                    <DatePanel />
                ]}
                lead={t('TransactionHistory.period')}
                type="input"
                onChange={startDateHandler}
                /*value={[query.startTime, query.endTime]}*/
                value={[query.startTime, query.endTime]}
                dateSeparator={" " + t('to') + " "}
                range
                hideOnScroll
                dataPanelPosition="Bottom"
                position={`${i18n.language === "fa" ? "bottom-left" : "bottom-right" }`}
                customClass={`width-24 ${classes.thisInput}`}
            />


        </div>

        <div className={`card-bg card-border width-100 my-4`} ref={scrollRef}>
            <div className={`card-header-bg row jc-between ai-center px-2 py-5`}>
                <div className={`row jc-center ai-center`}>
                    <h3 className={``}>{t("txHistory.title")}</h3>
                    <div className={`row mr-1 text-gray`}>
                        {periodTextHandler()}
                    </div>
                </div>


                <div className={`row jc-center ai-center mr-1 fs-0-8`}>
                    <span className={`fs-0-8 ml-1`}>{t("TransactionHistory.ascendingByTime")}</span>
                    <ToggleSwitch

                        onchange={ () => setQuery(prevState => {return {
                            ...prevState,
                            ascendingByTime: !prevState.ascendingByTime
                        }}) }

                        /*onchange={()=> setQuery({
                            ...query,
                            ascendingByTime: (prevState => !prevState)}
                        )}*/
                        checked={!query?.ascendingByTime}/>
                </div>
            </div>
            <div>
                {content()}
            </div>
        </div>

        <div className={`row jc-start ai-center width-100 mb-5 width-100 border card-bg px-2 py-3 rounded-8`}>
            <Button
                buttonClass={`${classes.thisButton} px-3`}
                buttonTitle={t('first')}
                disabled={pagination.page === 1}
                type="button"
                onClick={firstPage}
            />
            <Button
                buttonClass={`${classes.thisButton} px-3 mx-2`}
                buttonTitle={t('prev')}
                disabled={pagination.page === 1}
                type="button"
                onClick={prevPage}
            />
            <Button
                buttonClass={`${classes.thisButton} px-3`}
                buttonTitle={t('next')}
                disabled={pagination.isLastPage}
                type="button"
                onClick={nextPage}
            />
        </div>
    </div>
};

export default TransactionHistory;
