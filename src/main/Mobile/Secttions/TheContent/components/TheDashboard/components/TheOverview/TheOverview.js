import React from "react";
import classes from "./TheOverview.module.css";
import AccordionBox from "../../../../../../../../components/AccordionBox/AccordionBox";
import {useTranslation} from "react-i18next";
import TheInformationBlock from "./components/TheInformationBlock/TheInformationBlock";


const TheOverview = () => {

    const {t} = useTranslation();

    const data = [
        {title: t("overview.lastDay"), body: <TheInformationBlock period="24h"/>},
        {title: t("overview.lastWeek"), body: <TheInformationBlock period="7d"/>},
        {title: t("overview.lastMonth"), body: <TheInformationBlock period="1m"/>},
    ];

    return (
        <div className={`container ${classes.container} card-background card-border`}>
            <AccordionBox
                title={t("overview.title")}
                content={data}
                /*safari={classes.safariFlexSize}*/
            />


        </div>
    );
};

export default TheOverview;
