import React, {useEffect, useState} from "react";
import classes from "./PersonalProfileStep.module.css";
import {Trans, useTranslation} from "react-i18next";
import TextInput from "../../../../../../../../../../../../components/TextInput/TextInput";
import Button from "../../../../../../../../../../../../components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../../../../../../../../../../components/Loading/Loading"
import {changeUserInfo} from "../../../../../../../../../../../../store/actions";
import moment from "moment-jalaali";
import {isValidNationalCode} from "../../../../../../../../../../../../utils/utils";
import {getUserAttributes, setUserProfileAttributes} from "js-api-client";

const PersonalProfileStep = (props) => {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState([])
    const dispatch = useDispatch();
    const email = useSelector((state) => state.auth.email)

    const [profile, setProfile] = useState({
        firstName: {value: "", error: []},
        lastName: {value: "", error: []},
        nationality: {value: "", error: []},
        residence: {value: "", error: []},
        birthday: {value: "", error: []},
        idNumber: {value: "", error: []},
        mobile: {value: "", error: []},
        postalCode: {value: "", error: []},
        address: {value: "", error: []},
    });
    const countries = [
        {value: "iran", label: t('country.iran')},
        {value: "germany", label: t('country.germany')},
        {value: "uk", label: t('country.uk')},
        {value: "turkey", label: t('country.turkey')},
    ]

    const convertUserInfoToState = (info) => {
        const newState = {...profile}
        for (const [key, value] of Object.entries(info)) {
            newState[key] = {value: value, error: []}
        }
        setProfile(newState)
    }

    const convertStateToUserInfo = () => {
        const newState = {}
        for (const [key, value] of Object.entries(profile)) {
            newState[key] = value.value
        }
        return newState
    }

    const getUser = () => {
        setLoading(true)
        setError([])
        getUserAttributes().then((res) => {
            convertUserInfoToState(res.data)
        }).catch(() => {
            setError([t("PersonalProfileStep.serverError")])
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        getUser()
    }, [])

    const sendProfile = async () => {
        if (!isFormValid()) return
        setLoading(true)

        const data = convertStateToUserInfo()
        delete data.email;
        delete data.username;
        delete data.selfiePath;
        delete data.idCardPath;
        delete data.acceptFormPath;

        setUserProfileAttributes(data)
            .then(() => {
                setError([])
                dispatch(changeUserInfo(profile.firstName.value, profile.lastName.value))
                props.nextStep()
            })
            .catch(() => {
                setError([t("PersonalProfileStep.serverError")])
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const inputHandler = (e) => {
        let errorMessage = []
        let inputVal = e.target.value
        if (typeof e.target.dataset?.min && inputVal.length < e.target.dataset.min) {
            errorMessage.push(<Trans
                i18nKey="PersonalProfileStep.minInput"
                values={{
                    name: t("PersonalProfile." + e.target.dataset.name),
                    min: e.target.dataset.min
                }}
            />)
        }
        if (typeof e.target.dataset?.max && inputVal.length >= e.target.dataset.max) {
            errorMessage.push(<Trans
                i18nKey="PersonalProfileStep.maxInput"
                values={{
                    name: t("PersonalProfile." + e.target.dataset.name),
                    max: e.target.dataset.max
                }}
            />)
        }
        if (e.target.dataset?.type === "dateJ" && (!moment(inputVal, "jYYYY/jMM/jDD").isValid() || moment(inputVal, "jYYYY/jMM/jDD").isAfter())) {
            errorMessage.push(t("PersonalProfileStep.wrongDateJ"))
        }
        if (e.target.dataset?.type === "dateG" && (!moment(inputVal, ["YYYY/MM/DD", "YYYY/M/D"], true) || moment(inputVal, ["YYYY/MM/DD", "YYYY/M/D"], true).isAfter())) {
            errorMessage.push(t("PersonalProfileStep.wrongDateG"))
        }
        if (e.target.dataset?.type === "nationalId" && !isValidNationalCode(inputVal)) {
            inputVal = inputVal.replace(/[^0-9]+/g, "")
            errorMessage.push(t("PersonalProfileStep.wrongNationalId"))
        }
        if (e.target.dataset?.type === "mobile" || e.target.dataset?.type === "telephone" || e.target.dataset?.type === "postalCode") {
            inputVal = inputVal.replace(/[^0-9]+/g, "")
        }
        setProfile({
            ...profile,
            [e.target.dataset.name]: {value: inputVal, error: errorMessage}
        })
    }

    const isFormValid = () => {
        let inputs = {...profile}
        const hasError = Object.values(profile).find(input => input.error.length > 0)
        if (hasError) return false
        let isEmpty = false
        for (const key in inputs) {
            if (inputs[key].value.length === 0) {
                isEmpty = true
                inputs = {
                    ...inputs,
                    [key]: {
                        ...inputs[key],
                        error: [<Trans
                            i18nKey="PersonalProfileStep.emptyInput"
                            values={{
                                name: t("PersonalProfile." + key),
                            }}
                        />]
                    }
                }
            }
        }
        setProfile(inputs);
        return !isEmpty;
    }

    return (
        <div
            className={`container card-bg card-border column ${classes.container}`}>
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
                        <TextInput
                            lead={t('PersonalProfile.firstName')}
                            type="text"
                            value={profile.firstName.value}
                            customClass={`col-49`}
                            data-name="firstName"
                            data-type="input"
                            data-min={2}
                            onchange={(e) => inputHandler(e)}
                            alerts={profile.firstName.error}
                        />
                        <TextInput
                            lead={t('PersonalProfile.lastName')}
                            type="text"
                            value={profile.lastName.value}
                            customClass={`col-49`}
                            data-name="lastName"
                            data-type="input"
                            data-min={2}
                            onchange={(e) => inputHandler(e)}
                            alerts={profile.lastName.error}
                        />
                    </div>
                    <div className="row jc-between">
                        <TextInput
                            select={true}
                            placeholder={t('PersonalProfile.selectNationality')}
                            customClass={`col-49`}
                            options={countries}
                            defaultValue={countries.filter((v) => v.value === profile.nationality.value)}
                            lead={t('PersonalProfile.nationality')}
                            type="select"
                            onchange={(e) => setProfile({...profile, nationality: {value: e.value, error: []}})}
                            alerts={profile.nationality.error}
                        />
                        <TextInput
                            select={true}
                            placeholder={t('PersonalProfile.selectResidence')}
                            customClass={`col-49`}
                            lead={t('PersonalProfile.residence')}
                            defaultValue={countries.filter((v) => v.value === profile.residence.value)}
                            type="select"
                            options={countries}
                            onchange={(e) => setProfile({...profile, residence: {value: e.value, error: []}})}
                            alerts={profile.residence.error}
                        />
                    </div>
                    <div className="row jc-between">
                        <TextInput
                            lead={t('PersonalProfile.birthday')}
                            type="text"
                            placeholder={t('PersonalProfileStep.yy/mm//dd')}
                            customClass={`col-49`}
                            ltr={true}
                            value={profile.birthday.value}
                            data-name="birthday"
                            data-type="birthday"
                            onchange={(e) => inputHandler(e)}
                            alerts={profile.birthday.error}
                        />
                        <TextInput
                            lead={t('PersonalProfile.idNumber')}
                            placeholder={t('PersonalProfile.idNumberPlaceHolder')}
                            type="text"
                            value={profile.idNumber.value}
                            customClass={`col-49 fs-0-9`}
                            data-name="idNumber"
                            data-type="idNumber"
                            onchange={(e) => inputHandler(e)}
                            alerts={profile.idNumber.error}
                            //maxLength="10"
                        />
                    </div>
                    <div className="row jc-between">
                        <TextInput
                            lead={t('PersonalProfile.mobile')}
                            type="text"
                            customClass={`col-49`}
                            ltr={true}
                            value={profile.mobile.value}
                            data-name="mobile"
                            data-type="mobile"
                            onchange={(e) => inputHandler(e)}
                            alerts={profile.mobile.error}
                        />
                        <TextInput
                            lead={t('PersonalProfile.postalCode')}
                            type="text"
                            customClass={`col-49`}
                            ltr={true}
                            value={profile.postalCode.value}
                            data-name="postalCode"
                            data-type="postalCode"
                            onchange={(e) => inputHandler(e)}
                            alerts={profile.postalCode.error}
                        />
                    </div>
                    <div className="row jc-between">
                        <TextInput
                            lead={t('PersonalProfile.email')}
                            type="email"
                            disabled={true}
                            value={email}
                            customClass={`${classes.email} col-49`}
                        />
                    </div>
                    <div className="row jc-between ">
                        <TextInput
                            lead={t('PersonalProfile.address')}
                            type="text"
                            customClass={`${classes.addressInput} col-100`}
                            ltr={true}
                            value={profile.address.value}
                            data-name="address"
                            data-type="address"
                            onchange={(e) => inputHandler(e)}
                            alerts={profile.address.error}
                        />
                    </div>
                    <div className="row pt-1 jc-between">
                        <div className={`col-50 flex jc-start ai-end`}>
                            <span className={` text-red fs-0-8 cursor-pointer`}
                                  onClick={getUser}>{error.length !== 0 && error}</span>
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