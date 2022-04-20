import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js';

export default class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {packages:[]};
  }
  componentDidMount() {
  	this.loadPackages();
    document.body.classList = 'pricingpage';
  }
  componentWillUnmount() {
    document.body.classList = '';
  }
  loadPackages(){
    fetch(config.url.API_URL+"packages").then(function (response) {
      return response.json();
    }).then((result)=>{
      this.setState({packages: result});
    });
  }
  render() {
    return (
		<div className="page_body">
			<div className="page_wrapper">
			<div className="container">
			<div className="ourprc_welcome">
				<p>We'll get straight to the point: everything comes with <b>unlimited</b> invites, <b>unlimited</b> teammates, <b>unlimited</b> singles, and <b>unlimited</b> versioning.</p>
			</div>
			<div className="many_title">All that matters is how many projects you run at once:</div>
			<div className="prplan_row">
				{this.state.packages.map((pkg,key) => (
          <div key={key} className="prplan_item">
						<div className="prplan_grid">
							<div className="mst_label">{pkg.is_popular?'MOST POPULAR':null}</div>
							<h2>{pkg.name}</h2>
							<p>{pkg.subtitle}</p>
							<h3><span>{pkg.projects}</span> projects</h3>
							<div className="pkg_price"><span className="dollar">$</span> {pkg.price}<span className="mth">/month</span></div>
							<Link to="/register" className="link_btn2">Sign up</Link>
						</div>
				</div>
				))}

			</div>
			  

				</div> 
			</div>
		</div>
    );
  }
}