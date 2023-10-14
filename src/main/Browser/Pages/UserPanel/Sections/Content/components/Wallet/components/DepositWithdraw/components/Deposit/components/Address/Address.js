import React, {useEffect, useRef} from 'react';
import classes from '../../../../DepositWithdraw.module.css'
import {useParams} from "react-router-dom";
import {Trans, useTranslation} from "react-i18next";
import {toast} from "react-hot-toast";
import {useGetDepositAddress} from "../../../../../../../../../../../../../../queries";
import Icon from "../../../../../../../../../../../../../../components/Icon/Icon";
import TextInput from "../../../../../../../../../../../../../../components/TextInput/TextInput";
import QRCode from "react-qr-code";

const Address = ({network}) => {
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

    const {data: address, isLoading, error, refetch: refetchAddress} = useGetDepositAddress(id, network)

    useEffect(() => {
        if (id !== "IRT") {
            refetchAddress()
        }
    }, [network]);

    if (isLoading) return <span className={`flashit width-100 flex jc-center ai-center mt-6`}>{t('DepositWithdraw.gettingAddress')}</span>
    if (error) return <span className={` width-100 flex jc-center ai-center mt-6`}>{t('DepositWithdraw.errorGettingAddress')}</span>

    return (
        <div className={`row jc-between`}>
            <div className={`column width-80`}>
                 <span className={`my-2`}>
                        <Trans
                            i18nKey="DepositWithdraw.minDepositText"
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
                    readOnly={true}
                    type="text"
                    customRef={addressRef}
                    value={address.address}
                    customClass={`${classes.depositInput} width-80`}
                />
            </div>

            <div className={`width-20 py-1 flex ai-center jc-center`}>
                <QRCode
                    value={address.address}
                    bgColor="var(--cardBody)"
                    fgColor="var(--textColor)"
                    level='L'
                    size={140}
                />
            </div>

        </div>
    );
};

export default Address;
