import React, {useEffect, useRef, useState} from "react";
import classes from "../DepositWithdraw.module.css";
import TextInput from "../../../../../../../../../components/TextInput/TextInput";
import Icon from "../../../../../../../../../components/Icon/Icon";
import {images} from "../../../../../../../../../assets/images";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {getDepositAddress} from "../../../api/wallet";
import QRCode from "react-qr-code";

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
                <span className={`text-red font-weight-bold`}>مهم: </span>
                فقط ETH تستی شبکه Ropsten مورد قبول قرار می‌گیرد! برای دریافت رایگان به <span className={`hover-text cursor-pointer`} onClick={()=>window.open('https://faucet.ropsten.be')}>https://faucet.ropsten.be</span> بروید. برای ارسال ETH تستی به این آدرس، باید شبکه اتریومی کیف پول خود را به Ropsten تغییر دهید. این شبکه به طور پیش‌فرض در فهرست شبکه‌های کیف پول Metamask وجود دارد.
                هر تراکنشی با مقدار مساوی یا بیشتر از ۰.۰۰۱ ETH به آدرس بالا، به حساب شما افزوده می‌شود.
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
                <span className={`text-red font-weight-bold`}>مهم: </span>
                فقط  BTC تستی مورد قبول قرار می‌گیرد! برای  دریافت رایگان به <span className={`hover-text cursor-pointer`} onClick={()=>window.open('https://testnet-faucet.com/btc-testnet')}>https://testnet-faucet.com/btc-testnet</span> بروید.
                هر تراکنشی با مقدار مساوی یا بیشتر از ۰.۰۰۱ BTC به آدرس بالا، به حساب شما افزوده می‌شود.
                <div>حداقل میزان قابل قبول ۰.۰۰۱ BTC</div>
                <div>
                    * موجودی شما ۱۰ دقیقه بعد از واریز به آدرس بالا، افزایش پیدا می‌کند.
                </div>
            </div>
        }
        if (id === "USDT"){
            return <div>
                <span className={`text-red font-weight-bold`}>مهم: </span>
                فقط USDT تستی شبکه Ropsten مورد قبول قرار می‌گیرد! برای آشنایی با روش دریافت رایگان به <span className={`hover-text cursor-pointer`} onClick={()=>window.open('https://bit.ly/ROPTokens')}>https://bit.ly/ROPTokens</span> بروید. برای ارسال USDT تستی به این آدرس، باید شبکه اتریومی کیف پول خود را به Ropsten تغییر دهید. این شبکه به طور پیش‌فرض در فهرست شبکه‌های کیف پول Metamask وجود دارد.
                هر تراکنشی با مقدار مساوی یا بیشتر از ۱۰ USDT به آدرس بالا، به حساب شما افزوده می‌شود.
                <div>حداقل میزان قابل قبول ۱۰ USDT</div>
                <div>
                     * موجودی شما 2 دقیقه بعد از واریز به آدرس بالا، افزایش پیدا می‌کند.
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


    return (
        <div className={`px-1 py-2 row jc-between ${classes.content}`}>

                <div className="col-80 column jc-between">
                    <span>
                    هر تراکنشی با مقدار بیشتر از {lowestPrice(id)} {t("currency."+id)} به آدرس زیر ، به حساب شما افزوده می شود.{" "}
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
                    <span>
                        {helpText()}
                    </span>
                </div>
                <div className={`col-20 py-1 flex ai-center jc-center`}>
                    <QRCode
                        value={address}
                        bgColor="var(--cardBody)"
                        fgColor="var(--textColor)"
                        level='L'
                        //className={classes.QRStyle}
                        size={140}
                    />
                </div>

        </div>
    )

}
export default Deposit;
