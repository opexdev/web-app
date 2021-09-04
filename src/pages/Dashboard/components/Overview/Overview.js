import React from "react";
import classes from "./Overview.module.css";
import {useTranslation} from "react-i18next";
import AccordionBox from "../../../../components/AccordionBox/AccordionBox";
import InformationBlock from "./components/InformationBlock/InformationBlock";

const Overview = () => {
  const {t} = useTranslation();

  const data = [
    {title: t("overview.lastDay"), body: <InformationBlock period="24h"/>},
    {title: t("overview.lastWeek"), body: <InformationBlock period="7d"/>},
    {title: t("overview.lastMonth"), body: <InformationBlock period="1m"/>},
  ];

  return (
    <div
      className={`container card-background card-border ${classes.container}`}>
      <AccordionBox
        title={t("overview.title")}
        content={data}
        safari={classes.safariFlexSize}
      />
    </div>
  );
};


export default Overview;