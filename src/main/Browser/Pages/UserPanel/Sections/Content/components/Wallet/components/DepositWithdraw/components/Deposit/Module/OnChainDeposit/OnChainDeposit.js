import React, {useEffect, useRef, useState} from 'react';
import classes from './OnChainDeposit.module.css'
import TextInput from "../../../../../../../../../../../../../../components/TextInput/TextInput";
import {Trans, useTranslation} from "react-i18next";
import {useGetDepositAddress} from "../../../../../../../../../../../../../../queries";
import {useParams} from "react-router-dom";
import Icon from "../../../../../../../../../../../../../../components/Icon/Icon";
import QRCode from "react-qr-code";
import {toast} from "react-hot-toast";

const OnChainDeposit = ({gateways}) => {

    console.log("gateways", gateways)

    const {t} = useTranslation();
    const {id} = useParams();


    const [networkName, setNetworkName] = useState({value: 0, error: []})

    console.log("networkName", networkName)


    const {data: address, isLoading, error, refetch: refetchAddress} = useGetDepositAddress(id, gateways[networkName.value].chain)

    console.log("address",address)

    const selectRef = useRef()

    useEffect(() => {
        refetchAddress()
    }, [gateways]);

    const addressRef = useRef(null);
    const copyToClipboard = () => {
        addressRef.current.select();
        document.execCommand("copy");
        toast.success(<Trans
            i18nKey="DepositWithdraw.success"
        />);
    };

    const content = () => {
        if (isLoading) return <span className={`flashit width-100 flex jc-center ai-center mt-6`}>{t('DepositWithdraw.gettingAddress')}</span>
        if (error) return <span className={` width-100 flex jc-center ai-center mt-6`}>{t('DepositWithdraw.errorGettingAddress')}</span>
        return  <div className={`row jc-between`}>
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
    }
    return (
        <div  className={`px-1 py-3 column height-100`}>
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
                value={gateways[networkName.value] && {
                    value: networkName.value,
                    label: `${gateways[networkName.value].chain} - ${gateways[networkName.value].implementationSymbol}`
                }}
                onchange={(e) => setNetworkName({ value: e?.value || 0, error: [] })}
                customRef={selectRef}
                alerts={networkName.error}
                customClass={`width-64 ${classes.thisInput}`}
            />


            {content()}





        </div>
    );
};

export default OnChainDeposit;
