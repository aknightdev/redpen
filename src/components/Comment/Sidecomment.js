import React from 'react';
import { config } from 'Constants.js';
import { FaReply } from 'react-icons/fa';
import Cmenu from 'components/Cmenu/Cmenu.js';

export default class Sidecomment extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {commentText:'',showReplyBox:false, comment:this.props.comment}
    	this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    	this.setComment = this.setComment.bind(this);
    	this.postComment = this.postComment.bind(this);
    	this.toggleReplyBox = this.toggleReplyBox.bind(this);
    	this.toggleCompleted = this.toggleCompleted.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
		return {
		  comment: nextProps.comment,
		}
	}
    toggleReplyBox = () =>{
    	this.setState({showReplyBox:!this.state.showReplyBox});
    }
    setComment = (event) =>{
    	this.setState({commentText: event.target.value});
    }
    toggleCompleted(replyIndex,st){
    	let comment = this.state.comment;
    	comment.replies[replyIndex].completed = st;
    	this.setState({comment:comment});
    }
    postComment = () =>{
    	fetch(config.url.API_URL+"addcomment", {
		  	method: "POST",
	  		body: JSON.stringify({ image_id:this.state.comment.image, version_id:this.state.comment.version, comment_id:this.state.comment._id, x_pos:0, y_pos:0, comment:this.state.commentText, user_id: this.authUser.id, project_id: this.props.projectId}),
		    headers: {
		        'Content-Type': 'application/json'
		    }
		}).then( (response) =>{
            return response.json();
	    }).then( (result) => {
	    	this.setState({commentText: ''});
	    	this.setState({showReplyBox: false});
	    	let replies = [...this.state.comment.replies,result.replies[result.replies.length-1]];
	    	let comment = this.state.comment;
	    	comment.replies = replies;
	    	this.setState({comment: comment});
	    });
    }
	render() {
		return (<section className={this.props.commentId==this.state.comment._id?'sidebar-annotation comment-group active':'sidebar-annotation comment-group'} onClick={()=>this.props.showComments(this.state.comment._id,0)}>
					<Cmenu isThread={true} canEdit={this.state.comment.replies[0].user._id===this.authUser.id} commentId={this.state.comment._id} replyIndex="0" toggleCompleted={this.toggleCompleted} reply={this.state.comment.replies[0]} ></Cmenu>
					<div className="replies">
						{this.state.comment.replies.slice(1, this.state.comment.replies.length).map((reply,key1) => (
							<Cmenu isThread={false} key={'reply'+this.state.comment._id} canEdit={reply.user._id===this.authUser.id} showEdit={this.showEdit} iAgree={this.iAgree} commentId={this.state.comment._id} replyIndex={key1} toggleCompleted={this.toggleCompleted} reply={reply} ></Cmenu>
						))}
					</div>
					<FaReply onClick={this.toggleReplyBox} />
					{ (this.state.showReplyBox)?
					<article className="comment-editing-container new-comment  permanently-uncollapsed">
						<div className="taggable-textarea-container">
							<div className="beautifier"><div className="content"><span className="regular">­</span></div></div>
							<textarea value={this.state.commentText} onChange={this.setComment} placeholder="Write comment or @mention…" className="comment-textarea"></textarea>
							<div className="tag-list" style={{display: 'none'}}></div>
						</div>
						<button type="button" className="old-button post-comment bottom-stuck primary" title="Or press Command–Enter to post" onClick={()=>this.postComment()}>Post this comment</button>
						<aside className="informative-tip comment-button-tip" style={{display: 'none'}}>Or press Command-Enter</aside>
					</article>:null
					}
				</section>);
	}
}