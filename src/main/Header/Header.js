import React from "react";
import classes from "./Header.module.css";
import {images} from "../../assets/images"
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import moment from "moment-jalaali";
import ShimmerEffect from "../../components/ShimmerEffect";


const Header = (props) => {
    const {t} = useTranslation();
    const [p1,p2]= props.activePair.split("/")
    return (
        <div className={`container row jc-between ai-center ${classes.container}`}>
            <div className={`row jc-between ai-center ${classes.content}`}>
                <div className={`column ai-start`}>
                    <h2 className="mb-05">{t(`pair.${props.activePair}`)}</h2>
                    <p>{t('header.lastPrice')}<span>410,130,000</span> {t('currency.'+p2)}</p>
                </div>
                <div className={`column ai-center`}>
                    <p className="mb-05">{t('header.availableBalance')}</p>
                    <div className={`row ai-center ${classes.inventory}`}>
                        <div className="flex ai-center">
                            {/*<img className="img-sm" src={images.plus} alt="plus"/>*/}
                            <i className="icon-plus text-green font-size-lg"/>
                            <span>{props.auth.wallet[p1]}</span>
                            <span>{t('currency.'+p1)}</span>
                        </div>
                        <div className="flex ai-center">
                            <span>{props.auth.wallet[p2]}</span>
                            <span>{t('currency.'+p2)}</span>
                            <i className="icon-plus text-green font-size-lg"/>
                            {/*<img className="img-sm" src={images.plus} alt="plus"/>*/}
                        </div>
                    </div>
                </div>
                <div className={`column ai-end`}>
                    { props.auth.firstName === null ? <ShimmerEffect/> : <p className="mb-05">{props.auth.firstName+" "+props.auth.lastName}</p>}
                    <p style={{direction:"ltr"}}>{moment().format('jYYYY/jM/jD - HH:mm:ss')}</p>
                </div>
            </div>
            <div className={`flex jc-center ai-center ${classes.signOut}`}>
                <img className="img-md" src={images.signOut} alt="signOut" title={t("signOut")}/>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        activePair : state.global.activePair,
        auth : state.auth
    }
}

export default  connect( mapStateToProps , null )(Header);
