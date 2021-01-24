import React from 'react';
import classes from "./Order.module.css";
import AccordionBox from "../../../components/AccordionBox/AccordionBox";
import BuyOrder from "./BuyOrder"
import SellOrder from "./SellOrder";
import {useTranslation} from "react-i18next";


const Order = () => {

    const {t} = useTranslation();

    const data = [
        {id: 1 , title: t('buy') , body: <BuyOrder/>},
        {id: 2 , title: t('sell') , body: <SellOrder/>},
    ]

    return (
        <div className="py-2">
            <div className={`container card-background card-border ${classes.container}`}>
                <AccordionBox title={t('orders.title')} safari={classes.safariFlexSize} content={data}/>
            </div>
        </div>

    );
};

export default Order;