import React from 'react';
import { config } from 'Constants.js';
import $ from 'jquery';
import Like from 'components/Like/Like.js';
import Canvas from 'components/Commenter/Canvas.js';
import Toolbar from 'components/Commenter/Toolbar.js';
import ToolModal from 'components/Commenter/ToolModal.js';
import onClickOutside from "react-onclickoutside";

class Commenter extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {showCommenter:false, UI:{
		    theme: 'yellow',
		    image: this.props.image,
		 },isModalOpen:false,color:'red',size:2,isStraightMode:0,polylines:[[{}]],polylineCount:0,x_pos:0,y_pos:0,attachment:'',attfile:null,replies:[]};
    	this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    	this.openCommenter = this.openCommenter.bind(this);
		this.setUI = this.setUI.bind(this);
		this.setIsModalOpen = this.setIsModalOpen.bind(this);
		this.setColor = this.setColor.bind(this);
		this.setSize = this.setSize.bind(this);
		this.setIsStraightMode = this.setIsStraightMode.bind(this);
		this.setPolylines = this.setPolylines.bind(this);
		this.setPolylineCount = this.setPolylineCount.bind(this);
		this.postComment = this.postComment.bind(this);
		this.setXY = this.setXY.bind(this);
		this.setAttachment = this.setAttachment.bind(this);
    }
    handleClickOutside = evt => {
        this.setState({showCommenter:false, polylineCount:0})
    }
    setAttachment = (e) =>{
    	if(e.target.files[0].name){
    		this.setState({attachment:e.target.files[0].name,attfile:e.target.files[0]});
    	}
    }
    setXY = (x,y) =>{
    	this.setState({x_pos: x, y_pos: y});
    }
    postComment = (event) =>{
    	fetch(config.url.API_URL+"addcomment", {
		  	method: "POST",
	  		body: JSON.stringify({ image_id:this.props.imageId, version_id:this.props.versionId, comment_id:this.props.commentId, x_pos:this.state.x_pos, y_pos:this.state.y_pos, comment:document.getElementById('comment').value, user_id: this.authUser.id, project_id: this.props.projectId, polylines: this.state.polylines, color: this.state.color}),
		    headers: {
		        'Content-Type': 'application/json'
		    }
		}).then( (response) =>{
            return response.json();
	    }).then( (result) => {
	    	this.setState({comment: ''});
	    	this.setState({showCommentButton: false});
	    	document.getElementById('comment').value='';
	        if (this.state.attachment!='') {
		        const formData = new FormData();
				formData.append('project_id', this.props.projectId);
		    	formData.append('user_id', this.authUser.id);
		    	formData.append('file', this.state.attfile);
		    	formData.append('parent', this.props.imageId);
		    	formData.append('comment_id', result._id);
		    	formData.append('reply_id', result.replies[0]._id);
		    	fetch(config.url.API_URL+"uploadattachment", {
				  	method: "POST",
			  		body: formData
				}).then( (response)=> {
		            return response.json();
			    }).then( (resp) => {
			    	result.replies[0].attachment = resp.image;
			    	if(this.props.commentId===0){
			        	this.props.appendComment(result);
			        }
			        else{
			        	this.setState({replies: [...this.state.replies,result.replies[result.replies.length-1]]});  
			        	window.localStorage.setItem('replies_'+this.props.commentId,JSON.stringify(this.state.replies));
			        }
			    });
		    }
		    else{
		    	if(this.props.commentId===0){
		        	this.props.appendComment(result);
		        }
		        else{
		        	this.setState({replies: [...this.state.replies,result.replies[result.replies.length-1]]});  
		        	window.localStorage.setItem('replies_'+this.props.commentId,JSON.stringify(this.state.replies));
		        }
		    }
	        this.setState({polylines:[[{}]]});
	        this.setState({polylineCount:0,attachment:''});
	        document.getElementById('attach').value='';
	    });
    }
    setUI(data){
    	this.setState({UI:data})
    }
    setIsModalOpen(data){
    	this.setState({isModalOpen:data})
    }
    setColor(data){
    	this.setState({color:data})
    }
    setSize(data){
    	this.setState({size:data})
    }
    setIsStraightMode(data){
    	this.setState({isStraightMode:data})
    }
    setPolylines(data){
    	this.setState({polylines:data});
    }
    setPolylineCount(data){
    	this.setState({polylineCount:data})
    }
    openCommenter(){
    	this.setState({showCommenter:true})
    }
	render() {
			return <div className="editor">
								<Canvas
							        UI={this.state.UI}
							        isModalOpen={this.state.isModalOpen}
							        color={this.state.color}
							        size={this.state.size}
							        isStraightMode={this.state.isStraightMode}
							        polylines={this.props.activePolilynes.length>0?this.props.activePolilynes:this.state.polylines}
							        setPolylines={this.setPolylines}
							        polylineCount={this.props.activePolilynes.length>0?this.props.activePolilynes.length:this.state.polylineCount}
							        setPolylineCount={this.setPolylineCount}
							        setXY={this.setXY}
							        showCommenter={this.state.showCommenter}
							      />
							      {this.state.showCommenter?(<div className="commenter">
							      	  <div className="inpbox">
							      	  	<div className="pf_pic"><span>SP</span></div>
							      	  	<textarea className="input" id="comment" placeholder="Leave your comment here"></textarea>
							      	  </div>
							      	  <div className="tools">
							      	  <div className="left">
									      <ToolModal
									        UI={this.state.UI}
									        isModalOpen={this.state.isModalOpen}
									        color={this.state.color}
									        setColor={this.setColor}
									        size={this.state.size}
									        setSize={this.setSize}
									      />
								      </div>
								      <div className="right">
									      <Toolbar
									        UI={this.state.UI}
									        setIsModalOpen={this.setIsModalOpen}
									        polylines={this.state.polylines}
									        polylineCount={this.state.polylineCount}
									        setPolylineCount={this.setPolylineCount}
									        isStraightMode={this.state.isStraightMode}
									        setIsStraightMode={this.setIsStraightMode}
									        postComment={this.postComment}
									        setAttachment={this.setAttachment}
									        attachment={this.state.attachment}
									      />
								      </div>
								      </div>
							      </div>):(<button onClick={this.openCommenter} className="cmtbtn">+</button>)}
							   </div>
	}
}
export default onClickOutside(Commenter);