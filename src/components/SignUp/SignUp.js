import React, { useState, useRef } from "react";
import classes from './SignUp.module.css';
import axios from "axios";
import { NavLink } from "react-router-dom";
// import AuthContext from "../../store/auth-context";

const SignUp = () => {
    // const authCtx = useContext(AuthContext);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const [isLoading, setIsLoading] = useState(false);

    // const switchSignUpHandler = () => {
    //     setIsSignUp((prevState) => !prevState)
    // }
    const SubmitHandler = async(event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword =  passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;

        const loginObj = {
            enteredEmail,
            enteredPassword,
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
                setIsLoading(true);
            const response = await axios.post('https://expense-tracker-b43a5-default-rtdb.firebaseio.com/.json',
            loginObj
            );
                
                console.log(response.data);
                console.log('User is Signed Up Successfully !');
               
            }
            setIsLoading(false);
        //     let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ';
        //     fetch(
        //         url ,
        //         {
        //           method: 'POST',
        //           body: JSON.stringify({
        //             email: enteredEmail,
        //             password: enteredPassword,
        //             returnSecureToken: true,
        //           }),
        //           headers: {
        //             "Content-Type": "application/json"
        //           },
        //         }
        //     ).then((res) => {
        //         if(res.ok){
        //             return res.json();
        //         }else{
        //             return res.json().then((data) => {
        //                 let errorMessage = "SignUp failed !"
        //                 throw new Error(errorMessage);
        //             })
        //         }
        //     }).then((data) => {
        //         console.log(data);
        //     // authCtx.login(data.idToken, data.email);
        //     // localStorage.setItem("token", data.idToken);
        //     // localStorage.setItem("email", data.email);
        // }).catch((err) => {
        //     alert(err.message);
        // })

        } catch(error){
                console.log(error);
            }
    };

    return (
        <React.Fragment>
            {/* <NavLink to="/signup">Sign Up</NavLink> */}
            <section className={classes.signup}>
                <h1>Sign Up</h1>
                <form onSubmit={SubmitHandler}>
                    <div className={classes.control}>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" ref={emailInputRef} /> 
                        </div>
                        <div className={classes.control}>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" ref={passwordInputRef} />
                        </div>
                        <div className={classes.control}>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input id="confirm-password" type="password" ref={confirmPasswordInputRef}/>
                    </div>
                    <div className={classes.actions}>
                        {!isLoading && (<button>
                            Sign Up 
                        </button>)}
                        {isLoading && <p>Sending Request...</p>}
                        <NavLink activeClassName={classes.toggle} to="/login">
                        <button type="button" className={classes.toggle}>
                            Have an account ? Login</button>
                            </NavLink>
                    </div>
                </form>
            </section>
        </React.Fragment>
    )
}

export default SignUp;