import React from "react";
import classes from "./TheTradingView.module.css";
import AccordionBox from "../../../../../../../../components/AccordionBox/AccordionBox";
import {useTranslation} from "react-i18next";
import GlobalChart
    from "../../../../../../../Browser/Sections/Content/components/Dashboard/components/TradingView/components/GlobalChart/GlobalChart";
import OpexChart
    from "../../../../../../../Browser/Sections/Content/components/Dashboard/components/TradingView/components/OpexChart/OpexChart";


const TheTradingView = () => {
    const {t} = useTranslation();

    const charts = [
        {title: t("charts.globalChart"), body: <GlobalChart/>},
        {title: t("charts.opexChart"), body: <OpexChart/>},
    ];

    return (
        <div className={`container ${classes.container} card-background card-border`}>

            <AccordionBox
                title={t("charts.title")}
                content={charts}
            />

        </div>


    );
};

export default TheTradingView;
