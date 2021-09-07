import React, {useEffect} from "react";
import classes from "./Header.module.css";
import {images} from "../../assets/images";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import moment from "moment-jalaali";
import {setLogoutInitiate} from "../../store/actions";
import {Link, Route, Switch} from "react-router-dom";
import {Login} from "../../routes/routes";
import * as Routes from "../../routes/routes";
import MarketHeader from "./components/MarketHeader/MarketHeader";
import WalletHeader from "./components/WalletHeader/WalletHeader";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import ReactTooltip from "react-tooltip";
import SettingHeader from "./components/SettingsHeader/SettingsHeader";

const Header = (props) => {
    const {t} = useTranslation();
    const {auth} = props

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    return (
        <div className={`container row jc-between ai-center px-1 py-1 ${classes.container}`}>
            <div className={`row jc-between ai-center ${classes.content}`}>
                <Switch>
                    <Route exact path={Routes.Dashboard}>
                        <MarketHeader/>
                    </Route>
                    <ProtectedRoute path={Routes.Wallet + "/:id"} isLogin={auth.isLogin} component={WalletHeader}/>
                    <ProtectedRoute path={Routes.Settings} isLogin={auth.isLogin} component={SettingHeader}/>
                    <Route path="*">
                        <h4>{t("comingSoon")}</h4>
                    </Route>
                </Switch>

                <div className={`col-35 column ai-end`}>
                    {auth.firstName === null ? (
                        <Link to={Login} className="hover-text">
                            <p>{t("pleaseLogin")}</p>
                        </Link>
                    ) : (
                        <p className="mb-05">
                            {auth.firstName + " " + auth.lastName}
                        </p>
                    )}
                    <p style={{direction: "ltr"}}>
                        {moment().format("jYYYY/jM/jD - HH:mm:ss")}
                    </p>
                </div>
            </div>
            <div className={`flex jc-end ai-center ${classes.signOut}`}>
                {auth.isLogin ? (
                    <img
                        className="img-md-plus"
                        src={images.signOut}
                        alt={t("signOut")}
                        onClick={(props.onLogout)}
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
        activePair: state.global.activePair,
        auth: state.auth,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(setLogoutInitiate()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
