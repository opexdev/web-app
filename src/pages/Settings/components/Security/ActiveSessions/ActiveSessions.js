import React,{useState,useEffect} from 'react';
import classes from "./ActiveSessions.module.css"
import {useTranslation} from "react-i18next";



const ActiveSessions = () => {
    const {t} = useTranslation();

    return (
        <div className={`container card-background card-border column ${classes.container}`}>
            <div className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                <div className="row jc-start ">
                    <h3>ActiveSessions</h3>
                </div>
            </div>
            <div className={`row container ${classes.content}`}>
                ActiveSessions
            </div>
        </div>
    );
};

export default ActiveSessions;