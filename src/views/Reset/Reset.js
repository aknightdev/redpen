import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js'; 

export default class Reset extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hash : props.match.params.hash,
      password: ''
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
    fetch(config.url.API_URL+'reset', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        res.json().then(json => {
          this.setState({password:''});
          alert('Password updated successfully!');
        });
        //this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
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
                <h2>New Password</h2>
               
                <ul>
                  <label>Enter your new password</label>
                  <li><input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                /> </li>
                  <li><input type="submit" value="Save password"/> </li>
                </ul>

                
               
               
                
              </form>
              {/*<div className="frg_link"><Link to='/login'>Back to login?</Link></div>*/}
         </div>
            
            
         </div>
           
         </div>
        </div>

       

     
      </div>
    );
  }
}