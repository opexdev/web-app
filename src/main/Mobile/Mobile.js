import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadConfig} from "../../store/actions";
import "./Mobille.css";
import FullWidthLoading from "../../components/FullWidthLoading/FullWidthLoading";
import i18n from "i18next";
import Radium from "radium";
import Button from "../../components/Button/Button";


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

    const Style = {
        "@media (max-width: 480px)": {

        }
    }

    return (
        <div className={`mobile-container flex jc-center ai-center`} style={Style}>

            <Button
                buttonClass={`mobile-button`}
                buttonTitle="Click To Open Mobile APP"
            />

        </div>
    );
};

export default Radium(Mobile);
