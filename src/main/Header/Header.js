import React, {useEffect} from "react";
import classes from "./Header.module.css";
import {images} from "../../assets/images";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import moment from "moment-jalaali";
import {setLogoutInitiate, setPanelTokensInitiate, setUserInfo, setUserTokensInitiate} from "../../store/actions";
import {Link, Route, Switch, useLocation} from "react-router-dom";
import {Login} from "../../routes/routes";
import * as Routes from "../../routes/routes";
import MarketHeader from "./components/MarketHeader/MarketHeader";
import WalletHeader from "./components/WalletHeader/WalletHeader";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import {getAccount, parseWalletsResponse} from "../SubMenu/components/WalletSubMenu/api/wallet";
import {setUserAccountInfo} from "../../store/actions/auth";

const Header = (props) => {
    const {t} = useTranslation();
    const location = useLocation();

    const {auth ,setUserAccountInfo} = props

    useEffect(async () => {
            if (auth.accessToken && auth.accountType === null) {
                let account = await getAccount(auth.accessToken)
                if (account.status === 200) {
                    const parsedData = parseWalletsResponse(account.data);
                    setUserAccountInfo(parsedData)
                }
            }
        },
    []
)

    return (
        <div className={`container row jc-between ai-center ${classes.container}`}>
            <div className={`row jc-between ai-center ${classes.content}`}>
                <Switch>
                    <Route exact path={Routes.Dashboard}>
                        <MarketHeader/>
                    </Route>
                    <ProtectedRoute path={Routes.Wallet + "/:id"} isLogin={auth.isLogin} component={WalletHeader}/>
                    <ProtectedRoute path={Routes.Settings} isLogin={auth.isLogin}>
                        <h2 style={{color: "var(--orange)"}}>
                            {t("routes." + location.pathname)}
                        </h2>
                    </ProtectedRoute>
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
            <div className={`flex jc-center ai-center ${classes.signOut}`}
                 onClick={props.onLogout}>{auth.isLogin ? (
                <img
                    className="img-md"
                    src={images.signOut}
                    alt="signOut"
                    title={t("signOut")}
                />
            ) : (
                " "
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
        setUserAccountInfo: (info) => dispatch(setUserAccountInfo(info)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
