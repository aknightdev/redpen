import React, { Component } from 'react';
import { config } from 'Constants.js'; 
import { toast } from 'react-toastify';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {password: ''};
    this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
  }

  componentDidMount() {
  }
  componentWillUnmount() {
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  onSubmit = (event) => {
    event.preventDefault();
    fetch(config.url.API_URL+'changepwd', {
      method: 'POST',
      body: JSON.stringify({password:this.state.password, user_id:this.authUser.id}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        res.json().then(json => {
          this.setState({password:''});
          toast.success('Password updated successfully!');
        });
        //this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      toast.error('Reset password link expired/invalid!');
    });
  }

  render() {
    return (
      <div className="page_body">
        <div className="page_wrapper">
          <div className="container2">
            <h1>Account</h1>
            <p><strong>Name</strong>: {this.authUser.name}</p>
            <p><strong>Email</strong>: {this.authUser.email}</p>
            <h2>Change Password</h2>
            <form onSubmit={this.onSubmit}>
              <ul>
                <li>
                <label>Enter your new password</label>
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}  required /> </li>
                <li><input type="submit" value="Save password"/> </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    );
  }
}