import React from 'react';
import Reply from 'components/Reply/Reply.js';
import { config } from 'Constants.js';

export default class Comment extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {ballonOpen:this.props.ballonOpen, comment:'', showCommentButton:false, replies:this.props.replies};
    	this.setComment = this.setComment.bind(this);
    	this.postComment = this.postComment.bind(this);
    	this.updateComment = this.updateComment.bind(this);
    	this.commentHover = this.commentHover.bind(this);
    	this.commentLeave = this.commentLeave.bind(this);
    	this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    }
    componentDidMount() {
    	if(this.props.commentId!==0){
    		//Comment
    		window.localStorage.removeItem('replies_'+this.props.commentId);
    		if(window.localStorage.getItem('replies_'+this.props.commentId)==null){
    			window.localStorage.setItem('replies_'+this.props.commentId,JSON.stringify(this.props.replies));
    		}
    		else{
    			this.setState({replies:JSON.parse(window.localStorage.getItem('replies_'+this.props.commentId))});
    		}
    	}
    }
    commentLeave(){
    	if(this.props.commentId!==0)
    		this.setState({ballonOpen: false});
    }
    commentHover(){
    	if(this.props.commentId!==0)
    		this.setState({ballonOpen: true});
    }
    updateComment(){

    }
    postComment = (event) =>{
    	fetch(config.url.API_URL+"addcomment", {
		  	method: "POST",
	  		body: JSON.stringify({ image_id:this.props.imageId, version_id:this.props.versionId, comment_id:this.props.commentId, x_pos:this.props.left, y_pos:this.props.top, comment:this.state.comment, user_id: this.authUser.id, project_id: this.props.projectId}),
		    headers: {
		        'Content-Type': 'application/json'
		    }
		}).then( (response) =>{
            return response.json();
	    }).then( (result) => {
	    	this.setState({comment: ''});
	    	this.setState({showCommentButton: false});
	    	if(this.props.commentId===0){
	        	this.props.appendComment(result);
	        }
	        else{
	        	this.setState({replies: [...this.state.replies,result.replies[result.replies.length-1]]});  
	        	window.localStorage.setItem('replies_'+this.props.commentId,JSON.stringify(this.state.replies));
	        }
	    });
    }
    setComment = (event) =>{
    	if(event.target.value!==''){
    		this.setState({showCommentButton: true});
    	}
    	else{
    		this.setState({showCommentButton: false});	
    	}
    	this.setState({comment: event.target.value});
    }
    render() {
	    if (this.props.isHidden)
	    	return null
	    else
	        return <aside id={'comment_box'+this.props.commentId} style={{top: this.props.top+'px',left: this.props.left+'px'}} className={"annotation comment-group separator-between-all-comments " + (this.props.commentId===0?"pop ":"") + (this.state.ballonOpen?"open":"")} onClick={()=>this.props.showComments(this.props.commentId,1)}>
					<i className="marker"><i className="marker-inner" style={{background: this.props.color}}>{this.props.idx+1}</i></i>
					{/*<div className="balloon">
						{this.state.replies.map((reply,key) => (
							<Reply key={key} indexVal={key} replyData={reply} commentId={this.props.commentId} />
						))}
						
						<div className="comment-clip">
							<div className="replies"></div>
						</div>
						<article className="comment-editing-container new-comment  permanently-uncollapsed">
							<div className="taggable-textarea-container">
								<div className="beautifier"><div className="content"><span className="regular">­</span></div></div>
								<textarea value={this.state.comment} onChange={this.setComment} placeholder="Write comment or @mention…" className="comment-textarea"></textarea>
								<div className="tag-list" style={{display: 'none'}}></div>
							</div>
							<button type="button" className="old-button post-comment bottom-stuck primary" title="Or press Command–Enter to post" onClick={this.postComment} style={{display: this.state.showCommentButton?'block':'none'}}>Post this comment</button>
							<aside className="informative-tip comment-button-tip" style={{display: 'none'}}>Or press Command-Enter</aside>
						</article>
						<span className="mouse-catcher-l"></span>
						<span className="mouse-catcher-r"></span>
						<span className="mouse-catcher-b"></span>
					</div>*/}
				</aside>; 
	}				
}