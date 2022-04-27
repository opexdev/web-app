import React, {Fragment, useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {loadConfig} from "../../store/actions";
import "./Mobille.css";
import {Redirect, Route, Switch} from "react-router-dom";
import FullWidthLoading from "../../components/FullWidthLoading/FullWidthLoading";
import ReactTooltip from "react-tooltip";
import TheHeader from "./Secttions/TheHeader/TheHeader";
import TheContent from "./Secttions/TheContent/TheContent";
import {Overview} from "../../routes/routes";
import TheSubHeader from "./Secttions/TheSubHeader/TheSubHeader";
import Login from "../../pages/Login/Login";
import i18n from "i18next";


const Mobile = (props) => {


    const isDark = useSelector((state) => state.global.isDark)
    const dispatch = useDispatch();

    isDark ? document.body.classList.add('dark') : document.body.classList.remove('dark');

    useEffect(() => {
        dispatch(loadConfig())
        i18n.language !== "fa" ? document.body.classList.add('ltr') : document.body.classList.remove('ltr');
        i18n.on("languageChanged", (lng) => {
            lng !== "fa" ? document.body.classList.add('ltr') : document.body.classList.remove('ltr');
        });
    }, []);



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
