/* heavy work in progress
do not attempt to use this! */


import React, {useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./css_mark/account.css";
import FormHeader from "./components/FormHeader";
import FormInput from "./components/FormInput";
import FormButton from "./components/FormButton";
const accountUrl = "https://m9os8u3jwe.execute-api.us-east-1.amazonaws.com/prod/account"

const Account = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const [successMessage, setSuccessMessage] = useState(null); 

    const history = useHistory();

    const submitHandler = event => {
        event.preventDefault();
        // if (username.trim() === '' || email.trim() === '' || password.trim() === '' || name.trim() === '') {
        //     setMessage("All fields are required")
        // }
        
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
        
        // axios.post(accountUrl, requestBody, requestConfig).then(response =>{
        //     setSuccessMessage("Successfully Updated Account");
        //     history.push('/login');
        // }).catch(error =>{
        //     if (error.response.status === 401){
        //         setMessage(error.response.data.message);
        //     } else {
        //         setMessage('Sorry, there was a server issue. Please try again!');
        //     }
        // })
    }

    return (
        <div id="accountform">
            <FormHeader title="Account Info" />
            <form onSubmit={submitHandler}>
                <FormInput 
                    description="Name" 
                    type="text" 
                    value={name} 
                    onChange={event => setName(event.target.value)} 
                    placeholder="Enter your new name"
                />
                <FormInput 
                    description="Email" 
                    type="text" 
                    value={email} 
                    onChange={event => setEmail(event.target.value)} 
                    placeholder="Enter your new email"
                />
                <FormInput 
                    description="Username" 
                    type="text" 
                    value={username} 
                    onChange={event => setUsername(event.target.value)} 
                    placeholder="Choose a new username"
                />
                <FormInput 
                    description="Password" 
                    type="password" 
                    value={password} 
                    onChange={event => setPassword(event.target.value)} 
                    placeholder="Enter your new password"
                />
                <FormButton title="Update Account"/>
            </form>
            {message && 
                <div className="message-box">
                    <p className="message">{message}</p>
                    <button onClick={() => setMessage(null)} className="close-btn">X</button>
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



export default Account;