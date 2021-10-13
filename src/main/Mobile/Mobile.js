import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import i18n from "i18next";
import {useTranslation} from "react-i18next";
import {loadConfig, setThemeInitiate} from "../../store/actions";
import "./Mobille.css";
import {Switch , Route} from "react-router-dom";
import {isSafari} from "react-device-detect";
import FullWidthLoading from "../../components/FullWidthLoading/FullWidthLoading";
import ReactTooltip from "react-tooltip";
import TheMenu from "./Secttions/TheMenu/TheMenu";
import TheHeader from "./Secttions/TheHeader/TheHeader";
import TheContent from "./Secttions/TheContent/TheContent";


const Mobile = (props) => {
    const {t} = useTranslation();


    return (
        <Switch>
            <Route exact path="/login">

            </Route>
            <div>
                {props.isLoading ? (<FullWidthLoading/>) : (
                    <Fragment>
                        <ReactTooltip data-html={true} data-effect="float"/>
                        <div className={`mobile-container column`}>
                            <TheHeader/>
                            <TheContent/>
                            <TheMenu/>
                        </div>
                    </Fragment>
                )}
            </div>

        </Switch>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.global.isLoading,
        isLogin: state.auth.isLogin,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(loadConfig()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mobile);
