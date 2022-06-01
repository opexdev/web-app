import {useDispatch} from "react-redux";
import useQuery from "../../Hooks/useQuery";
import {loadConfig} from "../../store/actions";
import {useTranslation} from "react-i18next";
import Button from "../Button/Button";
import classes from "../../pages/User/User.module.css";
import React from "react";
import {images} from "../../assets/images";

const FullWidthError = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const query = useQuery();

    const tryLoadConfig = () => {
        const impersonate = query.get("impersonate");
        dispatch(loadConfig(impersonate))
    }

    const thisButton = {
        background: 'var(--bgGreen)',
        color: '#000'
    }

    const thisContainer = {
        backgroundImage: `url("${images.spaceStar}")`,
    }

    const thisContent = {
        position: 'fixed',
        top: '27.5%',
        left: '37.5%',
        width: '25%',
        height: '45%',
        backgroundColor: 'var(--cardBodyAlpha)',
    }

    return (
        <div className={`container ${classes.container} move-image flex jc-center ai-center text-red`} style={thisContainer}>
            <div className={`column jc-around ai-center card-border py-1`} style={thisContent}>
                <img src={images.reject} alt="error" className={`img-lg-plus floating`}/>
                <span>{t("errorPage.errorText")}</span>
                <Button
                    buttonStyle={thisButton}
                    buttonClass={`px-2`}
                    buttonTitle={t("errorPage.reload")}
                    onClick={tryLoadConfig}
                />
            </div>
        </div>
    );
};
export default FullWidthError;
