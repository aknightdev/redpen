import React from 'react';
import onClickOutside from "react-onclickoutside";
import {getRandomColor,createImageFromInitials} from 'components/Utils.js'

class Collab extends React.Component {
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
		if (this.props.share.user._id===this.props.author) {
			cls += ' author';
		}
		else{
			if (this.authUser.id===this.props.author) {
				dpdown = <i className="arrow1"></i>;
				cls += ' editable';
			}
		}
		if (this.props.share.access) {
			cls += ' admin';
			adminIcon = <i className="angledd-crown"></i>;
		}
		if (this.state.menuOpen) {
			menudiv = <menu className="collaborator-dropdown " style={{backgroundColor:'#cfe1dd'}}>
						<li className="admin" onClick={()=>this.calltoAction('power')}>{this.props.share.access?'Remove access to this project':'Give full access to this project'}</li>
						<li className="remove" onClick={()=>this.calltoAction('remove')}>Remove from the project</li>
					</menu>;
		}

	  	return (
	  	<div className="collaborator-container">
			<span className={cls} title={this.props.share.user.email} onClick={this.toggleMenu}>
				<span><img className='pfpic' src={createImageFromInitials(500, this.props.share.user.name, this.props.share.user.color)} alt='profile-pic' />{/*this.props.share.user?this.props.share.user._id===this.authUser.id?'You':this.props.share.user.name:''*/}</span>
			    {dpdown}
				{adminIcon}
			</span>
			{menudiv}
		</div>
	  	);
	}
}
export default onClickOutside(Collab);