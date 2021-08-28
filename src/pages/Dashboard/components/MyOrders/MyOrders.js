import React, {Fragment, useState, useEffect} from "react";
import classes from "./MyOrders.module.css";
import ScrollBar from "../../../../components/ScrollBar";
import AccordionBox from "../../../../components/AccordionBox/AccordionBox";
import moment from "moment-jalaali";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

import {
  MyOrderCurrentData,
  MyOrderStopData,
  MyOrderHistoryData,
  MyOrderTradeData,
} from "../../../../FakeData/FakeData";
import Icon from "../../../../components/Icon/Icon";
import {Login} from "../../../../routes/routes";
import {Link} from "react-router-dom";
import OpenOrders from "./components/OpenOrders/OpenOrders";
import OrdersHistory from "./components/OrdersHistory/OrdersHistory";

const MyOrders = (props) => {
  const {t} = useTranslation();
  const [openItem, setOpenItem] = useState({
    current: null,
    history: null,
    trade: null,
  });
  const [customData, setCustomData] = useState({
    current: [],
    history: [],
    trade: [],
    stop: [],
  });
  useEffect(() => {
    setCustomData({
      current: [],
      stop: MyOrderStopData(),
      history: [],
      trade: MyOrderTradeData(),
    });
  }, []);

  const StopTable = (
    <ScrollBar>
      <table className="text-center striped" cellSpacing="0" cellPadding="0">
        <thead className="th-border-y">
          <tr>
            <th className="pt-1">{t("time")}</th>
            <th>{t("date")}</th>
            <th>
              {t("volume")}({props.activePair.base})
            </th>
            <th>
              {t("pricePerUnit")}({props.activePair.quote})
            </th>
            <th>{t("totalPrice")}</th>
            <th>{t("myOrders.stoppedPrice")}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {customData.stop.map((tr, index) => (
            <tr
              key={index}
              className={tr.type === "buy" ? "text-green" : "text-red"}>
              <td>{moment(tr.timestamp).format("HH:mm:ss")}</td>
              <td>{moment(tr.timestamp).format("jYY/jMM/jDD")}</td>
              <td>{tr.volume}</td>
              <td>{tr.price}</td>
              <td>{tr.totalPrice}</td>
              <td>{tr.stopPrice}</td>
              <td>
                <Icon
                  iconName="icon-cancel text-red font-size-sm"
                  iconBG={`bg-red ${classes.iconBG} cursor-pointer`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollBar>
  );
  const TradesTable = (
    <ScrollBar>
      <table
        className="text-center double-striped"
        cellSpacing="0"
        cellPadding="0">
        <thead className="th-border-y">
          <tr>
            <th>{t("date")}</th>
            <th>{t("time")}</th>
            <th>
              {t("volume")}({props.activePair.base})
            </th>
            <th>
              {t("pricePerUnit")}({props.activePair.quote})
            </th>
            <th>{t("totalPrice")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customData.trade.map((tr, index) => (
            <Fragment key={index}>
              <tr className={tr.type === "buy" ? "text-green" : "text-red"}>
                <td>{moment(tr.timestamp).format("jYY/jMM/jDD")}</td>
                <td>{moment(tr.timestamp).format("HH:mm:ss")}</td>
                <td>{tr.volume}</td>
                <td>{tr.price}</td>
                <td>{tr.totalPrice}</td>
                {openItem.trade === index ? (
                  <td onClick={() => setOpenItem({...openItem, trade: null})}>
                    <Icon
                      iconName="icon-up-open icon-blue font-size-sm"
                      customClass={`${classes.iconBG} cursor-pointer`}
                    />
                  </td>
                ) : (
                  <td onClick={() => setOpenItem({...openItem, trade: index})}>
                    <Icon
                      iconName="icon-down-open icon-blue font-size-sm"
                      customClass={`${classes.iconBG} cursor-pointer`}
                    />
                  </td>
                )}
              </tr>
              <tr
                style={{display: openItem.trade === index ? "revert" : "none"}}>
                <td colSpan="6" className={`py-1 px-2`}>
                  <div
                    className="row jc-around  ai-center"
                    style={{width: "100%"}}>
                    <p className="col-46 row jc-between">
                      {t("myOrders.orderId")} : <span>{tr.orderId}</span>
                    </p>
                    <p className="col-46 row jc-between">
                      {t("myOrders.tradeId")} : <span>{tr.tradeId}</span>
                    </p>
                  </div>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </ScrollBar>
  );

  const LoginText = <div className="container height-100 flex ai-center jc-center">
    <Link to={Login} className="hover-text">
      {t("pleaseLogin")}
    </Link>
  </div>

  const data = [
    {id: 1, title: t("myOrders.aliveOrder"), body: props.auth.isLogin ? <OpenOrders/> : LoginText},
    //{id: 2, title: t("myOrders.stoppedOrder"), body: props.auth.isLogin ? StopTable : LoginText},
    {id: 3, title: t("myOrders.orderHistory"), body: props.auth.isLogin ? <OrdersHistory/> : LoginText},
    {id: 4, title: t("myOrders.orders"), body: props.auth.isLogin ?TradesTable : LoginText},
  ];


  return (
    <div
      className={`container card-background card-border column ${classes.container}`}>
      <AccordionBox
          title={t("myOrders.title")}
          content={data}
          safari={classes.safariFlexSize}
      />


    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activePair: state.global.activePair,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(MyOrders);
