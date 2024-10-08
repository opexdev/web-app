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
import {sendWithdrawReq} from "js-api-client";
import {useGetUserAccount} from "../../../../../../../../../../../queries/hooks/useGetUserAccount";
import {
    useGetCurrencyInfo,
    useGetUserAssets,
    useGetUserAssetsEstimatedValue, useGetWithdrawHistory,
    useWithdrawTxs
} from "../../../../../../../../../../../queries";
import Loading from "../../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../../components/Error/Error";

const Withdrawal = () => {
    const {t} = useTranslation();
    const {id} = useParams();

    const [amount, setAmount] = useState({value: 0, error: []});
    const [networkName, setNetworkName] = useState({value: 0, error: []});
    const [address, setAddress] = useState({value: "", error: []});
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setNetworkName({value: 0, error: []})
        setAmount({value: 0, error: []})
        setAddress({value: "", error: []})
        validation()
    }, [id]);

    const {refetch: getUserAccount} = useGetUserAccount();
    /*const {refetch: getWithdrawTxs} = useWithdrawTxs(id);*/
    const {refetch: getUserAssets} = useGetUserAssets("IRT");
    const {refetch: getUserAssetsEstimatedValue} = useGetUserAssetsEstimatedValue("IRT");

    const query = {
        "currency": id, // optional
        "category": null, // optional [DEPOSIT, FEE, TRADE, WITHDRAW, ORDER_CANCEL, ORDER_CREATE, ORDER_FINALIZED]
        "startTime": null,
        "endTime": null,
        "ascendingByTime": false,
        "limit": 10,
        "offset": 0,
    }

    const {refetch: getWithdrawHistory} = useGetWithdrawHistory(query);

    const {data: userAccount} = useGetUserAccount()
    const freeAmount = userAccount?.wallets[id]?.free || 0

    const {data: currencyInfo, isLoading: CILoading, error: CIError} = useGetCurrencyInfo(id)

    const selectRef = useRef()
    const withdrawFee = new BN(currencyInfo?.chains[networkName.value]?.withdrawFee).toFormat()

    const validation = () => {
        if (new BN(amount.value).isGreaterThan(freeAmount)) {
            return t('DepositWithdraw.noInventory')
        }
        if (new BN(amount.value).minus(withdrawFee).isLessThanOrEqualTo(0)) {
            return t('DepositWithdraw.allowableWithdraw')
        }
        /*if (currencyInfo?.chains[networkName.value]) {
            return t('DepositWithdraw.fillNetwork')
        }*/
        if (address.value.length <= 0) {
            return t('DepositWithdraw.fillAddress')
        }
    }

    const sendWithdrawHandler = async (e) => {
        e.preventDefault()
        if (isLoading) return
        setIsLoading(true)

        const withdrawRequestData = {
            "currency": currencyInfo?.chains[networkName.value]?.currency,
            "amount": amount.value,
            "destSymbol": currencyInfo?.chains[networkName.value]?.currency,
            "destAddress": address.value,
            "destNetwork": currencyInfo?.chains[networkName.value]?.network,
            /*"destNote": "Personal wallet", //Optional
            "description": "Withdrawal to personal wallet" //Optional*/
        }

        sendWithdrawReq(withdrawRequestData)
            .then(() => {
                setNetworkName({value: 0, error: []})
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
                /*getWithdrawTxs()*/
                getWithdrawHistory()
                getUserAssets()
                getUserAssetsEstimatedValue()
            })
            .catch((error) => {
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
            value: new BN(currencyInfo?.chains[networkName.value]?.minWithdraw).plus(withdrawFee).toString(),
            error: []
        })
    };

    const enableButton = !(new BN(amount.value).minus(withdrawFee).isGreaterThan(0)) || new BN(amount.value).isGreaterThan(freeAmount) || address.value.length <= 0

    if (id === "IRT") {
        return <div className={`flex jc-center ai-center px-1 py-z`} style={{height: "100%"}}>
            <h3>{t("comingSoon")}</h3>
        </div>
    }

    if (CILoading) return <Loading/>
    if (CIError) return <Error/>


    return <form onSubmit={(e) => sendWithdrawHandler(e)} className={`px-1 py-3 column jc-between ${classes.content}`}>
        <div className={`row jc-between ai-center width-100 mb-1`}>
            <div className={`col-49`}>
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
            </div>
            <div className={`col-49`}>
                <TextInput
                    select={true}
                    placeholder={t('DepositWithdraw.selectNetwork')}
                    options={currencyInfo?.chains.map((chain, index) => {
                        return {value: index, label: `${chain.network} - ${chain.currency}`}
                    })}
                    lead={t('DepositWithdraw.network')}
                    type="select"
                    value={currencyInfo?.chains[networkName.value] && {
                        value: networkName.value,
                        label: `${currencyInfo?.chains[networkName.value].network} - ${currencyInfo?.chains[networkName.value].currency}`
                    }}
                    onchange={(e) => setNetworkName({value: e?.value || 0, error: []})}
                    customRef={selectRef}
                    alerts={networkName.error}
                />
            </div>
        </div>
        <div className="width-100 column jc-between height-100">
            <div className="column">
                <TextInput
                    lead={t("DepositWithdrawTx.destAddress") + " " + t("currency." + id)}
                    customClass={classes.withdrawalInput}
                    type="text"
                    value={address.value}
                    alerts={address.error}
                    onchange={(e) => setAddress({...address, value: e.target.value})}
                />
                <span className="pt-05 text-end fs-0-7">{t('DepositWithdrawTx.withdrawWarn')}</span>
            </div>
            <div className={`row width-100`}>
                <div className="col-50 column jc-between">
                    <span className={`my-05`}>{t("DepositWithdrawTx.freeWallet")}: <span
                        className={`hover-text cursor-pointer`} onClick={() => {
                        fillByWallet()
                    }}>{freeAmount} {t("currency." + id)}</span></span>
                    <span className={`my-05`}>{t('DepositWithdrawTx.minWithdraw')}: <span
                        className={`hover-text cursor-pointer`} onClick={() => {
                        fillByMinWithdraw()
                    }}> {new BN(currencyInfo?.chains[networkName.value]?.minWithdraw).plus(withdrawFee).toString()} {t("currency." + id)} </span></span>

                    {/* toDo */}

                    {/*<span className={`my-05`}>{t('DepositWithdrawTx.maxWithdraw')}: <span>2 {t("currency." + id)}</span></span>
                    <span className={`my-05`}>{t('DepositWithdrawTx.maxMonthWithdraw')}: <span>2 {t("currency." + id)}</span></span>*/}
                </div>
                <div className="col-50 pr-1 column jc-end">
                    <div className="row jc-between ai-center">
                        <div className="column">
                            <span className={`my-05`}>
                                {t('commission')}: <span
                                className={`text-orange`}>{withdrawFee ? withdrawFee : 0} </span>
                                <span>{t("currency." + id)}</span>
                            </span>
                            <span className={`my-05`}>
                                {t('DepositWithdrawTx.reqAmount')}: <span className={`text-green`}>
                                {new BN(amount.value).minus(withdrawFee).isGreaterThan(0) ? new BN(amount.value).minus(withdrawFee).toFormat() : 0}
                            </span> <span>{t("currency." + id)}</span>
                            </span>
                        </div>
                        <div
                            data-tooltip-id="opex-tooltip"
                            data-tooltip-place="top"
                            data-tooltip-html={enableButton ? `<span class="column jc-between col-100 text-red">${validation()}</span>` : ""}
                            style={{width: "40%"}}
                        >
                            <Button
                                buttonClass={`${classes.thisButton} ${classes.withdrawal} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                                buttonTitle={submitButtonTextHandler()}
                                disabled={!(new BN(amount.value).minus(withdrawFee).isGreaterThan(0)) || new BN(amount.value).isGreaterThan(freeAmount) || address.value.length <= 0}
                                type="submit"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="pt-1">
            <span>{t('DepositWithdraw.securityConsiderations')}</span>
        </div>
    </form>

};

export default Withdrawal;