import React from 'react';
import { config } from 'Constants.js';
import $ from 'jquery';
import Like from 'components/Like/Like.js';
import { FaPen,FaTrash,FaFolderOpen } from 'react-icons/fa';
import TimeAgo from 'timeago-react';
import { TiTick } from 'react-icons/ti';
import { BsFillTrashFill } from 'react-icons/bs';

export default class Cmenu extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {menuOpen:false, editMode:false, name:this.props.reply.reply, confirm:false, completed:this.props.reply.completed};
    	this.commentmenuLeave = this.commentmenuLeave.bind(this);
    	this.commentmenuHover = this.commentmenuHover.bind(this);
    	this.showEdit = this.showEdit.bind(this);
    	this.iAgree = this.iAgree.bind(this);
    	this.onEnterPress = this.onEnterPress.bind(this);
    	this.confirmDelete = this.confirmDelete.bind(this);
    	this.deleteReply = this.deleteReply.bind(this);
    	this.handleReplyChange = this.handleReplyChange.bind(this);
    	this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    }
    confirmDelete(){
    	this.setState({confirm:true});
    	setTimeout(()=>{
            if(this.state.editMode){
            	var len = $('.replytextarea').val();
                $('.replytextarea').focus().val('').val(len);
            }
        },50);
    }
    showEdit(comment_id,reply_id){
    	this.setState({editMode:true});
        this.setState({menuOpen: false});
    	setTimeout(()=>{
            if(this.state.editMode){
            	var len = $('.replytextarea').val();
                $('.replytextarea').focus().val('').val(len);
            }
        },50);
    }
    deleteReply = (event) => {
        fetch(config.url.API_URL+"deletereply", {
              method: "POST",
              body: JSON.stringify({id:this.props.commentId, reply_id: this.props.reply._id, is_thread:this.props.isThread}),
              headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then( (result) => { 
            if(this.props.isThread){
                $('.comment-'+this.props.reply._id).parent('section').remove();
                $('#comment_box'+this.props.commentId).remove();
            }
            else{
                $('.comment-'+this.props.reply._id).remove();
            }
        });
    }
    handleReplyChange = (event) => {
    	setTimeout(()=>{
    		if(!this.state.confirm){
	        	this.setState({editMode:false});
	        	this.setState({menuOpen: false});
        	}
    	},100);
        if(this.props.reply.reply!==event.target.value){
            this.setState({name: event.target.value});   
            this.props.updateComment(this.props.replyIndex,event.target.value);
            fetch(config.url.API_URL+"updatereply", {
                  method: "POST",
                  body: JSON.stringify({id:this.props.commentId, reply:event.target.value, reply_id: this.props.reply._id}),
                  headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                return response.json();
            }).then( (result) => { 
                
            });
        }
    }
    iAgree(comment_id,reply_id){
    	if (comment_id && reply_id) {
    		// this.setState({menuOpen: false});
    		// $('.comment-'+reply_id).find('.likes-container').append('<span class="like-container selected"><i class="like"></i><i class="big-like"><i class="happy-face"></i><i class="thumb-outer-bg"></i><i class="thumb-container"><i class="thumb"></i><i class="thumb-stroke"></i></i></i></span>');
    		// $('.comment-'+reply_id).find('.likes-container').children('.like-container:last').hover((t)=>{
    		// 	$('.comment-'+reply_id).find('.likes-container').children('.like-container:last').append('<span class="informative-tip like-tip" style="margin-left:-40px;">'+this.authUser.name+' agrees</span>');
    		// },(t)=>{
    		// 	$('.comment-'+reply_id).find('.likes-container').children('.like-container:last').children('.like-tip').remove();
    		// });
	    	// fetch(config.url.API_URL+"iagree", {
		    //          method: "POST",
		    //          body: JSON.stringify({id:comment_id, user_id: this.authUser.id, reply_id: reply_id}),
		    //          headers: {
		    //            'Content-Type': 'application/json'
		    //        }
		    //    }).then(function (response) {
		    //        return response.json();
		    //    }).then((result)=>{
		            
		    //    });
		    //    setTimeout(()=>{
		    //    	$('.like-container').removeClass('selected');
		    //    },2000)
		    fetch(config.url.API_URL+"iagree", {
	            method: "POST",
	            body: JSON.stringify({id:comment_id, user_id: this.authUser.id, reply_id: reply_id, completed:!this.state.completed}),
	            headers: {
	                'Content-Type': 'application/json'
	            }
	        }).then(function (response) {
	            return response.json();
	        }).then((result)=>{
	        	let st = !this.state.completed;
	            this.setState({completed:st});
	            this.props.toggleCompleted(this.props.replyIndex,st);
	        });
        }
    }
    commentmenuLeave(){
    	this.setState({menuOpen: false});
    }
    commentmenuHover(){
    	this.setState({menuOpen: true});
    }
    onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            this.handleReplyChange(e);
        }
    }
	render() {
		var editlink=null, menuDd=null, editblock=null, attachDiv=null;
		if (this.state.editMode) {
			editblock = <div className="edit-mode"><textarea className="replytextarea" onBlur={this.handleReplyChange} defaultValue={this.props.reply.reply}  onKeyDown={this.onEnterPress}></textarea></div>;
		}
		else{
			if (this.props.canEdit) {
				/*onDoubleClick={()=>this.showEdit(this.props.commentId,this.props.reply._id)}*/
				if(this.props.reply.attachment!='' && this.props.reply.attachment!=undefined){
					editblock = <div><p>{this.props.reply.reply}</p><div className="attach">
						<div className="lt_attach">
						<p>Image 2</p>
						<span>60 MB</span>
						</div>
						<div className="rt_attach"><a href={config.url.IMAGE_URL+this.props.reply.attachment} target="_blank">Download</a></div>
					</div><div className="edt_del_buttons"><span><FaPen onClick={()=>this.showEdit(this.props.commentId,this.props.reply._id)} /></span> <span><BsFillTrashFill onClick={this.confirmDelete} /></span></div></div>;

				}
				else{
					editblock = <div><p>{this.props.reply.reply}</p> <div className="edt_del_buttons"><div className="edt_del_buttons_inner"><span><FaPen onClick={()=>this.showEdit(this.props.commentId,this.props.reply._id)} /></span> <span><BsFillTrashFill onClick={this.confirmDelete} /></span></div></div></div>;
				}
			}
			else{
				if(this.props.reply.attachment!='' && this.props.reply.attachment!=undefined){
					editblock = <div><p>{this.props.reply.reply}</p><div className="attach"><FaFolderOpen /><a href={config.url.IMAGE_URL+this.props.reply.attachment} target="_blank">Download</a></div></div>;
				}
				else{
					editblock = <div><p>{this.props.reply.reply}</p></div>;
				}
			}
		}
		if (this.props.canEdit) {editlink=<li onClick={() => this.showEdit(this.props.commentId,this.props.reply._id)}>Edit</li>}
		/*if (this.state.menuOpen) {
			menuDd = <div className="gear-container" onMouseEnter={this.commentmenuHover} onMouseLeave={this.commentmenuLeave}>
							<i className="gear"></i>
							<ul className="dropdown-menu on-dark project-thumb-dropdown segmented checkable">
    				<li onClick={() => this.iAgree(this.props.commentId,this.props.reply._id)}>I agree</li>
    				{editlink}
    				<li><a href={'?showing_comment='+this.props.commentId}>Link to Post</a></li>
				</ul></div>;
		}
		else{
			if (this.state.editMode) {
				if (this.state.confirm) {
					menuDd = <button onClick={this.deleteReply} className={this.props.isThread?'delete-comment thread confirm':'delete-comment confirm'} title="Delete Thread"><i className="trash"></i></button>
				}
				else{
					menuDd = <button onClick={this.confirmDelete} className={this.props.isThread?'delete-comment thread':'delete-comment'} title="Delete Thread"><i className="trash"></i></button>	
				}
			}
			else{
				menuDd = <div className="gear-container" onMouseEnter={this.commentmenuHover} onMouseLeave={this.commentmenuLeave}><i className="gear"></i></div>
			}
		}*/
		if (this.state.confirm) {
			menuDd = <button onClick={this.deleteReply} className={this.props.isThread?'delete-comment thread confirm':'delete-comment confirm'} title="Delete Thread"><i className="trash"></i></button>
		}
		if(this.props.reply.attachment!='' && this.props.reply.attachment!=undefined){
			// attachDiv = <div className="attach"><FaFolderOpen /><a href={config.url.IMAGE_URL+this.props.reply.attachment} target="_blank">Download</a></div>
		}
		 
			return <article className={'comment comment-'+this.props.reply._id}>
							<div className="pro_meta">

								<div className="ltpr_meta">
									<span className="prof_pic">
									<span>{this.props.reply.user?this.props.reply.user.name.charAt():'A'}</span></span>
									<span className="prof_name">
									{this.props.reply.user?this.props.reply.user.name:'Annon'}</span> &nbsp;
									<TimeAgo datetime={this.props.reply.created}></TimeAgo>
								</div>
								<div className="rtpr_meta">
									<span className={this.state.completed?'active markcmp':'markcmp'} onClick={() => this.iAgree(this.props.commentId,this.props.reply._id)}><span className="mc_text">Mark complete</span> <span className="mc_icon"><TiTick /></span></span>
								</div>


						
							</div>
						

						{menuDd}
						{attachDiv}
						{editblock}
						
						<div className="byline">
							
							{/*<span>
								<span className="likes-container ">
									{this.props.reply.agree!==undefined && this.props.reply.agree.map((agree,key) => (
										<Like key={'agree'+key} agree={agree} ></Like>
									))}	
								</span>
								<span className="meta clickable" onClick={()=>this.iAgree(this.props.commentId,this.props.reply._id)}>Agree</span>
							</span>*/}
						</div>
					</article>;
	}
}