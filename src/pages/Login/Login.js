import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import classes from "./Login.module.css";
import {images} from "../../assets/images";
import AccordionBox from "../../components/AccordionBox/AccordionBox";
import {loadConfig, login, setLoginInitiate, setThemeInitiate} from "../../store/actions";
import i18n from "i18next";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import {useTranslation} from "react-i18next";

const Login = (props) => {
    const {t} = useTranslation();
    const [ltr, setLtr] = useState(false);
    const [forgetPassword, setForgetPassword] = useState(false);

    useEffect(() => {
        props.onLoad();
        i18n.language !== "fa" ? setLtr(true) : setLtr(false);
        i18n.on("languageChanged", (lng) => {
            lng !== "fa" ? setLtr(true) : setLtr(false);
        });
    }, []);


    const data = [
        {
            id: 1,
            title: t('signIn'),
            body: forgetPassword ? <ForgetPassword forgetPass={() => setForgetPassword(false)}/> :
                <LoginForm forgetPass={() => setForgetPassword(true)}/>

        },
        {id: 2, title: t('signUp'), body: <RegisterForm/>},
    ];

    return (
        <div className={`container row col-100 ai-center jc-center px-1 
        ${classes.container} ${classes.moveImage} ${props.isDark ? "dark" : ""} ${ltr ? "ltr" : "rtl"}`}
             style={{backgroundImage: `url("${images.spaceStar}")`}}>
            <div className={`col-60  flex jc-center ai-center `} style={{height: "100%"}}>
                <div className={`${classes.content}`}>
                    <AccordionBox title={t('login.title')} content={data}/>
                </div>
            </div>
            <div className={`col-40 column ai-center jc-center ${classes.intro} ${classes.moveImage}`}>
                <div className={`column jc-center ai-center ${classes.bgicon}`}>
                    <img src={images.astronaut} alt="logo"/>
                    <h1 className="pt-1">
                        OPen source EXchange
                    </h1>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        isDark: state.global.isDark,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(loadConfig()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


