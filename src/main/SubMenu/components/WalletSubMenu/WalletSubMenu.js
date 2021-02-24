import React from 'react';
import classes from "./WalletSubMenu.module.css"
import {images} from "../../../../assets/images"
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import * as Routes from "../../../../routes/routes";
import Icon from "../../../../components/Icon/Icon";
import {setActivePair} from "../../../../store/actions";
import {connect} from "react-redux";




const WalletSubMenu = (props) => {

    const {t} = useTranslation();

    return (
        <div className={`container card-background column ${classes.container}`}>
            <div className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                <div className="row jc-start ">
                    <h2>دارایی ها</h2>
                </div>
            </div>
            <div className={`column container  ${classes.content}`}>

                <NavLink exact={true} activeClassName={classes.selected} className="container row ai-center cursor-pointer px-1 py-05" to={Routes.Wallet}>
                    <div className={` row jc-center ai-center ${classes.PairImage}`}>
                        <img className={`img-md flex`} src={images.safe} alt="safe" title="safe"/>
                    </div>
                    <div className={`row jc-between px-1 ${classes.pairDetails}`}>
                        <div className="column ai-start">
                            <span>ارزش کل</span>
                            <span className="font-size-sm">تقریبی</span>
                        </div>
                        <div className="column ai-end">
                            <span>530،095،000 <span>تومان</span></span>
                            <span>1،3 <span>بیتکوین</span></span>
                        </div>
                    </div>
                </NavLink>
                <NavLink exact={true} activeClassName={classes.selected} className="container row ai-center cursor-pointer px-1 py-05" to={Routes.Wallet}>
                    <div className={` row jc-center ai-center ${classes.PairImage}`}>
                        <img className={`img-md flex`} src={images.IRT} alt="IRT" title="IRT"/>
                    </div>
                    <div className={`row jc-between px-1 ${classes.pairDetails}`}>
                        <div className="column ai-start">
                            <span>IRT</span>
                            <span className="font-size-sm">تومان ایران</span>
                        </div>
                        <div className="jc-end ai-center">
                            <span>{props.wallet.IRT}</span>
                        </div>
                    </div>
                </NavLink>
                <NavLink exact={true} activeClassName={classes.selected} className="container row ai-center cursor-pointer px-1 py-05" to={Routes.Wallet}>
                    <div className={` row jc-center ai-center ${classes.PairImage}`}>
                        <img className={`img-md flex`} src={images.BTC} alt="BTC" title="BTC"/>
                    </div>
                    <div className={`row jc-between px-1 ${classes.pairDetails}`}>
                        <div className="column ai-start">
                            <span>BTC</span>
                            <span className="font-size-sm">بیتکوین</span>
                        </div>
                        <div className="jc-end ai-center">
                            <span>{props.wallet.BTC}</span>
                        </div>
                    </div>
                </NavLink>
                <NavLink exact={true} activeClassName={classes.selected} className="container row ai-center cursor-pointer px-1 py-05" to={Routes.Wallet}>
                    <div className={` row jc-center ai-center ${classes.PairImage}`}>
                        <img className={`img-md flex`} src={images.ETH} alt="ETH" title="ETH"/>
                    </div>
                    <div className={`row jc-between px-1 ${classes.pairDetails}`}>
                        <div className="column ai-start">
                            <span>ETH</span>
                            <span className="font-size-sm">اتریوم</span>
                        </div>
                        <div className="jc-end ai-center">
                            <span>{props.wallet.ETH}</span>
                        </div>
                    </div>
                </NavLink>
                <NavLink exact={true} activeClassName={classes.selected} className="container row ai-center cursor-pointer px-1 py-05" to={Routes.Wallet}>
                    <div className={` row jc-center ai-center ${classes.PairImage}`}>
                        <img className={`img-md flex`} src={images.USDT} alt="USDT" title="USDT"/>
                    </div>
                    <div className={`row jc-between px-1 ${classes.pairDetails}`}>
                        <div className="column ai-start">
                            <span>USDT</span>
                            <span className="font-size-sm">تتر</span>
                        </div>
                        <div className="jc-end ai-center">
                            <span>{props.wallet.USDT}</span>
                        </div>
                    </div>
                </NavLink>
                <NavLink exact={true} activeClassName={classes.selected} className="container row ai-center cursor-pointer px-1 py-05" to={Routes.Wallet}>
                    <div className={` row jc-center ai-center ${classes.PairImage}`}>
                        <img className={`img-md flex`} src={images.LTC} alt="LTC" title="LTC"/>
                    </div>
                    <div className={`row jc-between px-1 ${classes.pairDetails}`}>
                        <div className="column ai-start">
                            <span>LTC</span>
                            <span className="font-size-sm">لایت کوین</span>
                        </div>
                        <div className="jc-end ai-center">
                            <span>{props.wallet.LTC}</span>
                        </div>
                    </div>
                </NavLink>
                <NavLink exact={true} activeClassName={classes.selected} className="container row ai-center cursor-pointer px-1 py-05" to={Routes.Wallet}>
                    <div className={` row jc-center ai-center ${classes.PairImage}`}>
                        <img className={`img-md flex`} src={images.BCH} alt="BCH" title="BCH"/>
                    </div>
                    <div className={`row jc-between px-1 ${classes.pairDetails}`}>
                        <div className="column ai-start">
                            <span>BCH</span>
                            <span className="font-size-sm">بیتکوین کش</span>
                        </div>
                        <div className="jc-end ai-center">
                            <span>{props.wallet.BCH}</span>
                        </div>
                    </div>
                </NavLink>
                <NavLink exact={true} activeClassName={classes.selected} className="container row ai-center cursor-pointer px-1 py-05" to={Routes.Wallet}>
                    <div className={` row jc-center ai-center ${classes.PairImage}`}>
                        <img className={`img-md flex`} src={images.DOGE} alt="DOGE" title="DOGE"/>
                    </div>
                    <div className={`row jc-between px-1 ${classes.pairDetails}`}>
                        <div className="column ai-start">
                            <span>DOGE</span>
                            <span className="font-size-sm">دوج کوین</span>
                        </div>
                        <div className="jc-end ai-center">
                            <span>{props.wallet.DOGE}</span>
                        </div>
                    </div>
                </NavLink>



            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        wallet : state.auth.wallet
    }
}



export default  connect( mapStateToProps , null )(WalletSubMenu);