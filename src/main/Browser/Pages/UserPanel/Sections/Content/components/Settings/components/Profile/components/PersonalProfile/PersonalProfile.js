import React from "react";
import classes from "./PersonalProfile.module.css";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import TextInput from "../../../../../../../../../../../../components/TextInput/TextInput";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import * as RoutesName from "../../../../../../../../../../Routes/routes";
import {useNavigate} from "react-router-dom";
import {useGetUserAttributes} from "../../../../../../../../../../../../queries";

const PersonalProfile = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const userKycStatus = useSelector(state => state.auth.kyc);
    if (userKycStatus !== "ACCEPTED") navigate(RoutesName.Security, {replace: true});

    const {data: profile, isLoading} = useGetUserAttributes()

    const countries = [
        {value: "iran", label: t('country.iran')},
        {value: "germany", label: t('country.germany')},
        {value: "uk", label: t('country.uk')},
        {value: "turkey", label: t('country.turkey')},
    ]

    return (
        <div
            className={`width-100 card-bg card-border column ${classes.container}`}>
            <div
                className={`column border-bottom jc-center card-header-bg px-1 py-1 ${classes.header}`}>
                <div className="row jc-between ">
                    <h3>{t("PersonalProfile.title")}</h3>
                    <span className={`text-green fs-0-7`}>{t("PersonalProfile.cantEdit")}</span>
                </div>
            </div>
            {isLoading ? <Loading/> :
                <div
                    className={`column jc-between ai-center px-1 py-2 ${classes.content}`}>
                    <div className="row jc-between">
                        <TextInput
                            lead={t('PersonalProfile.firstName')}
                            type="text"
                            disabled={true}
                            value={profile.firstName}
                            customClass={`col-49`}
                        />
                        <TextInput
                            lead={t('PersonalProfile.lastName')}
                            type="text"
                            disabled={true}
                            value={profile.lastName}
                            customClass={`col-49`}
                        />
                    </div>
                    <div className="row jc-between">
                        <TextInput
                            select={true}
                            placeholder={t('PersonalProfile.selectNationality')}
                            options={countries}
                            defaultValue={countries.filter((v) => v.value === profile.nationality)}
                            customClass={`col-49`}
                            lead={t('PersonalProfile.nationality')}
                            type="select"
                            isDisabled={true}
                        />
                        <TextInput
                            select={true}
                            placeholder={t('PersonalProfile.selectResidence')}
                            lead={t('PersonalProfile.residence')}
                            defaultValue={countries.filter((v) => v.value === profile.residence)}
                            customClass={`col-49`}
                            type="select"
                            isDisabled={true}
                            options={countries}
                        />
                    </div>
                    <div className="row jc-between">
                        <TextInput
                            lead={t('PersonalProfile.birthday')}
                            type="text"
                            disabled={true}
                            value={profile.birthday}
                            customClass={`col-49`}
                        />
                        <TextInput
                            lead={t('PersonalProfile.idNumber')}
                            type="text"
                            disabled={true}
                            value={profile.idNumber}
                            customClass={`col-49`}
                        />
                    </div>
                    <div className="row jc-between">
                        <TextInput
                            lead={t('PersonalProfile.mobile')}
                            type="text"
                            disabled={true}
                            value={profile.mobile}
                            customClass={`col-49`}
                        />
                        <TextInput
                            lead={t('PersonalProfile.postalCode')}
                            type="text"
                            disabled={true}
                            value={profile.postalCode}
                            customClass={`col-49`}
                        />
                    </div>
                    <div className="row jc-between">
                        <TextInput
                            lead={t('PersonalProfile.email')}
                            type="email"
                            disabled={true}
                            value={profile.email}
                            customClass={`col-49`}
                        />
                    </div>
                    <div className="row jc-between ">
                        <TextInput
                            lead={t('PersonalProfile.address')}
                            customClass={`${classes.addressInput} col-100`}
                            type="text"
                            disabled={true}
                            value={profile.address}
                        />
                    </div>
                </div>
            }
        </div>
    );
};

export default PersonalProfile;