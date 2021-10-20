import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import i18n from "i18next";
import {useTranslation} from "react-i18next";
import {loadConfig, setThemeInitiate} from "../../store/actions";
import "./Mobille.css";
import {Switch, Route, Redirect} from "react-router-dom";
import {isSafari} from "react-device-detect";
import FullWidthLoading from "../../components/FullWidthLoading/FullWidthLoading";
import ReactTooltip from "react-tooltip";
import TheMenu from "./Secttions/TheMenu/TheMenu";
import TheHeader from "./Secttions/TheHeader/TheHeader";
import TheContent from "./Secttions/TheContent/TheContent";
import {Login, Overview} from "../../routes/routes";
import TheSubHeader from "./Secttions/TheSubHeader/TheSubHeader";
import ActionSheet from "../../components/ActionSheet/ActionSheet";


const Mobile = (props) => {
    const {t} = useTranslation();


    return (
        <Switch>
            <Route exact path="/login">

            </Route>
            <Route exact path="/">
                <Redirect to={Overview} />
            </Route>
            <div>
                {props.isLoading ? (<FullWidthLoading/>) : (
                    <Fragment>
                        <ReactTooltip data-html={true} data-effect="float"/>
                        <div className={`mobile-container column`}>
                            <TheHeader/>
                            <TheSubHeader/>
                            <TheContent/>
                            {/*<TheMenu/>*/}
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
