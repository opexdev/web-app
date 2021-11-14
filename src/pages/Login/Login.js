import React, {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import classes from "./Login.module.css";
import {images} from "../../assets/images";
import AccordionBox from "../../components/AccordionBox/AccordionBox";
import {loadConfig, setPanelTokensInitiate, setUserInfo} from "../../store/actions";
import i18n from "i18next";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import {useTranslation} from "react-i18next";
import useQuery from "../../Hooks/useQuery";
import {getToken, getUser, parsePanelToken} from "./api/auth";
import {
    getAccount,
    parseWalletsResponse
} from "../../main/Browser/Sections/SubMenu/components/WalletSubMenu/api/wallet";
import jwtDecode from "jwt-decode";
import {setImpersonateTokens, setUserAccountInfo} from "../../store/actions/auth";
import {useHistory} from "react-router-dom";

const Login = (props) => {
    const {t} = useTranslation();
    const [ltr, setLtr] = useState(false);
    const [forgetPassword, setForgetPassword] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory();

    let query = useQuery();
    const token = query.get("token");


    useEffect(() => {
        props.onLoad();
        i18n.language !== "fa" ? setLtr(true) : setLtr(false);
        i18n.on("languageChanged", (lng) => {
            lng !== "fa" ? setLtr(true) : setLtr(false);
        });
    }, []);

    const getLoginByAdminToken = async (token) => {

        dispatch(setImpersonateTokens(token))
        const jwt = jwtDecode(token)

        let panelToken = await getToken()
        panelToken = parsePanelToken(panelToken.data)
        dispatch(setPanelTokensInitiate(panelToken))

        //preferred_username
        let userInfo = await getUser(panelToken.panelAccessToken, "username", jwt.preferred_username)
        if (userInfo.status === 200) {
            userInfo = userInfo.data.find(user => user.username === jwt.preferred_username)
            dispatch(setUserInfo(userInfo))
        }
        let account = await getAccount(token)
        if (account.status === 200) {
            const parsedData = parseWalletsResponse(account.data);
            dispatch(setUserAccountInfo(parsedData))
        }

        return history.push("/");

    }

    useEffect(() =>{
        if (token){
            getLoginByAdminToken(token)
        }

    },[])

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


