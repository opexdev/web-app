import React, {useEffect, useRef} from 'react';
import QRCode from "react-qr-code";
import TextInput from "../../TextInput/TextInput";
import Icon from "../../Icon/Icon";
import classes from "../Popup.module.css";
import {useGetDepositAddress} from "../../../queries";
import {toast} from "react-hot-toast";
import {Trans, useTranslation} from "react-i18next";

const PopupAddress = ({currency, network}) => {

    const addressRef = useRef(null);
    const {t} = useTranslation();

    const {data: address, isLoading, error, refetch: refetchAddress} = useGetDepositAddress(currency, network)

    const copyToClipboard = () => {
        addressRef.current.select();
        document.execCommand("copy");
        toast.success(<Trans i18nKey="DepositWithdraw.success"/>);
    };

    useEffect(() => {
        if (currency !== "IRT") {
            refetchAddress()
        }
    }, [network]);

    if (isLoading) return <span className={`flashit width-100 flex jc-center ai-center mt-6`}>{t('DepositWithdraw.gettingAddress')}</span>
    if (error) return <span className={` width-100 flex jc-center ai-center mt-6`}>{t('DepositWithdraw.errorGettingAddress')}</span>


    return (
        <>
            <span className={`mt-3 mb-2`}>
                <QRCode
                    value={address.address}
                    bgColor="var(--cardBody)"
                    fgColor="var(--textColor)"
                    level='L'
                    size={90}
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
                customClass={`${classes.thisInput}`}
                readOnly={true}
                type="text"
                customRef={addressRef}
                value={address.address}
            />
        </>
    );
};

export default PopupAddress;
