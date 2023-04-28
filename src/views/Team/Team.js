import React from 'react';
import { Link } from 'react-router-dom';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Modal from 'components/Modal/Modal.js';
import $ from 'jquery';
import { config } from 'Constants.js';
import {getRandomColor,createImageFromInitials} from 'components/Utils.js'

export default class Team extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {success:false, usernames:[], users:[], teammates:[], showModal: false, dindex:-1, validEmail: false, email:'',error:""};
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
		if(this.state.validEmail){
			this.addTeam(this.state.email,'',this.authUser.id);
		}
		else{
			this.setState({error: $('#teamemail').val()==""?"Enter email address":"Invalid email address"}); 
		}
		//this.setState({teammates: [...this.state.teammates,{id:1,name:'“'+this.state.email+'”',email:this.state.email}]});
		// this.typeahead.getInstance().clear();
	}
	showAddButton(event) {
		let emailValid = event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    	if (emailValid) {
    		this.setState({email: event.target.value}); 
    		this.setState({validEmail: true}); 
    		this.setState({error: ""}); 
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
	  	let postdata = array[this.state.dindex].user?{user_id: array[this.state.dindex].user._id, email:''}:{email:array[this.state.dindex].email,user_id:''};
	    fetch(config.url.API_URL+"removeteammate", {
		  	method: "POST",
	  		body: JSON.stringify(postdata),
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
			// this.setState({users: [...this.state.users,{id:'1', name: 'Test', email: 'test@gmail.com'}]});
			// fetch(config.url.API_URL+"users", {
			//   	method: "GET",
		  	// 	headers: {
			//         'Content-Type': 'application/json'
			//     }
			// }).then(function (response) {
	        //     return response.json();
		    // }).then( (resp) => {
		    // 	resp.forEach((usr)=>{
		    // 		this.setState({users: [...this.state.users,{id:usr.id, name: usr.name, email: usr.email}]});
		    // 	});
		    // });
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
	    	this.setState({email: "", validEmail: false, error: "User invited successfully!"}); 
	    	document.getElementById('teamemail').value = '';
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
	    	this.setState({teammates:result.team});
	    }
	    else{
	    	// this.addTeam('','',this.authUser.id);
	    }
	}
	render() {
		var success = null, button=null;
		if (this.state.success) {
			success = <aside className="success-balloon "><span>Okay then. We’ve emailed them the good news. </span><strong>Add another?</strong></aside>;
		}
		// if (this.state.validEmail) {
			button = <button className="new-button primary light email-button" onClick={this.addTeammate}>Invite team member</button>;
		// }
		return (
			<div className="pg_boxwrapper team_page">
			<div className="page_wrapper light_bg">
			<div className="container2 home">
				<div className="team_row">
					<div className="team">
					<h2>Team members</h2>
						<div className="tm_inrow">
							<p>Collaborate with others in your workspace</p>
							<div className="contains-input">
								{/*<Typeahead
								  id='dpusers'
								  filterBy={this.filterBy}
								  placeholder='Email Address'
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
								/>*/}
								<textarea onKeyUp={this.showAddButton} id="teamemail" name="email" className="title input not-empty" placeholder='Email Address'></textarea>
								{button}
								{success}
							</div>
						</div>
					
					{this.state.error != ''?<div className="error_block">{this.state.error}</div>:''}
					<div className="teammates-list">
						<table>
							<thead>
								<tr>
									<th width="70%">Member</th>
									<th>Role</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{this.state.teammates.map((teammate,key) => (
								<tr key={key}>
									<td><span>{teammate.user?teammate.user.name:''} <span>({teammate.user?teammate.user.email:teammate.email})</span></span></td>
									<td>{teammate.user && this.authUser.id===teammate.user._id?'Admin':'User'}</td>
									<td><button className="btn" onClick={()=>this.removeTeammate(key)}>Remove</button></td>
								</tr>
								))}
							</tbody>
						</table>
						{/*<ul>
						{this.state.teammates.map((teammate,key) => (
						<li key={key} onClick={()=>this.removeTeammate(key)}>
							<span className="large author removable teammate" title={teammate.email}>
								<span>{this.authUser.id===teammate.user._id?'Me, '+teammate.user.name:teammate.user.name}</span>
							</span>
						</li>
						))}
						</ul>*/}
					</div>
					</div>
				</div>
				<Modal showModal={this.state.showModal} handleClose={this.closeModal}>
					<div className="teammodal">
						<h2>Remove {this.state.teammates[this.state.dindex]?this.state.teammates[this.state.dindex].name:''}?</h2>
			          	<p>This will remove <b>{this.state.teammates[this.state.dindex]?this.state.teammates[this.state.dindex].name:''}</b>  from the team. They’ll no longer be able to create projects. You can also</p>
			          	<div className="checkboxes-and-labels teammate-checkboxes">
			          	<div className="form-group">
			          		<input type="checkbox" id="unfollow_all" />
			          		<label htmlFor="unfollow_all">Remove them from all previous team projects and singles</label>
			          	</div>
			          	{/*<div className="form-group">
			          		<input type="checkbox" id="kill_user" />
			          		<label htmlFor="kill_user">Destroy their account entirely</label>
			          	</div>*/}
			          	</div>
			          	<button onClick={this.removePeople}>Remove {this.state.teammates[this.state.dindex]?this.state.teammates[this.state.dindex].name:''}</button>
		          	</div>
		        </Modal>
			</div>
			</div>
			</div>
		);
	}
}