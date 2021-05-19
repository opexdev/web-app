import React, {Fragment, useEffect, useState} from "react";
import MainMenu from "./MainMenu/MainMenu";
import SubMenu from "./SubMenu/SubMenu";
import ScrollBar from "../components/ScrollBar";
import Header from "./Header/Header";
import Footer from "./Footer/footer";
import {connect} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import FullWidthLoading from "../components";
import {loadConfig} from "../store/actions";
import Dashboard from "../pages/Dashboard/dashboard";
import i18n from "i18next";
import {images} from "../assets/images";
import Wallet from "../pages/Wallet/wallet";
import {BrowserView, MobileView} from "react-device-detect";
import ReactTooltip from "react-tooltip";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login/Login";
import * as Routes from "../routes/routes";
import {useTranslation} from "react-i18next";
import {isSafari} from "react-device-detect";
import Settings from "../pages/Settings/Settings";
import TechnicalChart from "../pages/TechnicalChart/TechnicalChart";
import DevelopeLogin from "../pages/DevelopLogin/DevelopLogin";
import {useToasts} from "react-toast-notifications";

const App = (props) => {
  const {t} = useTranslation();
  const [ltr, setLtr] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    props.onLoad();
    i18n.language !== "fa" ? setLtr(true) : setLtr(false);
    i18n.on("languageChanged", (lng) => {
      lng !== "fa" ? setLtr(true) : setLtr(false);
    });
  }, []);


  const toastContent = <div style={{height:"6vh"}}>
    از حساب کاربری خارج شدید
  </div>

  /*useEffect(() => {
    const timer = setInterval(() => {
      addToast(toastContent, {
        appearance: 'info',
        autoDismiss: true,
        autoDismissTimeout: 8000,
      })
    }, 10000);
    return () => clearInterval(timer);
  }, []);
*/

  /*useEffect(() => {
    {props.isLogin ? addToast(toastContent, {
      appearance: 'success',
      autoDismiss: true,
      autoDismissTimeout: 8000,
    })
        :
        ""
    }
  }, []);*/


  return (
    /*basename={"demo"}*/
    /*"homepage":"https://opex.dev/demo"*/
    <Router basename={"demo"}>
      <BrowserView>
        <Switch>
          <Route exact path="/login">
            <DevelopeLogin />
          </Route>
          <ProtectedRoute
            component={TechnicalChart}
            isLogin={props.isLogin}
            exact
            path={Routes.Technical}
          />
          <Fragment>
            <div
              className={`container ${props.isDark ? "dark" : ""} ${
                ltr ? "ltr" : "rtl"
              } ${isSafari ? "" : "user-select"}`}>
              {props.isLoading ? (
                <FullWidthLoading />
              ) : (
                <Fragment>
                  <ReactTooltip data-html={true} data-effect="float" />
                  <div className="row">
                    <MainMenu />
                    <SubMenu />
                    <div className="column content">
                      <Header />
                      <ScrollBar>
                        <Switch>
                          <Route exact path={Routes.Dashboard}>
                            <Dashboard />
                          </Route>
                          <ProtectedRoute
                            component={Wallet}
                            isLogin={props.isLogin}
                            exact
                            path={Routes.Wallet}
                          />
                          <ProtectedRoute
                            component={Settings}
                            isLogin={props.isLogin}
                            path={Routes.Settings}
                          />
                          <Route path="*">
                            <div
                              className="container flex ai-center jc-center"
                              style={{height: "70%"}}>
                              <h1>{t("comingSoon")}</h1>
                            </div>
                          </Route>
                        </Switch>
                        <Footer />
                      </ScrollBar>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </Fragment>
        </Switch>
      </BrowserView>

      <MobileView style={{padding: "2vh 3vw"}}>
        <div className="mobile-view">
          <img className={`flashit`} src={images.opexLogo_light} alt="logo" />

          <h1>
            اوپکس فعلاً برای نمایش در موبایل بهینه نشده است. لطفاً لینک را در
            کامپیوتر باز کنید! :)
          </h1>

          {/*<img src={images.bit} alt="bit"/>*/}
        </div>
      </MobileView>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.global.isLoading,
    isDark: state.global.isDark,
    isLogin: state.auth.isLogin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => dispatch(loadConfig()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
