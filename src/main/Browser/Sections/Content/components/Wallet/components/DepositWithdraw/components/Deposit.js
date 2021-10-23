import React, {useEffect, useRef, useState} from "react";
import classes from "../DepositWithdraw.module.css";
import TextInput from "../../../../../../../../../components/TextInput/TextInput";
import Icon from "../../../../../../../../../components/Icon/Icon";
import {images} from "../../../../../../../../../assets/images";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {getDepositAddress} from "../../../api/wallet";

const Deposit = () => {

    const {t} = useTranslation();

    const [address , setAddress] = useState("")

    const addressRef = useRef(null);
    const {id} = useParams();
    const accessToken = useSelector(state => state.auth.accessToken);

    const copyToClipboard = () => {
        addressRef.current.select();
        document.execCommand("copy");
    };

    useEffect(() => {
        getDepositAddress(accessToken ,id).then((res)=>{
            if (res && res.status === 200 ){
                setAddress(res.data.address)
            }else {
                setAddress("0x00000000000000000000000")
            }
        })
    }, [id]);

    const helpText = () => {
        if (id === "ETH"){
            return <div>
                <span style={{color : "red"}}>مهم </span>
                فقط ETH تستی شبکه Ropsten مورد قبول قرار می‌گیرد! برای دریافت رایگان به https://faucet.ropsten.be بروید. برای ارسال ETH تستی به این آدرس، باید شبکه اتریومی کیف پول خود را به Ropsten تغییر دهید. این شبکه به طور پیش‌فرض در فهرست شبکه‌های کیف پول Metamask وجود دارد.
                هر تراکنشی با مقدار مساوی یا بیشتر از ۰.۰۰۱ ETH به آدرس زیر، به حساب شما افزوده می‌شود.
                <div>
                    حداقل میزان قابل قبول ۰.۰۰۱ ETH
                </div>
                <div>
                     * موجودی شما ۲ دقیقه بعد از واریز به آدرس بالا، افزایش پیدا می‌کند.
                </div>
            </div>
        }
        if (id === "BTC"){
            return <div>
                <span style={{color : "red"}}>مهم </span>
                فقط  BTC تستی مورد قبول قرار می‌گیرد! برای  دریافت رایگان به https://testnet-faucet.com/btc-testnet بروید.
                هر تراکنشی با مقدار مساوی یا بیشتر از ۰.۰۰۱ BTC به آدرس زیر، به حساب شما افزوده می‌شود.
                <div>حداقل میزان قابل قبول ۰.۰۰۱ BTC</div>
                <div>
                    * موجودی شما ۱۰ دقیقه بعد از واریز به آدرس بالا، افزایش پیدا می‌کند.
                </div>
            </div>
        }
        if (id === "USDT"){
            return <div>
                <span style={{color : "red"}}>مهم </span>
                فقط USDT تستی شبکه Ropsten مورد قبول قرار می‌گیرد! برای آشنایی با روش دریافت رایگان به https://bit.ly/ROPTokens بروید. برای ارسال USDT تستی به این آدرس، باید شبکه اتریومی کیف پول خود را به Ropsten تغییر دهید. این شبکه به طور پیش‌فرض در فهرست شبکه‌های کیف پول Metamask وجود دارد.
                هر تراکنشی با مقدار مساوی یا بیشتر از ۱۰ USDT به آدرس زیر، به حساب شما افزوده می‌شود.
                <div>حداقل میزان قابل قبول ۱۰ USDT</div>
                <div>
                     * موجودی شما 2 دقیقه بعد از واریز به آدرس بالا، افزایش پیدا می‌کند.
                </div>
            </div>
        }
    }


    return (
        <div className={`px-1 py-2 column jc-between ${classes.content}`}>
            <div className="container row jc-between">
                <div className="col-70 column">
          <span className="pb-2">
            هر تراکنشی با مقدار بیشتر از 0.00001 {t("currency."+id)} به آدرس زیر ، به حساب شما
            افزوده می شود.{" "}
          </span>
                    <TextInput
                        after={
                            <Icon
                                iconName="icon-copy font-size-md-01"
                                onClick={() => copyToClipboard()}
                            />
                        }
                        customClass={classes.depositInput}
                        readOnly={true}
                        type="text"
                        customRef={addressRef}
                        value={address}
                    />
                    <span className="pt-05">
          </span>
                </div>
                {/*<div className={`col-30 py-1 flex ai-center jc-center`}>
                    <img
                        className="card-border p-025 img-lg-plus"
                        src={images.opexQrCode}
                        alt="opexQrCode"
                        title="opexQrCode"
                    />
                </div>*/}
            </div>
            <div>

                <div>
                    {helpText()}
                </div>
            </div>
        </div>
    )

}
export default Deposit;
