import React, { useContext } from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Welcome from "./components/Pages/Welcome";
import SignUp from "./components/SignUp/SignUp";
import AuthContext from "./store/auth-context";

const App = () => {
  const authCtx = useContext(AuthContext);
  return(
    <React.Fragment>
      <Switch>
      <Route path="/" exact>
        <SignUp />
      </Route>
      {authCtx.isLoggedIn && <Route path="/welcome" exact>
      <Welcome />
      </Route>}
       <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
    <SignUp />
    </Route>
    </Switch>
    </React.Fragment>
  ) 
}
export default App;