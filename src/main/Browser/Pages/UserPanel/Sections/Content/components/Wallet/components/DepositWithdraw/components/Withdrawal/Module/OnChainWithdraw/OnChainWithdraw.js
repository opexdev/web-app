import React, {useEffect, useRef, useState} from 'react';
import classes from './OnChainWithdraw.module.css'
import {Trans, useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import TextInput from "../../../../../../../../../../../../../../components/TextInput/TextInput";
import NumberInput from "../../../../../../../../../../../../../../components/NumberInput/NumberInput";
import {BN, getCurrencyNameOrAlias, parsePriceString} from "../../../../../../../../../../../../../../utils/utils";
import {useGetUserAccount} from "../../../../../../../../../../../../../../queries/hooks/useGetUserAccount";
import {
    useGetUserAssets,
    useGetUserAssetsEstimatedValue,
    useGetWithdrawHistory
} from "../../../../../../../../../../../../../../queries";
import i18n from "i18next";
import {useSelector} from "react-redux";
import Button from "../../../../../../../../../../../../../../components/Button/Button";
import {images} from "../../../../../../../../../../../../../../assets/images";
import {sendWithdrawReq} from "js-api-client";
import {toast} from "react-hot-toast";

const OnChainWithdraw = ({gateways}) => {

    const {t} = useTranslation();
    const {id} = useParams();

    const refCurrency = useSelector((state) => state.exchange.baseCurrency)

    const [isLoading, setIsLoading] = useState(false)

    const language = i18n.language
    const currencies = useSelector((state) => state.exchange.currencies)

    const [input, setInput] = useState({
        network: {value: 0, error: []},
        address: {value: "", error: []},
        txPassword: {value: "", error: []},
    });

    const [amount, setAmount] = useState({value: new BN(0), error: []});

    useEffect(() => {
        setInput({
            network: {value: 0, error: []},
            address: {value: "", error: []},
            txPassword: {value: "", error: []},
        })
        setAmount({value: new BN(0), error: []})
    }, [id]);

    const selectRef = useRef()

    const {data: userAccount} = useGetUserAccount()
    const freeWallet = new BN(userAccount?.wallets[id]?.free || 0).decimalPlaces(currencies[id]?.precision ?? 0).toFormat() || 0

    const {refetch: getUserAccount} = useGetUserAccount();
    const {refetch: getUserAssets} = useGetUserAssets(refCurrency);
    const {refetch: getUserAssetsEstimatedValue} = useGetUserAssetsEstimatedValue(refCurrency);

    const withdrawFee = new BN(gateways?.[input?.network.value]?.withdrawFee).decimalPlaces(currencies[id]?.precision ?? 0).toFormat()
    const withdrawMin = new BN(gateways?.[input?.network.value]?.withdrawMin).decimalPlaces(currencies[id]?.precision ?? 0).toFormat()
    const withdrawMax = new BN(gateways?.[input?.network.value]?.withdrawMax).decimalPlaces(currencies[id]?.precision ?? 0).toFormat()

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

    const validation = (value) => {

        const newAmount = {...amount}
        newAmount.error = []

        if (new BN(value).isGreaterThan(new BN(freeWallet))) {
            newAmount.error = [t('DepositWithdraw.noInventory')]
        }

        if (new BN(value).isEqualTo(new BN(freeWallet))) {
            newAmount.error = [t('DepositWithdraw.noInventorywithdrawFee')]
        }

        if (new BN(value).isLessThan(new BN(withdrawMin))) {
            newAmount.error = [t('DepositWithdraw.allowableWithdraw')]
        }

        if (new BN(value).minus(new BN(withdrawFee)).isLessThanOrEqualTo(0)) {
            newAmount.error = [t('DepositWithdraw.noInventorywithdrawFee')]
        }

        if (new BN(value).isLessThan(new BN(withdrawFee)) ) {
            newAmount.error = [t('DepositWithdraw.allowableWithdraw')]
        }

        newAmount.value = new BN(value)
        setAmount(newAmount)
    }


    const fillByWallet = () => {
        const validateAmount = new BN(freeWallet).isGreaterThan(0)
            ? new BN(freeWallet).minus(new BN(withdrawFee))
            : new BN(freeWallet);
        validation(validateAmount);
    };

    const fillByMinWithdraw = () => {
        validation(new BN(withdrawMin).plus(new BN(withdrawFee)))
    };

    const fillByMaxWithdraw = () => {
        validation(new BN(withdrawMax).minus(new BN(withdrawFee)))
    };

    const inputChangeHandler = (value) => {
        validation(parsePriceString(value))

    }

    const submitButtonTextHandler = () => {
        if (isLoading) return <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange}
                                   alt="linearLoading"/>
        return t('DepositWithdrawTx.withdrawReqSubmit')
    }


    const sendWithdrawHandler = async (e) => {
        e.preventDefault()
        if (isLoading) return
        setIsLoading(true)

        const withdrawRequestData = {
            "amount": amount.value,
            "destSymbol": gateways?.[input?.network.value]?.currencySymbol,
            "gatewayUuid": gateways?.[input?.network.value]?.gatewayUuid,
            "destAddress": input?.address.value
        }

        sendWithdrawReq(withdrawRequestData)
            .then(() => {

                setAmount({value: new BN(0), error: []})
                setInput({
                    network: {value: 0, error: []},
                    address: {value: "", error: []},
                    txPassword: {value: "", error: []},
                })
                toast.success(<Trans
                    i18nKey="DepositWithdrawTx.success"
                    values={{
                        asset: getCurrencyNameOrAlias(currencies[id], language),
                        amount: amount.value,
                    }}
                />);
                getUserAccount()
                getWithdrawHistory()
                getUserAssets()
                getUserAssetsEstimatedValue()
            })
            .catch((error) => {
                toast.error(t('error'));
            })
            .finally(() => setIsLoading(false))

    }


    return (
        <div className={`px-1 py-3 column height-100`}>
            <TextInput
                select={true}
                placeholder={t('DepositWithdraw.selectNetwork')}
                options={gateways.map((chain, index) => ({
                    value: index,
                    label: `${chain.chain} - ${chain.implementationSymbol}`,
                    isDisabled: !chain.isActive // غیرفعال کردن در صورت عدم اجازه‌ی واریز
                }))}
                lead={t('DepositWithdraw.network')}
                type="select"
                value={gateways[input?.network?.value] && {
                    value: input?.network?.value,
                    label: `${gateways[input?.network?.value].chain} - ${gateways[input?.network?.value].implementationSymbol}`
                }}
                onchange={(e) => setInput({...input, network: { value: e?.value || 0, error: [] }}) }
                customRef={selectRef}
                alerts={input?.input?.error}
                customClass={`width-68 ${classes.thisInput}`}
            />

            <form onSubmit={(e) => sendWithdrawHandler(e)}  className={` py-3 column jc-between height-100`}>
                <div className={`row width-100 mb-2`}>

                    <div className={`column width-50`}>
                        <div className={`my-05`}>
                            <span className={`ml-05`}>{t("DepositWithdrawTx.freeWallet")}:</span>
                            <span className={`hover-text cursor-pointer`} onClick={() => {fillByWallet()}}>{freeWallet} {getCurrencyNameOrAlias(currencies[id], language)}</span>
                        </div>

                        <div className={`my-05`}>
                            <span className={`ml-05`}>{t('DepositWithdrawTx.minWithdraw')}:</span>
                            <span className={`hover-text cursor-pointer`} onClick={() => {fillByMinWithdraw()}}>{new BN(withdrawMin).toString()} {getCurrencyNameOrAlias(currencies[id], language)}</span>
                        </div>

                        <div className={`my-05`}>
                            <span className={`ml-05`}>{t('DepositWithdrawTx.maxWithdrawal')}:</span>
                            <span className={`hover-text cursor-pointer`} onClick={() => {fillByMaxWithdraw()}}>{new BN(withdrawMax).toString()} {getCurrencyNameOrAlias(currencies[id], language)}</span>
                        </div>
                    </div>

                    <div className={`column width-50`}>
                        <div className={`my-05`}>
                            <span className={`ml-05`}>{t('commission')}:</span>
                            <span className={`text-orange`}>{withdrawFee ? withdrawFee : 0} {getCurrencyNameOrAlias(currencies[id], language)} </span>
                        </div>
                        <div className={`my-05`}>
                            <span className={`ml-05`}>{t('DepositWithdrawTx.reqAmount')}:</span>
                            <span className={`text-green`}>{new BN(amount.value).minus(withdrawFee).isGreaterThan(0) ? new BN(amount.value).minus(withdrawFee).toFormat() : 0} {getCurrencyNameOrAlias(currencies[id], language)}</span>
                        </div>
                    </div>

                </div>

                <NumberInput
                    lead={t('volume') + " " + getCurrencyNameOrAlias(currencies[id], language)}
                    value={amount.value.toString()}
                    alerts={amount.error}
                    customClass={`width-68 ${classes.thisInput} my-1`}
                    onchange={(e) => inputChangeHandler(e.target.value)}
                    type="text"
                />

                <div className="column width-100 my-1">
                    <TextInput
                        lead={t("DepositWithdrawTx.destAddress") + " " + getCurrencyNameOrAlias(currencies[id], language)}
                        customClass={`width-100 ${classes.addressInput}`}
                        type="text"
                        value={input?.address.value}
                        alerts={input?.address.error}
                        onchange={(e) => setInput({...input, address: {...input?.address, value: e.target.value}})}
                    />
                    <span className="pt-05 text-end fs-0-7">{t('DepositWithdrawTx.withdrawWarn')}</span>
                </div>

                <div className="pt-1">
                    <span>{t('DepositWithdraw.securityConsiderations')}</span>
                </div>

                <div className={`row jc-end mt-2`}>
                    <Button
                        buttonClass={`${classes.thisButton} ${classes.withdrawal} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} px-3`}
                        buttonTitle={submitButtonTextHandler()}
                        disabled={!(new BN(amount.value).minus(withdrawFee).isGreaterThan(0)) || new BN(amount.value).isGreaterThan(freeWallet) || input?.address?.value.length <= 0 || amount?.error?.length > 0}
                        type="submit"
                    />
                </div>

            </form>

        </div>
    );
};

export default OnChainWithdraw;
