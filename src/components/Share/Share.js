import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { config } from 'Constants.js';

export default class Share extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {validEmail:false, copied: false, success: false, email:''}
	    this.validateEmail = this.validateEmail.bind(this)
	    this.emailThem = this.emailThem.bind(this)
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
			this.props.reloadProject(this.props.projectId);
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
    	window.addEventListener('click', (e)=>{   
    		if (document.getElementById('modalMain')!=null) {
			  if (document.getElementById('modalMain').contains(e.target)){
			    //console.log('inside');
			  } else if (document.getElementById('modalWrapper').contains(e.target)){
			    this.props.handleClose();
			  }
		  	}
		});
    }
    
	render() {
		let ebutton = null;
		if (this.state.validEmail) {ebutton=<button className="new-button primary light email-button" onClick={this.emailThem}>Email them</button>;}
		let successpop = null;
		if (this.state.success) {successpop=<div className="success-balloon"><span>OK. We just emailed them. </span><strong>Invite another?</strong></div>;}
	  return (
	    <div className={this.props.showShare ? "modal display-block" : "modal display-none"} id="modalWrapper">
	      <section className="share_modalmain" id="modalMain">
	      <button className="close_pop" onClick={this.props.handleClose}>X</button>
	        <div className="share-link-container share_orlink">
				<h2>Give colleagues this link to click:</h2>
				<div className="share-link"><span className="share-link-text">{this.props.projectId!==undefined && this.props.projectId!==0?config.url.BASE_URL+'p/'+this.props.projectId:config.url.BASE_URL+this.props.imageId}</span>
				<CopyToClipboard text={config.url.BASE_URL+'p/'+this.props.projectId}
		          onCopy={() => this.setState({copied: true})}>
		          <button className="new-button primary light">Copy link</button>
		        </CopyToClipboard>
				</div>
			</div>
			{this.props.projectId!==undefined && this.props.projectId!==0?(
				 <div className="share-link-container share_oremail">
			        <div>
						<h2 className="not-first-of-type">Or, we’ll email them an invitation</h2>
						<div className="share-link">
						<span className="share-link-text">
						<input placeholder="Enter email address" value={this.state.email} onKeyUp={this.validateEmail} onChange={this.validateEmail} />
						</span>
						{ebutton}
						</div>
			        	 
			        	{successpop}
			        </div>
			        <div className="secretmode"><input type="checkbox" name="secretmode" checked={this.props.secretMode} onChange={()=>this.props.updateSecretMode()} id="secretmode" /> <label htmlFor="secretmode">Secret mode: disable the link; only allow people I Invite</label></div>
		        </div>
	        ):''}
	      </section>
	    </div>
	  );
	}
};