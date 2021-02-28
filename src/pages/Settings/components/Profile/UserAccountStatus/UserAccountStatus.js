import React,{useState,useEffect} from 'react';
import classes from "./UserAccountStatus.module.css"
import {useTranslation} from "react-i18next";



const UserAccountStatus = () => {
    const {t} = useTranslation();

    return (
        <div className={`container card-background card-border column ${classes.container}`}>
            <div className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                <div className="row jc-start ">
                    <h3>{t('UserAccountStatus.title')}</h3>
                </div>
            </div>
            <div className={`row container ${classes.content}`}>

            </div>
        </div>
    );
};

export default UserAccountStatus;