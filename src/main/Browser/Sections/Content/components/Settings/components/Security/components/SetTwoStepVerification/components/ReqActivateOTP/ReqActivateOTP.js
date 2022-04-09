import React, {useState} from "react";
import classes from "./../../SetTwoStepVerification.module.css";
import Button from "../../../../../../../../../../../../components/Button/Button";
import {useSelector} from "react-redux";
import {requestActivateOTP} from "../../../../../../api/settings";
import {images} from "../../../../../../../../../../../../assets/images";
import {useTranslation} from "react-i18next";


const ReqActivateOTP = () => {

    const {t} = useTranslation();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [reqOTP, setReqOTP] = useState({});

    const accessToken = useSelector(state => state.auth.accessToken);


    const sendReqActivateOTP = async () => {


        if (isLoading) return false
        setIsLoading(true)


        const reqActivateOTPData = await requestActivateOTP(accessToken)
        if (reqActivateOTPData && reqActivateOTPData.status === 200) {
            setIsLoading(false)
            setError(false)
            setReqOTP(reqActivateOTPData.data.uri)
        } else {
            setError(true)
            setIsLoading(false)
        }

    }

    const submitButtonTextHandler = () => {
        if (isLoading) {
            return <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange} alt="linearLoading"/>
        }
        return t("SetTwoStepVerification.title")
    }




    return (
        <div className={`column container jc-between ai-center ${classes.content} px-1 py-2`}>

            <span>برای فعالسازی ورود دو مرحله ای... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ</span>

            <Button
                buttonClass={`${classes.thisButton} ${classes.withdrawal} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                buttonTitle={submitButtonTextHandler()}
                //disabled={!(new BN(amount.value).minus(new BN(calculateFee(id))).isGreaterThan(0)) || address.value.length <= 0 }
                onClick={sendReqActivateOTP}
            />


        </div>
    );
};


export default ReqActivateOTP;
