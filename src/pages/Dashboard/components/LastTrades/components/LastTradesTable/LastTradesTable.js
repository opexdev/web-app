import React from "react";
import classes from "./LastTradesTable.module.css";
import ScrollBar from "../../../../../../components/ScrollBar";
import {useTranslation} from "react-i18next";
import moment from "moment-jalaali";
import {connect} from "react-redux";

const LastTradesTable = (props) => {
  const {t} = useTranslation();
  return (
    <div className={`column container ${classes.container}`}>
      <ScrollBar>
        <table className="text-center" cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <th>{t("date")}</th>
              <th>{t("time")}</th>
              <th>
                {t("volume")}({props.activePair.base})
              </th>
              <th>
                {t("price")}({props.activePair.quote})
              </th>
              <th>{t("totalPrice")}</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((tr, index) => {
              let totalPrice = parseFloat((tr.price * tr.qty).toFixed(6));
              return (
                <tr
                  key={index}
                  style={{
                    color:
                      tr.isBuyerMaker === true
                        ? "var(--textGreen)"
                        : "var(--textRed)",
                  }}>
                  <td style={{direction: "ltr"}}>
                    {moment(tr.time).format("jYY/jMM/jDD")}
                  </td>
                  <td style={{direction: "ltr"}}>
                    {moment(tr.time).format("HH:mm:ss")}
                  </td>
                  <td>{tr.qty}</td>
                  <td>{tr.price}</td>
                  <td>{totalPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </ScrollBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activePair: state.global.activePair,
  };
};

export default connect(mapStateToProps, null)(LastTradesTable);
