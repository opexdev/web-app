import React from 'react';
import classes from "./SMWallet.module.css"
import {images} from "../../../../assets/images"
import {useTranslation} from "react-i18next";




const SMWallet = (props) => {

    const {t} = useTranslation();

    return (
        <div className={`container card-background ${classes.container}`}>

            <span>دارایی ها</span>

        </div>
    );
};

export default SMWallet;