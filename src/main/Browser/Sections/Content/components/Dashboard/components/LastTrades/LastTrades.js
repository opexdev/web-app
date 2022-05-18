import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import classes from "./LastTrades.module.css";
import {getLastTrades} from "./api/lastTrades";
import LastTradesTable from "./components/LastTradesTable/LastTradesTable";
import useInterval from "../../../../../../../../Hooks/useInterval";
import Error from "../../../../../../../../components/Error/Error";
import Loading from "../../../../../../../../components/Loading/Loading";
import {setLastTradePrice} from "../../../../../../../../store/actions";

const LastTrades = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const [error, setError] = useState(false);
    const [lastTrades, setLastTrades] = useState(null);

    const activePair = useSelector((state) => state.exchange.activePair)

    const getLastTradesData = async () => {
        getLastTrades(activePair).then((res) => {
            setError(false)
            if (JSON.stringify(res.data) !== JSON.stringify(lastTrades)) {
                setLastTrades(res.data)
                if (res.data.length) dispatch(setLastTradePrice(res.data[0].price))
            }
        }).catch(() => {
            setError(true)
        });
    }

    useEffect(() => {
        setLastTrades(null)
        getLastTradesData();
    }, [activePair]);

    useInterval(async () => {
        await getLastTradesData();
    }, activePair ? 1500 : null);

    const content = () => {
        if (error) {
            return <Error/>
        }
        if (lastTrades === null) {
            return <Loading/>
        }
        if (lastTrades.length === 0) {
            return <div className="container column ai-center jc-center" style={{height: "100%"}}>
                <p>{t('noData')}</p>
            </div>
        }
        if (lastTrades.length > 0) {
            return <LastTradesTable data={lastTrades}/>
        }
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