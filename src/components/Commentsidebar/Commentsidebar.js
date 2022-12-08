import React from 'react';
import { config } from 'Constants.js';
import onClickOutside from "react-onclickoutside";
import Sidecomment from 'components/Comment/Sidecomment.js';
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
		        //scrollTop: $(".comment-group.active").offset().top - 200
		    }, 200);
    	}
		if (this.props.showCommentsidebar) {
		return (<section id="commentSidebar" className="comments-sidebar transition-enter transition-enter-active">
					<div className="sectionhead">
						<div className="left">{this.props.comments.length} Comments</div>
						<div className="right">
							<select name="commentSort" onChange={(e)=>this.props.sortComments(e)}>
							 <option value="desc">Newest</option>
							 <option value="asc">Old</option>
							</select>
						</div>
					</div>
					{this.props.comments.map((comment,key) => (
						<Sidecomment key={'comment'+key} showComments={this.props.showComments} commentId={this.props.commentId} comment={comment} projectId={this.props.projectId}></Sidecomment>
					))}
				</section>);
		}
		else{
			return null;
		}
	}
};
export default onClickOutside(Commentsidebar);

 