import classes from "../DepositWithdraw.module.css";
import TextInput from "../../../../../../../../../components/TextInput/TextInput";
import Button from "../../../../../../../../../components/Button/Button";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {sendWithdrawReq} from "../../../api/wallet";
import {BN} from "../../../../../../../../../utils/utils";

const Withdrawal = () => {
    const {t} = useTranslation();
    const {id} = useParams();
    const accessToken = useSelector(state => state.auth.accessToken);
    const wallets = useSelector(state => state.auth.wallets);
    const tradeFee = useSelector(state => state.auth.tradeFee);

    const [amount, setAmount] = useState({
        value: "0",
        alert: null,
    });
    const [address, setAddress] = useState({
        value: "",
        alert: null,
    });

    const sendWithdrawHandler = () => {
        sendWithdrawReq(accessToken,amount.value, id, address.value, new BN(amount.value).multipliedBy(tradeFee[id]).toString()).then(r => console.log(r))
    }

    return (
        <div className={`px-1 py-2 column jc-between ${classes.content}`}>
            <div className="container row jc-between">
                <div className="col-30 column jc-between">
                    <TextInput
                        lead={t('volume') + " " + t("currency." + id)}
                        value={amount.value}
                        alert={amount.alert}
                        onchange={(e) =>
                            setAmount({...amount, value: e.target.value})
                        }
                        type="text"
                    />
                    <span className="pt-1">
                        {t("DepositWithdrawTx.freeWallet")}: <span>{wallets[id].free} {t("currency." + id)}</span>
                    </span>
                    <span>
                        {t('DepositWithdrawTx.minWithdraw')}: <span>0.001 {t("currency." + id)}</span>
                    </span>
                    <span>
                        {t('DepositWithdrawTx.maxWithdraw')}: <span>2 {t("currency." + id)}</span>
                    </span>
                    <span>
                        {t('DepositWithdrawTx.maxMonthWithdraw')}: <span>2 {t("currency." + id)}</span>
                    </span>
                </div>
                <div className="col-70 pr-1 column jc-between" style={{height: "20vh"}}>
                    <div className="column">
                        <TextInput
                            lead={t("DepositWithdrawTx.destAddress") + " " + t("currency." + id)}
                            customClass={classes.withdrawalInput}
                            type="text"
                            value={address.value}
                            alert={address.alert}
                            onchange={(e) =>
                                setAddress({...address, value: e.target.value})
                            }
                        />
                        <span className="pt-05 text-end">{t('DepositWithdrawTx.withdrawWarn')}</span>
                    </div>
                    <div className="row jc-between ai-center">
                        <div className="column">
                            <span>
                                {t('commission')}: <span>{ amount.value ? new BN(amount.value).multipliedBy(tradeFee[id]).toFormat() : 0 }</span>
                            </span>
                            <span>
                                {t('DepositWithdrawTx.reqAmount')}: <span>{ amount.value ? new BN(amount.value) - BN(amount.value).multipliedBy(tradeFee[id]).toFormat() : 0}</span>
                            </span>
                        </div>

                        <Button
                            buttonClass={`${classes.thisButton} ${classes.withdrawal}`}
                            buttonTitle={t('DepositWithdrawTx.withdrawReqSubmit')}
                            onClick={sendWithdrawHandler}
                        />
                    </div>
                </div>
            </div>
            <div>
        <span>
          باتوجه به ملاحضات امنیتی ممکن است انتقال به حساب با کمی تاخیر صورت
          بگیرد. می توانید وضعیت برداشت را در همین صفحه از بخش ترکنش های{" "}
            <span className="text-orange">{`${t("DepositWithdraw.title")}`}</span>{" "}
            ببینید.
        </span>
            </div>
        </div>
    )
};

export default Withdrawal;