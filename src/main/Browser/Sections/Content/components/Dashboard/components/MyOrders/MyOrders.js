import React from "react";
import classes from "./MyOrders.module.css";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {Login} from "../../../../../../../../routes/routes";
import {Link} from "react-router-dom";
import OpenOrders from "./components/OpenOrders/OpenOrders";
import OrdersHistory from "./components/OrdersHistory/OrdersHistory";
import AccordionBox from "../../../../../../../../components/AccordionBox/AccordionBox";
import Trades from "./components/Trades/Trades";

const MyOrders = (props) => {
  const {isLogin}= props
  const {t} = useTranslation();
/*  const [openItem, setOpenItem] = useState({
    current: null,
    history: null,
    trade: null,
  });
  const [customData, setCustomData] = useState({
    current: [],
    history: [],
    trade: [],
    stop: [],
  });*/

/*  const StopTable = (
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
  );*/


  const LoginText = <div className="container height-100 flex ai-center jc-center">
    <Link to={Login} className="hover-text">
      {t("pleaseLogin")}
    </Link>
  </div>
  const ComingSoon = <div className="container height-100 flex ai-center jc-center">
    <span>
      {t("comingSoon")}
    </span>
  </div>

  const data = [
    {id: 1, title: t("myOrders.aliveOrder"), body: isLogin ? <OpenOrders/> : LoginText},
    //{id: 2, title: t("myOrders.stoppedOrder"), body: props.auth.isLogin ? StopTable : LoginText},
    {id: 3, title: t("myOrders.orderHistory"), body: isLogin ? <OrdersHistory/> : LoginText},
    {id: 4, title: t("myOrders.orders"), body: isLogin ? <Trades/> : LoginText},
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
    activePair: state.exchange.activePair,
    isLogin: state.auth.isLogin,
  };
};

export default connect(mapStateToProps, null)(MyOrders);