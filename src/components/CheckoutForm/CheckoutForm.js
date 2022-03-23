import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { config } from 'Constants.js';
import $ from 'jquery';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: this.authUser.name, address:{line1:'4th Avenue',city:'Sydney',state:'NSW',postal_code:'2000',country:'AU'}});
    await fetch(config.url.API_URL+"charge", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({token: token.id, plan_id:$('#plan_id').val(), user_id: this.authUser.id})
    }).then(function (response) {
            return response.json();
    }).then((result)=>{
      if (result.status==='active') {
        window.location.href="/";
      }
      else{
        alert('Error while processing your subscription!');
      }
    });
  }

  render() {
    return (
      <aside className="payment-balloon js-payment-balloon modal large" style={{display:'none'}}>
        <div className="second-pane js-second-pane">
          <strong className="heading">Good choice. What are your details?</strong>
          <input type="hidden" id="plan_id" value="0" />
          <CardElement />
          <button onClick={this.submit}>Subscribe Now</button>
        </div>
      </aside>
    );
  }
}

export default injectStripe(CheckoutForm);