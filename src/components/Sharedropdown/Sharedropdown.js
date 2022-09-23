import React from 'react';
import onClickOutside from "react-onclickoutside";
import { config } from 'Constants.js';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Sharedropdown extends React.Component {
    constructor(props) {
        super(props);

	    this.state = {showDrop: false, notify: false,validEmail:false, copied: false, success: false, email:''};
        this.gearClick = this.gearClick.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.archiveProject = this.archiveProject.bind(this);
        this.leaveProject = this.leaveProject.bind(this);
        this.notifyMespec = this.notifyMespec.bind(this);
        this.notifyMe = this.notifyMe.bind(this);
        this.validateEmail = this.validateEmail.bind(this)
        this.emailThem = this.emailThem.bind(this)
        this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    }
    emailThem = (event) => {
        fetch(config.url.API_URL+"invite", {
            method: "POST",
            body: JSON.stringify({id:this.props.projectId, email:this.state.email, user_id: this.props.userId}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then( (result) => { 
            this.setState({success: true, validEmail: false, email:''}); 
            this.props.reloadProject();
        });
    }
    validateEmail = (event) => {
        if (event.target) {
            let emailValid = event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            this.setState({email: event.target.value}); 
            if (emailValid) {
                this.setState({validEmail: true}); 
            }
            else{
                this.setState({validEmail: false}); 
            }
        }
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
        let ebutton = null;
        if (this.state.validEmail) {ebutton=<button className="email_button" onClick={this.emailThem}>Email them</button>;}
        let successpop = null;
        if (this.state.success) {successpop=<div className="success-balloon"><span>OK. We just emailed them. </span><strong>Invite another?</strong></div>;}
      
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
    	    return  <div>
                        <div className="prshr_btn"  onClick={this.gearClick}>Share</div><div className="sharethum_drop">
                            <ul>
                            {this.props.project.shared.map((share,key1) => (
                                <li key={key1}>{share.user.name}</li>
                            ))}
                            </ul>           
    				 {/*<div className="share-link-container">
                     <ul>
                     <li><label>Give colleagues this link to click:</label>

                     <div className="share-link">
                     <span className="share-link-text">{this.props.projectId!==undefined && this.props.projectId!==0?config.url.BASE_URL+'p/'+this.props.projectId:config.url.BASE_URL+this.props.imageId}</span>
                <CopyToClipboard text={config.url.BASE_URL+'p/'+this.props.projectId}
                  onCopy={() => this.setState({copied: true})}>
                  <button className="share_button">Copy link</button>
                </CopyToClipboard>
                        </div>
                     </li>
                     <li>
                    
                    {this.props.projectId!==undefined && this.props.projectId!==0?(
                <div>
                    
                        <label>Or, we’ll email them an invitation</label>
                        <input className="inpu_fld" placeholder="sally@me.com" value={this.state.email} onKeyUp={this.validateEmail} onChange={this.validateEmail} />
                        {ebutton}
                        {successpop}
                    
                     
                </div>
            ):''}

                     </li>
                     
                     <li>
                     <label> <input type="checkbox" value="1" /> Secret mode: disable the link; only allow people I invite.</label> 


                     </li>

                     </ul> 
            </div>*/}
            
    			</div></div>;
        else
            return <div className="prshr_btn"  onClick={this.gearClick}>
                                        Share
                                     </div>;
	}				
}
export default onClickOutside(Sharedropdown);