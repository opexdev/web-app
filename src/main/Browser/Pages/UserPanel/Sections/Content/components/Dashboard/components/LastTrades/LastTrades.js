import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import classes from "./LastTrades.module.css";
import LastTradesTable from "./components/LastTradesTable/LastTradesTable";
import Error from "../../../../../../../../../../components/Error/Error";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import {setLastTradePrice} from "../../../../../../../../../../store/actions";
import {useLastTrades} from "../../../../../../../../../../queries";

const LastTrades = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const activePair = useSelector((state) => state.exchange.activePair)
    const onSuccess = (data) => {
        if (data.length) dispatch(setLastTradePrice(data[0].price))
    }
    const {data: lastTrades, isLoading, error} = useLastTrades(activePair.symbol, onSuccess)

    console.log("lastTrades :" , lastTrades)

    const content = () => {
        if (error) return <Error/>
        if (isLoading) return <Loading/>
        if (lastTrades.length > 0) return <LastTradesTable data={lastTrades}/>
        return <div className="container column ai-center jc-center" style={{height: "100%"}}>
            <p>{t('noData')}</p>
        </div>
    }

    return (
        <div
            className={`container card-background card-border column ${classes.container}`}>
            <div className={`column border-bottom jc-center card-header-bg ${classes.header}`}>
                <div className="row jc-start ">
                    <h3>{t("LastTrades.title")}</h3>
                </div>
            </div>
            <div className={`row container ${classes.content}`}>
                {content()}
            </div>
        </div>
    );
};

export default LastTrades;