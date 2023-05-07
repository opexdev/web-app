import React from "react";
import classes from "./DepositWithdraw.module.css";
import {useTranslation} from "react-i18next";
import AccordionBox from "../../../../../../../../../../components/AccordionBox/AccordionBox";
import Withdrawal from "./components/Withdrawal";
import Deposit from "./components/Deposit/Deposit";


const DepositWithdraw = () => {
  const {t} = useTranslation();

  const data = [
    {id: 1, title: t("deposit"), body: <Deposit/>},
    {id: 2, title: t("withdrawal"), body: <Withdrawal/>},
  ];

  return (
    <div
      className={`width-100 card-bg card-border column ${classes.container}`}>
      <AccordionBox
        title={t("DepositWithdraw.title")}
        content={data}
        safari={classes.safariFlexSize}
      />
    </div>
  );
};

export default DepositWithdraw;