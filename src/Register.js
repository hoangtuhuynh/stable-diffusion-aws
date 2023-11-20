

import React, {useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./css_mark/register.css";
const registerUrl = "https://m9os8u3jwe.execute-api.us-east-1.amazonaws.com/prod/registration"

// Header Component
const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);

// Input Component
const FormInput = props => (
    <div className="row">
        <label>{props.description}</label>
        <input type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeholder}/>
    </div>  
);

// Button Component
const FormButton = props => (
    <div id="button" className="row">
        <button>{props.title}</button>
    </div>
); 

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const history = useHistory();

    const submitHandler = event => {
        event.preventDefault();
        if (username.trim() === '' || email.trim() === '' || password.trim() === '' || name.trim() === '') {
            setMessage("All fields are required")
        }
        
        const requestConfig = {
            headers: {
                'x-api-key': 'MwP4RBlej92BTnHKsrGlo27PjNPb25tK4ZGbar9Z'
            }
        }
        const requestBody ={
            user_name: username,
            email: email,
            name: name,
            password: password
        }
        axios.post(registerUrl, requestBody, requestConfig).then(response =>{
            setMessage("Successfully Registration");
            history.push('/login');
        }).catch(error =>{
            if (error.response.status === 401){
                setMessage(error.response.data.message);
            } else {
                setMessage('Sorry, the server is error! Please try again');
            }
        })
    }

    return (
        <div id="registerform">
            <FormHeader title="Register" />
            <form onSubmit={submitHandler}>
                <FormInput 
                    description="Name" 
                    type="text" 
                    value={name} 
                    onChange={event => setName(event.target.value)} 
                    placeholder="Enter your name"
                />
                <FormInput 
                    description="Email" 
                    type="text" 
                    value={email} 
                    onChange={event => setEmail(event.target.value)} 
                    placeholder="Enter your email"
                />
                <FormInput 
                    description="Username" 
                    type="text" 
                    value={username} 
                    onChange={event => setUsername(event.target.value)} 
                    placeholder="Choose a username"
                />
                <FormInput 
                    description="Password" 
                    type="password" 
                    value={password} 
                    onChange={event => setPassword(event.target.value)} 
                    placeholder="Enter your password"
                />
                <FormButton title="Register"/>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}



export default Register;