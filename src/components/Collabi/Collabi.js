import React from 'react';
import onClickOutside from "react-onclickoutside";
import {getRandomColor,createImageFromInitials} from 'components/Utils.js'

class Collabi extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {menuOpen:false};
    	this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    	this.toggleMenu = this.toggleMenu.bind(this);
    	this.calltoAction = this.calltoAction.bind(this);
    }
    toggleMenu(){
    	if (this.props.share.user._id!==this.props.author && this.authUser.id===this.props.author) {
    		this.setState({menuOpen:!this.state.menuOpen});
    	}
    }
    calltoAction(action){
    	if (action==='power') {
    		this.props.togglePowers(this.props.share._id,!this.props.share.access);
    	}
    	else{
    		this.props.removeAccess(this.props.share._id);
    	}
    	this.setState({menuOpen:false});
    }
    handleClickOutside = evt => {
    	this.setState({menuOpen:false});
    }
	render() {
		var cls = 'collaborator', adminIcon=null, dpdown=null, menudiv=null;
		if (this.authUser.id===this.props.author) {
			dpdown = <i className="arrow"></i>;
			cls += ' editable dropdown';
		}
		if (this.props.share.access) {
			cls += ' admin';
			adminIcon = <i className="angled-crown"></i>;
		}
		if (this.state.menuOpen) {
			menudiv = <menu className="collaborator-dropdown " style={{backgroundColor:'#cfe1dd'}}>
						<li className="admin" onClick={()=>this.calltoAction('power')}>{this.props.share.access?'Remove access to this project':'Give full access to this project'}</li>
						<li className="remove" onClick={()=>this.calltoAction('remove')}>Remove from the project</li>
					</menu>;
		}

	  	return (
	  	<div className="collaborator-container">
			<span className={cls} title={this.props.share.email} onClick={this.toggleMenu}>
				<span><img className='pfpic' src={createImageFromInitials(500, this.props.share.email, getRandomColor())} alt='profile-pic' />{/*this.props.share.email*/}</span>
			    {dpdown}
				{adminIcon}
			</span>
			{menudiv}
		</div>
	  	);
	}
}
export default onClickOutside(Collabi);