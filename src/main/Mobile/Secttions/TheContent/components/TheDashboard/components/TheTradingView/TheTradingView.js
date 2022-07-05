import React from "react";
import classes from "./TheTradingView.module.css";
import AccordionBox from "../../../../../../../../components/AccordionBox/AccordionBox";
import {useTranslation} from "react-i18next";
import MarketChart
    from "../../../../../../../Browser/Pages/UserPanel/Sections/Content/components/Dashboard/components/TradingView/components/MarketChart/MarketChart";

const TheTradingView = () => {
    const {t} = useTranslation();

    const charts = [
        {title: t("charts.globalChart"), body: <MarketChart/>},
        {title: t("charts.opexChart"), body: <MarketChart type="Opex"/>},
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