import React from 'react';
import { config } from 'Constants.js';
import { FaTrash } from 'react-icons/fa';
import onClickOutside from "react-onclickoutside";

class Trash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showDrop: false};
        this.deleteDesign = this.deleteDesign.bind(this);
        this.returnDesign = this.returnDesign.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    }
    handleClickOutside = evt => {
        this.returnDesign();
    }
    returnDesign(){
    	this.setState({showDrop:false});
    }
    confirmDelete(){
        document.getElementById("ajxloader").style.display = "block";
    	fetch(config.url.API_URL+"deletedesign", {
              method: "POST",
              body: JSON.stringify({id:this.props.image._id}),
              headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then((result)=>{
            this.setState({showDrop:false});
            this.props.reloadProject(this.props.projectId);
        });
    }
    deleteDesign(){
    	this.setState({showDrop:!this.state.showDrop});
    }
    render() {
        let delButton;
        if(this.props.user===this.authUser.id || this.props.canUpload){
            delButton =  <div className="dd_inner" onClick={this.deleteDesign}><FaTrash /></div>;
        }
        else{
            delButton = null;
        }
        if(this.state.showDrop)
    	    return  <div className="gear-confirmation"><div><button className="new-button primary dark" onClick={this.confirmDelete}>I’m serious. Delete it.</button> <span className="cancel new-button primary dark danger" onClick={this.returnDesign}>Cancel</span></div></div>;
        else
            return delButton;
	}	
}
export default onClickOutside(Trash);