import React from 'react';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js';
import Moment from 'react-moment';

export default class Archived extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {isLoggedIn: false, projects:[]};
	    this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
	    this.revivedProjects = this.revivedProjects.bind(this);
	}
	async getProjects() {
		if (this.authUser.id!=null) {
			const response = await fetch(config.url.API_URL+'archived',{ method: "POST", body: JSON.stringify({user_id: this.authUser.id}), headers: { 'Content-Type': 'application/json' }});
		    const projects = await response.json();
		    this.setState({projects:projects.list});
	    }
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
			<div className="container home">
				<div className="content">
					<h1 className="monty-h1">Trash</h1>
					
					<section className="simple-rows archived-projects">
				      {this.state.projects.map((project,key) => (
						<article key={key} className="simple-row">
							<strong>{project.name}</strong> <span className="meta">— <Moment format="DD MMM">{project.created}</Moment></span>
							<button className="action" onClick={()=>this.revivedProjects(project._id)} rel="nofollow" data-method="put">Revive</button>
						</article>
				      ))}
				    </section>
				</div>
		    </div>
		);
	}
}