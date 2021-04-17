import React, {useState, useEffect, Fragment} from "react";
import classes from "./UserAccountStatus.module.css";
import {useTranslation} from "react-i18next";
import Icon from "../../../../../components/Icon/Icon";
import ScrollBar from "../../../../../components/ScrollBar";
import {AccountStatusData} from "../../../../../FakeData/FakeData";

const UserAccountStatus = (props) => {
  const {t} = useTranslation();

  const [customData, setCustomData] = useState({
    accountStatus: [],
  });
  useEffect(() => {
    setCustomData({
      accountStatus: AccountStatusData(),
    });
  }, []);

  return (
    <div
      className={`container card-background card-border column ${classes.container}`}>
      <div
        className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
        <div className="row jc-between ai-center">
          <h3>{t("UserAccountStatus.title")}</h3>
          <Icon
            iconName="icon-help-circled-2 font-size-md-plus flex"
            customClass={classes.iconCustomClasss}
          />
        </div>
        <div className="row jc-center">
          <span className="font-weight-bold">سطح کاربری 1</span>
        </div>
      </div>
      <div className={`column container ${classes.content}`}>
        <ScrollBar>
          <table className="text-center" cellSpacing="0" cellPadding="0">
            <thead>
              <tr className="my-2">
                <th className="text-red">برداشت</th>
                <th className="text-green">واریز</th>
              </tr>
            </thead>
            <tbody>
              {customData.accountStatus.map((tr, index) => (
                <Fragment key={index}>
                  <tr>
                    <td>
                      برداشت روزانه ارزی: معادل{" "}
                      <span>{tr.dailyWithdrawal} </span>تومان از{" "}
                      <span>20،000،000 تومان</span>
                    </td>
                    <td>
                      واریز روزانه ارزی: معادل <span>{tr.dailyDeposit} </span>
                      تومان از <span>20،000،000 تومان</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      برداشت روزانه رمزارزی: معادل <span>0 </span>تومان از{" "}
                      <span>20،000،000 تومان</span>
                    </td>
                    <td>
                      واریز روزانه رمزارزی: معادل <span>0 </span>تومان از{" "}
                      <span>20،000،000 تومان</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      برداشت ماهانه ارزی: معادل{" "}
                      <span>{tr.monthlyWithdrawal} </span>تومان از{" "}
                      <span>20،000،000 تومان</span>
                    </td>
                    <td>
                      واریز ماهانه ارزی: معادل <span>{tr.monthlyDeposit} </span>
                      تومان از <span>20،000،000 تومان</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      برداشت ماهانه رمزرزی: معادل <span>0 </span>تومان از{" "}
                      <span>20،000،000 تومان</span>
                    </td>
                    <td>
                      واریز ماهانه رمزارزی: معادل <span>0 </span>تومان از{" "}
                      <span>20،000،000 تومان</span>
                    </td>
                  </tr>
                </Fragment>
              ))}
              <tr>
                <td colSpan="2">
                  کارمزد معاملات: <span>0.2 تیکر، </span>0.15
                </td>
              </tr>
            </tbody>
          </table>
        </ScrollBar>
      </div>
    </div>
  );
};

export default UserAccountStatus;
