import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Switch} from "react-router-dom";
import i18n from "i18next";
import ReactTooltip from "react-tooltip";
import * as Routes from "../../routes/routes";
import {Toaster} from "react-hot-toast";
import Login from "../../pages/Login/Login";
import Guide from "../../pages/Guide/Guide";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import MainMenu from "./Sections/MainMenu/MainMenu";
import SubMenu from "./Sections/SubMenu/SubMenu";
import Header from "./Sections/Header/Header";
import Content from "./Sections/Content/Content";
import FullWidthLoading from "../../components/FullWidthLoading/FullWidthLoading";
import {loadConfig, setUserAccountInfoInitiate} from "../../store/actions";
import TechnicalChart from "./Sections/Content/components/TechnicalChart/TechnicalChart";
import "./Browser.css"
import useQuery from "../../Hooks/useQuery";
import useInterval from "../../Hooks/useInterval";


const Browser = () => {
    const dispatch = useDispatch();
    const query = useQuery();

    const isDark = useSelector((state) => state.global.isDark)
    const isLoading = useSelector((state) => state.global.isLoading)
    const isLogin = useSelector((state) => state.auth.isLogin)

    isDark ? document.body.classList.add('dark') : document.body.classList.remove('dark');

    useEffect(() => {
        const token = query.get("token");
        if (!token) dispatch(loadConfig())
        i18n.language !== "fa" ? document.body.classList.add('ltr') : document.body.classList.remove('ltr');
        i18n.on("languageChanged", (lng) => {
            lng !== "fa" ? document.body.classList.add('ltr') : document.body.classList.remove('ltr');
        });
    }, []);


    useInterval(() => {
        dispatch(setUserAccountInfoInitiate());
    }, isLogin ? 3000 : null)

    const Toast = () => <Toaster position="bottom-right" toastOptions={
        {
            className: "rtl",
            style: {
                padding: "0.3vh 0.8vw 0.3vh 0",
                color: "white",
                lineHeight: "3vh",
                fontSize: "0.8vw",
                borderRadius: "4px",
                background: "var(--mainContent)",
            },
            success: {
                style: {
                    background: "var(--bgGreen)",
                },
            },
            error: {
                style: {
                    background: "var(--bgRed)",
                },
            },
            custom: {
                style: {
                    background: "var(--Orange)",
                },
            },
        }} containerStyle={{}}/>

    return (
        <Switch>
            <Route exact path="/login">
                <Login/>
            </Route>
            <Route path="/guide">
                <Guide/>
            </Route>
            <ProtectedRoute
                component={TechnicalChart}
                isLogin={isLogin}
                exact
                path={Routes.Technical}
            />
            <Route>
                {isLoading ? (<FullWidthLoading/>) : (
                    <div className="row">
                        <MainMenu isLogin={isLogin}/>
                        <SubMenu isLogin={isLogin}/>
                        <div className="column content">
                            <Header/>
                            <div style={{display: "flex", flex: 1}}>
                                <Content/>
                            </div>
                        </div>
                        <ReactTooltip data-html={true} data-effect="float"/>
                        <Toast/>
                    </div>
                )}
            </Route>
        </Switch>
    );
};

export default Browser;