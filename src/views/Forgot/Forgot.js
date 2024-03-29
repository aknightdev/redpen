import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js'; 
import { toast } from 'react-toastify';

export default class Forgot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      error : ""
    };
  }
  componentDidMount() {
    document.body.classList = 'loginpage';
  }
  componentWillUnmount() {
    document.body.classList = '';
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  onSubmit = (event) => {
    event.preventDefault();
    fetch(config.url.API_URL+'forgot', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        res.json().then(json => {
          this.setState({email:''});
          this.setState({
            'error': 'Reset password link has been sent to you email address!'
          });
          // toast.success('Reset password link has been sent to you email address!');
        });
        //this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      // toast.error('Your email address does not exist!');
      this.setState({
        'error': 'Your email address does not exist!'
      });
    });
  }
  render() {
    return (<div>
        <div className="loginouter">
          <div className="log_wrapper log_col1">
            <div className="logo_login">
              <Link className="App-link" to='/'> <img src={require('assets/images/logo-main.png')} alt="logo"/></Link>
            </div> 
            <div className="login_block">
              <div className="login_box">
                <form onSubmit={this.onSubmit}>
                  <h2>Forgot Password</h2>
                  {this.state.error != ''?<div className="error_block">{this.state.error}</div>:''}
                  <ul>
                    <li>
                      <label>Email Address</label>
                      <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} required />
                    </li>
                    <li>
                      <input type="submit" value="Send me reset instructions"/>
                    </li>
                  </ul>
                </form>
                <div className="frg_link">
                  <p>We'll send you an email further instructions on <br /> how to reset your password.</p>
                  <Link to='/register'>Signup</Link> <span> | </span> <Link to='/login'>Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}