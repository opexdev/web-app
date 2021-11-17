import React, {Fragment} from "react";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {loadConfig} from "../../store/actions";
import "./Mobille.css";
import {Switch, Route, Redirect} from "react-router-dom";
import FullWidthLoading from "../../components/FullWidthLoading/FullWidthLoading";
import ReactTooltip from "react-tooltip";
import TheHeader from "./Secttions/TheHeader/TheHeader";
import TheContent from "./Secttions/TheContent/TheContent";
import {Overview} from "../../routes/routes";
import TheSubHeader from "./Secttions/TheSubHeader/TheSubHeader";
import Login from "../../pages/Login/Login";


const Mobile = (props) => {

    return (
        <Switch>
            <Route exact path="/login">
                <Login/>
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
