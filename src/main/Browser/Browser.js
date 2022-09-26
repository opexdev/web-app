import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import i18n from "i18next";
import ReactTooltip from "react-tooltip";
import * as RoutesName from "./Routes/routes";
import {Toaster} from "react-hot-toast";
import Login from "./Pages/Login/Login";
import Guide from "./Pages/Guide/Guide";
import FullWidthLoading from "../../components/FullWidthLoading/FullWidthLoading";
import {loadConfig, setInfoMessage} from "../../store/actions";
import "./Styles/Browser.css"
import useQuery from "../../Hooks/useQuery";
import FullWidthError from "../../components/FullWidthError/FullWidthError";
import User from "./Pages/User/User";
import Landing from "./Pages/Landing/Landing";
import AllMarket from "./Pages/AllMarket/AllMarket";
import UserPanel from "./Pages/UserPanel/UserPanel";

const Browser = () => {
    const query = useQuery();
    const dispatch = useDispatch();

    const isDark = useSelector((state) => state.global.isDark)
    const isLoading = useSelector((state) => state.global.isLoading)
    const hasError = useSelector((state) => state.global.hasError)

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

    const Toast = () => <Toaster position="bottom-right" toastOptions={
        {
            className: "rtl",
            style: {
                padding: "0.3vh 0.8vw 0.3vh 0.8vw",
                color: "white",
                lineHeight: "3vh",
                fontSize: "0.8vw",
                borderRadius: "4px",
                background: "var(--mainContent)",
            },
            success: {
                style: {
                    background: "var(--darkGreen)",
                },
            },
            error: {
                style: {
                    background: "var(--darkRed)",
                },
            },
            custom: {
                style: {
                    background: "var(--Orange)",
                },
            },
        }} containerStyle={{}}/>


    if (isLoading) return <FullWidthLoading/>

    if (hasError) return <FullWidthError/>

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