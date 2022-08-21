import classes from "../DepositWithdraw.module.css";
import TextInput from "../../../../../../../../../../../components/TextInput/TextInput";
import Button from "../../../../../../../../../../../components/Button/Button";
import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {Trans, useTranslation} from "react-i18next";
import {BN, parsePriceString} from "../../../../../../../../../../../utils/utils";
import {toast} from "react-hot-toast";
import {images} from "../../../../../../../../../../../assets/images";
import NumberInput from "../../../../../../../../../../../components/NumberInput/NumberInput";
import ReactTooltip from "react-tooltip";
import {
    getUserAccount,
    getUserAssets,
    getUserAssetsEstimatedValue,
    getWithdrawTxs,
    sendWithdrawReq
} from "js-api-client";
import {useGetUserAccount} from "../../../../../../../../../../../queries/hooks/useGetUserAccount";
import {
    useGetKycStatus,
    useGetUserAssets,
    useGetUserAssetsEstimatedValue,
    useWithdrawTxs
} from "../../../../../../../../../../../queries";

const Withdrawal = () => {
    const {t} = useTranslation();
    const {id} = useParams();

    const {refetch: getUserAccount} = useGetUserAccount();
    const {refetch: getWithdrawTxs} = useWithdrawTxs(id);
    const {refetch: getUserAssets} = useGetUserAssets("IRT");
    const {refetch: getUserAssetsEstimatedValue} = useGetUserAssetsEstimatedValue("IRT");

    const {data: userAccount} = useGetUserAccount()
    const freeAmount = userAccount?.wallets[id]?.free || 0
    const tooltip = useRef()

    useEffect(() => {
        ReactTooltip.rebuild();
    }, []);

    const [amount, setAmount] = useState({value: 0, error: []});
    const [address, setAddress] = useState({value: "", error: []});
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setAmount({value: 0, error: []})
        setAddress({value: "", error: []})
        validation()
    }, [id]);

    const network = () => {
        switch (id) {
            case  "BTC":
                return 'BTC Network';
            case "ETH":
                return 'mainnet';
            default:
                return id + " network";
        }
    };
    const calculateFee = () => {
        switch (id) {
            case "BTC":
                return 0.00035;
            case "TBTC":
                return 0.00035;
            case "TETH":
                return 0.005;
            case "ETH":
                return 0.005;
            case "USDT":
                return 10;
            default:
                return 0.01;
        }
    };

    const validation = () => {
        if (new BN(amount.value).isGreaterThan(freeAmount)) {
            return t('DepositWithdraw.noInventory')
        }
        if (!(new BN(amount.value).minus(new BN(calculateFee(id))).isGreaterThan(0))) {
            return t('DepositWithdraw.allowableWithdraw')
        }
        if (address.value.length <= 0) {
            return t('DepositWithdraw.fillAddress')
        }
    }

    const sendWithdrawHandler = async () => {
        if(isLoading) return
        setIsLoading(true)
        sendWithdrawReq(amount.value, id, address.value, calculateFee(id), network(id))
            .then(() => {
                setAmount({value: 0, error: []})
                setAddress({value: "", error: []})
                toast.success(<Trans
                    i18nKey="DepositWithdrawTx.success"
                    values={{
                        asset: t("currency." + id),
                        amount: amount.value,
                    }}
                />);
                getUserAccount()
                getWithdrawTxs()
                getUserAssets()
                getUserAssetsEstimatedValue()
            })
            .catch(() => {
                toast.error(t('error'));
            })
            .finally(() => setIsLoading(false))
    }

    const submitButtonTextHandler = () => {
        if (isLoading) return <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange}
                                   alt="linearLoading"/>
        return t('DepositWithdrawTx.withdrawReqSubmit')
    }

    const fillByWallet = () => {
        setAmount({
            value: freeAmount,
            error: []
        })
    };

    const fillByMinWithdraw = () => {
        setAmount({
            value: new BN(calculateFee(id)).multipliedBy(1.1).toString(),
            error: []
        })
    };

    const enableButton = !(new BN(amount.value).minus(new BN(calculateFee(id))).isGreaterThan(0)) || new BN(amount.value).isGreaterThan(freeAmount) || address.value.length <= 0
    useEffect(() => {
        ReactTooltip.hide(tooltip.current)
    }, [enableButton]);


    if (id === "IRT") {
        return <div className={`flex jc-center ai-center px-1 py-2`} style={{height: "100%"}}>
            <h3>{t("comingSoon")}</h3>
        </div>
    }

    return (
        <div className={`px-1 py-2 column jc-between ${classes.content}`}>
            <div className="container row jc-between height-100">
                <div className="col-30 column jc-between">
                    <NumberInput
                        lead={t('volume') + " " + t("currency." + id)}
                        value={amount.value.toString()}
                        alerts={amount.error}
                        customClass={classes.withdrawNumberInput}
                        onchange={(e) =>
                            setAmount({...amount, value: parsePriceString(e.target.value)})
                        }
                        type="text"
                    />
                    <span>
                        {t("DepositWithdrawTx.freeWallet")}: <span className={`hover-text cursor-pointer`}
                                                                   onClick={() => {
                                                                       fillByWallet()
                                                                   }}>{freeAmount} {t("currency." + id)}</span>
                    </span>
                    <span>
                        {t('DepositWithdrawTx.minWithdraw')}: <span className={`hover-text cursor-pointer`}
                                                                    onClick={() => {
                                                                        fillByMinWithdraw()
                                                                    }}>{new BN(calculateFee(id)).multipliedBy(1.1).toString()} {t("currency." + id)}</span>
                    </span>
                    <span>
                        {t('DepositWithdrawTx.maxWithdraw')}: <span>2 {t("currency." + id)}</span>
                    </span>
                    <span>
                        {t('DepositWithdrawTx.maxMonthWithdraw')}: <span>2 {t("currency." + id)}</span>
                    </span>
                </div>
                <div className="col-70 pr-1 column jc-between">
                    <div className="column">
                        <TextInput
                            lead={t("DepositWithdrawTx.destAddress") + " " + t("currency." + id)}
                            customClass={classes.withdrawalInput}
                            type="text"
                            value={address.value}
                            alerts={address.error}
                            onchange={(e) => setAddress({...address, value: e.target.value})}
                        />
                        <span className="pt-05 text-end">{t('DepositWithdrawTx.withdrawWarn')}</span>
                    </div>
                    <div className="row jc-between ai-center">
                        <div className="column">
                            <span>
                                {t('commission')}: <span
                                className={`text-orange`}>{amount.value ? calculateFee(id) : 0} </span>
                                <span>{t("currency." + id)}</span>
                            </span>
                            <span>
                                {t('DepositWithdrawTx.reqAmount')}: <span className={`text-green`}>
                                {new BN(amount.value).minus(new BN(calculateFee(id))).isGreaterThan(0) ? new BN(amount.value).minus(new BN(calculateFee(id))).toFormat() : 0}
                            </span> <span>{t("currency." + id)}</span>
                            </span>
                        </div>
                        <span
                            ref={tooltip}
                            style={{width: "40%"}}
                            data-html={true}
                            data-place="top"
                            data-effect="float"
                            data-tip={enableButton ? `<span class="column jc-between col-100 text-red">${validation()}</span>` : ""}
                        >
                            <Button
                                buttonClass={`${classes.thisButton} ${classes.withdrawal} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                                buttonTitle={submitButtonTextHandler()}
                                disabled={!(new BN(amount.value).minus(new BN(calculateFee(id))).isGreaterThan(0)) || new BN(amount.value).isGreaterThan(freeAmount) || address.value.length <= 0}
                                onClick={sendWithdrawHandler}/>
                            </span>
                    </div>
                </div>
            </div>
            <div className="pt-1">
                <span>{t('DepositWithdraw.securityConsiderations')}</span>
            </div>
        </div>
    )
};

export default Withdrawal;