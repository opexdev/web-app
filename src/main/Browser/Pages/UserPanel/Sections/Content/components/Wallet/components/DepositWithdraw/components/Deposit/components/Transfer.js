import classes from "../../../DepositWithdraw.module.css";
import TextInput from "../../../../../../../../../../../../../components/TextInput/TextInput";
import Button from "../../../../../../../../../../../../../components/Button/Button";
import React, {useState} from "react";

const Transfer = () => {
    const [transferInput, setTransferInput] = useState({
        amount: "",
        destinationUserNumber: "",
    });
    return <div className={`px-1 py-2 column jc-between ${classes.content}`}>
        <div className="width-100 row jc-between">
            <div className="col-30 column jc-between">
                <TextInput
                    lead="مقدار بیتکوین"
                    value={transferInput.amount}
                    onchange={(e) =>
                        setTransferInput({...transferInput, amount: e.target.value})
                    }
                    type="text"
                />
                <span className="pt-1">
            موجودی قابل برداشت: <span>0.05 بیتکوین</span>
          </span>
                <span>
            سقف برداشت روزانه شما: <span>1 بیتکوین</span>
          </span>
                <span>
            سقف برداشت ماهانه شما: <span>10 بیتکوین</span>
          </span>
            </div>
            <div className="col-70 pr-1 column jc-between" style={{height: "20vh"}}>
                <div className="column">
                    <TextInput
                        lead="شماره کاربری مقصد"
                        customClass={classes.withdrawalInput}
                        type="text"
                        value={transferInput.destinationUserNumber}
                        onchange={(e) =>
                            setTransferInput({
                                ...transferInput,
                                destinationUserNumber: e.target.value,
                            })
                        }
                    />
                    <span className="pt-05 text-end">
              لطفا دقت کنید! ورود اشتباه آدرس می تواند به از دست رفتن سرمایه
              منجر شود.
            </span>
                </div>
                <div className="row jc-between ai-center">
                    <div className="column">
              <span>
                کارمزد: <span>...</span>
              </span>
                        <span>
                دریافتی شما: <span>...</span>
              </span>
                    </div>
                    <Button
                        buttonClass={`${classes.thisButton} ${classes.transfer}`}
                        type="submit"
                        buttonTitle="ثبت درخواست انتقال"
                    />
                </div>
            </div>
        </div>
        <div>
        <span>
          باتوجه به ملاحضات امنیتی ممکن است انتقال به حساب با کمی تاخیر صورت
          بگیرد. می توانید وضعیت برداشت را در همین صفحه از بخش ترکنش های{" "}
            <span className="text-orange">{`${t("DepositWithdraw.title")}`}</span>{" "}
            ببینید.
        </span>
        </div>
    </div>
}
export default Transfer;