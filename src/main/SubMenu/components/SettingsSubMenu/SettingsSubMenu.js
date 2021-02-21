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
                    <h2>تنظیمات</h2>
                </div>
            </div>
            <div className={`column container px-1 py-2 ${classes.content}`}>
                <div className="row cursor-pointer">
                    <Icon iconName="icon-vcard text-color font-size-md-plus" customClass={classes.iconBG}/>
                    <span className="pr-05">مشخصات کاربری</span>
                </div>
                <div className="row cursor-pointer">
                    <Icon iconName="icon-lock-3 text-color font-size-md-plus" customClass={classes.iconBG}/>
                    <span className="pr-05">امنیت</span>
                </div>
                <div className="row cursor-pointer">
                    <Icon iconName="icon-tag text-color font-size-md-plus" customClass={classes.iconBG}/>
                    <span className="pr-05">شخصی سازی</span>
                </div>

            </div>
        </div>
    );
};

export default SettingsSubMenu;