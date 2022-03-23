import React from 'react';
import onClickOutside from "react-onclickoutside";
import { config } from 'Constants.js';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);

	    this.state = {showDrop: false, notify: false};
        this.gearClick = this.gearClick.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.archiveProject = this.archiveProject.bind(this);
        this.leaveProject = this.leaveProject.bind(this);
        this.notifyMespec = this.notifyMespec.bind(this);
        this.notifyMe = this.notifyMe.bind(this);
        this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    }
    componentDidMount() {
        this.props.project.shared.forEach((val,key)=>{
            if (val.user._id===this.authUser.id) {
                this.setState({notify: val.notify});
            }
        });
    }
    deleteProject(){
        fetch(config.url.API_URL+"deleteproject", {
              method: "POST",
              body: JSON.stringify({id:this.props.project._id}),
              headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then((result)=>{
            this.props.updateProjects();
        });
    }
    leaveProject(){
        fetch(config.url.API_URL+"leaveproject", {
              method: "POST",
              body: JSON.stringify({id:this.props.project._id, user_id: this.authUser.id}),
              headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then((result)=>{
            this.props.updateProjects();
        });
    }
    archiveProject(){
        fetch(config.url.API_URL+"archiveproject", {
              method: "POST",
              body: JSON.stringify({id:this.props.project._id}),
              headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then((result)=>{
            this.props.updateProjects();
        });
    }
    notifyMespec(){
        fetch(config.url.API_URL+"notifyme", {
              method: "POST",
              body: JSON.stringify({id:this.props.project._id, user_id: this.authUser.id, notify: true}),
              headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then((result)=>{
            this.setState({notify: true});
        });
    }
    notifyMe(){
        fetch(config.url.API_URL+"notifyme", {
              method: "POST",
              body: JSON.stringify({id:this.props.project._id, user_id: this.authUser.id, notify: false}),
              headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then((result)=>{
            this.setState({notify: false});
        });
    }
    handleClickOutside = evt => {
        if(evt.target.innerHTML==='Notify me only when I’m @mentioned' || evt.target.innerHTML==='Notify me of everything' || evt.target.innerHTML==='Archive project for everyone' || evt.target.innerHTML==='Delete project for everyone' || evt.target.innerHTML==='Leave project'){
            return false;
        }
        this.setState({showDrop:false});
    }
    gearClick(){
        this.setState({showDrop:!this.state.showDrop});
    }
    render() {
        let delButton, arcButton;
        if(this.props.project.user===this.authUser.id){
            delButton = <li className="danger" onClick={this.deleteProject}>Delete project for everyone</li>;
            arcButton = <li className="danger" onClick={this.archiveProject}>Archive project for everyone</li>;
        }
        else{
            delButton = null;
            arcButton = null;
        }
        if(this.state.showDrop)
    	    return  <div><div className="prj_sett" onClick={this.gearClick}>&nbsp;</div><div className="dropdown-menu project-thumb-dropdown">


    				<label> <input type="checkbox" value="1" /> Notify me of everything</label>
    				<label> <input type="checkbox" value="2" /> Notify me only when I’m @mentioned</label>
    				 <ul>
    				<li onClick={this.leaveProject}>Leave project</li>
                    {arcButton}
    				{delButton}</ul>
    			</div></div>;
        else
            return <div className="prj_sett" onClick={this.gearClick}>&nbsp;</div>;
	}				
}
export default onClickOutside(Dropdown);