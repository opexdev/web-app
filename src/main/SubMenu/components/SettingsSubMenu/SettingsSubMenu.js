import React,{useState,useEffect} from 'react';
import classes from "./SettingsSubMenu.module.css"
import {useTranslation} from "react-i18next";
import Icon from "../../../../components/Icon/Icon";



const SettingsSubMenu = () => {
    const {t} = useTranslation();

    return (
        <div className={`container card-background column ${classes.container}`}>
            <div className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                <div className="row jc-start ">
                    <h3>تنظیمات</h3>
                </div>
            </div>
            <div className={`column container ${classes.content}`}>
                <div className="row">
                    <Icon iconName="icon-vcard text-color font-size-md" customClass={classes.iconBG}/>
                    <span>مشخصات کاربری</span>
                </div>
                <div className="row">
                    <Icon iconName="icon-lock-3 text-color font-size-md" customClass={classes.iconBG}/>
                    <span>امنیت</span>
                </div>
                <div className="row">
                    <Icon iconName="icon-tag text-color font-size-md" customClass={classes.iconBG}/>
                    <span>شخصی سازی</span>
                </div>

            </div>
        </div>
    );
};

export default SettingsSubMenu;