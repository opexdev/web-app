import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import classes from "./LastTrades.module.css";
import {getLastTrades} from "./api/lastTrades";
import Error from "../../../../components/Error/Error";
import Loading from "../../../../components/Loading/Loading";
import useInterval from "../../../../Hooks/useInterval";
import {setLastTradePrice} from "../../../../store/actions/global";
import LastTradesTable from "./components/LastTradesTable/LastTradesTable";

const LastTrades = (props) => {
  const {t} = useTranslation();
  const {activePair,setLastTradePrice} = props

  const [lastTrades, setLastTrades] = useState([]);
  const [error, setError] = useState(false);


const getLastTradesData = async () =>{
  const lastTradesReq = await getLastTrades(activePair);
  if (lastTradesReq.status === 200) {
    setLastTrades(lastTradesReq.data)
    if(lastTradesReq.data.length) setLastTradePrice(lastTradesReq.data[0].price)
  } else {
    setError(true)
  }
}

  useEffect(() => {
    getLastTradesData();
  }, [activePair]);

  useInterval(async () => {
    await getLastTradesData();
  }, activePair ? 1500 : null);


  const content = () => {
    if (lastTrades.length === 0) {
      return <Loading/>
    }
    if (lastTrades.length > 0) {
      return <LastTradesTable data={lastTrades} />
    }
    if (error) {
      return <Error/>
    }
  }

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
        {content()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activePair: state.global.activePair,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLastTradePrice: (lastTradePrice) => dispatch(setLastTradePrice(lastTradePrice)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LastTrades);
