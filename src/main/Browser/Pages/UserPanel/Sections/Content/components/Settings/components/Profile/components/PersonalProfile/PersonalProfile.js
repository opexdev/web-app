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
            className={`container card-background card-border column ${classes.container}`}>
            <div
                className={`column border-bottom jc-center card-header-bg px-1 py-1 ${classes.header}`}>
                <div className="row jc-between ">
                    <h3>{t("PersonalProfile.title")}</h3>
                    <span className={`text-green font-size-sm`}>{t("PersonalProfile.cantEdit")}</span>
                </div>
            </div>
            {isLoading ? <Loading/> :
                <div
                    className={`column jc-between ai-center px-1 py-2 ${classes.content}`}>
                    <div className="row jc-between">
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.firstName')}
                                type="text"
                                disabled={true}
                                value={profile.firstName}
                            />
                        </div>
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.lastName')}
                                type="text"
                                disabled={true}
                                value={profile.lastName}
                            />
                        </div>
                    </div>
                    <div className="row jc-between">
                        <div className="col-49">
                            <TextInput
                                select={true}
                                placeholder={t('PersonalProfile.selectNationality')}
                                options={countries}
                                defaultValue={countries.filter((v) => v.value === profile.nationality)}
                                lead={t('PersonalProfile.nationality')}
                                type="select"
                                isDisabled={true}
                            />
                        </div>
                        <div className="col-49">
                            <TextInput
                                select={true}
                                placeholder={t('PersonalProfile.selectResidence')}
                                lead={t('PersonalProfile.residence')}
                                defaultValue={countries.filter((v) => v.value === profile.residence)}
                                type="select"
                                isDisabled={true}
                                options={countries}
                            />
                        </div>
                    </div>
                    <div className="row jc-between">
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.birthdayJ')}
                                type="text"
                                disabled={true}
                                value={profile.birthdayJ}
                            />
                        </div>
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.birthdayG')}
                                type="text"
                                disabled={true}
                                value={profile.birthdayG}
                            />
                        </div>
                    </div>
                    <div className="row jc-between">
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.nationalId')}
                                type="text"
                                disabled={true}
                                value={profile.nationalId}
                            />
                        </div>
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.passportNumber')}
                                type="text"
                                disabled={true}
                                value={profile.passportNumber}
                            />
                        </div>
                    </div>
                    <div className="row jc-between">
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.mobile')}
                                type="text"
                                disabled={true}
                                value={profile.mobile}
                            />
                        </div>
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.telephone')}
                                type="text"
                                disabled={true}
                                value={profile.telephone}
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
                            />
                        </div>
                        <div className="col-49">
                            <TextInput
                                lead={t('PersonalProfile.postalCode')}
                                type="text"
                                disabled={true}
                                value={profile.postalCode}
                            />
                        </div>
                    </div>
                    <div className="row jc-between ">
                        <div className="col-100">
                            <TextInput
                                lead={t('PersonalProfile.address')}
                                customClass={classes.addressInput}
                                type="text"
                                disabled={true}
                                value={profile.address}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default PersonalProfile;