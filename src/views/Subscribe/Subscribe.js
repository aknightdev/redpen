import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from 'components/CheckoutForm/CheckoutForm.js';
import { config } from 'Constants.js';
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {packages:[],openStripe:false,selectedPlan:null};
    this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    this.showStripe = this.showStripe.bind(this);
    this.closeStripe = this.closeStripe.bind(this);
  }
  componentDidMount() {
    this.loadPackages();
  }
  closeStripe(){
    this.setState({openStripe:false,selectedPlan:''});
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
  render() {
    return (
      <div className="container">
      
        <div className="pritable_row">

          <div class="many_title">All that matters is how many projects you run at once:</div>

          <div className="prplan_row">
          {this.state.packages.map((pkg,key) => (
          <div key={key} className="prplan_item">
            <div className={this.authUser.stripe_plan_id==pkg.stripe_plan_id?'active prplan_grid':'prplan_grid'}>
              <div className="mst_label">{pkg.is_popular?'MOST POPULAR':null}</div>
              <h2>{pkg.name}</h2>
              <p>{pkg.subtitle}</p>
              <h3><span>{pkg.projects}</span> projects</h3>
              <div className="pkg_price"><span className="dollar">$</span> {pkg.price}<span className="mth">/month</span></div>
              {this.authUser.stripe_plan_id==pkg.stripe_plan_id?<Link to="#" className="link_btn2" onClick={()=>this.cancelStripe(pkg.stripe_plan_id)}>Cancel</Link>:<Link to="#" className="link_btn2" onClick={()=>this.showStripe(pkg.stripe_plan_id)}>Change Plan</Link>}
            </div>
          </div>
          ))}
           </div>

        </div>
        {this.state.openStripe?<StripeProvider apiKey="pk_test_Bsz9UH6A2AZNWQ8gv2K94wWV006ppRsssE">
            <Elements>
              <CheckoutForm closeStripe={this.closeStripe} selectedPlan={this.state.selectedPlan} />
            </Elements>
        </StripeProvider>:null}
      </div>
    );
  }
}