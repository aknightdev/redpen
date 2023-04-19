import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from 'components/CheckoutForm/CheckoutForm.js';
import { config } from 'Constants.js';
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    this.state = {packages:[],openStripe:false,selectedPlan:null,currentPlan:this.authUser.stripe_plan_id,error:''};
    this.showStripe = this.showStripe.bind(this);
    this.closeStripe = this.closeStripe.bind(this);
    this.cancelStripe = this.cancelStripe.bind(this);
    this.setCurrentPlan = this.setCurrentPlan.bind(this);
  }
  componentDidMount() {
    this.loadPackages();
  }
  closeStripe(){
    this.setState({openStripe:false,selectedPlan:''});
  }
  setCurrentPlan(plan_id){
    this.setState({currentPlan:plan_id,error:'You have subscribed successfully!'});
  }
  showStripe(plan_id){
    this.setState({openStripe:true,selectedPlan:plan_id});
    // $('.payment-balloon').show();
    // $('#plan_id').val(plan_id);
  }
  loadPackages(){
    fetch(config.url.API_URL+"packages").then(function (response) {
      return response.json();
    }).then((result)=>{
      this.setState({packages: result});
    });
  }
  cancelStripe(){
    fetch(config.url.API_URL+"cancel_stripe",{
        method: "POST",
        body: JSON.stringify({user_id: this.authUser.id}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
      return response.json();
    }).then((result)=>{
      this.authUser.stripe_plan_id='';
      window.localStorage.setItem('auth_user',JSON.stringify(this.authUser));
      this.setState({currentPlan:'',error:'Subscription cancelled successfully!'});
    });
  }
  render() {
    return (
      <div className="pg_boxwrapper">
      <div className="page_wrapper">
      <div className="container2 home">
        <div className="billhead">
          <div className="inner">
            <div className="lt">
              <h2>Invoices</h2>
              <p>View your payment history</p>
            </div>
            <div className="rt">
              <Link to="/invoices"><button>View billing history</button></Link>
            </div>
          </div>
        </div>
        <div className="pritable_row">

          {this.state.error != ''?<div className="error_block">{this.state.error}</div>:''}
          <div className="many_title">All that matters is how many projects you run at once:</div>
          <div className="price prplan_row">
            {this.state.packages.map((pkg,key) => (
              <div key={key} className="prplan_item">
                <div className={pkg.is_popular?'prplan_grid pop_active':'prplan_grid'}>
                  <div className={pkg.is_popular?'mst_label':'mst_label hide'}>{pkg.is_popular?'Most popular':null}</div>
                  <h2>{pkg.name}</h2>
                  <p>{pkg.subtitle}</p>
                    <div className="pkg_price"><span className="dollar">$</span>{pkg.price}<span className="mth">Per month</span></div>

                    {this.state.currentPlan==pkg.stripe_plan_id?<Link to="#" className="link_btn2 link_btn" onClick={this.cancelStripe}>Cancel</Link>:<Link to="#" className="link_btn2 link_btn" onClick={()=>this.showStripe(pkg.stripe_plan_id)}>Subscribe</Link>}

                    
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
        {this.state.openStripe?<StripeProvider apiKey="pk_test_Bsz9UH6A2AZNWQ8gv2K94wWV006ppRsssE">
            <Elements>
              <CheckoutForm closeStripe={this.closeStripe} setCurrentPlan={this.setCurrentPlan} selectedPlan={this.state.selectedPlan} />
            </Elements>
        </StripeProvider>:null}
      </div>
      </div>
      </div>
    );
  }
}