import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import MainMenu from "../../main/MainMenu/MainMenu";
import {isSafari} from "react-device-detect";
import i18n from "i18next";
import ReactTooltip from "react-tooltip";

const TechnicalChart = (props) => {
  const [ltr, setLtr] = useState(false);
  useEffect(() => {
    i18n.language !== "fa" ? setLtr(true) : setLtr(false);
    i18n.on("languageChanged", (lng) => {
      lng !== "fa" ? setLtr(true) : setLtr(false);
    });
  }, []);

  return (
    <div
      className={`row  ${props.isDark ? "dark" : ""} ${ltr ? "ltr" : "rtl"} ${
        isSafari ? "" : "user-select"
      }`}>
      <ReactTooltip data-html={true} data-effect="float" />
      <MainMenu />
      <div
        className="column content"
        style={{
          width: "100%",
          marginRight: "5%",
          backgroundColor: "var(--cardBody)",
        }}></div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoading: state.global.isLoading,
    isDark: state.global.isDark,
    isLogin: state.auth.isLogin,
  };
};
export default connect(mapStateToProps, null)(TechnicalChart);
