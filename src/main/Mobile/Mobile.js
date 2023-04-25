import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadConfig} from "../../store/actions";
import "./Mobille.css";
import FullWidthLoading from "../../components/FullWidthLoading/FullWidthLoading";
import i18n from "i18next";
import Radium from "radium";
import {useTranslation} from "react-i18next";


const Mobile = () => {



    const redirectURL = window.env.REACT_APP_MOBILE_URL

    const redirectFunc = () => {
        window.location.replace(redirectURL);
    };

    useEffect(()=>{
        redirectFunc()
    }, [])

    const {t} = useTranslation();
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

    const Style = {
        "@media (max-width: 480px)": {}
    }

    return (
        <div className={`mobile-container flex jc-center ai-center`} style={Style}>
            <div className={`width-70 height-40 card-bg rounded-8 card-border column jc-center ai-center px-2`}>
                {/*<img src={toAbsoluteUrl('/assets/logo/logo.svg')} alt={t("title")} title={t("title")} className={`mb-2`}
                     style={{width: "50vw"}}/>
                <p className={`fs-01 mt-2 text-center`}>
                    <span className={`text-orange fs-02`}>{t("title")} </span>
                    {t("improperMobileView ")}
                </p>*/}
               <span className={`direction-ltr`}>Loading...</span>
            </div>
        </div>
    );
};

export default Radium(Mobile);
