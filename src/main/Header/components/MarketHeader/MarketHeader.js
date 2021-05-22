import React, {Fragment, useEffect, useState} from "react";
import classes from "./MarketHeader.module.css";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {setLogoutInitiate} from "../../../../store/actions";
import Icon from "../../../../components/Icon/Icon";
import axios from "axios";


const MarketHeader = (props) => {
  const {t} = useTranslation();

  const [marketHeaderData, setMarketHeaderData] = useState({
    price: null,
  });

  const getMarketHeaderData = (activePair) => {
    const axiosInstance = axios.create({
      //proxy: {host:"217.97.101.134",port:80},
      baseURL: "https://api.binance.com",
      timeout: 5000,
      headers: {"X-Custom-Header": "foobar"},
    });
    axiosInstance
      .get("/api/v3/ticker/price", {
        params: {
          symbol:
            props.activePair.base +
            (props.activePair.quote === "IRT"
              ? "USDT"
              : props.activePair.quote),
        },
      })
      .then(function (response) {
        //console.log("headerData : " , response.data);
        setMarketHeaderData(response.data);
      })
      .catch(function (error) {
        //console.log("Error : " , error);
        //setMarketHeaderData( )
        clearInterval();
      })
      .then(function () {

      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getMarketHeaderData(props.activePair);
    }, 2000);
    return () => clearInterval(interval);
  }, [props.activePair]);

  return (
    <Fragment>
      <div className={`column ai-start`}>
        <h2 className="mb-05">{t(`pair.${props.activePair.pair}`)}</h2>
        <p>
          {t("header.lastPrice")}:{" "}
          <span>
            {marketHeaderData.price !== null ? (
              marketHeaderData.price
            ) : (
              <span className="flashit">در حال دریافت اطلاعات...</span>
            )}
          </span>{" "}
          {marketHeaderData.price === null
            ? ""
            : t("currency." + props.activePair.quote)}
        </p>
      </div>
      <div className={`column ai-center`}>
        <p className="mb-05">{t("header.availableBalance")}</p>
        <div className={`row ai-center ${classes.inventory}`}>
          <div className="flex ai-center">
            <Icon
              iconName="icon-plus icon-white font-size-sm flex"
              customClass={`mx-05 ${classes.iconBG}`}
            />
            <span>{props.auth.wallet[props.activePair.base]}</span>
            <span>{t("currency." + props.activePair.base)}</span>
          </div>
          <div className="flex ai-center">
            <span>{props.auth.wallet[props.activePair.quote]}</span>
            <span>{t("currency." + props.activePair.quote)}</span>
            <Icon
              iconName="icon-plus icon-white font-size-sm flex"
              customClass={`mx-05 ${classes.iconBG}`}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    activePair: state.global.activePair,
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(setLogoutInitiate()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketHeader);
