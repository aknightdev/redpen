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
				<div className="page_top">
			<div className="page_wrapper">
				<div className="inner_banner">
					<div className="container">
						<h1>About Feed back Tool</h1>
						<p>
						From the beginning, our goal has been to make collaboration super-fast. No matter where your colleagues are in the <br/>world, if you work with visuals we’ll help you collaborate with your team effortlessly.
						</p>
					</div>
				</div>
				<div className="abt_sec1">
					<div className="grid_1350">	 
						<div className="row">
							<div className="col col5">
								<h2>
								What you get with Feedback Tool
								</h2>

							</div>
							<div className="col col7">
								 <p>
								 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
								 </p>
								 <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. </p>

							</div>
						</div>
						<div className="abtool_sec">
							<div className="row">
								<div className="col col4">
								<div className="tl_box">
									<img src={require('assets/images/abt_icon.svg')}/>
									<h3>
									Design and User Experience
									</h3>
									<p>Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								</div>
								</div>
								<div className="col col4">
								<div className="tl_box">
									<img src={require('assets/images/abt_icon2.svg')}/>
									<h3>Design better together.

									</h3>
									<p>Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								</div>
								</div>
								<div className="col col4">
								<div className="tl_box">
									<img src={require('assets/images/abt_icon3.svg')}/>
									<h3>Collaboration begins with clarity
									</h3>
									<p>Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								</div>
								</div>
								<div className="col col4">
								<div className="tl_box">
									<img src={require('assets/images/abt_icon4.svg')}/>
									<h3>Centralize your feedbacks

									</h3>
									<p>Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								</div>
								</div>
								<div className="col col4">
								<div className="tl_box">
									<img src={require('assets/images/abt_icon5.svg')}/>
									<h3>Everywhere in the world

									</h3>
									<p>Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								</div>
								</div>
								<div className="col col4">
								<div className="tl_box">
									<img src={require('assets/images/abt_icon6.svg')}/>
									<h3>Customer Support

									</h3>
									<p>Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								</div>
								</div>
							</div>
						</div>
					</div>	
				</div>

				<div className="abt_sec2">
					<div className="container">
						<div className="row">
							<div className="col col12"><h2>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h2>
							</div>
						</div>
					<div className="row">
							<div className="col col5">
								<img src={require('assets/images/about-img.png')}/>
							</div>
							<div className="col col7">
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. </p>
							<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
							</div>
				 	</div>
				 	<div className="row">
							<div className="col col12"><p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
							</div>
						</div>

						 
					</div>
				</div>

				 
			</div>

			</div>
		);
	}
}