import React from 'react';
import { config } from 'Constants.js';
import { FaTrash } from 'react-icons/fa';

export default class Protrash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showDrop: false};
        this.deleteDesign = this.deleteDesign.bind(this);
        this.returnDesign = this.returnDesign.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    }
    returnDesign(){
    	this.setState({showDrop:false});
    }
    confirmDelete(){
    	fetch(config.url.API_URL+"archiveproject", {
              method: "POST",
              body: JSON.stringify({id:this.props.project._id}),
              headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then((result)=>{
            this.setState({showDrop:false});
            this.props.updateProjects();
        });
    }
    deleteDesign(){
    	this.setState({showDrop:!this.state.showDrop});
    }
    render() {
        let delButton;
        if(this.props.project.user===this.authUser.id){
            delButton =  <FaTrash onClick={this.deleteDesign}/>;
        }
        else{
            delButton = null;
        }
        if(this.state.showDrop)
    	    return  <div className="gear-confirmation"><div><button className="new-button primary dark" onClick={this.confirmDelete}>I’m serious. Delete it.</button> <span className="cancel new-button primary dark danger" onClick={this.returnDesign}>Return to safety</span></div></div>;
        else
            return delButton;
	}	
}