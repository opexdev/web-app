import React, {Fragment, useState} from "react";
import {connect} from "react-redux";
import classes from "./Login.module.css";
import {images} from "../../assets/images";
import TextInput from "../../components/TextInput/TextInput";
import AccordionBox from "../../components/AccordionBox/AccordionBox";
import {login, setLoginInitiate} from "../../store/actions";
import {Redirect, useHistory} from "react-router";
import axios from "axios";
import {OrderBookData} from "../../FakeData/FakeData";

const Login = (props) => {
    let history = useHistory();
    const [credential, setCredential] = useState({username: "", password: ""});
    const [signup, setSignup] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
    });

    console.log('date :', Date.now())

    const [isLoading, setLoading] = useState(false);
    const [registerStatus, setRegisterStatus] = useState(false);
    const [error, setError] = useState({
        signIn: {username: "", password: ""},
        register: {username: "", password: ""},
    });

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const params = new URLSearchParams();
        params.append('client_id', 'admin-cli');
        params.append('username', credential.username);
        params.append('password', credential.password);
        params.append('grant_type', 'password');

        const response = await axios.post('https://api.opex.dev/auth/realms/mixchange/protocol/openid-connect/token', params)

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
                "username": signup.username,
                "enabled": true,
                "totp": false,
                "emailVerified": true,
                "firstName": signup.firstName,
                "lastName": signup.lastName,
                "email": signup.email,
                "disableableCredentialTypes": [],
                "requiredActions": [],
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
                console.log(response);
                setRegisterStatus(true);

            }).catch(function (error) {
                console.log("Error : ", error);
            }).then(function () {
                setLoading(false);
            });


        } else {

        }


    }

    const login = (
        <form onSubmit={(e) => submit(e)} className={`column ai-center jc-between ${classes.form} `}>
            {isLoading ? (
                <div className={`flex jc-center ai-center`} style={{height: "100%"}}>
                    <img
                        style={{width: "3vw", textAlign: "center"}}
                        src={images.loadingGif}
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
                    </div>
                    <div className={`container flex jc-center ai-center ${classes.formFotter}`}>
                        <button type="submit"
                                className={`flex jc-center ai-center ${classes.button} ${classes.buyOrder}`}>ورود
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
                        src={images.loadingGif}
                    />
                </div>
                :
                <Fragment>
                    {registerStatus ?
                        <div className={`flex jc-center ai-center`} style={{height: "100%"}}>
                            <span>ثبت نام با موفقیت انجام شد :)</span>
                        </div>
                        :
                        <Fragment>
                            <div className={`container column jc-center ai-center ${classes.formBody}`}>
                                <TextInput
                                    lead="نام"
                                    type="text"
                                    customClass={`${classes.loginInput}`}
                                    value={signup.firstName}
                                    onchange={(e) => setSignup({...signup, firstName: e.target.value})}
                                />
                                <TextInput
                                    lead="نام خانوادگی"
                                    type="text"
                                    customClass={`${classes.loginInput}`}
                                    value={signup.lastName}
                                    onchange={(e) => setSignup({...signup, lastName: e.target.value})}
                                />
                                <TextInput
                                    lead="نام کاربری"
                                    type="text"
                                    customClass={`${classes.loginInput}`}
                                    value={signup.username}
                                    onchange={(e) => setSignup({...signup, username: e.target.value})}
                                />
                                <TextInput
                                    lead="ایمیل"
                                    type="email"
                                    customClass={`${classes.loginInput}`}
                                    value={signup.email}
                                    onchange={(e) => setSignup({...signup, email: e.target.value})}
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
        {id: 1, title: "ورود", body: login},
        {id: 2, title: "ثبت نام", body: signUp},
    ];

    return (
        <div className={`container row col-100 ai-center jc-center px-1 ${classes.container} ${classes.moveImage}`}
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
                    <h1 className="pt-1">OPen source EXchange</h1>
                </div>
            </div>

        </div>
    );
};
const mapDispatchToProps = (dispatch) => {
    return {
        login: (auth) => dispatch(setLoginInitiate(auth)),
        saveToken: (token) => dispatch(login(token)),
    };
};

const mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
        token: state.auth.token,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


/*<div className="column col-50 jc-center ai-center px-1" style={{backgroundColor: "#e6e6e6" , display: "none"}}>
          <span className={` ${classes.content} card-background card-border `}>
            <AccordionBox title="ورود/ثبت نام" content={data} />
          </span>
        </div>*/
