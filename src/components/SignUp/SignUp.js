import React, { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from './SignUp.module.css';
import axios from "axios";

const SignUp = () => {
    // const authCtx = useContext(AuthContext);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const [isSignUp, setIsSignUp] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    

    const switchSignUpHandler = () => {
        setIsSignUp((prevState) => !prevState)
    }
    const SubmitHandler = async(event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword =  passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;

        const loginObj = {
            enteredEmail,
            enteredPassword,
            enteredConfirmPassword
        }
        try{
            if(enteredEmail.length<4 || enteredPassword.length < 3 || enteredConfirmPassword.length <3){
                let errorMessage = "Invalid Credentials"
                alert(errorMessage);
            }  else if (enteredPassword !== enteredConfirmPassword){
                let errorMessage = "Password does not match !"
                alert(errorMessage);
            }
             else{
            const response = await axios.post('https://expense-tracker-b43a5-default-rtdb.firebaseio.com/.json',
            loginObj
            );
                console.log(response.data);
                console.log('User is Signed Up Successfully !');
            }

        } catch(error){
                console.log(error);
            }

        // setIsLoading(true);
        // let url;
        // if(isSignUp){
        //     url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ'
        // } else{
        //     url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ'
        // }
        // fetch(
        //     url,
        //     {
        //         method: "POST",
        //         body: JSON.stringify({
        //             email: enteredEmail,
        //             password: enteredPassword,
        //             /*confirmPassword: enteredConfirmPassword,*/
        //             returnSecureToken: true
        //         }),
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     }
        // ).then((res) => {
        //     setIsLoading(false);
        //     if(res.ok){
        //         return res.json();
        //     } else{
        //         return res.json().then((data) => {
        //             let errorMessage = "Authentication Failed !"
        //             throw new Error(errorMessage);
        //         })
        //     }
        // }).then((data) => {
        //     console.log(data);
        //     console.log('User has successfully signed up')
        //     authCtx.login(data.idToken, data.email);
        //     localStorage.setItem('token', data.idToken);
        //     localStorage.setItem('email', data.email);
        // }).catch((err) => {
        //     alert(err.message);
        // })
    };

    return (
        <React.Fragment>
            <section className={classes.signup}>
                <h1>{isSignUp ? "Sign Up" : "Login"}</h1>
                <form onSubmit={SubmitHandler}>
                    <div className={classes.control}>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" ref={emailInputRef} /> 
                        </div>
                        <div className={classes.control}>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" ref={passwordInputRef} />
                        </div>
                        {isSignUp && (<div className={classes.control}>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input id="confirm-password" type="password" ref={confirmPasswordInputRef}/>
                    </div>)}
                    <div className={classes.actions}>
                        {!isLoading && (<button>
                            {isSignUp ? "Sign Up" : "Login"}
                        </button>) }
                        {isLoading && <p>Sending Request...</p>}
                        <button type="button" onClick={switchSignUpHandler} className={classes.toggle}>
                            {isSignUp ? "Have an account ? Login" : "Sign Up to create new account" }</button>
                    </div>
                </form>
            </section>
        </React.Fragment>
    )
}

export default SignUp;