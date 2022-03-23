import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: ''
    };
  }
   componentDidMount() {
    document.body.classList = 'pricingpage';
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
    return (
		
		<div className="page_body">
			<div className="page_wrapper">
			<div className="container">
			<div className="ourprc_welcome">
				
					<p>
					We'll get straight to the point: everything comes with <b>unlimited</b> invites, <b>unlimited</b> teammates, <b>unlimited</b> singles, and <b>unlimited</b> versioning.</p>	
					 

			</div>

			<div className="many_title">	All that matters is how many projects you run at once:</div>

			<div className="prplan_row">
				<div className="prplan_item">
						<div className="prplan_grid">
							<div className="mst_label">&nbsp;</div>
						<h2>Basic</h2>
						<p>Lorem Ipsum Dollor</p>
							<h3><span>5</span> projects</h3>
							<div className="pkg_price"><span className="dollar">$</span> 20<span className="mth">/month</span></div>
							<Link className="link_btn2">Sign up</Link>
						</div>
				</div>
				<div className="prplan_item">
						<div className="prplan_grid">
							<div className="mst_label">&nbsp;</div>
						<h2>Business</h2>
						<p>Lorem Ipsum Dollor</p>
							<h3><span>10</span> projects</h3>
							<div className="pkg_price"><span className="dollar">$</span> 30<span className="mth">/month</span></div>
							<Link className="link_btn2">Sign up</Link>
						</div>
				</div>
				<div className="prplan_item">
						<div className="prplan_grid">
						<div className="mst_label">MOST POPULAR</div>
						<h2>Pro Business</h2>
						<p>Lorem Ipsum Dollor</p>
							<h3><span>25</span> projects</h3>
							<div className="pkg_price"><span className="dollar">$</span> 60<span className="mth">/month</span></div>
							<Link className="link_btn2">Sign up</Link>
						</div>
				</div>
				<div className="prplan_item">
						<div className="prplan_grid">
						<div className="mst_label">&nbsp;</div>
						<h2>Platinum</h2>
						<p>Lorem Ipsum Dollor</p>
							<h3><span>40</span> projects</h3>
							<div className="pkg_price"><span className="dollar">$</span> 90<span className="mth">/month</span></div>
							<Link className="link_btn2">Sign up</Link>
						</div>
				</div>

			</div>
			  

				</div> 
			</div>
		</div>
		
		

    );
  }
}