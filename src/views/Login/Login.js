import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js'; 
import { GoogleLogin } from 'react-google-login';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
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
    fetch(config.url.API_URL+'authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        res.json().then(json => {
          window.localStorage.setItem('auth_user',JSON.stringify({id:json._id,name:json.name,email:json.email,expiry_date:json.expiry_date,stripe_subscription_id:json.stripe_subscription_id}));
          setTimeout(()=>{
            window.location.replace('/');
          },200);
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
    const responseGoogle = (response) => {
      if(response.profileObj){
        fetch(config.url.API_URL+'googlelogin', {
        method: 'POST',
        body: JSON.stringify({email:response.profileObj.email,name:response.profileObj.name,password:'google'}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.status === 200) {
          res.json().then(json => {
            window.localStorage.setItem('auth_user',JSON.stringify({id:json._id,name:json.name,email:json.email,expiry_date:json.expiry_date,stripe_subscription_id:json.stripe_subscription_id}));
            setTimeout(()=>{
              window.location.replace('/');
            },200);
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
    }
    return (<div>

      <div className="loginouter loginonly">
        <div className="log_wrapper log_col1">
        <div className="logo_login">
         <Link className="App-link" to='/'> <img src={require('assets/images/logo-main.png')} alt="logo"/></Link>
        </div> 
         <div className="login_block">
         <div className="login_box">
            <form onSubmit={this.onSubmit}>
                <h2>Log In</h2>
                {/*<GoogleLogin
                  clientId="582471345809-dctc10pa2bnl3ft128d6kngnme1s4a9d.apps.googleusercontent.com"
                  render={renderProps => (
                    <div className="gngo_link"><Link to="#" onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign up with Google</Link></div>
                  )}

                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />

                <div className="or_line">
                <span>or</span>
                </div>*/}

                <ul>
                  <li>
                    <label>Email Address</label>
                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} required /> 
                  </li>
                  <li>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required /> </li>
                  <li><input type="submit" value="Log In"/> </li>
                </ul>

                
               
               
                
              </form>
              <div className="frg_link"><Link to='/forgot'>Forgot password?</Link></div>
         </div>
         <div className="log_inwrap">
          <p>Don't have an  account?</p>
          <div className="frg_link"><Link to={'/register'}>Create Account</Link></div>
         </div>     
            
         </div>
           
         </div>
        </div>

       

     
      </div>
    );
  }
}