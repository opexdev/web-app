import React, {Fragment, useEffect, useState} from "react";
import classes from "./UserAccountStatus.module.css";
import {Trans, useTranslation} from "react-i18next";
import {AccountStatusData} from "../../../../../../../../../../../../FakeData/FakeData";
import Icon from "../../../../../../../../../../../../components/Icon/Icon";
import ScrollBar from "../../../../../../../../../../../../components/ScrollBar";

const UserAccountStatus = () => {
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
            className={`width-100 card-bg card-border column ${classes.container}`}>
            <div
                className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                <div className="row jc-between ai-center">
                    <h3>{t("UserAccountStatus.title")}</h3>
                    <span
                        data-tooltip-id="opex-tooltip"
                        data-tooltip-place="right"
                        data-tooltip-float={true}
                        data-tooltip-html={`<span class="column jc-between col-100">...info</span>`}
                    >
            <Icon iconName="icon-help-circled-2 fs-04 flex" customClass={classes.iconCustomClasss}
            />
          </span>

                </div>
                <div className="row jc-center">
                    <span className="font-weight-bold">{t("UserAccountStatus.userAccountLevel1")}</span>
                </div>
            </div>
            <div className={`column width-100 ${classes.content}`}>
                <ScrollBar>
                    <table className="text-center" cellSpacing="0" cellPadding="0">
                        <thead>
                        <tr className="my-2">
                            <th className="text-red">{t("withdrawal")}</th>
                            <th className="text-green">{t("deposit")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {customData.accountStatus.map((tr, index) => (
                            <Fragment key={index}>
                                <tr>
                                    <td>
                                        <Trans
                                            i18nKey="UserAccountStatus.dailyWithdrawal"
                                            values={{
                                                amount: tr.dailyWithdrawal
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <Trans
                                            i18nKey="UserAccountStatus.dailyDeposit"
                                            values={{
                                                amount: tr.dailyDeposit
                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Trans
                                            i18nKey="UserAccountStatus.dailyWithdrawalCryptoCurrency"
                                            values={{
                                                amount: "0"
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <Trans
                                            i18nKey="UserAccountStatus.dailyWithdrawalCryptoCurrency"
                                            values={{
                                                amount: "0"
                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Trans
                                            i18nKey="UserAccountStatus.monthlyWithdrawal"
                                            values={{
                                                amount: tr.monthlyWithdrawal
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <Trans
                                            i18nKey="UserAccountStatus.monthlyDeposit"
                                            values={{
                                                amount: tr.monthlyDeposit
                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Trans
                                            i18nKey="UserAccountStatus.monthlyWithdrawalCryptoCurrency"
                                            values={{
                                                amount: "0"
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <Trans
                                            i18nKey="UserAccountStatus.monthlyDepositCryptoCurrency"
                                            values={{
                                                amount: "0"
                                            }}
                                        />
                                    </td>
                                </tr>
                            </Fragment>
                        ))}
                        <tr>
                            <td colSpan="2">
                                <Trans
                                    i18nKey="UserAccountStatus.tradesCommission"
                                    values={{
                                        amount: "0.2",
                                        num: "0.15"
                                    }}
                                /></td>
                        </tr>
                        </tbody>
                    </table>
                </ScrollBar>
            </div>
        </div>
    );
};

export default UserAccountStatus;
