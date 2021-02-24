import React  from 'react';
import classes from "./DepositWithdraw.module.css"
import AccordionBox from "../../../components/AccordionBox/AccordionBox";
import {useTranslation} from "react-i18next";


const DepositWithdraw = (props) => {

    const {t} = useTranslation();

    const data = [
        {id: 1, title: t('deposit'), body: t('deposit') },
        {id: 2, title: t('withdrawal'), body: t('withdrawal') },
        {id: 3, title: t('transfer'), body: t('transfer') },
    ]

    return (
        <div className={`container card-background card-border column ${classes.container}`}>
            <AccordionBox title={t('DepositWithdraw.title')} content={data} safari={classes.safariFlexSize}/>
        </div>
    );
};

export default DepositWithdraw;
