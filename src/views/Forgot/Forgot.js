import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js'; 

export default class Forgot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : ''
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
          alert('Reset password link has been sent to you email address!');
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
        </div> </div>
        <div className="log_wrapper log_col2">

         <div className="login_block">
         <div className="login_box">
            <form onSubmit={this.onSubmit}>
                <h2>Forgot Password</h2>
               
                <ul>
                  <li><input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required
                /> </li>
                  
                  <li><input type="submit" value="Submit"/> </li>
                </ul>

                
               
               
                
              </form>
         </div>
            
            <div className="frg_link"><Link to='/login'>Back to Login?</Link></div>
         </div>
           
         </div>
        </div>

       

     
      </div>
    );
  }
}