import React from 'react';
import { Link } from 'react-router-dom';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Modal from 'components/Modal/Modal.js';
import $ from 'jquery';
import { config } from 'Constants.js';
import {getRandomColor,createImageFromInitials} from 'components/Utils.js'
import Moment from 'react-moment';

export default class Invoices extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {success:false, payments:[]};
	    this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null,email:null}:JSON.parse(window.localStorage.getItem('auth_user'));
	}
	componentDidMount(){
		if (this.authUser.id!=null) {
			fetch(config.url.API_URL+"payments", {
			  	method: "POST",
			  	body: JSON.stringify({user_id:this.authUser.id}),
		  		headers: {
			        'Content-Type': 'application/json'
			    }
			}).then(function (response) {
	            return response.json();
		    }).then( (resp) => {
		    	this.setState({payments: resp});
		    });
		}
	}
	render() {
		var success = null, button=null;
		if (this.state.success) {
			success = <aside className="success-balloon "><span>Okay then. We’ve emailed them the good news. </span><strong>Add another?</strong></aside>;
		}
		if (this.state.validEmail) {
			button = <button className="new-button primary light email-button" onClick={this.addTeammate}>Invite team member</button>;
		}
		return (
			<div className="pg_boxwrapper inv_page">
			<div className="page_wrapper light_bg">
			<div className="container2 home">
				<div className="inv_row">
					 <h2>Invoices</h2>
					<div className="teammates-list">
						<table>
							<thead>
								<tr>
									<th width="60%">Transaction ID</th>
									<th width="20%">Amount</th>
									<th>Date</th>
								</tr>
							</thead>
							<tbody>
								{this.state.payments.map((payment,key) => (
								<tr key={key}>
									<td data-label="Transaction ID">{payment.transaction_id}</td>
									<td data-label="Amount">$ {parseFloat(payment.amount).toFixed(2)}</td>
									<td data-label="Date"><Moment format="DD MMM YY hh:mma">{payment.created}</Moment></td>
								</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			</div>
			</div>
		);
	}
}