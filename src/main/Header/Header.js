import React from "react";
import classes from "./Header.module.css";
import {images} from "../../assets/images"
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import moment from "moment-jalaali";
import IconBtn from "../../components/Icon/Icon";
import {setLogoutInitiate} from "../../store/actions";
import {Link, Route, Switch} from "react-router-dom";
import {Login} from "../../routes/routes";
import * as Routes from "../../routes/routes";
import Market from "../SubMenu/components/Market/Market";
import SMWallet from "../SubMenu/components/Wallet/SMWallet";
import MarketHeader from "./components/MarketHeader/MarketHeader";


const Header = (props) => {
    const {t} = useTranslation();
    return (
        <div className={`container row jc-between ai-center ${classes.container}`}>
            <div className={`row jc-between ai-center ${classes.content}`}>

                <Switch>
                    <Route exact path={Routes.Dashboard}>
                        <MarketHeader/>
                    </Route>
                    <Route exact path={Routes.Wallet}>
                        <h2 style={{color:"var(--orange)"}}>بیتکوین (BTC)</h2>
                    </Route>
                    <Route exact path={Routes.Settings}>
                        <h2 style={{color:"var(--orange)"}}>مشخصات کاربری</h2>
                    </Route>
                    {/*<ProtectedRoute component={Wallet} isLogin={props.isLogin} exact path={Routes.Wallet}/>*/}

                    <Route path="*">
                        <h4>{t('comingSoon')}</h4>
                    </Route>
                </Switch>







                <div className={`column ai-end`}>
                    { props.auth.firstName === null ? <Link to={Login}><p>{t("pleaseLogin")}</p></Link> : <p className="mb-05">{props.auth.firstName+" "+props.auth.lastName}</p>}
                    <p style={{direction:"ltr"}}>{moment().format('jYYYY/jM/jD - HH:mm:ss')}</p>
                </div>
            </div>
            <div className={`flex jc-center ai-center ${classes.signOut}`} onClick={props.onLogout}>
                {props.auth.isLogin ? <img className="img-md" src={images.signOut} alt="signOut" title={t("signOut")}/> : " "}
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
const mapDispatchToProps = dispatch => {
    return {
        onLogout :  () => dispatch(setLogoutInitiate())
    }
}

export default  connect( mapStateToProps , mapDispatchToProps )(Header);
