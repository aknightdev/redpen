import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from 'components/CheckoutForm/CheckoutForm.js';
import { config } from 'Constants.js';
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {packages:[]};
    this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    this.showStripe = this.showStripe.bind(this);
  }
  componentDidMount() {
    this.loadPackages();
  }
  showStripe(plan_id){
    $('.payment-balloon').show();
    $('#plan_id').val(plan_id);
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

          <div className="plan_img">
            <img src={require('assets/images/paying_vector.jpg')} alt=""/>
          </div>

          <h1>Here’s what you’re paying.</h1>

          <div className="plans_grid light_blue yellow voilet">
          {this.state.packages.map((pkg,key) => (
          <div key={key} className="pr_plans">
            <div>
              <strong className="big">{pkg.projects} projects</strong>
              <div className="pkg_price">
                from <span className="dollar">$ {pkg.amount}</span> /Mo
                
              </div>
                <button onClick={()=>this.showStripe(pkg.stripe_plan_id)}>
                  downgrade
                </button>

                <div className="pkg_list">
                <p>You and your team have used 24 projects so far.</p>
                <ul>
                <li><Link to='/'>Upgrade/downgrade</Link></li>
                <li><Link to='/'>Change card</Link></li>
                <li><Link to='/'>Cancel plan</Link></li>
                 </ul> 
                </div>


            </div>
          </div>
          ))}
           </div>

        </div>
        <StripeProvider apiKey="pk_test_oIGVYGLSu6VvgVCSmK3Xwhma00I8TFn1vY">
          <div className="example">
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    );
  }
}