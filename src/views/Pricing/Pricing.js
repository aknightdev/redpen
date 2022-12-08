import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js';

export default class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {packages:[],activeTab:'monthly'};
    this.setActiveTab = this.setActiveTab.bind(this);
  }
  setActiveTab(tab) {
		this.setState({activeTab:tab});
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
		<div className="page_top">
			<div className="page_wrapper">
			<div className="inner_banner price_inner">
					<div className="container">
					   <span>PRICING PLANS</span>
						<h1>Choose the right plan to<br/> suit your business</h1>
						<p>Flexible plans you’ve been looking for</p>
					</div>
				</div>
			<div className=" light_bg">
			<div className="container">
			<div className="pricing_buttons">
						<a onClick={()=>this.setActiveTab('monthly')} className={this.state.activeTab=='monthly'?"active":''}>Monthly</a>
						<a onClick={()=>this.setActiveTab('yearly')} className={this.state.activeTab=='yearly'?"active":''}>Annually</a>
			</div>
			
			<div className="price prplan_row">
				
				<div className={this.state.activeTab=='monthly'?"prplan_tab active":'prplan_tab'}>
					{this.state.packages.map((pkg,key) => (
	          <div key={key} className="prplan_item">
							<div className={pkg.is_popular?'prplan_grid pop_active':'prplan_grid'}>
								<div className={pkg.is_popular?'mst_label':'mst_label hide'}>{pkg.is_popular?'Most popular':null}</div>
								<h2>{pkg.name}</h2>
								<p>{pkg.subtitle}</p>
									<div className="pkg_price"><span className="dollar">$</span>{pkg.price}<span className="mth">Per month</span></div>
									<Link to="/register" className="link_btn">Get Started Today</Link>
									<h3>What’s included:</h3>
								 <ul>
									 <li><span>{pkg.projects}</span> projects</li>
									 <li>Unlimited free shares</li>
									 <li>Version management</li>
									 <li>Industry-leading security</li>
								</ul>				
								
							</div>
					</div>
					))}
				</div>

				<div className={this.state.activeTab=='yearly'?"prplan_tab active":'prplan_tab'}>
					{this.state.packages.map((pkg,key) => (
	          <div key={key} className="prplan_item">
							<div className={pkg.is_popular?'prplan_grid pop_active':'prplan_grid'}>
								<div className={pkg.is_popular?'mst_label':'mst_label hide'}>{pkg.is_popular?'Most popular':null}</div>
								<h2>{pkg.name}</h2>
								<p>{pkg.subtitle}</p>
									<div className="pkg_price"><span className="dollar">$</span>{pkg.price}<span className="mth">Per year</span></div>
									<Link to="/register" className="link_btn">Get Started Today</Link>
									<h3>What’s included:</h3>
								 <ul>
									 <li><span>{pkg.projects}</span> projects</li>
									 <li>Unlimited free shares</li>
									 <li>Version management</li>
									 <li>Industry-leading security</li>
								</ul>				
								
							</div>
					</div>
					))}
				</div>
				
				

			</div>
			  
			</div> 
				</div> 
            
            	<div className="container">
            		   <div className="abt_sec1 faq_section">
					<div className="grid_1350">	 
						<div className="row">
							<div className="col col5">
								<h2>Pricing FAQs</h2>
								<p>It's always hard to choose Plans. We're here to help you make the right decision.</p>

								<div className="ab_btn">
								<Link to='/faq'>Get more answers</Link> </div>

							</div>
							<div className="col col7">

												<div className="accordion">
					       
					        <span className="target-fix" id="accordion"></span>					         
					       
					        <div>					          
					            <span className="target-fix" id="accordion1"></span>					            
					            <a href="#accordion1" id="open-accordion1" title="open">Is the Free plan really forever-free?</a>				            
					            <a href="#accordion" id="close-accordion1" title="close">Is the Free plan really forever-free?
		 										<div className="accordion-content">
							              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							          </div>
					            </a>				           
					           
					        </div>
					       
					        <div>
					            <span className="target-fix" id="accordion2"></span>
					            <a href="#accordion2" id="open-accordion2" title="open">What will happen when my trial expires?</a>
					            <a href="#accordion" id="close-accordion2" title="close">What will happen when my trial expires?
												 <div className="accordion-content">
						                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>   
						            </div>
					            </a>
					           
					        </div>
					       
					        <div>
					            <span className="target-fix" id="accordion3"></span>
					            <a href="#accordion3" id="open-accordion3" title="open">Can I choose what to upgrade?</a>
					            <a href="#accordion" id="close-accordion3" title="close">Can I choose what to upgrade?
						            <div className="accordion-content">
						                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						            </div>

					            </a>
					        </div>


					         <div>
					            <span className="target-fix" id="accordion4"></span>
					            <a href="#accordion4" id="open-accordion4" title="open">Can I change my subscription anytime I want?</a>
					            <a href="#accordion" id="close-accordion4" title="close">Can I change my subscription anytime I want?
						            <div className="accordion-content">
						                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						            </div>
					            </a>
					        </div>

					         <div>
					            <span className="target-fix" id="accordion5"></span>
					            <a href="#accordion5" id="open-accordion5" title="open">Which plan is right for me?</a>
					            <a href="#accordion" id="close-accordion5" title="close">Which plan is right for me?
						            <div className="accordion-content">
						                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						            </div>

					            </a>
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