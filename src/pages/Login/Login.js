import React, {useState} from "react";
import {useSelector} from "react-redux";
import classes from "./Login.module.css";
import {images} from "../../assets/images";
import AccordionBox from "../../components/AccordionBox/AccordionBox";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

const Login = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const [forgetPassword, setForgetPassword] = useState(false);
    const isLogin = useSelector((state) => state.auth.isLogin)

    if (isLogin) history.push("/")

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
        <div className={`container row col-100 ai-center jc-center px-1 ${classes.container} ${classes.moveImage}`}
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
                        {t('login.description')}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Login;