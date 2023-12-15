import { BrowserRouter, NavLink, Route, Switch, Link} from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Service from "./Service";
import Account from "./Account" /* wip, will remove when testing concludes */
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import React, { useState, useEffect } from "react";
import { getUser, getToken, setUserSession, resetUserSession } from "./service/AuthService";
import axios from "axios";


const verifyTokenAPIURL = 'https://m9os8u3jwe.execute-api.us-east-1.amazonaws.com/prod/verify';

function App() {

  const [isAuthenicating, setAuthenicating] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token === 'undefined' || token === undefined || token === null || !token) {
      return;
    }

    const requestConfig = {
      headers: {
        'x-api-key': 'MwP4RBlej92BTnHKsrGlo27PjNPb25tK4ZGbar9Z'
      }
    }
    const requestBody = {
      user: getUser(),
      token: token
    }

    axios.post(verifyTokenAPIURL, requestBody, requestConfig).then(response => {
      setUserSession(response.data.user, response.data.token);
      setAuthenicating(false);
    }).catch(() => {
      resetUserSession();
      setAuthenicating(false);
    })
  }, []);

  const token = getToken();
  if (isAuthenicating && token) {
    return <div className="content">Authenicating...</div>
  }

/* make sure to remove account link once done testing! */
  return (
    <div className="App">
      <BrowserRouter>
      <div className="header">
        <div className="nav-block">
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
        </div>
        <div className="nav-block">
          <NavLink activeClassName="active" to="/register">Register</NavLink>
          </div>
        <div className="nav-block">
          <NavLink activeClassName="active" to="/login">Login</NavLink>
        </div>
        <div className="nav-block">
          <NavLink activeClassName="active" to="/service">Service</NavLink>
        </div>
        {/* <div className= "nav-block">
          <NavLink activeClassName="active" to="/account">Account</NavLink> 
        </div> */}
      </div>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home}/>
          <PublicRoute path="/register" component={Register}/>
          <PublicRoute path="/login" component={Login}/>
          <PrivateRoute path="/service" component={Service}/>
          <PrivateRoute path="/account" component={Account}/>
        </Switch>
      </div>
      </BrowserRouter>
    </div>
  );
}
export default App;