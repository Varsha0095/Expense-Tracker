import React from "react";
import { NavLink } from "react-router-dom";

const Welcome = () => {
    return(
        <React.Fragment>
        <NavLink to="/welcome">
        <h1>Welcome To Expense Tracker.</h1>
        </NavLink>
        <button>Logout</button>
        </React.Fragment>
    )
}
export default Welcome;