import React, {useEffect} from "react";
import classes from "./Header.module.css";
import {Trans, useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {Link, Route, Switch} from "react-router-dom";
import * as Routes from "../../../../routes/routes";
import {Login} from "../../../../routes/routes";
import MarketHeader from "./components/MarketHeader/MarketHeader";
import WalletHeader from "./components/WalletHeader/WalletHeader";
import ReactTooltip from "react-tooltip";
import SettingHeader from "./components/SettingsHeader/SettingsHeader";
import ProtectedRoute from "../../../../components/ProtectedRoute/ProtectedRoute";
import {images} from "../../../../assets/images";
import {setLogoutInitiate} from "../../../../store/actions";
import {toast} from "react-hot-toast";
import {logOut} from "../../../../pages/Login/api/auth";
import Clock from "./components/Clock/Clock";

const Header = (props) => {
    const {t} = useTranslation();
    const {isLogin, firstName, lastName} = props

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    const logOutHandler = async () => {
        const logOutSession = await logOut()
        if (logOutSession && logOutSession.status === 204) {
            toast.success(<Trans
                i18nKey="header.logOutSuccess"
            />);
        } else {
            /*toast.error(<Trans
                i18nKey="header.logOutError"
            />);*/
        }
        props.onLogout()
    }


    return (
        <div className={`container row jc-between ai-center px-1 py-1 ${classes.container}`}>
            <div className={`row jc-between ai-center ${classes.content}`}>
                <Switch>
                    <Route exact path={Routes.Dashboard}>
                        <MarketHeader/>
                    </Route>
                    <ProtectedRoute path={Routes.Wallet + "/:id"} isLogin={isLogin} component={WalletHeader}/>
                    <ProtectedRoute path={Routes.Settings} isLogin={isLogin} component={SettingHeader}/>
                    <Route path="*">
                        <h4>{t("comingSoon")}</h4>
                    </Route>
                </Switch>
                <div className={`col-25 column ai-end`}>
                    {firstName === null ? (
                        <Link to={Login} className="hover-text">
                            <p>{t("pleaseLogin")}</p>
                        </Link>
                    ) : (
                        <p className="mb-05">
                            {firstName + " " + lastName}
                        </p>
                    )}
                    <p style={{direction: "ltr"}}>
                        <Clock/>
                    </p>
                </div>
            </div>
            <div className={`flex jc-end ai-center ${classes.signOut}`}>
                {isLogin ? (
                    <img
                        className="img-md-plus"
                        src={images.signOut}
                        alt={t("signOut")}
                        onClick={logOutHandler}
                        data-html={true}
                        data-place="right"
                        data-effect="float"
                        data-tip={`<span class="column jc-between col-100">${t("signOut")}</span>`}
                    />
                ) : (
                    <Link to={Login} className="flex">
                        <img
                            className="img-md-plus"
                            src={images.signIn}
                            alt={t("signIn")}
                            data-html={true}
                            data-place="right"
                            data-effect="float"
                            data-tip={`<span class="column jc-between col-100">${t("signIn")}</span>`}
                        />
                    </Link>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(setLogoutInitiate()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
