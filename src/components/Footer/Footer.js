import React from 'react';
import { Link } from 'react-router-dom';
export default class Footer extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {isLoggedIn: false};
	}

	componentDidMount() {
	  	if (window.localStorage.getItem('auth_user')!=null) {this.setState({ isLoggedIn: true });}
	}
	render() {
		if (this.state.isLoggedIn) {
			return (
				<div> </div>
			);
		}
		else{
			return (
				<div className="footer_sec">
					<div className="web_container">
						<div className="ftr_logo">
							<img src={require('assets/images/ftr_logo.png')}/>
						</div>
						<div className="ftr_menu">
						<ul>
							<li><Link to='/archived'>Pricing</Link></li>
							<li><Link to='/archived'>Contact us</Link></li>
							<li><Link to='/archived'>Terms & Conditions</Link></li>
							<li><Link to='/archived'>Privacy Policy</Link></li>
							<li><Link to='/archived'>FAQ</Link></li>
							</ul>
							</div>
							<div className="ftr_copy">
							© 2022 Feedbacktool. All Rights Reserved
							</div>
					</div>
				</div>
			)
		}
	}
}