import React, {useEffect, useRef} from "react";
import classes from "../../DepositWithdraw.module.css";
import TextInput from "../../../../../../../../../../../../components/TextInput/TextInput";
import Icon from "../../../../../../../../../../../../components/Icon/Icon";
import {useParams} from "react-router-dom";
import {Trans, useTranslation} from "react-i18next";
import QRCode from "react-qr-code";
import {toast} from "react-hot-toast";
import Error from "../../../../../../../../../../../../components/Error/Error";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import {useGetDepositAddress} from "../../../../../../../../../../../../queries";
import IRTDeposit from "./components/IRT/IRTDeposit";

const Deposit = () => {

    const {id} = useParams();
    const {t} = useTranslation();
    const addressRef = useRef(null);

    const copyToClipboard = () => {
        addressRef.current.select();
        document.execCommand("copy");
        toast.success(<Trans
            i18nKey="DepositWithdraw.success"
        />);
    };

    const {data: address, isLoading, error, refetch} = useGetDepositAddress(id)

    useEffect(() => {
        if (id !== "IRT") refetch()
    }, [id]);

    const helpText = () => {
        if (id === "TETH") {
            return <div>
                <span className={`text-red font-weight-bold`}>{t("DepositWithdraw.important")}: </span>
                <div>
                    <span>{t("DepositWithdraw.DepositTETHContentBefore")}</span>
                    <span className={`hover-text cursor-pointer`}
                          onClick={() => window.open('https://faucet.dimensions.network/')}>https://faucet.ropsten.be</span>
                    <span>{t("DepositWithdraw.DepositTETHContentAfter")}</span>
                </div>
                <div>
                    <Trans
                        i18nKey="DepositWithdraw.minDeposit"
                        values={{
                            min: 0.001,
                            currency: t("currency." + id)
                        }}
                    />
                </div>
                <div>
                    <Trans
                        i18nKey="DepositWithdraw.depositTime"
                        values={{
                            time: 2
                        }}
                    />
                </div>
            </div>
        }
        if (id === "TBTC") {
            return <div>
                <span className={`text-red font-weight-bold`}>{t("DepositWithdraw.important")}: </span>
                <div>
                    <span>{t("DepositWithdraw.DepositTBTCContentBefore")}</span>
                    <span className={`hover-text cursor-pointer`}
                          onClick={() => window.open('https://testnet-faucet.com/btc-testnet')}>https://testnet-faucet.com/btc-testnet</span>
                    <span>{t("DepositWithdraw.DepositTBTCContentAfter")}</span>
                </div>
                <div>
                    <Trans
                        i18nKey="DepositWithdraw.minDeposit"
                        values={{
                            min: 0.001,
                            currency: t("currency." + id)
                        }}
                    />
                </div>
                <div>
                    <Trans
                        i18nKey="DepositWithdraw.depositTime"
                        values={{
                            time: 10
                        }}
                    />
                </div>
            </div>
        }
        if (id === "TUSDT") {
            return <div>
                <span className={`text-red font-weight-bold`}>{t("DepositWithdraw.important")}: </span>
                <div>
                    <span>{t("DepositWithdraw.DepositTUSDTContentBefore")}</span>
                    <span className={`hover-text cursor-pointer`}
                          onClick={() => window.open('https://bit.ly/ROPTokens')}>https://bit.ly/ROPTokens</span>
                    <span>{t("DepositWithdraw.DepositTUSDTContentAfter")}</span>
                </div>
                <div>
                    <Trans
                        i18nKey="DepositWithdraw.minDeposit"
                        values={{
                            min: 10,
                            currency: t("currency." + id)
                        }}
                    />
                </div>
                <div>
                    <Trans
                        i18nKey="DepositWithdraw.depositTime"
                        values={{
                            time: 2
                        }}
                    />
                </div>
            </div>
        }
    }

    const lowestPrice = (id) => {
        switch (id) {
            case "BTC":
                return 0.001;
            case "ETH":
                return 0.001;
            case "USDT":
                return 10;
            default:
                return 0;
        }
    };

    if (id === "IRT") return <IRTDeposit/>
    if (isLoading) return <Loading/>
    if (error) return <Error retryFunc={refetch}/>

    return (
        <div className={`px-1 py-2 row jc-between ${classes.content}`}>
            <div className="col-80 column jc-between">
                    <span>
                        <Trans
                            i18nKey="DepositWithdraw.minDepositText"
                            values={{
                                min: lowestPrice(id),
                                currency: t("currency." + id)
                            }}
                        />
                    </span>
                <TextInput
                    after={
                        <Icon
                            iconName="icon-copy fs-02"
                            onClick={() => copyToClipboard()}
                            customClass={`hover-text cursor-pointer`}
                        />
                    }
                    customClass={classes.depositInput}
                    readOnly={true}
                    type="text"
                    customRef={addressRef}
                    value={address.address}
                />
                <span>{helpText()}</span>
            </div>
            <div className={`col-20 py-1 flex ai-center jc-center`}>
                <QRCode
                    value={address.address}
                    bgColor="var(--cardBody)"
                    fgColor="var(--textColor)"
                    level='L'
                    size={140}
                />
            </div>
        </div>
    )
}
export default Deposit;
