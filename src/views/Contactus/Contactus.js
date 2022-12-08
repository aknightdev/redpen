import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js';

export default class Contactus extends Component {
  constructor(props) {
    super(props);
    this.state = {termsofuse:[]};
  }
  componentDidMount() {
    document.body.classList = 'termsofuse';
  }
  componentWillUnmount() {
    document.body.classList = '';
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
              <form>
                 <ul>
                  <li>
                    <label>Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} required />
                  </li>
                  <li>
                    <label>Email Address</label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} required />
                    <span className="error">{this.state.error}</span>
                  </li>
                    <li>
                    <label>Phone Number</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} required />
                  </li>
                   <li>
                    <label>Message</label>
                    <textarea >

                    </textarea>
                    
                  </li>
                  <li>
                    <input type="submit" value="Send"/>
                  </li>
                </ul>
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