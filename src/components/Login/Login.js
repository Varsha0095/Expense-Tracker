import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Login.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const switchLoginModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    // const loginObj = {
    //   enteredEmail,
    //   enteredPassword,
    // };
    // if (
    //   enteredEmail.length < 4 ||
    //   enteredPassword.length < 3
    // //   enteredConfirmPassword.length < 3
    // ) {
    //   let errorMessage = "Invalid Credentials";
    //   alert(errorMessage);
    // }
    // //  else if (enteredPassword !== enteredConfirmPassword) {
    // //   let errorMessage = "Password does not match !";
    // //   alert(errorMessage);
    // // }
    // else {
    //   setIsLoading(true);
    //   const response = await axios.post(
    //     "https://expense-tracker-b43a5-default-rtdb.firebaseio.com/.json",
    //     loginObj
    //   );

    //   console.log(response.data);
    //   console.log("User is Signed Up Successfully !");
    // }
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ";
    }

     axios
        .post(url, {
            idToken: authCtx.token,
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
        }).then((res) => {
            console.log(res.data);
            setIsLoading(false);
            authCtx.login(res.data.idToken, res.data.email);
            localStorage.setItem("token", res.data.idToken);
            localStorage.setItem("email", res.data.email);
            
            let mail = res.data.email.replace('@', '').replace('.','');

            axios.post(`https://expense-tracker-b43a5-default-rtdb.firebaseio.com/userData/${mail}.json`,{
                idToken: authCtx.token,
                email: enteredEmail,
                password: enteredPassword
            }).then((response) => {
                console.log(response.data);
            })
            
        }).catch((err) => {
            console.log(err.message);
        })
  };
  return (
    <>
      <section className={classes.login}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input id="email" type="email" ref={emailRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input id="password" type="password" ref={passwordRef} />
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input id="confirm-password" type="password" />
            </div>
          )}
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>)}
              {!isLoading && (
                <Link to="/forgotpassword">{isLogin ? "Forgot Password ?" : ""}</Link>
              )}
            
            {isLoading && <p>Sending Request...</p>}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchLoginModeHandler}
            >
              {isLogin ? "Create New Account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Login;

// const loginSubmitHandler = (event) => {
//     event.preventDefault();

//     const userEmail = emailRef.current.value;
//     const userPassword = passwordRef.current.value;

//     const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ'

//     fetch(
//         url,
//         {
//             method: 'POST',
//             body: JSON.stringify({
//                 email: userEmail,
//                 password: userPassword,
//                 returnSecureToken: true,
//             }),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         }
//     ).then((res) => {
//         if(res.ok){
//             return res.json();
//         }
//         else{
//             return res.json().then((data) => {
//                 let errorMessage = "Authentication Failed !"
//                 throw new Error(errorMessage);
//             });
//         }
//     }).then((data) => {
//         console.log(data);
//         authCtx.login(data.idToken, data.email);
//         localStorage.setItem("token", data.idToken);
//         localStorage.setItem("email", data.email);
//         console.log('Login Successful!');
//     }).catch((err) => {
//         alert(err.message);
//     })
// }
/* <section className={classes.login}>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
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
        </section> */
