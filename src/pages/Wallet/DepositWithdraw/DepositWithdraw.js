import React, {Fragment, useEffect, useRef, useState} from 'react';
import classes from "./DepositWithdraw.module.css"
import AccordionBox from "../../../components/AccordionBox/AccordionBox";
import {useTranslation} from "react-i18next";
import {images} from "../../../assets/images";
import TextInput from "../../../components/TextInput/TextInput";
import Icon from "../../../components/Icon/Icon";
import ReactTooltip from "react-tooltip";


const DepositWithdraw = (props) => {

    const {t} = useTranslation();
    const address = useRef(null);

    const[withdrawalInput , setWithdrawalInput] = useState({amount:"", address:"",})
    const[transferInput , setTransferInput] = useState({amount:"", destinationUserNumber:"",})

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    const copyToClipboard = () => {
        address.current.select();
        document.execCommand('copy');
    };

    const deposit =
        <div className={`px-1 py-2 column jc-between ${classes.content}`}>
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

    const withdrawal =
        <div className={`px-1 py-2 column jc-between ${classes.content}`}>
            <div className="container row jc-between">
                <div className="col-30 column jc-between">
                    <TextInput
                        lead="مقدار بیتکوین"
                        value={withdrawalInput.amount}
                        onchange={(e)=> setWithdrawalInput({...withdrawalInput,amount: e.target.value})}
                        type="text"
                    />
                    <span className="pt-1">موجودی قابل برداشت: <span>0.05 بیتکوین</span></span>
                    <span>حداقل مقدار برداشت: <span>0.001 بیتکوین</span></span>
                    <span>سقف برداشت روزانه شما: <span>1 بیتکوین</span></span>
                    <span>سقف برداشت ماهانه شما: <span>10 بیتکوین</span></span>
                </div>
                <div className="col-70 pr-1 column jc-between" style={{height:"20vh"}}>
                    <div className="column">
                        <TextInput
                            lead="آدرس دریافت بیتکوین"
                            customClass={classes.withdrawalInput}
                            type="text"
                            value={withdrawalInput.address}
                            onchange={(e)=> setWithdrawalInput({...withdrawalInput,address: e.target.value})}
                        />
                        <span className="pt-05 text-end">لطفا دقت کنید! ورود اشتباه آدرس می تواند به از دست رفتن سرمایه منجر شود.</span>
                    </div>
                    <div className="row jc-between ai-center">
                        <div className="column">
                            <span>کارمزد: <span>...</span></span>
                            <span>دریافتی شما: <span>...</span></span>
                        </div>
                        <button type="submit" className={`cursor-pointer ${classes.button}`}>ثبت درخواست برداشت</button>
                    </div>
                </div>
            </div>
            <div>
                <span>باتوجه به ملاحضات امنیتی ممکن است انتقال به حساب با کمی تاخیر صورت بگیرد. می توانید وضعیت برداشت را در همین صفحه از بخش ترکنش های <span className="text-orange">{`${t('DepositWithdraw.title')}`}</span> ببینید.</span>
            </div>
        </div>


    const transfer =
        <div className={`px-1 py-2 column jc-between ${classes.content}`}>
            <div className="container row jc-between">
                <div className="col-30 column jc-between">
                    <TextInput
                        lead="مقدار بیتکوین"
                        value={transferInput.amount}
                        onchange={(e)=> setTransferInput({...transferInput,amount: e.target.value})}
                        type="text"
                    />
                    <span className="pt-1">موجودی قابل برداشت: <span>0.05 بیتکوین</span></span>
                    <span>سقف برداشت روزانه شما: <span>1 بیتکوین</span></span>
                    <span>سقف برداشت ماهانه شما: <span>10 بیتکوین</span></span>
                </div>
                <div className="col-70 pr-1 column jc-between" style={{height:"20vh"}}>
                    <div className="column">
                        <TextInput
                            lead="شماره کاربری مقصد"
                            customClass={classes.withdrawalInput}
                            type="text"
                            value={transferInput.destinationUserNumber}
                            onchange={(e)=> setTransferInput({...transferInput,destinationUserNumber: e.target.value})}
                        />
                        <span className="pt-05 text-end">لطفا دقت کنید! ورود اشتباه آدرس می تواند به از دست رفتن سرمایه منجر شود.</span>
                    </div>
                    <div className="row jc-between ai-center">
                        <div className="column">
                            <span>کارمزد: <span>...</span></span>
                            <span>دریافتی شما: <span>...</span></span>
                        </div>
                        <button type="submit" className={`cursor-pointer ${classes.button}`}>ثبت درخواست انتقال</button>
                    </div>
                </div>
            </div>
            <div>
                <span>باتوجه به ملاحضات امنیتی ممکن است انتقال به حساب با کمی تاخیر صورت بگیرد. می توانید وضعیت برداشت را در همین صفحه از بخش ترکنش های <span className="text-orange">{`${t('DepositWithdraw.title')}`}</span> ببینید.</span>
            </div>
        </div>




    const data = [
        {id: 1, title: t('deposit'), body: deposit },
        {id: 2, title: t('withdrawal'), body: withdrawal },
        {id: 3, title: t('transfer'), body: transfer },
    ]

    return (
        <div className={`container card-background card-border column ${classes.container}`}>
            <AccordionBox title={t('DepositWithdraw.title')} content={data} safari={classes.safariFlexSize}/>
        </div>
    );
};

export default DepositWithdraw;
