import React, {useState , Fragment} from "react";
import classes from "./SendPhotosStep.module.css";
import {useTranslation} from "react-i18next";
import Button from "../../../../../../../../../../components/Button/Button";
import ImageInput from "../../../../../../../../../../components/ImageInput/ImageInput";
import {
    addToKycGroup,
    getToken,
    getUser,
    parsePanelToken,
    sendUpdateProfileReq,
    sendUserFile
} from "../../../../../../../../../../pages/Login/api/auth";
import {useSelector} from "react-redux";
import Loading from "../../../../../../../../../../components/Loading/Loading";


const SendPhotosStep = (props) => {
    const {t} = useTranslation();

    const [error, setError] = useState(false);
    const [sending, setSending] = useState(false);

    const [images, setImages] = useState({
        img1: "",
        img2: "",
        img3: "",
    });
    const id = useSelector(state => state.auth.id);
    const token = useSelector(state => state.auth.accessToken);

    const sendImageHandler = async () => {
        setSending(true)
        const acceptForm = await sendUserFile(token, id, images.img1)
        const selfie = await sendUserFile(token, id, images.img2)
        const idCard = await sendUserFile(token, id, images.img3)

        if (acceptForm.status === 200 && selfie.status === 200 && idCard.status === 200) {
            let panelToken = await getToken()
            panelToken = parsePanelToken(panelToken.data)
            let userInfo = await getUser(panelToken.panelAccessToken, "id", id)
            if (userInfo.status === 200) {
                userInfo = userInfo.data.find(user => user.id === id)
            }
            const update = await sendUpdateProfileReq(panelToken.panelAccessToken, userInfo.id,
                {
                    ...userInfo.attributes,
                    acceptForm: acceptForm.data.path,
                    selfie: selfie.data.path,
                    idCard: idCard.data.path,
                }
            )
            setSending(false)
            if (update.status === 204) {
                await addToKycGroup(panelToken.panelAccessToken , id)
                props.nextStep()
            }
        }
        setSending(false)



    }





    return (
        <div
            className={`container card-background card-border column ${classes.container}`}>
            <div
                className={`column border-bottom jc-center card-header-bg px-1 py-1 ${classes.header}`}>
                <div className="row jc-start ">
                    <h3>{t("SendPhotosStep.title")}</h3>
                </div>
            </div>
            <div
                className={`container column jc-between px-1 py-2 ${classes.content}`}>
                <div className="column">
                    <span>برای تکمیل احراز هویت لطفا مراحل زیر را انجام دهید!</span>
                    <span>
            1) متن اعلام رضایت به استفاده از خدمات را بر روی یک کاغذ A4 نوشته ،
            امضا کنید و از آن عکس بگیرید{" "}
                        <span className="cursor-pointer hover-text">
              {" "}
                            (متن اعلام رضایت...)
            </span>
          </span>
                    <span>
            2) یک سلفی از خودتان در حالتی که برگه اعلام رضایت را در مقابل خود
            نگه داشته اید بگیرید{" "}
                        <span className="cursor-pointer hover-text">
              (مطابق تصویر نمونه...)
            </span>
          </span>
                    <span>
            3) یک سلفی از خودتان در حالتی که شناسنامه یا کارت ملی را در مقابل
            خود نگه داشته اید بگیرید{" "}
                        <span className="cursor-pointer hover-text">
              (مطابق تصویر نمونه...)
            </span>
          </span>

                    <div className={`row jc-between ai-start mt-2`}>

                        {sending ?
                            <div className={`container flex jc-center ai-center`} style={{height: "30vh"}}>
                                <span className={`flashit`}>در حال ارسال اطلاعات...</span>
                            </div>
                        :
                            <Fragment>
                            <ImageInput
                            zoneCustomClass={classes.zoneBox}
                            title={t("SendPhotosStep.textTitle")}
                            onchange={(url) => setImages({...images, img1: url})}
                            />
                            <ImageInput
                            zoneCustomClass={classes.zoneBox}
                            title={t("SendPhotosStep.textSelfiTitle")}
                            onchange={(url) => setImages({...images, img2: url})}
                            />
                            <ImageInput
                            zoneCustomClass={classes.zoneBox}
                            title={t("SendPhotosStep.nationalCardTitle")}
                            onchange={(url) => setImages({...images, img3: url})}
                            />
                            </Fragment>
                        }
                    </div>
                </div>

                <div className="row pt-1 jc-between">
                    <div className={`column`}>
            <span>
              - لطفا عکس ها را فقط با فرمت " JPEG " و " PNG " آپلود کنید!
            </span>
                        <span>
              - حداکثر حجم قابل قبول برای آپلود عکس ها ، 1 مگابایت است!
            </span>
                    </div>
                    <div className={`row jc-end col-50 ai-end`}>
                        <Button
                            buttonClass={`${classes.thisButton} ${classes.prev} ml-05`}
                            onClick={props.prevStep}
                            buttonTitle={t("prevStep")}
                        />
                        <Button
                            buttonClass={`${classes.thisButton} ${classes.next}`}
                            onClick={sendImageHandler}
                            buttonTitle={t("nextStep")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendPhotosStep;
