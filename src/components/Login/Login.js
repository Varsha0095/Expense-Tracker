import React, { useContext, useRef, useState } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './Login.module.css';
import { NavLink } from 'react-router-dom';


const Login = () => {
const authCtx = useContext(AuthContext);

const [isLogin, setIsLogin] = useState(true);

    const emailRef = useRef();
    const passwordRef = useRef();

    const switchLoginModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    }

    const loginSubmitHandler = (event) => {
        event.preventDefault();

        const userEmail = emailRef.current.value;
        const userPassword = passwordRef.current.value;

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ'
        
        fetch(
            url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((res) => {
            if(res.ok){
                return res.json();
            }
            else{
                return res.json().then((data) => {
                    let errorMessage = "Authentication Failed !"
                    throw new Error(errorMessage);
                });
            }
        }).then((data) => {
            console.log(data);
            authCtx.login(data.idToken, data.email);
            localStorage.setItem("token", data.idToken);
            localStorage.setItem("email", data.email);
            console.log('Login Successful!');
        }).catch((err) => {
            alert(err.message);
        })
    }
    
    return(
        <>
        <section className={classes.login}>
            <h1>Login</h1>
            <form onSubmit={loginSubmitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" ref={emailRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" ref={passwordRef} />
                </div>
                <div className={classes.actions}> 
                    {authCtx.isLoggedIn && (<NavLink to="/welcome">
                    <button onClick={switchLoginModeHandler}>Login</button>
                    </NavLink>)}
                    <NavLink to="/signup">
                        <button type='button' onClick={switchLoginModeHandler} className={classes.toggle}>New User ? Sign Up</button>
                    </NavLink>
                    <NavLink to="/forgotpassword">
                        <button className={classes.toggle} type="button">Forgot Password ?</button>
                    </NavLink>
                </div>
            </form>
        </section>
        </>
    )
}
export default Login;


