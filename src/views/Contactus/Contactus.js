import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js';

export default class Contactus extends Component {
  constructor(props) {
    super(props);
    this.state = {termsofuse:[],name:'',email:'',phone:'',message:'',error:''};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    document.body.classList = 'termsofuse';
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  componentWillUnmount() {
    document.body.classList = '';
  }
  onSubmit = (event) => {
    event.preventDefault();
    fetch(config.url.API_URL+'contactus', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.setState({error:'Thanks for contacting us!',name:'',email:'',phone:'',message:''});
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      this.setState({
        'error': 'There is error while submitting your request'
      });
    });
  }
  render() {
    return (
		<div className="page_top">
			<div className="page_wrapper">
			<div className="inner_banner price_inner">
					<div className="container">
					  
						<h1>Contact Us</h1>
            <p>Fill out the form and we'll be in the Contact you </p>
					</div>
				</div>
			
            
            	
						
            		   <div className="abt_sec2 contpg_sec">
            		   <div className="container">
						<div>	 
						<div className="row">
							<div className="col col12">
								 <div>
            <div className="login_box">
              <form onSubmit={this.onSubmit}>
                 <ul>
                  <li>
                    <label>Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} required />
                  </li>
                  <li>
                    <label>Email Address</label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} required />
                  </li>
                    <li>
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={this.state.phone} onChange={this.handleInputChange} required />
                  </li>
                   <li>
                    <label>Message</label>
                    <textarea name="message" onChange={this.handleInputChange} value={this.state.message} required></textarea>
                  </li>
                  <li>
                    <input type="submit" value="Send"/>
                  </li>
                </ul>
                {this.state.error != ''?<div className="error_block">{this.state.error}</div>:''}
              </form>
            </div>
             
          </div>
         
							

							</div>
						
						</div>
							</div>
								</div>
            	</div>

			</div>
		</div>
    );
  }
}