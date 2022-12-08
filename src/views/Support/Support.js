import React from 'react';
import { Link } from 'react-router-dom';
export default class Support extends React.Component {
	render() {
		return (
			<div className="pg_boxwrapper surp_page">
				<div className="page_wrapper light_bg">
					
					 
						<div className="container">
							<div className="row">
							<div className="col col7">
								<img src={require('assets/images/support.svg')}/>
								</div>
								<div className="col col5">
								<h1>Support</h1>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
								<Link to='' className="bnr_btn">Email Us</Link>
								</div>

							</div>
						</div>
					 
			 
						
				</div>
			</div>
		);
	}
}