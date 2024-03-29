import React from 'react';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js';
import Modal from 'components/Modal/Modal.js';
import Moment from 'react-moment';

export default class Archived extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {isLoggedIn: false, projects:[], showModal: false, dindex:-1};
	    this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
	    this.revivedProjects = this.revivedProjects.bind(this);
	    this.deleteProject = this.deleteProject.bind(this);
	    this.removeProject = this.removeProject.bind(this);
	    this.closeModal = this.closeModal.bind(this);
	}
	async getProjects() {
		if (this.authUser.id!=null) {
			const response = await fetch(config.url.API_URL+'archived',{ method: "POST", body: JSON.stringify({user_id: this.authUser.id}), headers: { 'Content-Type': 'application/json' }});
		    const projects = await response.json();
		    this.setState({projects:projects.list});
	    }
	}
	deleteProject(ind){
		this.setState({dindex:ind, showModal:true});
	}
	removeProject() {
	  var array = this.state.projects;
	  if (this.state.dindex !== -1) {
	  	let postdata = {id:array[this.state.dindex]._id};
	    fetch(config.url.API_URL+"removeproject", {
		  	method: "POST",
	  		body: JSON.stringify(postdata),
	  		headers: {
		        'Content-Type': 'application/json'
		    }
		}).then(function (response) {
            return response.json();
	    }).then( (resp) => {
	    	array.splice(this.state.dindex, 1);
	    	this.setState({projects: array, showModal:false, dindex:-1});
	    });
	  }
	}
	closeModal(){
		this.setState({dindex:-1, showModal:false});
	}
	revivedProjects(project_id){
		fetch(config.url.API_URL+"reviveproject", {
		  	method: "POST",
	  		body: JSON.stringify({id:project_id}),
	  		headers: {
		        'Content-Type': 'application/json'
		    }
		}).then(function (response) {
            return response.json();
	    }).then( (result) => { 
			window.location.href='./projects';
	    });
	}
	componentDidMount() {
		if (window.localStorage.getItem('auth_user')!=null) {this.setState({ isLoggedIn: true });}
        this.getProjects();
    }
	render() {

		return (
			<div className="pg_boxwrapper team_page suprt_page">
			<div className="page_wrapper light_bg">
			<div className="container2 home">

					<div className="team_row">
							<div className="team">
							<h2>Trash</h2>
								 
							
								 
							<div className="teammates-list">
								<table>
									<thead>
										<tr>
											<th width="10%">Date</th>
											<th width="60%">Project Title</th>
											<th width="30%">Action</th>
										</tr>
									</thead>
									<tbody>
										  {this.state.projects.map((project,key) => (
										<tr key={key}>
										<td data-label="Date"><span className="meta"> <Moment format="DD MMM">{project.created}</Moment></span></td>
										<td data-label="Project Title"> {project.name}  </td>
										<td data-label="Action"><button className="action btn" onClick={()=>this.revivedProjects(project._id)} rel="nofollow" data-method="put">Restore</button> <button className="action btn" onClick={()=>this.deleteProject(key)} rel="nofollow" data-method="put">Delete</button> </td>
										</tr>
										 ))}
									</tbody>
								</table>
								 
							</div>
							</div>
						</div>
				 
		    </div>
		    </div>

				<Modal showModal={this.state.showModal} handleClose={this.closeModal}>
					<div className="teammodal">
						<h2>Confirm?</h2>
			          	<p style={{textAlign:'center'}}>Are you sure to delete project permanently</p>
			          	<div className="checkboxes-and-labels teammate-checkboxes">
			          	</div>
			          	<button onClick={this.removeProject}>Delete</button> <button onClick={this.closeModal}>Cancel</button>
		          	</div>
		        </Modal>
		    </div>
		);
	}
}