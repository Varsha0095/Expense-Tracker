import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Welcome.module.css";

const Welcome = () => {
    const authCtx = useContext(AuthContext);

    const logoutHandler = () => {
        authCtx.logout();
    }

    const verifyEmailHandler = () => {
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ',
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken: authCtx.token,
                    requestType: "VERIFY_EMAIL",
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                if(res.ok){
                    return res.json();
                }else{
                        return res.json().then((data) => {
                        let errorMessage = 'verfication failed'
                        throw new Error(errorMessage);
                    })
                }
            }).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err.message);
            })
    }

  return (
    <React.Fragment>
      <NavLink to="/welcome" />
        <section className={classes.welcome}>
            <Row>
         <Col> <h1>Welcome To Expense Tracker !</h1></Col>
         <Col><h4>Your Profile is incomplete.
            <Link to="/profile" style={{textDecoration: "none"}}>Complete Now</Link></h4></Col>
          </Row>
        </section>
      {authCtx.isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
      <button onClick={verifyEmailHandler}>Email ID</button>
    </React.Fragment>
  );
};
export default Welcome;
