

import React, {useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const registerUrl = "https://m9os8u3jwe.execute-api.us-east-1.amazonaws.com/prod/registration"


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
        <div>
            <form onSubmit={submitHandler}>
                <h5>Register</h5>
                Name: <input type="text" value={name} onChange={event => setName(event.target.value)} /> <br/>
                Email <input type="text" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
                Username <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
                Password: <input type="text" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
                <input type="submit" value="Register"/>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    )
}

export default Register;