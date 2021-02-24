import React, {Fragment, useRef} from 'react';
import classes from "./DepositWithdraw.module.css"
import AccordionBox from "../../../components/AccordionBox/AccordionBox";
import {useTranslation} from "react-i18next";
import {images} from "../../../assets/images";
import TextInput from "../../../components/TextInput/TextInput";
import Icon from "../../../components/Icon/Icon";


const DepositWithdraw = (props) => {

    const {t} = useTranslation();
    const address = useRef(null);

    const copyToClipboard = () => {
        address.current.select();
        document.execCommand('copy');
    };

    const deposit = <div className={`px-1 py-1 column jc-between ${classes.content}`}>
        <div className="container row jc-between">
            <div className="col-70 column">
                <span className="pb-2">هر تراکنشی با مقدار بیشتر از 0.001 بیتکوین به آدرس زیر ، به حساب شما افزوده می شود. </span>
                <TextInput
                    after={<Icon iconName="icon-copy font-size-md-01" onClick={()=>copyToClipboard()}/>}
                    customClass={classes.depositInput}
                    readOnly = {true}
                    type="text"
                    customRef={address}
                    value="3KCw3CBZWfV4BDzgVTDjPUb8PbaqLtv9vw"
                    /*onchange={(e)=> setProfile({...profile,postalCode: e.target.value})}*/
                />
                <span className="pt-05">حداقل میزان قابل قبول: <span>0.001 بیتکوین</span></span>
            </div>
            <div className={`col-30 py-1 flex ai-center jc-center`}>
                <img className="card-border p-025 img-lg-plus" src={images.opexQrCode} alt="opexQrCode" title="opexQrCode"/>
            </div>
        </div>
        <div>
            <span>موجودی شما حداقل 1 ساعت بعد از واریز به آدرس بالا افزایش پیدا می کند. می توانید وضعیت واریز را در همین صفحه از بخش تراکنش های <span className="text-orange">{`${t('DepositWithdraw.title')}`}</span>  ببینید.</span>
        </div>

    </div>

    const data = [
        {id: 1, title: t('deposit'), body: deposit },
        {id: 2, title: t('withdrawal'), body: t('withdrawal') },
        {id: 3, title: t('transfer'), body: t('transfer') },
    ]

    return (
        <div className={`container card-background card-border column ${classes.container}`}>
            <AccordionBox title={t('DepositWithdraw.title')} content={data} safari={classes.safariFlexSize}/>
        </div>
    );
};

export default DepositWithdraw;
