import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { setUserSession } from './service/AuthService';
import { useHistory } from 'react-router-dom';
import "./css_mark/service.css";


const Service = () => {
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
  const [val, setVal] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [showLogout, setShowLogout] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [username, setUsername] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Equivalent to componentDidMount
    const savedUsername = sessionStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
    console.log('Retrieved username:', savedUsername);
  }, []);

  const toggleOptions = () => {
    setShowLogout(prevState => !prevState);
    setShowAccount(prevState => !prevState);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    setUserSession(null, null);
    sessionStorage.removeItem('username');
    history.push('/login');
    console.log('Should have redirected to /login');
    // Reload the page
    window.location.reload();
  };

/* does not actually work right now, will look into it */
  const moveToAccount = () => {
    console.log('Moving to Account');
    history.push('/account')
    console.log('Should have been redirected to /account')
    window.location.reload();
  }

  const showLoading = () => {
    setIsLoadingVisible(true);
  };

  const hideLoading = () => {
    setIsLoadingVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showLoading();

    const api = process.env.NODE_ENV === 'development'
      ? '/test/stabled'
      : 'https://v56lx6r0uj.execute-api.us-east-1.amazonaws.com/test/stableapp';
    const data = { data: e.target.searchQuery.value };

    axios.post(api, JSON.stringify(data), { headers: { 'Content-Type': 'application/json' }})
      .then(response => {
        setImgSrc(response.data.body);
        setTimeout(() => {
          hideLoading();
          setVal('');
        }, 500);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Container className='p-5' id='container' name='container'>
      <div className={showLogout ? "user-info showLogout" : "user-info"} style={{ position: 'fixed', top: 10, right: 10 }}>
        <span className="username" onClick={toggleOptions}>{username}</span>
        <div className="options" style={{ display: showLogout ? 'flex' : 'none' }}>
          <button
            onClick={moveToAccount}
            className="account-button">Account</button>
          <div className="sbreaker"></div>
          <button 
            onClick={handleLogout} 
            className="logout-button">Logout</button>
        </div>
      </div>
      {/* ... Rest of your JSX ... */}
      <h1>Stable Diffusion AI</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            {/* <Form.Label>Enter Text to convert Image</Form.Label> */}
            <div className="form-separate">
              <Form.Control
                type='text'
                placeholder='Enter text to convert image'
                required
                autoFocus={true}
                name='searchQuery'
                controlId='searchQuery'
                defaultValue={val}
              />
              <Button
                variant='dark'
                type='submit'
                className='btn btn-primary btn-large centerButton'
              >
                Submit
              </Button>
            </div>
            <Form.Text className='text-muted'>
              We'll attempt our best to create image you will love it!
            </Form.Text>
          </Form.Group>

          <Image
            id='myImage'
            className='img-fluid shadow-4'
            src={imgSrc}
          />
        </Form>
        {isLoadingVisible && (
          <div id='backdrop'>
            <Button variant='primary' disabled>
              <Spinner
                target='container'
                as='span'
                animation='grow'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              Loading...
            </Button>
          </div>
        )}
    </Container>
  );
};

export default Service;