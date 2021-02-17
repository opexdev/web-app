import React, {Fragment, useState, useEffect} from 'react';
import classes from "./PersonalProfile.module.css"
import ScrollBar from "../../../components/ScrollBar";
import AccordionBox from "../../../components/AccordionBox/AccordionBox";
import moment from "moment-jalaali";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

import {MyOrderCurrentData, MyOrderStopData, MyOrderHistoryData, MyOrderTradeData} from "../../../FakeData/FakeData";
import Icon from "../../../components/Icon/Icon";
import TextInput from "../../../components/TextInput/TextInput";

const PersonalProfile = (props) => {

    const [proile, setProfile] = useState({
        firstNameEn:"",
        lastNameEn:"",
        firstNameMain:"",
        lastNameMain:"",
        nationality:"",
        residence:"",
        DateOfBirth:"",
        DateOfBirthAlt:"",
        nationalID:"",
        passportNumber:"",
        phoneNumber:"",
        telephone:"",
        email:"",
        postalCode:"",
        address:"",

    })

    const {t} = useTranslation();
    const [openItem, setOpenItem] = useState({
        current: null,
        history: null,
        trade: null
    })
    const [customData, setCustomData] = useState({
        current: [],
        history: [],
        trade: [],
        stop: []
    })
    useEffect(() => {
        setCustomData({
            current: MyOrderCurrentData(),
            stop: MyOrderStopData(),
            history: MyOrderHistoryData(),
            trade: MyOrderTradeData()
        })
    }, [])

    const profileContent = <div className={`column jc-between ai-center ${classes.content} `}>

        <div className="row jc-between">
            <div className="col-49">
                <TextInput
                    lead="نام (انگلیسی)"
                    type="text"
                    value={proile.firstNameEn}
                    onchange={(e)=> setProfile({...proile,firstNameEn: e.target.value})}
                />
            </div>
            <div className="col-49">
                <TextInput
                    lead="نام خانوادگی (انگلیسی)"
                    type="text"
                    value={proile.lastNameEn}
                    onchange={(e)=> setProfile({...proile,lastNameEn: e.target.value})}
                />
            </div>
        </div>
        <div className="row jc-between">
            <div className="col-49">
                <TextInput
                    lead="نام (زبان اصلی)"
                    type="text"
                    value={proile.firstNameMain}
                    onchange={(e)=> setProfile({...proile,firstNameMain: e.target.value})}
                />
            </div>
            <div className="col-49">
                <TextInput
                    lead="نام خانوادگی (زبان اصلی)"
                    type="text"
                    value={proile.lastNameMain}
                    onchange={(e)=> setProfile({...proile,lastNameMain: e.target.value})}
                />
            </div>
        </div>
        <div className="row jc-between">
            <div className="col-49">
                <TextInput
                    lead="ملیت"
                    type="text"
                    value={proile.nationality}
                    onchange={(e)=> setProfile({...proile,nationality: e.target.value})}
                />
            </div>
            <div className="col-49">
                <TextInput
                    lead="محل اقامت"
                    type="text"
                    value={proile.residence}
                    onchange={(e)=> setProfile({...proile,residence: e.target.value})}
                />
            </div>
        </div>
        <div className="row jc-between">
            <div className="col-49">
                <TextInput
                    lead="تاریخ تولد (میلادی)"
                    type="text"
                    value={proile.DateOfBirth}
                    onchange={(e)=> setProfile({...proile,DateOfBirth: e.target.value})}
                />
            </div>
            <div className="col-49">
                <TextInput
                    lead="تاریخ تولد (غیرمیلادی)"
                    type="text"
                    value={proile.DateOfBirthAlt}
                    onchange={(e)=> setProfile({...proile,DateOfBirthAlt: e.target.value})}
                />
            </div>
        </div>
        <div className="row jc-between">
            <div className="col-49">
                <TextInput
                    lead="شناسه ملی"
                    type="text"
                    value={proile.nationalID}
                    onchange={(e)=> setProfile({...proile,nationalID: e.target.value})}
                />
            </div>
            <div className="col-49">
                <TextInput
                    lead="شماره پاسپورت"
                    type="text"
                    value={proile.passportNumber}
                    onchange={(e)=> setProfile({...proile,passportNumber: e.target.value})}
                />
            </div>
        </div>
        <div className="row jc-between">
            <div className="col-49">
                <TextInput
                    lead="تلفن همراه"
                    type="text"
                    value={proile.phoneNumber}
                    onchange={(e)=> setProfile({...proile,phoneNumber: e.target.value})}
                />
            </div>
            <div className="col-49">
                <TextInput
                    lead="تلفن ثابت"
                    type="text"
                    value={proile.telephone}
                    onchange={(e)=> setProfile({...proile,telephone: e.target.value})}
                />
            </div>
        </div>
        <div className="row jc-between">
            <div className="col-49">
                <TextInput
                    lead="پست الکترونیک"
                    type="email"
                    value={proile.email}
                    onchange={(e)=> setProfile({...proile,email: e.target.value})}
                />
            </div>
            <div className="col-49">
                <TextInput
                    lead="کد پستی"
                    type="text"
                    value={proile.postalCode}
                    onchange={(e)=> setProfile({...proile,postalCode: e.target.value})}
                />
            </div>
        </div>
        <div className="row jc-between ">
            <div className="col-100">
                <TextInput
                    lead="آدرس"
                    customClass={classes.addressInput}
                    type="text"
                    value={proile.address}
                    onchange={(e)=> setProfile({...proile,address: e.target.value})}
                />
            </div>
        </div>
    </div>


    const data = [
        {id: 1, title: t('PersonalProfile.title'), body: profileContent },
        {id: 2, title: t('PersonalProfile.userLevel/fee'), body: "" },
    ]

    return (
        <div className="container py-2">
            <div className={`container card-background card-border column ${classes.container}`}>
                <AccordionBox title={t('PersonalProfile.title')} content={data} safari={classes.safariFlexSize}/>
            </div>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        activePair: state.global.activePair,
    }
}

export default connect(mapStateToProps, null)(PersonalProfile);
