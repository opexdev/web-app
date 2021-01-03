import React from 'react';
import classes from "./Overview.module.css"
import AccordionBox from "../../../components/AccordionBox/AccordionBox";
import {useTranslation} from "react-i18next";

const Overview = (props) => {
    const {t} = useTranslation();
    const [p1,p2]= props.activePair.split("/")
    const bodyBuilder =(data)=> {
        return <div className={classes.content}>
            <p>{t('overview.change')}: <span style={{color:"green"}}>{data.change}</span></p>
            <p>{t('overview.min')}: <span style={{color:"red"}}>{data.min}</span> {t(`currency.${p2}`)}</p>
            <p>{t('overview.max')}: <span style={{color:"green"}}>{data.max}</span> {t(`currency.${p2}`)}</p>
            <p>{t('overview.volume')}: <span>{data.volume} </span>{ t(`currency.${p2}`)}</p>
        </div>
    }

    const data = [
        {id: 1 , title: t('overview.lastDay') , body: bodyBuilder(props.data.lastDay)},
        {id: 2 , title: t('overview.lastWeek') , body: bodyBuilder(props.data.lastWeek)},
        {id: 3 , title: t('overview.lastMonth') , body: bodyBuilder(props.data.lastMonth)},
    ]
    
    return (
        <div className={`container card-background ${classes.container}`}>
            <AccordionBox title={t('overview.title')} content={data} />
        </div>
    );
};

export default Overview;
