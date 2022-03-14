import React, {useEffect, useState ,lazy} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {BrowserView, MobileView} from "react-device-detect";

import i18n from "i18next";
import {loadConfig} from "../store/actions";
import {useDispatch, useSelector} from "react-redux";


const Main = ({baseURL}) => {
    const Mobile = lazy(() => import('./Mobile/Mobile'))
    const Browser = lazy(() => import('./Browser/Browser'))

    const [ltr, setLtr] = useState(false);

    const isDark = useSelector((state) => state.global.isDark)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadConfig())
        i18n.language !== "fa" ? setLtr(true) : setLtr(false);
        i18n.on("languageChanged", (lng) => {
            lng !== "fa" ? setLtr(true) : setLtr(false);
        });
    }, []);

    return (
        <div className={`container ${isDark ? "dark" : ""} ${ltr ? "ltr" : "rtl"}`}>
            <Router basename={baseURL}>
                <BrowserView>
                    <Browser/>
                </BrowserView>
                <MobileView>
                    <Mobile/>
                </MobileView>
            </Router>
        </div>

    );
};
export default Main;