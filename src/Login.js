
import React, {useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./css_mark/login.css";
import { setUserSession } from './service/AuthService';
const loginUrl = 'https://m9os8u3jwe.execute-api.us-east-1.amazonaws.com/prod/login'

const Login = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 

  const history = useHistory();
  

  const submitHandler = event => {
      event.preventDefault();
      if (username.trim() === ''|| password.trim() === '') {
        setErrorMessage("Both username and password are required")
        return;
      }
      setErrorMessage(null);
      const requestConfig = {
          headers: {
              'x-api-key': 'MwP4RBlej92BTnHKsrGlo27PjNPb25tK4ZGbar9Z'
          }
      }
      const requestBody ={
          user_name: username,
          password: password
      }
      axios.post(loginUrl, requestBody, requestConfig).then(response =>{
          setUserSession(response.data.user, response.data.token);
          // history.push('/service');
          setSuccessMessage("Login successful!"); // Set success message
          sessionStorage.setItem('username', response.data.user.user_name);
          console.log('Saving username:', response.data.user.user_name);
          setTimeout(() => {
            setSuccessMessage(null); // Optional: Clear message after a few seconds
            history.push('/service', { username: username });
          }, 3000);
      }).catch(error =>{
          if (error.response.status === 401 || error.response.status === 403){
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage('Sorry, the server is error! Please try again');
          }
      })
  }

  return (
      <div id="loginform">
          <FormHeader title="Login" />
          <form onSubmit={submitHandler}>
              <FormInput 
                  description="Username" 
                  type="text" 
                  value={username} 
                  onChange={event => setUsername(event.target.value)} 
                  placeholder="Enter your username"
              />
              <FormInput 
                  description="Password" 
                  type="password" 
                  value={password} 
                  onChange={event => setPassword(event.target.value)} 
                  placeholder="Enter your password"
              />
              <FormButton title="Login"/>
          </form>
          <OtherMethods />
          {errorMessage && 
            <div className="error-message-box">
                <p className="message">{errorMessage}</p>
                <button onClick={() => setErrorMessage(null)} className="close-btn">X</button>
            </div>
          }
          {successMessage && 
            <div className="success-message-box">
                <p className="message">{successMessage}</p>
            </div>
          }
      </div>
  );
}
  
const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);


const FormButton = props => (
  <div id="button" class="row">
    <button>{props.title}</button>
  </div>
);

const FormInput = props => (
  <div className="row">
      <label>{props.description}</label>
      <input type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeholder}/>
  </div>  
);

const OtherMethods = props => (
  <div id="alternativeLogin">
    <label>Or sign in with:</label>
    <div id="iconGroup">
      <Facebook />
      <Twitter />
      <Google />
    </div>
  </div>
);

const Facebook = props => (
  <a href="#" id="facebookIcon"></a>
);

const Twitter = props => (
  <a href="#" id="twitterIcon"></a>
);

const Google = props => (
  <a href="#" id="googleIcon"></a>
);

export default Login;