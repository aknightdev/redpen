import React from 'react';
import Cmenu from 'components/Cmenu/Cmenu.js';

export default class Comment extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {}
    	this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    }
	handleClickOutside = evt => {
        this.props.hideComments();
    }
    render() {
    	return  <Cmenu isThread={this.props.indexVal===0?true:false} canEdit={this.props.replyData?.user?._id===this.authUser.id} showEdit={this.showEdit} updateComment={this.props.updateComment} iAgree={this.iAgree} commentId={this.props.commentId} replyIndex={this.props.indexVal} reply={this.props.replyData} ></Cmenu>
	}				
}