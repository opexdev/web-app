import React from "react";
import classes from "./MyOrders.module.css";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Login} from "../../../../../../../../Routes/routes";
import {Link, useLocation} from "react-router-dom";
import OpenOrders from "./components/OpenOrders/OpenOrders";
import OrdersHistory from "./components/OrdersHistory/OrdersHistory";
import AccordionBox from "../../../../../../../../../../components/AccordionBox/AccordionBox";
import Trades from "./components/Trades/Trades";

const MyOrders = () => {
  const {t} = useTranslation();
  let location = useLocation();
  const isLogin = useSelector((state) => state.auth.isLogin)

  const LoginText = <div className="container height-100 flex ai-center jc-center">
    <Link to={Login} state={{from: location}} className="hover-text">
      {t("pleaseLogin")}
    </Link>
  </div>

  const data = [
    {id: 1, title: t("myOrders.liveOrders"), body: isLogin ? <OpenOrders/> : LoginText},
    //{id: 2, title: t("myOrders.stoppedOrder"), body: props.auth.isLogin ? StopTable : LoginText},
    {id: 3, title: t("myOrders.orderHistory"), body: isLogin ? <OrdersHistory/> : LoginText},
    {id: 4, title: t("myOrders.tradeHistory"), body: isLogin ? <Trades/> : LoginText},
  ];

  return (
    <div
      className={`container card-bg card-border column ${classes.container}`}>
      <AccordionBox
          title={t("myOrders.title")}
          content={data}
          safari={classes.safariFlexSize}
      />
    </div>
  );
};

export default MyOrders;