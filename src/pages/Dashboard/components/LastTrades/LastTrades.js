import React, {useState, useEffect} from "react";
import classes from "./LastTrades.module.css";
import LastTradesTable from "./components/LastTradesTable/LastTradesTable";
import {useTranslation} from "react-i18next";
import {lastTradesData} from "../../../../FakeData/FakeData";
import axios from "axios";
import {connect} from "react-redux";

const LastTrades = (props) => {
  const {t} = useTranslation();

  const [lastTradesData, setLastTradesData] = useState({
    price: "",
    qty: "",
    quoteQty: "",
    time: "",
    isBuyerMaker: "",
    isBestMatch: "",
  });

  const getLlastTradesData = (activePair) => {
    const axiosInstance = axios.create({
      //proxy: {host:"217.97.101.134",port:80},
      baseURL: "https://api.binance.com",
      timeout: 5000,
      headers: {"X-Custom-Header": "foobar"},
    });
    axiosInstance
      .get("/api/v3/trades", {
        params: {
          symbol:
            props.activePair.base +
            (props.activePair.quote === "IRT"
              ? "USDT"
              : props.activePair.quote),
          limit: 500,
        },
      })
      .then(function (response) {
        //console.log("lastTrades Response : " , response);
        setLastTradesData(response.data);
      })
      .catch(function (error) {
        //console.log("lastTrades Error : " , error);
        clearInterval();
      })
      .then(function () {

      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLlastTradesData(props.activePair);
    }, 2000);
    return () => clearInterval(interval);
  }, [props.activePair]);

  return (
    <div
      className={`container card-background card-border column ${classes.container}`}>
      <div
        className={`column border-bottom jc-center card-header-bg ${classes.header}`}>
        <div className="row jc-start ">
          <h3>{t("LastTrades.title")}</h3>
        </div>
      </div>
      <div className={`row container ${classes.content}`}>
        {lastTradesData.price !== "" ? (
          <LastTradesTable data={lastTradesData} />
        ) : (
          <div className="container flex ai-center jc-center flashit">
            در حال دریافت اطلاعات...
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activePair: state.global.activePair,
  };
};

export default connect(mapStateToProps, null)(LastTrades);
