import React,{useState,useEffect} from 'react';
import classes from "./ActiveSessions.module.css"
import {useTranslation} from "react-i18next";



const ActiveSessions = () => {
    const {t} = useTranslation();

    return (
        <div className="container py-2">
            <div className={` card-background card-border column ${classes.container}`}>
                <div className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                    <div className="row jc-start ">
                        <h3>{t('ActiveSessions.title')}</h3>
                    </div>
                </div>
                <div className={`row container ${classes.content}`}>
                    {t('ActiveSessions.title')}
                </div>
            </div>
        </div>
    );
};

export default ActiveSessions;