import React, {useState} from 'react';
import classes from './EasyOrder.module.css'
import {useTranslation} from "react-i18next";
import AccordionBox from "../../../../../../components/AccordionBox/AccordionBox";
import EasySellOrder from "./components/EasySellOrder/EasySellOrder";
import EasyOrderNew from "./components/EasyOrder/EasyOrderNew";

const EasyOrder = () => {
    const {t} = useTranslation();
    const [activeTab, setActiveTab] = useState(0);

    const data = [
        {id: 1, title: t("buy"), body: <EasyOrderNew/>},
        {id: 2, title: t("sell"), body: <EasySellOrder/>},
    ];

    return (
        <div className={`container card-bg card-border my-2 ${classes.container} width-30`}>
            <AccordionBox
                title={<div className={`width-100 row jc-between ai-center`}>
                    <span>{t("orders.title")}</span>
                </div>}
                safari={classes.safariFlexSize}
                content={data}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </div>
    );
};

export default EasyOrder;
