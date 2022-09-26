import React from "react";
import classes from "./Login.module.css";
import {images} from "../../../../assets/images";
import AccordionBox from "../../../../components/AccordionBox/AccordionBox";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import {useTranslation} from "react-i18next";

const Login = () => {
    const {t} = useTranslation();

    const data = [
        {
            id: 1,
            title: t('signIn'),
            body: <LoginForm/>
        },
        {id: 2, title: t('signUp'), body: <RegisterForm/>},
    ];

    return (
        <div className={`width-100 row col-100 ai-center jc-center px-1 ${classes.container} move-image`}
             style={{backgroundImage: `url("${images.spaceStar}")`}}>
            <div className={`col-60  flex jc-center ai-center `} style={{height: "100%"}}>
                <div className={`${classes.content}`}>
                    <AccordionBox title={t('login.title')} content={data}/>
                </div>
            </div>
            <div className={`col-40 column ai-center jc-center ${classes.intro} move-image`}>
                <div className={`column jc-center ai-center ${classes.bgicon}`}>
                    <img src={images.astronaut} alt="logo" className={`floating`}/>
                    <h1 className="pt-1">
                        {t('login.description')}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Login;