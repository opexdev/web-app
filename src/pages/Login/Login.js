import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import classes from "./Login.module.css";
import {images} from "../../assets/images";
import TextInput from "../../components/TextInput/TextInput";
import AccordionBox from "../../components/AccordionBox/AccordionBox";
import {loadConfig, login, setLoginInitiate, setThemeInitiate} from "../../store/actions";
import {useHistory} from "react-router-dom";
import axios from "axios";
import i18n from "i18next";
import Icon from "../../components/Icon/Icon";

const Login = (props) => {
    let history = useHistory();
    const [ltr, setLtr] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [registerStatus, setRegisterStatus] = useState(false);
    const [error, setError] = useState(false);
    const [forgetPassword, setForgetPassword] = useState(false);
    const [credential, setCredential] = useState({username: "", password: ""});

    const [signup, setSignup] = useState({
        firstName: {value: "", error: null},
        lastName: {value: "", error: null},
        username: {value: "", error: null},
        email: {value: "", error: null},
    });


    useEffect(() => {
        props.onLoad();
        i18n.language !== "fa" ? setLtr(true) : setLtr(false);
        i18n.on("languageChanged", (lng) => {
            lng !== "fa" ? setLtr(true) : setLtr(false);
        });
    }, []);


    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const params = new URLSearchParams();
        params.append('client_id', 'admin-cli');
        params.append('username', credential.username);
        params.append('password', credential.password);
        params.append('grant_type', 'password');

        axios.post('https://api.opex.dev/auth/realms/mixchange/protocol/openid-connect/token', params)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data)
                    props.login(response.data)
                    setTimeout(() => {
                        history.push("/");
                    }, 2000);
                } else {
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                }
            })
            .catch(() => {
                setLoading(false);
                setError(true)
            })

    };


    const getToken = async () => {
        const params = new URLSearchParams();
        params.append('client_id', 'account-console');
        params.append('client_secret', 'fae6f87e-5b66-435c-b5aa-fd42c7641604');
        params.append('grant_type', 'client_credentials');

        const token = await axios.post('https://api.opex.dev/auth/realms/mixchange/protocol/openid-connect/token', params)

        if (token.status === 200) {
            console.log(token)
            props.saveToken(token.data.access_token)
            return token.data.access_token
        } else {
            return false
        }
    }

    const register = async (e) => {
        e.preventDefault()
        setLoading(true);
        const token = await getToken();
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.post('https://api.opex.dev/auth/admin/realms/mixchange/users', {
                "createdTimestamp": Date.now(),
                "username": signup.username.value,
                "enabled": true,
                "totp": false,
                "emailVerified": false,
                "firstName": signup.firstName.value,
                "lastName": signup.lastName.value,
                "email": signup.email.value,
                "disableableCredentialTypes": [],
                "requiredActions": ["VERIFY_EMAIL", "UPDATE_PASSWORD"],
                "notBefore": 0,
                "access": {
                    "manageGroupMembership": true,
                    "view": true,
                    "mapRoles": true,
                    "impersonate": true,
                    "manage": true
                },
                "realmRoles": ["mb-user"]
            }).then(function (response) {
                console.log(response.data);
                setRegisterStatus(true);
                getUser(token, signup.username.value)
            }).catch(function (error) {
                console.log("Error : ", error);
            }).then(function () {
                setLoading(false);
            });

        }
    }

    const getUser = (token, username) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`https://api.opex.dev/auth/admin/realms/mixchange/users?username=${username}`,)
                .then(function (user) {
                    console.log(user);
                    sendVerifyEmail(token, user.data[0].id)
                }).catch(function (error) {
                console.log("Error : ", error);
            }).then(function () {

            });
        }
    }


    const sendVerifyEmail = (token, user_id) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.put(`https://api.opex.dev/auth/admin/realms/mixchange/users/${user_id}/send-verify-email`,)
                .then(function (user) {
                    console.log(user);
                }).catch(function (error) {
                console.log("Error : ", error);
            }).then(function () {

            });
        }
    }
    const SendResetPassword = (token, user_id) => {
        /*setLoading(true)
        setTimeout(() => {

            setLoading(false);
        }, 2000);*/
        alert("Check your email to reset your password")
    }

    const forgetPasswordForm = <form onSubmit={(e) => SendResetPassword(e)} className={`column ai-center jc-between ${classes.form}`}>
        {isLoading ?
            <div className={`flex jc-center ai-center`} style={{height: "100%"}}>
                <img
                    style={{width: "3vw", textAlign: "center"}}
                    src={images.SquareLoading}
                />
            </div>
            :
            <Fragment>
                <div className={`row jc-between ai-center ${classes.restPassHeader}`}>
                    <Icon iconName="icon-down-open font-size-md-01" customClass={`${classes.thisButton} cursor-pointer`} onClick={()=>setForgetPassword(false)}/>
                    <span>فراموشی رمز عبور</span>
                    <Icon iconName="icon-down-open font-size-md-01" customClass={`${classes.thisButton} visibility-hidden cursor-pointer`}/>
                </div>
                <div className={`container column jc-center ai-center ${classes.restPassBody}`}>
                    <TextInput
                        lead="ایمیل"
                        type="email"
                        customClass={`${classes.forgetPasswordInput}`}
                        value={forgetPassword.value}
                        onchange={(e) => setForgetPassword(e.target.value)}
                    />
                </div>
                <div className={`container flex jc-center ai-center ${classes.formFotter}`}>
                    <button type="submit"
                            className={`flex jc-center ai-center ${classes.button} ${classes.forgetPassButton}`}>
                        بازیابی رمز
                    </button>
                </div>
            </Fragment>
        }
    </form>


    const login = (
        <form onSubmit={(e) => submit(e)} className={`column ai-center jc-between ${classes.form}`}>
            {isLoading ? (
                <div className={`flex jc-center ai-center`} style={{height: "100%"}}>
                    <img
                        style={{width: "3vw", textAlign: "center"}}
                        src={images.SquareLoading}
                    />
                </div>
            ) : (
                <Fragment>
                    <div className={`container column jc-center ai-center ${classes.formBody}`}>
                        <TextInput
                            lead="نام کاربری"
                            type="text"
                            customClass={`${classes.loginInput}`}
                            value={credential.username}
                            onchange={(e) =>
                                setCredential({...credential, username: e.target.value})
                            }
                        />
                        <TextInput
                            lead={"رمز عبور"}
                            type="password"
                            customClass={`${classes.loginInput}`}
                            value={credential.password}
                            onchange={(e) =>
                                setCredential({...credential, password: e.target.value})
                            }
                        />
                        <div className={`column ${classes.forgetPassword}`}>
                            {error ?
                                <span className={`${classes.errorText} font-size-sm-plus`}>نام کاربری یا رمز عبور صحیح نمی باشد!</span> : ""}
                            <span className={`cursor-pointer flex ai-center font-size-sm-plus`}
                                  onClick={() => setForgetPassword(true)}>فراموشی رمز عبور</span>
                        </div>
                    </div>

                    <div className={`container flex jc-center ai-center ${classes.formFotter}`}>
                        <button type="submit"
                                className={`flex jc-center ai-center ${classes.button} ${classes.buyOrder}`}>
                            ورود
                        </button>
                    </div>
                </Fragment>
            )}
        </form>
    );

    const signUp = (
        <form onSubmit={(e) => register(e)} className={`column jc-between ${classes.form}`}>
            {isLoading ?
                <div className={`flex jc-center ai-center`} style={{height: "100%"}}>
                    <img
                        style={{width: "3vw", textAlign: "center"}}
                        src={images.SquareLoading}
                    />
                </div>
                :
                <Fragment>
                    {registerStatus ?
                        <div className={`column jc-center ai-center`} style={{height: "100%"}}>
                            <span>ثبت نام با موفقیت انجام شد :)</span>
                            <span>برای تکمیل ثبت نام به ایمیل ثبت شده مراجعه کنید.</span>
                        </div>
                        :
                        <Fragment>
                            <div className={`container column jc-center ai-center ${classes.formBody}`}>
                                <TextInput
                                    lead="نام"
                                    type="text"
                                    customClass={`${classes.loginInput}`}
                                    value={signup.firstName.value}
                                    onchange={(e) => setSignup({
                                        ...signup,
                                        firstName: {...signup.firstName, value: e.target.value}
                                    })}
                                    //alert="نام یابد حداقل سه کاراکتر باشد."
                                />

                                <TextInput
                                    lead="نام خانوادگی"
                                    type="text"
                                    customClass={`${classes.loginInput}`}
                                    value={signup.lastName.value}
                                    onchange={(e) => setSignup({
                                        ...signup,
                                        lastName: {...signup.lastName, value: e.target.value}
                                    })}
                                />
                                <TextInput
                                    lead="نام کاربری"
                                    type="text"
                                    customClass={`${classes.loginInput}`}
                                    value={signup.username.value}
                                    onchange={(e) => setSignup({
                                        ...signup,
                                        username: {...signup.username, value: e.target.value}
                                    })}
                                />
                                <TextInput
                                    lead="ایمیل"
                                    type="email"
                                    customClass={`${classes.loginInput}`}
                                    value={signup.email.value}
                                    onchange={(e) => setSignup({
                                        ...signup,
                                        email: {...signup.email, value: e.target.value}
                                    })}
                                />
                            </div>
                            <div className={`container flex jc-center ai-center ${classes.formFotter}`}>
                                <button
                                    type="submit"
                                    className={` ${classes.button} ${classes.buyOrder}`}>
                                    ثبت نام
                                </button>
                            </div>
                        </Fragment>
                    }
                </Fragment>
            }

        </form>
    );

    const data = [
        {id: 1, title: "ورود", body: forgetPassword === false ? login : forgetPasswordForm},
        {id: 2, title: "ثبت نام", body: signUp},
    ];

    return (
        <div className={`container row col-100 ai-center jc-center px-1 
        ${classes.container} ${classes.moveImage} ${props.isDark ? "dark" : ""} ${ltr ? "ltr" : "rtl"}`}
             style={{backgroundImage: `url("${images.spaceStar}")`}}>

            <div className={`col-60  flex jc-center ai-center `} style={{height: "100%"}}>
                <div className={`${classes.content}`}>
                    <AccordionBox title="ورود/ثبت نام" content={data}/>
                </div>
            </div>

            <div
                className={`col-40 column ai-center jc-center ${classes.intro} ${classes.moveImage}`} /*style={{backgroundImage: `url("${images.spaceStar}")`}}*/>
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
        isLogin: state.auth.isLogin,
        token: state.auth.token,
        isDark: state.global.isDark,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (auth) => dispatch(setLoginInitiate(auth)),
        saveToken: (token) => dispatch(login(token)),
        onLoad: () => dispatch(loadConfig()),
        onThemeChange: (isDark) => dispatch(setThemeInitiate(isDark)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


