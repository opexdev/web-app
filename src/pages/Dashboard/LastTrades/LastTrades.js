import React,{useState,useEffect} from 'react';
import classes from "./LastTrades.module.css"
import LastTradesTable from "./LastTradesTable/LastTradesTable";
import {useTranslation} from "react-i18next";
import {lastTradesData} from "../../../FakeData/FakeData";


const LastTrades = () => {
    const {t} = useTranslation();
    const [lastTrades , setLastTrades] = useState([])

    useEffect(()=>{
        setLastTrades(lastTradesData())
    },[])
    return (
        <div className={`container card-background card-border column ${classes.container}`}>
            <div className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                <div className="row jc-start ">
                    <h3>{t('LastTrades.title')}</h3>
                </div>
            </div>
            <div className={`row container ${classes.content}`}>
                <LastTradesTable data={lastTrades}/>
            </div>
        </div>
    );
};

export default LastTrades;