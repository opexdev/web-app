import React, {useEffect, useState} from "react";
import classes from "./PersonalProfileStep.module.css";
import {useTranslation} from "react-i18next";
import TextInput from "../../../../../../../../../../components/TextInput/TextInput";
import Button from "../../../../../../../../../../components/Button/Button";
import {useSelector} from "react-redux";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import {
    getToken,
    getUser,
    parsePanelToken,
    sendUpdateProfileReq
} from "../../../../../../../../../../pages/Login/api/auth";


const PersonalProfileStep = (props) => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(true)
    const username = useSelector(state => state.auth.username);
    const token = useSelector(state => state.auth.accessToken);
    const [profile, setProfile] = useState({
        firstNameEn: "",
        lastNameEn: "",
        firstNameMain: "",
        lastNameMain: "",
        nationality: "",
        residence: "",
        birthday: "",
        birthdayAlt: "",
        nationalID: "",
        passportNumber: "",
        phoneNumber: "",
        telephone: "",
        email: "",
        postalCode: "",
        address: "",
    });
    const countries = [
        {value: "iran", label: t('country.iran')},
        {value: "germany", label: t('country.germany')},
        {value: "uk", label: t('country.uk')},
        {value: "turkey", label: t('country.turkey')},
    ]

    useEffect(async () => {
        let panelToken = await getToken()
        panelToken = parsePanelToken(panelToken.data)

        let userInfo = await getUser(panelToken.panelAccessToken, "username", username)
        if (userInfo.status === 200) {
            userInfo = userInfo.data.find(user => user.username === username)
        }
        setProfile({
            firstNameEn: userInfo.attributes.firstNameEn ? userInfo.attributes.firstNameEn[0] : "",
            lastNameEn: userInfo.attributes.lastNameEn ?  userInfo.attributes.lastNameEn[0] : "",
            firstNameMain: userInfo.attributes.firstNameMain ? userInfo.attributes.firstNameMain[0] : "",
            lastNameMain: userInfo.attributes.lastNameMain ?  userInfo.attributes.lastNameMain[0] : "",
            nationality: userInfo.attributes.nationality ?  userInfo.attributes.nationality[0] : "",
            residence: userInfo.attributes.residence ?  userInfo.attributes.residence[0] : "",
            birthday: userInfo.attributes.birthday ?  userInfo.attributes.birthday[0] : "",
            birthdayAlt: userInfo.attributes.birthdayAlt ? userInfo.attributes.birthdayAlt[0] : "",
            nationalID:  userInfo.attributes.nationalID ? userInfo.attributes.nationalID[0] : "",
            passportNumber: userInfo.attributes.passportNumber ?  userInfo.attributes.passportNumber[0] : "",
            phoneNumber:  userInfo.attributes.phoneNumber ? userInfo.attributes.phoneNumber[0] : "",
            telephone:  userInfo.attributes.telephone ? userInfo.attributes.telephone[0] : "",
            email:  userInfo.attributes.email ? userInfo.attributes.email[0] : "",
            postalCode:  userInfo.attributes.postalCode ? userInfo.attributes.postalCode[0] : "",
            address:  userInfo.attributes.address ? userInfo.attributes.address[0] : "",
        })
        setIsLoading(false)
    }, [])

    const sendProfile = async () => {
        setIsLoading(true)
        let panelToken = await getToken()
        panelToken = parsePanelToken(panelToken.data)

        let userInfo = await getUser(panelToken.panelAccessToken, "username", username)
        if (userInfo.status === 200) {
            userInfo = userInfo.data.find(user => user.username === username)
        }
        const update = await sendUpdateProfileReq(panelToken.panelAccessToken, userInfo.id, attributeHandler(userInfo))
        if (update.status === 204) {
            props.nextStep()
        }
        setIsLoading(false)
    }

    const attributeHandler = (userInfo) => {
        return {
            ...userInfo.attributes,
            ...profile
        }
    }

    return (
        <div
            className={`container card-background card-border column ${classes.container}`}>
            <div
                className={`column border-bottom jc-center card-header-bg px-1 py-1 ${classes.header}`}>
                <div className="row jc-start ">
                    <h3>{t("PersonalProfileStep.title")}</h3>
                </div>
            </div>
            {isLoading ? <Loading/> :
                <div
                    className={`column jc-between ai-center px-1 py-2 ${classes.content}`}>
                    <div className="row jc-between">
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.firstNameEn')}
                                type="text"
                                value={profile.firstNameEn}
                                onchange={(e) =>
                                    setProfile({...profile, firstNameEn: e.target.value})
                                }
                            />
                        </div>
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.lastNameEn')}
                                type="text"
                                value={profile.lastNameEn}
                                onchange={(e) =>
                                    setProfile({...profile, lastNameEn: e.target.value})
                                }
                            />
                        </div>
                    </div>
                    <div className="row jc-between">
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.firstNameMain')}
                                type="text"
                                value={profile.firstNameMain}
                                onchange={(e) =>
                                    setProfile({...profile, firstNameMain: e.target.value})
                                }
                            />
                        </div>
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.lastNameMain')}
                                type="text"
                                value={profile.lastNameMain}
                                onchange={(e) =>
                                    setProfile({...profile, lastNameMain: e.target.value})
                                }
                            />
                        </div>
                    </div>
               {/*     <div className="row jc-between">
                        <div className="col-49">
                            <TextInput
                                select={true}
                                placeholder={t('PersonalProfile.selectNationality')}
                                options={countries}
                                lead={t('PersonalProfile.nationality')}
                                type="text"
                                onchange={(e) => setProfile({...profile, nationality: e.value})}
                            />
                        </div>
                        <div className="col-49">
                            <TextInput
                                select={true}
                                placeholder={t('PersonalProfile.selectResidence')}
                                lead={t('PersonalProfile.residence')}
                                type="text"
                                value={profile.residence}
                                onchange={(e) =>
                                    setProfile({...profile, residence: e.target.value})
                                }
                            />
                        </div>
                    </div>*/}
                    <div className="row jc-between">
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.birthday')}
                                type="text"
                                value={profile.birthday}
                                onchange={(e) =>
                                    setProfile({...profile, birthday: e.target.value})
                                }
                            />
                        </div>
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.birthdayAlt')}
                                type="text"
                                value={profile.birthdayAlt}
                                onchange={(e) =>
                                    setProfile({...profile, birthdayAlt: e.target.value})
                                }
                            />
                        </div>
                    </div>
                    <div className="row jc-between">
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.nationalID')}
                                type="text"
                                value={profile.nationalID}
                                onchange={(e) =>
                                    setProfile({...profile, nationalID: e.target.value})
                                }
                            />
                        </div>
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.passportNumber')}
                                type="text"
                                value={profile.passportNumber}
                                onchange={(e) =>
                                    setProfile({...profile, passportNumber: e.target.value})
                                }
                            />
                        </div>
                    </div>
                    <div className="row jc-between">
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.phoneNumber')}
                                type="text"
                                value={profile.phoneNumber}
                                onchange={(e) =>
                                    setProfile({...profile, phoneNumber: e.target.value})
                                }
                            />
                        </div>
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.telephone')}
                                type="text"
                                value={profile.telephone}
                                onchange={(e) =>
                                    setProfile({...profile, telephone: e.target.value})
                                }
                            />
                        </div>
                    </div>
                    <div className="row jc-between">
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.email')}
                                type="email"
                                value={profile.email}
                                onchange={(e) => setProfile({...profile, email: e.target.value})}
                            />
                        </div>
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.postalCode')}
                                type="text"
                                value={profile.postalCode}
                                onchange={(e) =>
                                    setProfile({...profile, postalCode: e.target.value})
                                }
                            />
                        </div>
                    </div>
                    <div className="row jc-between ">
                        <div className="col-100">
                            <TextInput
                                lead={t('PersonalProfile.address')}
                                customClass={classes.addressInput}
                                type="text"
                                value={profile.address}
                                onchange={(e) =>
                                    setProfile({...profile, address: e.target.value})
                                }
                            />
                        </div>
                    </div>
                    <div className="row pt-1 jc-end">
                        <Button
                            buttonClass={`${classes.thisButton} ${classes.prev} ml-05`}
                            onClick={props.prevStep}
                            buttonTitle={t("prevStep")}
                        />
                        <Button
                            buttonClass={`${classes.thisButton} ${classes.next}`}
                            onClick={sendProfile}
                            buttonTitle={t("nextStep")}
                        />
                    </div>
                </div>
            }
        </div>
    );
};

export default PersonalProfileStep;