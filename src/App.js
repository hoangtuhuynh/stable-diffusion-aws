import { BrowserRouter, NavLink, Route, Switch, Link} from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Service from "./Service";
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

  return (
    <div className="App">
      <BrowserRouter>
      <div className="header">
        <NavLink exact activeClassName="active" to="/">Home</NavLink>
        <NavLink activeClassName="active" to="/register">Register</NavLink>
        <NavLink activeClassName="active" to="/login">Login</NavLink>
        <NavLink activeClassName="active" to="/service">Service</NavLink>
      </div>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home}/>
          <PublicRoute path="/register" component={Register}/>
          <PublicRoute path="/login" component={Login}/>
          <PrivateRoute path="/service" component={Service}/>
        </Switch>
      </div>
      </BrowserRouter>
    </div>
  );
}
export default App;