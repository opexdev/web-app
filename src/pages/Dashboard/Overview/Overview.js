import React from 'react';
import classes from "./Overview.module.css"
import AccordionBox from "../../../components/AccordionBox/AccordionBox";
import {useTranslation} from "react-i18next";
import {OverViewData} from "../../../FakeData/FakeData";
import {connect} from "react-redux";

const Overview = (props) => {
    const {t} = useTranslation();

    const bodyBuilder =(data)=> {
        return <div className={classes.content}>
            <p>{t('overview.change')}: <span className={data.type ? "text-green":"text-red"}>%{data.change}{data.type ? "+":"-"}</span></p>
            <p>{t('min')}: <span className="text-red">{(data.min).toLocaleString()}</span> {t(`currency.${props.activePair.quote}`)}</p>
            <p>{t('max')}: <span className="text-green">{(data.max).toLocaleString()}</span> {t(`currency.${props.activePair.quote}`)}</p>
            <p>{t('overview.volume')}: <span>{(data.volume).toLocaleString()} </span>{ t(`currency.${props.activePair.quote}`)}</p>
        </div>
    }

    const data = [
        {title: t('overview.lastDay') , body: bodyBuilder(OverViewData.lastDay)},
        {title: t('overview.lastWeek') , body: bodyBuilder(OverViewData.lastWeek)},
        {title: t('overview.lastMonth') , body: bodyBuilder(OverViewData.lastMonth)},
    ]

    return (
        <div className={`container card-background card-border ${classes.container}`}>
            <AccordionBox title={t('overview.title')} content={data} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        activePair: state.global.activePair
    }
}

export default connect(mapStateToProps, null)(Overview);
