import React from 'react';
import onClickOutside from "react-onclickoutside";
import Cmenu from 'components/Cmenu/Cmenu.js';
import $ from 'jquery';

class Commentsidebar extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {}
    	this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    }
	handleClickOutside = evt => {
        this.props.hideComments();
    }
	render() {
		if($(".comment-group.active").length){console.log('')
    		$('#commentSidebar').animate({
		        scrollTop: $(".comment-group.active").offset().top
		    }, 200);
    	}
		if (this.props.showCommentsidebar) {
		return (<section id="commentSidebar" className="comments-sidebar transition-enter transition-enter-active">
					<div className="sectionhead">
						<div className="left">{this.props.comments.length} Comments</div>
						<div className="right">
							<select name="commentSort">
							 <option value="desc">Newest</option>
							 <option value="asc">Old</option>
							</select>
						</div>
					</div>
					{this.props.comments.map((comment,key) => (
						<section key={'comment'+key} className={this.props.commentId==comment._id?'sidebar-annotation comment-group active':'sidebar-annotation comment-group'} onClick={()=>this.props.showComments(comment._id)}>
							<Cmenu isThread={true} canEdit={comment.replies[0].user._id===this.authUser.id} commentId={comment._id} reply={comment.replies[0]} ></Cmenu>
							<div className="replies">
								{comment.replies.slice(1, comment.replies.length).map((reply,key1) => (
									<Cmenu isThread={false} key={'reply'+key} canEdit={reply.user._id===this.authUser.id} showEdit={this.showEdit} iAgree={this.iAgree} commentId={comment._id} reply={reply} ></Cmenu>
								))}
							</div>
						</section>
					))}
				</section>);
		}
		else{
			return null;
		}
	}
};
export default onClickOutside(Commentsidebar);