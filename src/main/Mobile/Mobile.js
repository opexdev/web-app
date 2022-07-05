import React, {useEffect,Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadConfig} from "../../store/actions";
import "./Mobille.css";
import {Route, Navigate, Routes} from "react-router-dom";
import FullWidthLoading from "../../components/FullWidthLoading/FullWidthLoading";
import ReactTooltip from "react-tooltip";
import TheHeader from "./Secttions/TheHeader/TheHeader";
import TheContent from "./Secttions/TheContent/TheContent";
import {Overview} from "../Browser/Routes/routes";
import TheSubHeader from "./Secttions/TheSubHeader/TheSubHeader";
import Login from "../Browser/Pages/Login/Login";
import i18n from "i18next";


const Mobile = () => {

    const isLoading = useSelector((state) => state.global.isLoading)
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

    if (isLoading) {
        return <FullWidthLoading/>
    }

    return (
        <Routes>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/" element={<Navigate to={Overview} replace/>}/>
            <Fragment>
                <ReactTooltip data-html={true} data-effect="float"/>
                <div className={`mobile-container column`}>
                    <TheHeader/>
                    <TheSubHeader/>
                    <TheContent/>
                    {/*<TheMenu/>*/}
                </div>
            </Fragment>
        </Routes>
    );
};

export default Mobile;
