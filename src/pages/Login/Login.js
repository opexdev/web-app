import React, {useState} from "react";
import {connect} from "react-redux";
import classes from "./Login.module.css"
import {images} from "../../assets/images";
import TextInput from "../../components/TextInput/TextInput";
import AccordionBox from "../../components/AccordionBox/AccordionBox";
import {setLoginInitiate} from "../../store/actions";
import { Redirect,useHistory } from "react-router";


const Login = (props) => {

    let history = useHistory();
    const [credential, setCredential] = useState({username:"",password:""});
    const [signup, setSignup] = useState({email:"",username:"",password:"",confirmPassword:""});

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState({
        signIn: {username: "", password: ""},
        register: {username: "", password: ""}
    });

    const submit = (e) =>{
        e.preventDefault();
        setLoading(true)
        if( credential.username === "siavash" && credential.password === "123456789"){
            props.login()
            setTimeout(()=>{
                history.push("/")
            }, 2000)
        }else {
            setTimeout(()=>{
                setLoading(false)
            }, 2000)
        }
    }

    const login =
            <form onSubmit={(e)=>submit(e)} className={`column jc-between ${classes.form} `}>
                <div>
                    <TextInput
                        lead="نام کاربری"
                        type="text"
                        value={credential.username}
                        onchange={(e)=> setCredential({...credential,username: e.target.value})}
                    />
                    <div className="py-1">
                        <TextInput
                            lead={"رمز عبور"}
                            type="password"
                            value={credential.password}
                            onchange={(e)=> setCredential({...credential,password: e.target.value})}
                        />
                    </div>
                </div>
                <button type="submit"  className={`flex jc-center ai-center ${classes.button} ${classes.buyOrder}`}>{isLoading ?
                    <img style={{width:"3vw",textAlign:"center"}} src={images.loading}/> :"ورود"}</button>
            </form>

    const signUp =
        <div className={`column jc-between ${classes.form} `}>

            <span >
                <TextInput
                    lead="ایمیل"
                    type="email"
                    value={signup.email}
                    onchange={(e)=> setSignup({...signup,email: e.target.value})}
                />
                <div className="py-1">
                    <TextInput
                        lead="نام کاربری"
                        type="text"
                        value={signup.username}
                        onchange={(e)=> setSignup({...signup,username: e.target.value})}
                    />
                </div>
                <div className="pb-1">
                    <TextInput
                        lead="رمز عبور"
                        type="password"
                        value={signup.password}
                        onchange={(e)=> setSignup({...signup,password: e.target.value})}
                    />
                </div>
                 <TextInput
                     lead="تکرار رمز عبور"
                     type="password"
                     value={signup.confirmPassword}
                     onchange={(e)=> setSignup({...signup,confirmPassword: e.target.value})}
                 />
            </span>

            <button type="submit" className={` ${classes.button} ${classes.buyOrder}`}>ثبت نام</button>

        </div>

    const data = [
        {id: 1, title: "ورود", body: login},
        {id: 2, title: "ثبت نام", body: signUp},
    ]

    return (
        <div className={`container ${classes.container}`}style={{backgroundImage: `url("${images.ho}")`}}>
            <div className={`row ${classes.row}`}>
                <div className="column col-40 jc-center ai-center px-1" style={{backgroundColor: "#131212d1"}}>
                    <span className={` ${classes.content} card-background card-border `}>
                        <AccordionBox title="ورود/ثبت نام" content={data}/>
                    </span>
                </div>
                <div className={`column col-60 ai-center jc-center px-1 ${classes.intro}`} style={{backgroundColor: "#131212d1"}}>

                    <div className={classes.bgicon}>
                        <img src={images.opexLogo_light} alt="logo"/>
                        <h1 className="pt-1">OPen source EXchange</h1>
                    </div>



                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        login :  (auth) => dispatch(setLoginInitiate(auth))
    }
}


const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin
    }
}

export default  connect( mapStateToProps , mapDispatchToProps )(Login);