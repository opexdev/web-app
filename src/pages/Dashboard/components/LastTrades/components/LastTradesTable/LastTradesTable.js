import React from "react";
import classes from "./LastTradesTable.module.css";
import ScrollBar from "../../../../../../components/ScrollBar";
import {useTranslation} from "react-i18next";
import moment from "moment-jalaali";
import {connect} from "react-redux";
import {BN} from "../../../../../../utils/utils";

const LastTradesTable = (props) => {
  const {t} = useTranslation();
  const {activePair ,data} = props
  return (
    <div className={`column container ${classes.container}`}>
      <ScrollBar>
        <table className="text-center" cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <th>{t("date")}</th>
              <th>{t("time")}</th>
              <th>
                {t("volume")}({activePair.base})
              </th>
              <th>
                {t("price")}({activePair.quote})
              </th>
              <th>{t("totalPrice")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((tr, index) => {
              const pricePerUnit = new BN(tr.price)
              const amount = new BN(tr.qty)
              const totalPrice = pricePerUnit.multipliedBy(amount)

              return (
                <tr key={index} style={{color: tr.isBuyerMaker === true ? "var(--textGreen)" : "var(--textRed)",}}>
                  <td style={{direction: "ltr"}}>
                    {moment(tr.time).format("jYY/jMM/jDD")}
                  </td>
                  <td style={{direction: "ltr"}}>
                    {moment(tr.time).format("HH:mm:ss")}
                  </td>
                  <td>{amount.decimalPlaces(activePair.baseMaxDecimal).toFormat()}</td>
                  <td>{pricePerUnit.decimalPlaces(activePair.quoteMaxDecimal).toFormat()}</td>
                  <td>{totalPrice.decimalPlaces(activePair.quoteMaxDecimal).toFormat()}</td>
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
