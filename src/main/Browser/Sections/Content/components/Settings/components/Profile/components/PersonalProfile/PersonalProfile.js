import React, {useState, useEffect, Fragment} from "react";
import classes from "./PersonalProfile.module.css";
import {connect, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import TextInput from "../../../../../../../../../../components/TextInput/TextInput";
import Button from "../../../../../../../../../../components/Button/Button";
import {addAttributes, getAttributes} from "../../../Authentication/api/kyc";
import {changeUserInfo} from "../../../../../../../../../../store/actions";
import Loading from "../../../../../../../../../../components/Loading/Loading";


const PersonalProfile = (props) => {
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
      /*if (isEn(userInfo.data.firstName)) */
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
          <div className="row jc-between ">
            <h3>{t("PersonalProfile.title")}</h3>

            <span className={`text-green font-size-sm`}>{t("PersonalProfile.cantEdit")}</span>
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
                      disabled={true}
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
                      disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                      isDisabled={true}
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
                      isDisabled={true}
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
                      disabled={true}
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
                      disabled={true}
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
                      disabled={true}
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
                      disabled={true}
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
                      disabled={true}
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
                      disabled={true}
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
                      //onchange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div className="col-49">
                  <TextInput
                      lead={t('PersonalProfile.postalCode')}
                      type="text"
                      disabled={true}
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
                      disabled={true}
                      value={profile.address}
                      onchange={(e) =>
                          setProfile({...profile, address: e.target.value})
                      }
                  />
                </div>
              </div>
            </div>
        }
      </div>

  );
};

const mapStateToProps = (state) => {
  return {
    activePair: state.exchange.activePair,
  };
};

export default connect(mapStateToProps, null)(PersonalProfile);
