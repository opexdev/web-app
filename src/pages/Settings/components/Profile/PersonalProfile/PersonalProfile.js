import React, {useState, useEffect} from "react";
import classes from "./PersonalProfile.module.css";
import AccordionBox from "../../../../../components/AccordionBox/AccordionBox";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {
  MyOrderCurrentData,
  MyOrderStopData,
  MyOrderHistoryData,
  MyOrderTradeData,
} from "../../../../../FakeData/FakeData";
import TextInput from "../../../../../components/TextInput/TextInput";

const PersonalProfile = (props) => {
  const [profile, setProfile] = useState({
    firstNameEn: "",
    lastNameEn: "",
    firstNameMain: "",
    lastNameMain: "",
    nationality: "",
    residence: "",
    DateOfBirth: "",
    DateOfBirthAlt: "",
    nationalID: "",
    passportNumber: "",
    phoneNumber: "",
    telephone: "",
    email: "",
    postalCode: "",
    address: "",
  });

  const {t} = useTranslation();
  const [openItem, setOpenItem] = useState({
    current: null,
    history: null,
    trade: null,
  });
  const [customData, setCustomData] = useState({
    current: [],
    history: [],
    trade: [],
    stop: [],
  });
  useEffect(() => {
    setCustomData({
      current: MyOrderCurrentData(),
      stop: MyOrderStopData(),
      history: MyOrderHistoryData(),
      trade: MyOrderTradeData(),
    });
  }, []);

  const options = [
    {value: "IRAN", label: "جمهوری اسلامی ایران"},
    {value: "Germany", label: "آلمان"},
    {value: "UK", label: "انگلیس"},
    {value: "TR", label: "ترکیه"},
    {value: "UAE", label: "امارات متحده عربی"},
  ];

  const profileContent = (
    <div className={`column jc-between ai-center ${classes.content} `}>
      <div className="row jc-between">
        <div className="col-49">
          <TextInput
            lead={t("PersonalProfile.firstNameEn")}
            type="text"
            value={profile.firstNameEn}
            onchange={(e) =>
              setProfile({...profile, firstNameEn: e.target.value})
            }
          />
        </div>
        <div className="col-49">
          <TextInput
            lead={t("PersonalProfile.lastNameEn")}
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
            lead={t("PersonalProfile.firstNameMain")}
            type="text"
            value={profile.firstNameMain}
            onchange={(e) =>
              setProfile({...profile, firstNameMain: e.target.value})
            }
          />
        </div>
        <div className="col-49">
          <TextInput
            lead={t("PersonalProfile.lastNameMain")}
            type="text"
            value={profile.lastNameMain}
            onchange={(e) =>
              setProfile({...profile, lastNameMain: e.target.value})
            }
          />
        </div>
      </div>
      <div className="row jc-between">
        <div className="col-49">
          <TextInput
            select={true}
            placeholder={t("PersonalProfile.selectNationality")}
            options={options}
            lead={t("PersonalProfile.nationality")}
            type="text"
            onchange={(e) => setProfile({...profile, nationality: e.value})}
          />
        </div>
        <div className="col-49">
          <TextInput
            placeholder={t("PersonalProfile.selectResidence")}
            lead={t("PersonalProfile.residence")}
            type="text"
            value={profile.residence}
            onchange={(e) =>
              setProfile({...profile, residence: e.target.value})
            }
          />
        </div>
      </div>
      <div className="row jc-between">
        <div className="col-49">
          <TextInput
            lead={t("PersonalProfile.dateOfBirth")}
            type="text"
            value={profile.DateOfBirth}
            onchange={(e) =>
              setProfile({...profile, DateOfBirth: e.target.value})
            }
          />
        </div>
        <div className="col-49">
          <TextInput
            lead={t("PersonalProfile.dateOfBirthAlt")}
            type="text"
            value={profile.DateOfBirthAlt}
            onchange={(e) =>
              setProfile({...profile, DateOfBirthAlt: e.target.value})
            }
          />
        </div>
      </div>
      <div className="row jc-between">
        <div className="col-49">
          <TextInput
            lead={t("PersonalProfile.nationalID")}
            type="text"
            value={profile.nationalID}
            onchange={(e) =>
              setProfile({...profile, nationalID: e.target.value})
            }
          />
        </div>
        <div className="col-49">
          <TextInput
            lead={t("PersonalProfile.passportNumber")}
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
            lead={t("PersonalProfile.phoneNumber")}
            type="text"
            value={profile.phoneNumber}
            onchange={(e) =>
              setProfile({...profile, phoneNumber: e.target.value})
            }
          />
        </div>
        <div className="col-49">
          <TextInput
            lead={t("PersonalProfile.telephone")}
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
            lead={t("PersonalProfile.email")}
            type="email"
            value={profile.email}
            onchange={(e) => setProfile({...profile, email: e.target.value})}
          />
        </div>
        <div className="col-49">
          <TextInput
            lead={t("PersonalProfile.postalCode")}
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
            lead={t("PersonalProfile.address")}
            customClass={classes.addressInput}
            type="text"
            value={profile.address}
            onchange={(e) => setProfile({...profile, address: e.target.value})}
          />
        </div>
      </div>
    </div>
  );

  const data = [
    {id: 1, title: t("PersonalProfile.title"), body: profileContent},
    {id: 2, title: t("PersonalProfile.userLevel/fee"), body: ""},
  ];

  return (
    <div className="container py-2">
      <div
        className={` card-background card-border column ${classes.container}`}>
        <AccordionBox
          title={t("PersonalProfile.title")}
          content={data}
          safari={classes.safariFlexSize}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activePair: state.global.activePair,
  };
};

export default connect(mapStateToProps, null)(PersonalProfile);
