import React, {useEffect, useState} from "react";
import classes from "./PersonalProfileStep.module.css";
import {useTranslation} from "react-i18next";
import TextInput from "../../../../../../../../../../components/TextInput/TextInput";
import Button from "../../../../../../../../../../components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../../../../../../../../components/Loading/Loading"
import {addAttributes, getAttributes} from "../../api/kyc";
import {changeUserInfo} from "../../../../../../../../../../store/actions/auth";


const PersonalProfileStep = (props) => {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState([])
    const dispatch = useDispatch();



    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        firstNameMain: "",
        lastNameMain: "",
        nationality: "",
        residence: "",
        birthdayJ: "",
        birthdayG: "",
        nationalId: "",
        passportNumber: "",
        mobile: "",
        telephone: "",
        postalCode: "",
        address: "",
      /*  email: "",*/
    });
    const countries = [
        {value: "iran", label: t('country.iran')},
        {value: "germany", label: t('country.germany')},
        {value: "uk", label: t('country.uk')},
        {value: "turkey", label: t('country.turkey')},
    ]

    const userInfoReq = async () => {
        setLoading(true)
        setError([])
        const userInfo = await getAttributes()
        if (userInfo && userInfo.status === 200) {
            /*if (isEn(userInfo.data.firstName)) {
                console.log("en")
            }*/
            setProfile(userInfo.data)
            setLoading(false)
            setError([])
        } else {
            setError([t("PersonalProfileStep.serverError")])
        }
    }

    useEffect(async () => {
        userInfoReq()
    }, [])

    const sendProfile = async () => {
        setLoading(true)
        delete profile.email;
        delete profile.username;
        delete profile.selfiePath;
        delete profile.idCardPath;
        delete profile.acceptFormPath;
        const addAttributesReq = await addAttributes(profile)
        if (addAttributesReq && addAttributesReq.status === 204) {
            setLoading(false)
            setError([])
            dispatch(changeUserInfo(profile.firstName, profile.lastName))
            props.nextStep()
        } else {
            setLoading(false)
            setError([t("PersonalProfileStep.serverError")])
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
            {loading ? <Loading/> :
                <div
                    className={`column jc-between ai-center px-1 py-2 ${classes.content}`}>
                    <div className="row jc-between">
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.firstName')}
                                type="text"
                                value={profile.firstName}
                                onchange={(e) =>
                                    setProfile({...profile, firstName: e.target.value})
                                }
                            />
                        </div>
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.lastName')}
                                type="text"
                                value={profile.lastName}
                                onchange={(e) =>
                                    setProfile({...profile, lastName: e.target.value})
                                }
                            />
                        </div>
                    </div>
                    {/*

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

                    */}
                  <div className="row jc-between">
                        <div className="col-49">
                            <TextInput
                                select={true}
                                placeholder={t('PersonalProfile.selectNationality')}
                                options={countries}
                                defaultValue={countries.filter((v)=>v.value === profile.nationality)}
                                lead={t('PersonalProfile.nationality')}
                                type="select"
                                onchange={(e) => setProfile({...profile, nationality: e.value})}
                            />
                        </div>
                        <div className="col-49">
                            <TextInput
                                select={true}
                                placeholder={t('PersonalProfile.selectResidence')}
                                lead={t('PersonalProfile.residence')}
                                defaultValue={countries.filter((v)=>v.value === profile.residence)}
                                type="select"
                                options={countries}
                                onchange={(e) =>
                                    setProfile({...profile, residence: e.value})
                                }
                            />
                        </div>
                    </div>
                    <div className="row jc-between">
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.birthdayJ')}
                                type="text"
                                value={profile.birthdayJ}
                                onchange={(e) =>
                                    setProfile({...profile, birthdayJ: e.target.value})
                                }
                            />
                        </div>
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.birthdayG')}
                                type="text"
                                value={profile.birthdayG}
                                onchange={(e) =>
                                    setProfile({...profile, birthdayG: e.target.value})
                                }
                            />
                        </div>
                    </div>
                    <div className="row jc-between">
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.nationalId')}
                                type="text"
                                value={profile.nationalId}
                                onchange={(e) =>
                                    setProfile({...profile, nationalId: e.target.value})
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
                                lead={t('PersonalProfile.mobile')}
                                type="text"
                                value={profile.mobile}
                                onchange={(e) =>
                                    setProfile({...profile, mobile: e.target.value})
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
                                disabled={true}
                                value={profile.email}
                                customClass={`${classes.email}`}
                                //onchange={(e) => setProfile({...profile, email: e.target.value})}
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
                    <div className="row pt-1 jc-between">
                        <div className={`col-50 flex jc-start ai-end`}>
                            <span className={` text-red font-size-sm-plus cursor-pointer`} onClick={()=>userInfoReq()}>{error.length !== 0 && error}</span>
                        </div>
                        <div className={`col-50 row jc-end ai-center`}>
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
                </div>
            }
        </div>
    );
};

export default PersonalProfileStep;
