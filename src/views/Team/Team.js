import React from 'react';
import { Link } from 'react-router-dom';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Modal from 'components/Modal/Modal.js';
import $ from 'jquery';
import { config } from 'Constants.js';

export default class Team extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {success:false, usernames:[], users:[], teammates:[], showModal: false, dindex:-1, validEmail: false, email:''};
	    this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null,email:null}:JSON.parse(window.localStorage.getItem('auth_user'));
	    this.filterBy = this.filterBy.bind(this);
	    this.addSelected = this.addSelected.bind(this);
	    this.closeModal = this.closeModal.bind(this);
	    this.removeTeammate = this.removeTeammate.bind(this);
	    this.removePeople = this.removePeople.bind(this);
	    this.showAddButton = this.showAddButton.bind(this);
	    this.addTeammate = this.addTeammate.bind(this);
	    this.typeahead = null;
	}
	addTeammate(){
		this.addTeam(this.state.email,'',this.authUser.id);
		//this.setState({teammates: [...this.state.teammates,{id:1,name:'“'+this.state.email+'”',email:this.state.email}]});
		this.typeahead.getInstance().clear();
	}
	showAddButton(val) {
		let emailValid = val.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    	if (emailValid) {
    		this.setState({email: val}); 
    		this.setState({validEmail: true}); 
    	}
    	else{
    		this.setState({validEmail: false}); 
    	}
	}
	filterBy(option, props) {
	    return option.name.toLowerCase().indexOf(props.text.toLowerCase()) !== -1 || option.email.replace(/[&/\\#,+()$@~%.'":*?<>{}]/g,'').toLowerCase().indexOf(props.text.toLowerCase()) !== -1;
	}
	addSelected(selected){
		//this.setState({teammates: [...this.state.teammates,selected[0]]});
		var result = $.grep(this.state.teammates, function(v,i) {
		    return v.user._id === selected[0].id;
		});
		if(!result.length){
			this.addTeam('',selected[0].id,this.authUser.id);
		}
		this.typeahead.getInstance().clear();
	}
	removeTeammate(ind){
		this.setState({dindex:ind, showModal:true});
	}
	closeModal(){
		this.setState({dindex:-1, showModal:false});
	}
	removePeople() {
	  var array = this.state.teammates;
	  if (this.state.dindex !== -1) {
	    fetch(config.url.API_URL+"removeteammate", {
		  	method: "POST",
	  		body: JSON.stringify({user_id: array[this.state.dindex].user._id}),
	  		headers: {
		        'Content-Type': 'application/json'
		    }
		}).then(function (response) {
            return response.json();
	    }).then( (resp) => {
	    	array.splice(this.state.dindex, 1);
	    	this.setState({teammates: array, showModal:false, dindex:-1});
	    });
	  }
	}
	componentDidMount(){
		if (this.authUser.id!=null) {
			this.setState({usernames: [...this.state.usernames,this.authUser.name]});
			this.setState({users: [...this.state.users,{id:this.authUser.id, name: this.authUser.name, email: this.authUser.email}]});
			//this.setState({users: [...this.state.users,{id:'1', name: 'Test', email: 'test@gmail.com'}]});
			this.getTeam();
		}
		$(document).mouseup(e => {
		   	if (!$('.modal-main').is(e.target) && $('.modal-main').has(e.target).length === 0){
		     	this.setState({showModal:false});
		  	}
		});
	}
	addTeam(email,user_id,current_user_id){
		fetch(config.url.API_URL+"addteammate", {
		  	method: "POST",
	  		body: JSON.stringify({email:email, user_id: user_id, current_user_id: current_user_id}),
	  		headers: {
		        'Content-Type': 'application/json'
		    }
		}).then(function (response) {
            return response.json();
	    }).then( (resp) => {
	    	this.getTeam();
	    });
	}
	async getTeam(){
		const response = await fetch(config.url.API_URL+'team',{
		  	method: "POST",
	  		body: JSON.stringify({user_id:this.authUser.id}),
		    headers: {
		        'Content-Type': 'application/json'
		    }
		});
	    let result = await response.json();
	    if(result.team){
	    	this.setState({teammates:result.team.team});
	    	console.log(this.state.teammates);
	    }
	    else{
	    	this.addTeam('','',this.authUser.id);
	    }
	}
	render() {
		var success = null, button=null;
		if (this.state.success) {
			success = <aside className="success-balloon "><span>Okay then. We’ve emailed them the good news. </span><strong>Add another?</strong></aside>;
		}
		if (this.state.validEmail) {
			button = <button className="new-button primary light email-button" onClick={this.addTeammate}>Add</button>;
		}
		return (
			<div className="container">
				 
				<div className="team_row">
					<div className="teamleft">
						<img src={require('assets/images/teammate.jpg')} alt=""/>
					</div>
					<div className="teamright">

					<h2>Your teammates</h2>
					<p>
						Add teammates here! Teammates are granted the power to create new projects.<br />
						They share in the project quota for your subscription.
					</p>
					<div className="teammates-list">
						<strong className="heading">People who can create projects:</strong>
						<ul>
						{this.state.teammates.map((teammate,key) => (
						<li key={key} onClick={()=>this.removeTeammate(key)}>
							<span className="large author removable teammate" title={teammate.email}>
								<span>{this.authUser.id===teammate.user._id?'Me, '+teammate.user.name:teammate.user.name}</span>
							</span>
						</li>
						))}
						<li className="contains-input">
							<Typeahead
							  id='dpusers'
							  filterBy={this.filterBy}
							  placeholder='bob@buraerinc.com'
							  labelKey='name'
							  onChange={this.addSelected}
							  onInputChange={this.showAddButton}
							  options={this.state.users}
							  renderMenuItemChildren={(option, props) => (
							    <div>
							      <div className="author">{option.name}</div>
							      <small className="meta">{option.email}</small>
							    </div>
							  )}
							  ref={(typeahead) => this.typeahead = typeahead}
							/>
							{button}
							{success}
						</li></ul>
					</div>
					</div>
				</div>
				<Modal showModal={this.state.showModal} handleClose={this.closeModal}>
					<h2>Remove {this.state.teammates[this.state.dindex]?this.state.teammates[this.state.dindex].name:''}?</h2>
		          	<p>This will remove <b>{this.state.teammates[this.state.dindex]?this.state.teammates[this.state.dindex].name:''}</b>  from the team. They’ll no longer be able to create projects. You can also</p>
		          	<p className="checkboxes-and-labels teammate-checkboxes">
		          		<input type="checkbox" id="unfollow_all" />
		          		<span> </span>
		          		<label htmlFor="unfollow_all">Remove them from all previous team projects and singles</label>
		          		<input type="checkbox" id="kill_user" />
		          		<span> </span><label htmlFor="kill_user">Destroy their account entirely</label>
		          	</p>
		          	<button onClick={this.removePeople}>Remove {this.state.teammates[this.state.dindex]?this.state.teammates[this.state.dindex].name:''}</button>
		        </Modal>
			</div>
		);
	}
}