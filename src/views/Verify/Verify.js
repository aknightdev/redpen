import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js'; 
import { toast } from 'react-toastify';

export default class Verify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hash : props.match.params.hash,
      message: ''
    };
  }
  componentDidMount() {
    document.body.classList = 'loginpage';
    this.onSubmit();
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
  onSubmit = () => {
    fetch(config.url.API_URL+'verify', {
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
          this.setState({message:'Account verified successfully!'});
        });
        //this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      toast.error('Verification link expired/invalid!');
    });
  }
  render() {
    return (<div><div className="loginouter">
        <div className="log_wrapper log_col1">
          <div className="logo_login">
            <Link className="App-link" to='/'> <img src={require('assets/images/logo-main.png')} alt="logo"/></Link>
          </div>
          <div className="login_block">
            <div className="login_box">
              <div className="message">{this.state.message}</div>
              <div className="frg_link">
                <Link to='/login'>Back to login?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}