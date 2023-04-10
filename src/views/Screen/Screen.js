import React from 'react';
import Comment from 'components/Comment/Comment.js';
import Dropzone from 'react-dropzone';
import Modal from 'components/Modal/Modal.js';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js';
import Share from 'components/Share/Share.js';
import Sdropdown from 'components/Sdropdown/Sdropdown.js';
import Commentsidebar from 'components/Commentsidebar/Commentsidebar.js';
import $ from 'jquery';
import queryString from 'query-string'
import Notifications from 'components/Notifications/Notifications.js';
import { HotKeys } from 'react-keyboard';
import Hotkeys from 'react-hot-keys';
import { FaPen,FaArrowRight,FaArrowLeft,FaAngleDown } from 'react-icons/fa';
import Commenter from 'components/Commenter/Commenter.js';
import Moment from 'react-moment';

export default class Screen extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {ballonOpen:false, image_id:props.match.params.id, name: '', description:'', version:1, path: '', parent:0, project_id:0,project_name:'',comments:[],versions:[],isHidden:true, top:0, left:0, x_pos:0, y_pos:0, showModal:false, showMenu:false, prominent:false, version_id:'', showShare: false, editTitle: false, canEdit:false, shrink:false, showCommentsidebar: false, nlist:[], canUpload:false, commentId:'', activePolilynes:[], approved:false,updated:new Date(),scrTo:false};
    	this.image = {};
    	this.prev = {};
    	this.next = {};
    	this.user_id = {};
    	this.handleClick = this.handleClick.bind(this);
    	this.appendComment = this.appendComment.bind(this);
    	this.handleDragEnter = this.handleDragEnter.bind(this);
    	this.handleDragLeave = this.handleDragLeave.bind(this);
    	this.toggleMenu = this.toggleMenu.bind(this);
    	this.loadImage = this.loadImage.bind(this);
    	this.reloadImage = this.reloadImage.bind(this);
    	this.loadVersion = this.loadVersion.bind(this);
    	this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    	this.showNotifypopup = this.showNotifypopup.bind(this);
    	this.showSharepopup = this.showSharepopup.bind(this);
    	this.editToggle = this.editToggle.bind(this);
    	this.handleImgTitleChange = this.handleImgTitleChange.bind(this);
    	this.handleImgTitleEdit = this.handleImgTitleEdit.bind(this);
    	this.handleImgDescChange = this.handleImgDescChange.bind(this);
    	this.approveScreen = this.approveScreen.bind(this);
    	this.updateScreen = this.updateScreen.bind(this);
    	this.deleteScreen = this.deleteScreen.bind(this);
    	this.deleteVersion = this.deleteVersion.bind(this);
    	this.shrinkScreen = this.shrinkScreen.bind(this);
    	this.showComments = this.showComments.bind(this);
    	this.copyComments = this.copyComments.bind(this);
    	this.onEnterPress = this.onEnterPress.bind(this);
    	this.hideComments = this.hideComments.bind(this);
    	this.toggleComments = this.toggleComments.bind(this);
    	this.loadComments = this.loadComments.bind(this);
    	this.sortComments = this.sortComments.bind(this);
    	this.toggleShare = this.toggleShare.bind(this);
    	this.currentComment = '';
    }
    toggleShare(){
    	if(this.state.showShare) this.setState({showShare:false});
    }
    sortComments(s){
    	// let sortedCommentsDsc;
		// if (s.target.value=='desc') {
		//     sortedCommentsDsc= this.state.comments.sort((a,b)=>{
		// 		  if (a.updated  < b.updated) {
		// 		    return 1;
		// 		  }
		// 		  if (a.updated > b.updated) {
		// 		    return -1;
		// 		  }
		// 		  return 0;
		//     });
		//     this.setState({
		//         comments:sortedCommentsDsc
		//     });
	    // }
	    // else{
	    // 	sortedCommentsDsc= this.state.comments.sort((a,b)=>{
		// 		  if (a.updated  > b.updated) {
		// 		    return 1;
		// 		  }
		// 		  if (a.updated < b.updated) {
		// 		    return -1;
		// 		  }
		// 		  return 0;
		//     });
		//     this.setState({
		//         comments:sortedCommentsDsc
		//     });
	    // }
    }
    toggleComments(){
    	if(!this.state.showCommentsidebar){
    		this.showComments();
    	}
    	else{
    		this.hideComments();
    	}
    }
    hideComments(){
    	// $('#commentSidebar').addClass('transition-leave-active').addClass('transition-leave');
	  	// $('.image').removeClass('showing-comments-sidebar');
    	// setTimeout(()=>{
			this.setState({showCommentsidebar:false,commentId:'', activePolilynes:[]});
		// },1000);
    }
    async loadNotify(){
		const notif = await fetch(config.url.API_URL+'notifications',{ method: "POST", body: JSON.stringify({project_id:this.state.project_id, user_id: this.authUser.id}), headers: { 'Content-Type': 'application/json' }});
	    const notifications = await notif.json();
	    this.setState({nlist:notifications});
    }
    componentDidMount() {
    	const values = queryString.parse(this.props.location.search);
    	if(values.showing_comment!==undefined){
    		this.currentComment = values.showing_comment;
    	}
    	this.loadImage();
    	window.addEventListener('click', (e)=>{   
    		if (document.getElementById('comment_box0')!=null) {
			  if (document.getElementById('comment_box0').contains(e.target)){
			    //nothing
			  } else if (document.getElementById('mainImage').contains(e.target)){
			    //nothing
			  }
			  else{
			  	this.setState({isHidden:true});
			  }
		  	}
		  	if (document.getElementById('versionButton')!=null) {
			  if (document.getElementById('versionButton').contains(e.target)){
			    //nothing
			  }
			  else{
			  	this.setState({showMenu:false});
			  }
		  	}
		});
		document.body.classList = 'singlepage';
    } 
  componentWillUnmount() {
    document.body.classList = '';
  }
    handleClick = (event) =>{
    	var bounds = event.target.getBoundingClientRect();
    	var x = event.clientX - bounds.left;
  		var y = event.clientY - bounds.top;

  		var w = event.target.clientWidth;
  		var h = event.target.clientHeight;
  		
  		var xper = (x/w)*100;
  		var yper = (y/h)*100;

  		//console.log(xper + ' - ' + yper);

    	this.setState({isHidden: !this.state.isHidden, top: yper, left: xper, x_pos: x, y_pos: y});
    }
    handleDragEnter = (event) => {
		this.setState({ showModal: true });
	}
	handleDragLeave = (event) => {
		this.setState({ showModal: false });
	}
	toggleMenu = (event) => {
		this.setState({ showMenu: !this.state.showMenu });
	}
	reloadImage(){
		setTimeout(()=>{
			this.loadImage();
		},200);
	}
	handlersParent = {
	    left: ()=>{
	    	if(this.prev){
	    		this.props.history.push('/'+this.prev._id);
	    		this.reloadImage();
	    	}
	    },
	    right: ()=>{
	    	if(this.next){
	    		this.props.history.push('/'+this.next._id);
	    		this.reloadImage();
	    	}
	    }
	}
	async loadImage(){
		//Comment
		// window.localStorage.removeItem('image_'+this.props.match.params.id);
		// if(window.localStorage.getItem('image_'+this.props.match.params.id)==null){
		    const response = await fetch(config.url.API_URL+'screen',{
			  	method: "POST",
		  		body: JSON.stringify({id:this.props.match.params.id, user_id:this.authUser.id}),
			    headers: {
			        'Content-Type': 'application/json'
			    }
			});
		    let result = await response.json();
		    this.image = result.image;
		    this.prev = result.prev!==undefined?result.prev:null;
		    this.next = result.next!==undefined?result.next:null;
		    this.user_id = result.user;
		    //window.localStorage.setItem('image_'+this.props.match.params.id,JSON.stringify(this.image));
		    this.setStateValues(this.image);
		// }
		// else{
		// 	this.image = JSON.parse(window.localStorage.getItem('image_'+this.props.match.params.id));
		// 	//console.log(this.image);
		// 	this.setStateValues(this.image);
		// }
	}
	setStateValues(image){
		this.setState({image_id: image._id, name: image.name, description: image.description, version: image.versions.length, path: config.url.IMAGE_URL+image.image, parent: image._id, project_id: image.project?image.project._id:0, project_name: image.project?image.project.name:'', ballonOpen:false});
	    this.setState({versions:image.versions});
	    if(this.props.match.params.version>0){
	    	this.loadVersion();
	    }
	    this.setState({version_id:image.versions[image.versions.length-1]._id});
	    this.loadComments();
	    this.loadNotify();
	    if(image.project && image.project.shared){
		    image.project.shared.forEach((v,k)=>{
		    	if (this.authUser.id===v.user && v.access===true) {
	    			this.setState({canUpload:true});
	    		}
	    	});
    	}
    	if (this.user_id===this.authUser.id || this.state.canUpload) {
	    	this.setState({canEdit:true});
	    }
	    //console.log(this.state);
	}
	loadComments(){
		if (this.state.version_id!=='') {
		//Comment
		// window.localStorage.removeItem('comments_'+this.state.version_id);
		// if(window.localStorage.getItem('comments_'+this.state.version_id)==null){
			fetch(config.url.API_URL+"comments", {
			  	method: "POST",
		  		body: JSON.stringify({id:this.state.version_id}),
		  		headers: {
			        'Content-Type': 'application/json'
			    }
			}).then(function (response) {
	            return response.json();
		    }).then( (resp) => {
		    	this.setState({comments: resp});  
		    	this.sortComments({target:{value:'desc'}});
		    	//window.localStorage.setItem('comments_'+this.state.version_id,JSON.stringify(resp));
		    	// resp.forEach(val=>{
			    // 	this.setState({comments: [...this.state.comments,val]});  
			    // }); 
		    });
		// }
		// else{
		// 	let resp = JSON.parse(window.localStorage.getItem('comments_'+this.state.version_id));
		// 	resp.forEach(val=>{
		//     	this.setState({comments: [...this.state.comments,val]});  
		//     }) 
		// }
		}
	}
	appendComment(comment){
		this.setState({isHidden: true, ballonOpen: false, comments: [...this.state.comments,comment]});
		//window.localStorage.setItem('comments_'+this.state.version_id,JSON.stringify(this.state.comments));
	}

	handleDrop = (acceptedFiles) => {
		let file = acceptedFiles[0];
		const  fileType = file['type'];
		const  fileSize = file['size'];
		const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
		if(fileSize > 10485760){
            alert("Reduce it, so it's less than 10MB");
            return;
        }
		if (!validImageTypes.includes(fileType)) {
			alert('Only accept images at this moment. Try uploading a PNG!\nThere\'s good reason we keep website simple and purposeful to maximise efficient, fast feedback from your coleagues.');
		    return;
		}

		this.setState({ showModal: false, comments: [], versions: [] });
		const formData = new FormData();
		formData.append('project_id', this.state.project_id);
    	formData.append('user_id', this.authUser.id);
    	formData.append('file', file);
    	formData.append('parent', this.state.image_id);
    	fetch(config.url.API_URL+"uploadscreen", {
		  	method: "POST",
	  		body: formData
		}).then(function (response) {
            return response.json();
	    }).then( (resp) => {
	    	this.image = resp;
	    	this.props.history.push('/'+this.state.image_id+'/'+resp.versions.length);
	    	setTimeout(()=>{
		    	this.setStateValues(resp);
		    });
	    });
	}
	loadVersion(){
		this.setState({ showModal: false, comments: [], showMenu:false, prominent:true });
		setTimeout(()=>{
			//this.loadImage(); , name: v.name
			let v = this.image.versions[this.props.match.params.version-1];
			this.setState({image_id: this.image._id, description: v.description, version: parseInt(this.props.match.params.version), path: config.url.IMAGE_URL+v.image, ballonOpen:false, version_id: v._id, approved: v.approved, updated:v.created});
			this.loadComments();
		},500);
		setTimeout(()=>{
	    	this.setState({prominent:false});
	    },10000);
	}
	showNotifypopup() {
    }
    showSharepopup(){
    	this.setState({showShare: true});   
    }
    closeModal = (event) => {
		this.setState({ showModal: false, showShare: false });
	}
	updateScreen(){
		document.getElementById('fileInput').click();
	}
	deleteScreen(){
		fetch(config.url.API_URL+"deletedesign", {
              method: "POST",
              body: JSON.stringify({id:this.state.image_id}),
              headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then((result)=>{
            window.location.replace('/p/'+this.state.project_id);
        });
	}
	deleteVersion(ind){
		const imgpath = this.image.versions.length === (ind+1)?this.image.versions[(ind-1)].image:'';
		const imgname = this.image.versions.length === (ind+1)?this.image.versions[(ind-1)].name:'';
		fetch(config.url.API_URL+"deleteversion", {
              method: "POST",
              body: JSON.stringify({id:this.state.image_id, version_id: this.image.versions[ind]._id, image: imgpath, name: imgname}),
              headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then((result)=>{
        	window.location.replace('/'+this.state.image_id);
        });
	}
	shrinkScreen(){
		var myImg = document.getElementById("mainImage");
		var currWidth = myImg.width;
		this.setState({shrink:!this.state.shrink});
		setTimeout(()=>{
			if (this.state.shrink) {
		        myImg.style.width = (currWidth * 0.5).toFixed(0) + "px";
			}
			else{
		        myImg.style.width = null;
			}
		},10);
	}
	showComments(commentId,ck){
		let cc = this.state.comments.filter(a=>a._id==commentId);
		this.setState({showCommentsidebar:true,commentId:commentId, activePolilynes:cc[0].polylines,scrTo:ck});
		if(!ck) window.scrollTo(cc[0].x_pos-100,cc[0].y_pos);
		// $('.image').addClass('showing-comments-sidebar');
		// setTimeout(()=>{
		// 	$('#commentSidebar').removeClass('transition-enter').removeClass('transition-enter-active');
		// },1000);
	}
	copyComments(){
		fetch(config.url.API_URL+"clonecomments", {
		  	method: "POST",
	  		body: JSON.stringify({id:this.props.match.params.id, version_id: this.state.version_id, prev_version_id:this.image.versions[this.image.versions.length-2]._id}),
	  		headers: {
		        'Content-Type': 'application/json'
		    }
		}).then(function (response) {
            return response.json();
	    }).then( (result) => { 
	    	this.loadComments();
	    });
		
	}
	approveScreen = (ind) => {
		fetch(config.url.API_URL+"approvescreen", {
		  	method: "POST",
	  		body: JSON.stringify({id:this.props.match.params.id, approved:!this.image.versions[ind].approved, version: this.props.match.params.version, version_id: this.state.version_id}),
	  		headers: {
		        'Content-Type': 'application/json'
		    }
		}).then(function (response) {
            return response.json();
	    }).then( (result) => { 
	    	console.log(this.state.approved)
	    	this.setState({approved:!this.state.approved})
	    });
	}
	handleImgTitleChange = (event) => {
		this.setState({editTitle:false});
		if(this.state.name!==event.target.value){
			this.setState({name: event.target.value});   
			fetch(config.url.API_URL+"updatescreen", {
			  	method: "POST",
		  		body: JSON.stringify({id:this.props.match.params.id, name:event.target.value, description: this.state.description, version: this.props.match.params.version, version_id: this.state.version_id}),
		  		headers: {
			        'Content-Type': 'application/json'
			    }
			}).then(function (response) {
	            return response.json();
		    }).then( (result) => { 
		    	
		    });
	    }
	}
	handleImgTitleEdit = (name) => {
		this.setState({editTitle:false});
		if(this.state.name!==name){
			this.setState({name: name});   
			fetch(config.url.API_URL+"updatescreen", {
			  	method: "POST",
		  		body: JSON.stringify({id:this.props.match.params.id, name:name, version: this.props.match.params.version, version_id: this.state.version_id}),
		  		headers: {
			        'Content-Type': 'application/json'
			    }
			}).then(function (response) {
	            return response.json();
		    }).then( (result) => { 
		    	
		    });
	    }
	}
	handleImgDescChange = (event) => {
		if(this.state.description!==event.target.value){
		  this.setState({description: event.target.value});   
			fetch(config.url.API_URL+"updatescreen", {
			  	method: "POST",
		  		body: JSON.stringify({id:this.props.match.params.id, description:event.target.value, name: this.state.name, version: this.props.match.params.version, version_id: this.state.version_id}),
		  		headers: {
			        'Content-Type': 'application/json'
			    }
			}).then(function (response) {
	            return response.json();
		    }).then((result)=>{
		    });
		}
	}
	editToggle(){
		if (this.state.canEdit) {
			this.setState({editTitle:!this.state.editTitle});
			setTimeout(()=>{
				if(this.state.editTitle){
					document.getElementById("imageName").focus();
					document.getElementById("imageName").value = document.getElementById("imageName").value;
					var len = document.getElementById("imageName").value.length * 2;
			      	setTimeout(function() {
			        	document.getElementById("imageName").setSelectionRange(len, len);
			      	}, 1);
					this.setState({showMenu:false});
				}
			},50);
		}
	}
	onEnterPress = (e) => {
    	if(e.keyCode === 13 && e.shiftKey === false) {
		    e.preventDefault();
		    this.handleImgTitleChange(e);
		}
    }
	render() {
		const keyMap = {
		  left: 'left',
		  right: 'right'
		}
		let next=null, prev=null, title=null;
		if (this.image.project!==undefined) {
			// if(this.prev){
			// 	prev = <button><FaArrowLeft/><Link onClick={this.reloadImage} to={'/'+this.prev._id}>Previous design </Link></button>
			// }
			// else{
			// 	prev = <button><FaArrowLeft/><span>Previous design  </span></button>
			// }
			// if(this.next){
			// 	next = <button><Link onClick={this.reloadImage} to={'/'+this.next._id}>Next design<FaArrowRight/></Link></button>
			// }
			// else{
			// 	next = <button><span>Next design<FaArrowRight/></span></button>
			// }
		}
		if (this.state.editTitle) {
			title = <textarea id="imageName" onKeyDown={this.onEnterPress} defaultValue={this.state.name} className="title not-empty" placeholder="Image name" onBlur={this.handleImgTitleChange}></textarea>
		}
		else{
			title = <h1 className="title">
									<span className="ver_bg2">{this.state.versions.length>0?(<button onClick={this.toggleMenu} id="versionButton" className={'version '+ (this.state.prominent?'prominent':'')}>v{this.state.version}</button>):''}</span> <span >{this.state.name} <div className="dat_time"><Moment format="DD MMM YY hh:mma">{this.state.updated}</Moment></div></span>

										</h1>
		}
		return (
			<Dropzone noClick={true} multiple={false} onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop} noDrag={this.state.project_id===0 || this.authUser.id!==this.user_id}>
				{({getRootProps, getInputProps}) => (
						<div className="page_body page_body2 view_fullpage">
						<div className="page_wrapper ">
							<div className="container1">

					<div className="screen fullscreen_view" {...getRootProps()}>
						 
						
						<div className="content" style={{"background":"white"}}>
							<div className="pagenation">
								{prev} {next}
							</div>
							
							<div className="shotheader_sec">

							<header className="shot-header">
								<section className="editable">
								<div className="title-container">
										{title}
										{this.state.showMenu?(
										<menu className="dropdown-menu on-dark version-menu column-reverse">
											{this.state.versions.map((version,key) => (
											<Link key={key} to={'/'+this.state.image_id+'/'+(key + 1)}>
												<li className="" onClick={this.loadVersion}>
													<span>
														<span>Version </span>
														<span>{key + 1}</span>
														<span></span>
														<span>{(key + 1)===this.state.version?' (this one)':''}</span>
													</span>
												</li>
											</Link>
											))}
										</menu>
										):''}
									</div>
									<Sdropdown name={this.state.name} handleImgTitleEdit={this.handleImgTitleEdit} user={this.user_id} updateScreen={this.updateScreen} deleteScreen={this.deleteScreen} deleteVersion={this.deleteVersion} shrinkScreen={this.shrinkScreen} showComments={this.showComments} copyComments={this.copyComments} version={this.state.version} versions={this.state.versions} shrink={this.state.shrink} project={this.state.project_id} canUpload={this.state.canUpload} approveScreen={this.approveScreen} approved={this.state.approved}></Sdropdown>
									
									
									{/*<div className="description-container">
										<textarea disabled={!this.state.canEdit} className="description" placeholder="Add a description — the purpose, context, objectives..." style={{resize: 'none', overflowY: 'hidden', height: '32px'}} onBlur={this.handleImgDescChange} defaultValue={this.state.description}>
										</textarea>
									</div>*/}
								</section>
							</header>

							</div>
							
							<div className="image">
								<div className="image-wrapper">
								<img id="mainImage" src={this.state.path} alt={this.state.name} onClick = {this.handleClick} />
								{/*this.state.path!=''?<Commenter image={this.state.path} imageId={this.state.image_id} versionId={this.state.version_id} isHidden = {this.state.isHidden} ballonOpen = {true} top = {this.state.top} left = {this.state.left} replies = {[]} commentId={0} appendComment={this.appendComment} projectId={this.state.project_id} activePolilynes={this.state.activePolilynes} />:null*/}
								{this.state.comments.map((comment,key) => (
									<Comment showComments={this.showComments} key={key} idx={key} imageId={this.state.image_id} versionId={this.state.version_id} isHidden = {false} ballonOpen = {this.currentComment===comment._id?true:this.state.ballonOpen} color={comment.color} top = {comment.y_pos} left = {comment.x_pos} replies = {comment.replies} commentId={comment._id} appendComment={this.appendComment} projectId={this.state.project_id}/> 
								))}
								<Comment idx={this.state.comments.length} imageId={this.state.image_id} versionId={this.state.version_id} isHidden = {this.state.isHidden} ballonOpen = {true} top = {this.state.top} left = {this.state.left} replies = {[]} commentId={0} appendComment={this.appendComment} projectId={this.state.project_id}/> 
								</div>
							</div>
							</div>
						</div>
						</div>
						</div>
						<Modal showModal={this.state.showModal} handleClose={this.handleDragLeave}>
				          <p>Update this design with new version</p>
				        </Modal>
				        <Share reloadProject={this.reloadImage} userId={this.authUser.id} toggleShare={this.toggleShare} showShare={this.state.showShare} handleClose={this.closeModal} imageId={this.state.image_id} projectId={this.state.project_id}>
				        </Share>
				        {/*<Commentsidebar sortComments={this.sortComments} hideComments={this.hideComments} showComments={this.showComments} showCommentsidebar={this.state.showCommentsidebar} scrTo={this.state.scrTo} comments={this.state.comments} commentId={this.state.commentId} projectId={this.state.project_id} loadComments={this.loadComments}></Commentsidebar>*/}
				        <HotKeys keyMap={keyMap} handlers={this.handlersParent}></HotKeys>
				        <Hotkeys keyName="control+c" onKeyUp={this.toggleComments.bind(this)}></Hotkeys>
						<input id="fileInput" {...getInputProps()} />
						
					</div>
				)}
			</Dropzone>
		);
	}
}