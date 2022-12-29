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
    </React.Fragment>
  );
};
export default Welcome;
