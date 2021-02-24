import React,{useState,useEffect} from 'react';
import classes from "./PersonalizationForm.module.css"
import {useTranslation} from "react-i18next";



const PersonalizationForm = () => {
    const {t} = useTranslation();

    return (
        <div className="container py-2">
            <div className={` card-background card-border column ${classes.container}`}>
                <div className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                    <div className="row jc-start ">
                        <h3>PersonalizationForm</h3>
                    </div>
                </div>
                <div className={`row container ${classes.content}`}>
                    PersonalizationForm
                </div>
            </div>
        </div>
    );
};

export default PersonalizationForm;