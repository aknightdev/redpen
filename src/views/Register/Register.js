import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js';

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name : '',
      email : '',
      password: '',
      error: ''
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
    fetch(config.url.API_URL+'register', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.log(err);
      this.setState({error:'Email address already exists'});
    });
  }
  render() {
    return (<div>
      <div className="loginouter loginonly">
        <div className="log_wrapper log_col1">
          <div className="logo_login">
           <Link className="App-link" to='/'> <img src={require('assets/images/logo-main.png')} alt="logo"/></Link>
          </div>
          <div className="login_block">
            <div className="login_box">
              <form onSubmit={this.onSubmit}>
                <h2>Create An Account</h2>
                <p className="sub_text">You’re about to experience the fastest way to get feedback. But first...</p>
                <ul>
                  <li>
                    <label>Name</label>
                    <input type="text" name="name" placeholder="What's your name?" value={this.state.name} onChange={this.handleInputChange} required /></li>
                  <li>
                    <label>Email Address</label>
                    <input type="email" name="email" placeholder="What's your email?" value={this.state.email} onChange={this.handleInputChange} required />
                    <span className="error">{this.state.error}</span>
                  </li>
                  <li>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required /><span className="pskeep">This will keep things secure.</span> 
                  </li>
                  <li>
                    <input type="submit" value="Let’s get in there!"/>
                  </li>
                </ul>
              </form>
            </div>
            <div className="log_inwrap">
              <p>Already have an account?</p>
              <div className="frg_link"><Link to={'/login'}>Log in</Link></div>
            </div>
          </div>
         </div>
        </div>
      </div>
    );
  }
}