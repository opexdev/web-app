import React, {Fragment} from "react";
import classes from "./MarketHeader.module.css";
import {images} from "../../../../assets/images"
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import moment from "moment-jalaali";
import IconBtn from "../../../../components/Icon/Icon";
import {setLogoutInitiate} from "../../../../store/actions";
import {Link} from "react-router-dom";
import {Login} from "../../../../routes/routes";


const MarketHeader = (props) => {
    const {t} = useTranslation();
    return (
        <Fragment>
            <div className={`column ai-start`}>
                <h2 className="mb-05">{t(`pair.${props.activePair.pair}`)}</h2>
                <p>{t('header.lastPrice')}: <span>410,130,000</span> {t('currency.'+props.activePair.quote)}</p>
            </div>
            <div className={`column ai-center`}>
                <p className="mb-05">{t('header.availableBalance')}</p>
                <div className={`row ai-center ${classes.inventory}`}>
                    <div className="flex ai-center">
                        <IconBtn iconName="icon-plus icon-white font-size-sm" customClass={`mx-05 ${classes.iconBG}`}/>
                        <span>{props.auth.wallet[props.activePair.base]}</span>
                        <span>{t('currency.'+props.activePair.base)}</span>
                    </div>
                    <div className="flex ai-center">
                        <span>{props.auth.wallet[props.activePair.quote]}</span>
                        <span>{t('currency.'+props.activePair.quote)}</span>
                        <IconBtn iconName="icon-plus icon-white font-size-sm" customClass={`mx-05 ${classes.iconBG}`}/>
                    </div>
                </div>
            </div>
        </Fragment>

    )
};

const mapStateToProps = state => {
    return {
        activePair : state.global.activePair,
        auth : state.auth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout :  () => dispatch(setLogoutInitiate())
    }
}

export default  connect( mapStateToProps , mapDispatchToProps )(MarketHeader);
