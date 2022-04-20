import React, {Component} from 'react';
import onClickOutside from "react-onclickoutside";
import {CardElement, injectStripe} from 'react-stripe-elements';
import { config } from 'Constants.js';
import $ from 'jquery';
import { FaWindowClose } from 'react-icons/fa';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {loading:false};
    this.submit = this.submit.bind(this);
    this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
  }
  handleClickOutside = evt => {
    this.props.closeStripe();
  }
  async submit(ev) {
    this.setState({loading:true});
    let {token} = await this.props.stripe.createToken({name: this.authUser.name, address:{line1:'4th Avenue',city:'Sydney',state:'NSW',postal_code:'2000',country:'AU'}});
    await fetch(config.url.API_URL+"charge", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({token: token.id, plan_id:this.props.selectedPlan, user_id: this.authUser.id})
    }).then(function (response) {
            return response.json();
    }).then((result)=>{
      this.setState({loading:false});
      if (result.status==='active') {
        this.authUser.stripe_plan_id = this.props.selectedPlan;
        let expiry_date = new Date();
        expiry_date.setDate(expiry_date.getDate() + 1);
        this.authUser.expiry_date = expiry_date;
        window.localStorage.setItem('auth_user',JSON.stringify(this.authUser));
        this.props.closeStripe();
        this.props.setCurrentPlan(this.authUser.stripe_plan_id);
      }
      else{
        alert('Error while processing your subscription!');
      }
    });
  }

  render() {
    return (
      <aside className="payment-balloon js-payment-balloon modal large">
        <span className="close" onClick={this.props.closeStripe}><FaWindowClose /></span>
        <div className={this.state.loading?'second-pane js-second-pane loading':'second-pane js-second-pane'}>
          <strong className="heading">Good choice. What are your details?</strong>
          <input type="hidden" id="plan_id" value="0" />
          <CardElement options={{ hidePostalCode: true }} />
          <button className="button" onClick={this.submit}>Subscribe Now</button>
        </div>
      </aside>
    );
  }
}

export default injectStripe(onClickOutside(CheckoutForm));