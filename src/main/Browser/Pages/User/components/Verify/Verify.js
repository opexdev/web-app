import React, {useEffect, useState} from 'react';
import classes from '../../User.module.css'
import {images} from "../../../../../../assets/images";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Login} from "../../../../Routes/routes";
import Button from "../../../../../../components/Button/Button";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const Verify = () => {

    const {t} = useTranslation()

    let navigate = useNavigate();
    const isLogin = useSelector((state) => state.auth.isLogin)
    if (isLogin) navigate("/", {replace: true});

    const result = new URLSearchParams(useLocation().search).get("result");

    const [status, setStatus] = useState()

    useEffect(() => {

        if (result === "SUCCEED") {
            setStatus(true)
        }
        if (result === "FAILED") {
            setStatus(false)
        }
        if (result !== "SUCCEED" && result !== "FAILED") {
            navigate("/", {replace: true});
        }

    }, []);

    return (
        <div className={`${classes.content} ${status ? "text-green" : "text-red"} card-border column jc-around ai-center py-2`}>
            <img src={status ? images.approve : images.reject} alt={result} className={`floating`}/>
            <div className={`column jc-center ai-center`}>
                <span>{status ? t("userPage.success") : t("userPage.failed")}</span>
            </div>
            {status && <Link to={Login}>
                <Button
                    buttonClass={`${classes.thisButton} px-3`}
                    buttonTitle={t("signIn")}
                />
            </Link>}
        </div>
    );
};

export default Verify;