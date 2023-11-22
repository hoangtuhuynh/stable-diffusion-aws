import axios from 'axios';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { setUserSession } from './service/AuthService';
import { withRouter } from "react-router-dom";
import "./css_mark/service.css";

class Service extends Component {
  state = {
    isLoadingVisible: false,
    val: '',
    imgSrc: '',
    showLogout: false,
    username: null // Add username to state
  };
  componentDidMount() {
    // Read the username from sessionStorage when the component mounts
    const savedUsername = sessionStorage.getItem('username');
    if (savedUsername) {
      this.setState({ username: savedUsername });
    }
    console.log('Retrieved username:', sessionStorage.getItem('username'));
  }

  toggleLogout = () => {
    this.setState(prevState => ({
      showLogout: !prevState.showLogout
    }));
  };

  handleLogout = (event) => {
    event.stopPropagation();
    // Clear user session
    setUserSession(null, null);
    // Clear username from sessionStorage
    sessionStorage.removeItem('username');
    this.props.history.push('/login');
  };


  showLoading = () => {
    this.setState({ isLoadingVisible: true });
  };

  hideLoading = () => {
    this.setState({ isLoadingVisible: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.showLoading();

    console.log(prompt);
    console.log(process.env.NODE_ENV);

    const api =
      process.env.NODE_ENV === 'development'
        ? '/test/stabled'
        : 'https://v56lx6r0uj.execute-api.us-east-1.amazonaws.com/test/stableapp';
    const data = { data: e.target.searchQuery.value };
    console.log(data);
    axios({
      method: 'POST',
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      url: api,
    })
      .then((response) => {
        console.log(response);
        this.setState({ imgSrc: response.data.body });

        setTimeout(() => {
          this.hideLoading();
          this.setState({ val: '' });
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { username, showLogout } = this.state;
    const userInfoClass = showLogout ? "user-info showLogout" : "user-info"; // Toggle class based on state

    return (
      <Container className='p-5' id='container' name='container'>
        <div className={userInfoClass} style={{ position: 'fixed', top: 10, right: 10 }}>
          <span className="username" onClick={this.toggleLogout}>{username}</span>
          <button 
            onClick={this.handleLogout} 
            className="logout-button" 
            style={{ display: showLogout ? 'block' : 'none' }}>Logout</button>
        </div>
        <h1>Stable Diffusion AI</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Enter Text to convert Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter text to convert image'
              required
              autoFocus={true}
              name='searchQuery'
              controlId='searchQuery'
              defaultValue={this.state.val}
            />
            <Form.Text className='text-muted'>
              We'll attempt our best to create image you will love it!
            </Form.Text>
          </Form.Group>
          <Button
            variant='primary'
            type='submit'
            className='btn btn-primary btn-large centerButton'
          >
            Submit
          </Button>

          <Image
            id='myImage'
            className='img-fluid shadow-4'
            src={this.state.imgSrc}
          />
        </Form>
        {this.state.isLoadingVisible && (
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
  }
}

export default withRouter(Service);;