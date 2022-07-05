import React, {useEffect , Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import i18n from "i18next";
import ReactTooltip from "react-tooltip";
import * as RoutesName from "./Routes/routes";
import {Toaster} from "react-hot-toast";
import Login from "./Pages/Login/Login";
import Guide from "./Pages/Guide/Guide";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import MainMenu from "./Pages/UserPanel/Sections/MainMenu/MainMenu";
import SubMenu from "./Pages/UserPanel/Sections/SubMenu/SubMenu";
import Header from "./Pages/UserPanel/Sections/Header/Header";
import Content from "./Pages/UserPanel/Sections/Content/Content";
import FullWidthLoading from "../../components/FullWidthLoading/FullWidthLoading";
import {loadConfig, setInfoMessage, setUserAccountInfoInitiate} from "../../store/actions";
import TechnicalChart from "./Pages/UserPanel/Sections/Content/components/TechnicalChart/TechnicalChart";
import "./Styles/Browser.css"
import useQuery from "../../Hooks/useQuery";
import useInterval from "../../Hooks/useInterval";
import {setLastPriceInitiate} from "../../store/actions/exchange";
import Info from "../../components/Info/Info";
import FullWidthError from "../../components/FullWidthError/FullWidthError";
import User from "./Pages/User/User";
import Landing from "./Pages/Landing/Landing";
import AllMarket from "./Pages/AllMarket/AllMarket";
import {Panel} from "./Routes/routes";
import UserPanel from "./Pages/UserPanel/UserPanel";


const Browser = () => {
    const dispatch = useDispatch();
    const query = useQuery();

    const isDark = useSelector((state) => state.global.isDark)
    const isLoading = useSelector((state) => state.global.isLoading)
    const hasError = useSelector((state) => state.global.hasError)
    const isLogin = useSelector((state) => state.auth.isLogin)

    isDark ? document.body.classList.add('dark') : document.body.classList.remove('dark');

    useEffect(() => {
        const impersonate = query.get("impersonate");
        dispatch(loadConfig(impersonate))
        i18n.language !== "fa" ? document.body.classList.add('ltr') : document.body.classList.remove('ltr');
        i18n.on("languageChanged", (lng) => {
            lng !== "fa" ? document.body.classList.add('ltr') : document.body.classList.remove('ltr');
        });

        window.addEventListener('offline', () => dispatch(setInfoMessage(null, "offline")));
        window.addEventListener('online', () => dispatch(setInfoMessage(null, null)));
        return () => {
            window.removeEventListener('offline', () => dispatch(setInfoMessage(null, "offline")));
            window.removeEventListener('online', () => dispatch(setInfoMessage(null, null)));
        }
    }, []);


    useInterval(() => {
        dispatch(setUserAccountInfoInitiate());
    }, isLogin ? 3000 : null)

    useInterval(() => {
        dispatch(setLastPriceInitiate());
    }, 3000)

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

    if (isLoading) {
        return <FullWidthLoading/>
    }
    if (hasError) {
        return <FullWidthError/>
    }
    return (
        <>
            <Routes>
                <Route path={RoutesName.Login} element={<Login/>}/>
                <Route path={RoutesName.User + "/*"} element={<User/>}/>
                <Route path={RoutesName.Landing} element={<Landing/>}/>
                <Route path={RoutesName.AllMarket} element={<AllMarket/>}/>
                <Route path={RoutesName.Guide} element={<Guide/>}/>
                <Route path={RoutesName.Panel + "/*"} element={<UserPanel/>}/>
            </Routes>
            <ReactTooltip data-html={true} data-effect="float"/>
            <Toast/>
        </>

    );
};

export default Browser;