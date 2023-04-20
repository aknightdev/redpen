import React from "react";
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import Modal from 'components/Modal/Modal.js';
import Share from 'components/Share/Share.js';
import { config } from 'Constants.js';
import Sortdd from 'components/Sortdd/Sortdd.js';
import Nameedit from 'components/Nameedit/Nameedit.js';
import Collab from 'components/Collab/Collab.js';
import Collabi from 'components/Collabi/Collabi.js';
import Trash from 'components/Trash/Trash.js';
import Notifications from 'components/Notifications/Notifications.js';
import $ from 'jquery';

export default class Project extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {id:props.match.params.id, title: '', description:'', user_id:'', images:[], showModal:false, showShare:false, togSear:false, imagename:'', shared:[], invite:[], canEdit: false, canUpload: false, nlist:[], nlists:[], allimgs:[], is_expired:false, secret_mode:false, canAccess:true,showsearch:false};
    	this.handleTitleChange = this.handleTitleChange.bind(this);
    	this.handleDescChange = this.handleDescChange.bind(this);
    	this.handleClick = this.handleClick.bind(this);
    	this.handleDrop = this.handleDrop.bind(this);
    	this.handleDragEnter = this.handleDragEnter.bind(this);
    	this.handleDragLeave = this.handleDragLeave.bind(this);
    	this.openModal = this.openModal.bind(this);
    	this.closeModal = this.closeModal.bind(this);
    	this.uploadNewVersion = this.uploadNewVersion.bind(this);
    	this.uploadNewDesign = this.uploadNewDesign.bind(this);
    	this.reloadProject = this.reloadProject.bind(this);
    	
    	this.showSharepopup = this.showSharepopup.bind(this);
    	this.onEnterPress = this.onEnterPress.bind(this);
    	this.togglePowers = this.togglePowers.bind(this);
    	this.removeAccess = this.removeAccess.bind(this);
    	this.togglePowersi = this.togglePowersi.bind(this);
    	this.removeAccessi = this.removeAccessi.bind(this);
    	this.updateSecretMode = this.updateSecretMode.bind(this);
    	this.toggleShare = this.toggleShare.bind(this);
    	this.toggleSearch = this.toggleSearch.bind(this);
    	this.imagenames = [];
    	this.imageids = [];
    	this.file = [];
    	this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    	this.filterDesigns = this.filterDesigns.bind(this);
	    this.searchDesigns = this.searchDesigns.bind(this);
	    
    }
    toggleShare(){
    	if(this.state.showShare) this.setState({showShare:false});
    }
	toggleSearch(){
		this.setState({togSear:!this.state.togSear});
	}
	clickShowmore(){
		this.setState({showMore:!this.state.showMore});
	}
    updateSecretMode(){
    	let status = !this.state.secret_mode;
    	this.setState({secret_mode:status});
    	fetch(config.url.API_URL+"togglesecretmode", {
		  	method: "POST",
	  		body: JSON.stringify({id:this.props.match.params.id, secret_mode:status}),
	  		headers: {
		        'Content-Type': 'application/json'
		    }
		}).then(function (response) {
            return response.json();
	    }).then( (result) => { 
			//console.log(result);
	    });
    }
    filterDesigns(sortby){
		let sortedImagesDsc;
		if (sortby=='commented') {
		    sortedImagesDsc= this.state.images.sort((a,b)=>{
				  if (a.commented  < b.commented) {
				    return 1;
				  }
				  if (a.commented > b.commented) {
				    return -1;
				  }
				  return 0;
		    });
		    this.setState({
		        projects:sortedImagesDsc
		    });
	    }
	    else {
		    sortedImagesDsc= this.state.images.sort((a,b)=>{
		      var nameA = a.name.toUpperCase();
				  var nameB = b.name.toUpperCase();
				  if (nameA < nameB) {
				    return -1;
				  }
				  if (nameA > nameB) {
				    return 1;
				  }
				  return 0;
		    });
		    this.setState({
		        projects:sortedImagesDsc
		    });
	    }
	}
	searchDesigns(e){
		e.preventDefault();
		let keyword = document.getElementById('keyword').value;
		this.setState({images:this.state.allimgs.filter(v=>v.name.toLowerCase().indexOf(keyword.toLowerCase())>=0)});
	}
    togglePowers(share_id,access){
    	var shareData = this.state.shared;
    	shareData.forEach((v,k)=>{
    		if (v._id===share_id) {
    			shareData[k].access=access;
    		}
    	}); 
    	this.setState({shared:shareData});
    	fetch(config.url.API_URL+"toggleaccess", {
		  	method: "POST",
	  		body: JSON.stringify({id:this.props.match.params.id, share_id:share_id, access: access}),
	  		headers: {
		        'Content-Type': 'application/json'
		    }
		}).then(function (response) {
            return response.json();
	    }).then( (result) => { 
			//console.log(result);
	    });
    }
    removeAccess(share_id){
    	var shareData = this.state.shared;
    	shareData.forEach((v,k)=>{
    		if (v._id===share_id) {
    			shareData.splice(k,1);
    		}
    	});
    	this.setState({shared:shareData});
    	fetch(config.url.API_URL+"removeaccess", {
		  	method: "POST",
	  		body: JSON.stringify({id:this.props.match.params.id, share_id:share_id}),
	  		headers: {
		        'Content-Type': 'application/json'
		    }
		}).then(function (response) {
            return response.json();
	    }).then( (result) => { 
			//console.log(result);
	    });
    }
    togglePowersi(share_id,access){
    	var shareData = this.state.invite;
    	shareData.forEach((v,k)=>{
    		if (v._id===share_id) {
    			shareData[k].access=access;
    		}
    	});
    	this.setState({invite:shareData});
    	fetch(config.url.API_URL+"toggleaccessi", {
		  	method: "POST",
	  		body: JSON.stringify({id:this.props.match.params.id, share_id:share_id, access: access}),
	  		headers: {
		        'Content-Type': 'application/json'
		    }
		}).then(function (response) {
            return response.json();
	    }).then( (result) => { 
			//console.log(result);
	    });
    }
    removeAccessi(share_id){
    	var shareData = this.state.invite;
    	shareData.forEach((v,k)=>{
    		if (v._id===share_id) {
    			shareData.splice(k,1);
    		}
    	});
    	this.setState({invite:shareData});
    	fetch(config.url.API_URL+"removeaccessi", {
		  	method: "POST",
	  		body: JSON.stringify({id:this.props.match.params.id, share_id:share_id}),
	  		headers: {
		        'Content-Type': 'application/json'
		    }
		}).then(function (response) {
            return response.json();
	    }).then( (result) => { 
			//console.log(result);
	    });
    }
    componentDidMount() {
    	if(this.props.match.params.id!=='create'){
    		this.loadProject();
    		this.loadNotify();
    	}
    	else{
    		if(this.authUser.id){
    			this.setState({is_expired:false});
    		}
    		else{
    			this.props.history.replace('/login/', this.props.location.state);
    		}
    	}
    }
    onEnterPress = (e) => {
    	if(e.keyCode === 13 && e.shiftKey === false) {
		    e.preventDefault();
		    this.handleTitleChange(e);
		    $('#projtitle').blur();
		}
    }
    async loadNotify(){
		const notif = await fetch(config.url.API_URL+'notifications',{ method: "POST", body: JSON.stringify({project_id:this.props.match.params.id, user_id: this.authUser.id}), headers: { 'Content-Type': 'application/json' }});
	    const notifications = await notif.json();
	    this.setState({nlist:notifications});
	    var nlists = [];
	    notifications.forEach((n,k)=>{
	    	if(nlists[n.image._id]===undefined) nlists[n.image._id]=[];
	    	nlists[n.image._id].push(n);
	    	this.setState({nlists:nlists});
	    });
    }
    showSharepopup(){
    	this.setState({showShare: true});   
    }
	handleTitleChange = (event) => {
		if(this.state.title!==event.target.value){
			this.setState({title: event.target.value});   
			fetch(config.url.API_URL+"updateproject", {
			  	method: "POST",
		  		body: JSON.stringify({id:this.props.match.params.id, title:event.target.value, description: this.state.description, user_id: this.authUser.id}),
		  		headers: {
			        'Content-Type': 'application/json'
			    }
			}).then(function (response) {
	            return response.json();
		    }).then( (result) => { 
				//console.log(result)
		        if(this.props.match.params.id!==result.id){
		        	this.props.history.replace('/p/'+result.id, this.props.location.state);
		        	this.setState({user_id:this.authUser.id});
		        }
		    });
	    }
	}
	handleDescChange = (event) => {
		if(this.state.description!==event.target.value){
		  this.setState({description: event.target.value});   
			fetch(config.url.API_URL+"updateproject", {
			  	method: "POST",
		  		body: JSON.stringify({id:this.props.match.params.id, description:event.target.value, title: this.state.title, user_id: this.authUser.id}),
		  		headers: {
			        'Content-Type': 'application/json'
			    }
			}).then(function (response) {
	            return response.json();
		    }).then((result)=>{
		        //console.log(result)
		        if(this.props.match.params.id!==result.id){
		        	this.props.history.replace('/p/'+result.id, this.props.location.state);
		        	this.setState({user_id:this.authUser.id});
		        }
		    });
		}
	}
	
	openModal = (event) => {
		this.setState({ showModal: true });
	}
	closeModal = (event) => {
		this.setState({ showModal: false, showShare: false });
	}
	handleDrop = (acceptedFiles) => {
		document.body.classList.remove('dz-drag-hover');
		if (acceptedFiles.length>1) {
			acceptedFiles.forEach((acceptedFile,key)=>{
				this.doUpload(acceptedFile,'');
			});
		}
		else{
			acceptedFiles.forEach((acceptedFile,key)=>{
				this.file = acceptedFile;
				this.setState({imagename: this.file.name});
				if (this.imagenames[this.file.name]!==undefined && this.imagenames[this.file.name]===1) {
					this.openModal();
				}
				else{
					this.doUpload(acceptedFile,'');
				}
			});
		}
	}
	uploadNewVersion = (event) => {
		this.doUpload(this.file,'version');
	}
	uploadNewDesign = (event) => {
		this.doUpload(this.file,'new');
	}
	doUpload(file,type){
		document.getElementById("ajxloader").style.display = "block";
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
		const formData = new FormData() 
    	formData.append('file', file);
    	formData.append('project_id', this.props.match.params.id);
    	formData.append('user_id', this.authUser.id);
    	formData.append('type', type);
    	if(type==='version'){
    		formData.append('parent', this.imageids[file.name]);
    	}
    	else{
    		formData.append('parent', '');
    	}
    	fetch(config.url.API_URL+"uploadscreen", {
		  	method: "POST",
	  		body: formData
		}).then(function (response) {
            return response.json();
	    }).then( (image) => {
	    	if(type==='new' || type===''){
	    		this.setState({images: [...this.state.images,image]});  
	    		if(type==='new'){
	    			this.imagenames[image.name]++;
	    		}
	    		else{
	    			this.imageids[image.name]=image._id;
	    			this.imagenames[image.name]=1;
	    		}
	    	}
	    	else{
	    		let imgs = this.state.images;
	    		imgs.forEach((val,key)=>{
	    			if(val.name===image.name){
	    				imgs[key]['versions'] = image.versions;
	    			}
	    		});
	    		this.setState({images:imgs});
	    	}
	    	document.getElementById("ajxloader").style.display = "none";
	    });
	    this.setState({showModal: false});
	}
	handleDragEnter = (event) => {
		document.body.classList.add('dz-drag-hover');
	}
	handleDragLeave = (event) => {
		document.body.classList.remove('dz-drag-hover');
	}
	handleClick = (k) =>{
		this.props.history.push('/'+k)
	}
	async loadProject(){
		//if(window.localStorage.getItem('project_'+this.props.match.params.id)==null){
			fetch(config.url.API_URL+"project", {
			  	method: "POST",
		  		body: JSON.stringify({id:this.props.match.params.id, user_id: this.authUser.id, user_email: this.authUser.email}),
		  		headers: {
			        'Content-Type': 'application/json'
			    }
			}).then(function (response) {
	            return response.json();
		    }).then((result)=>{
		    	//window.localStorage.setItem('project_'+this.props.match.params.id,JSON.stringify(result));
		        this.setState({title: result.name}); 
			    this.setState({description: result.description});
			    this.setState({user_id: result.user}); 
			    this.setState({shared: result.shared}); 
			    this.setState({invite: result.invite}); 
			    this.setState({images: result.images}); 
			    this.setState({allimgs: result.images});
			    this.setState({is_expired: result.is_expired});
			    this.setState({secret_mode: result.secret_mode});
			    if (!result.secret_mode) {this.setState({canAccess: true});}
			    result.images.forEach(val=>{
			    	if (this.imagenames[val.name]!==undefined) {this.imagenames[val.name]++;}
			    	else {this.imagenames[val.name]=1;this.imageids[val.name]=val._id;}
			    });
			    let cuexist=false;
			    result.shared.forEach((v,k)=>{
			    	if (this.authUser.id===v.user._id && v.access===true) {
		    			this.setState({canUpload:true});
		    		}
		    		if(this.authUser.id===v.user._id){cuexist=true;}
		    	});
		    	if (result.secret_mode && !cuexist){
		    		this.setState({canAccess:false});
		    	}
		    	if (result.user===this.authUser.id || this.state.canUpload) {
			    	this.setState({canEdit: true}); 
			    } 
		    });
	    /*}
	    else{
	    	let result = JSON.parse(window.localStorage.getItem('project_'+this.props.match.params.id));
	    	this.setState({title: result.name}); 
		    this.setState({description: result.description});
		    this.setState({images: result.images});  
		    this.setState({user_id: result.user}); 
		    result.images.forEach(val=>{
		    	if (this.imagenames[val.name]!==undefined) {this.imagenames[val.name]++;}
		    	else {this.imagenames[val.name]=1;this.imageids[val.name]=val._id;}
		    });
	    }*/
	}
	reloadProject(pid){
		fetch(config.url.API_URL+"project", {
		  	method: "POST",
	  		body: JSON.stringify({id:pid, user_id: this.authUser.id}),
	  		headers: {
		        'Content-Type': 'application/json'
		    }
		}).then(function (response) {
            return response.json();
	    }).then((result)=>{
	    	//window.localStorage.setItem('project_'+this.props.match.params.id,JSON.stringify(result));
	        this.setState({title: result.name}); 
		    this.setState({description: result.description});
		    this.setState({user_id: result.user}); 
		    this.setState({shared: result.shared}); 
		    this.setState({invite: result.invite}); 
		    this.setState({images: result.images}); 
		    this.setState({allimgs: result.images});
		    result.images.forEach(val=>{
		    	if (this.imagenames[val.name]!==undefined) {this.imagenames[val.name]++;}
		    	else {this.imagenames[val.name]=1;this.imageids[val.name]=val._id;}
		    });
		    result.shared.forEach((v,k)=>{
		    	if (this.authUser.id===v.user._id && v.access===true) {
	    			this.setState({canUpload:true});
	    		}
	    	});
	    	if (result.user===this.authUser.id || this.state.canUpload) {
		    	this.setState({canEdit: true}); 
		    }
         	document.getElementById("ajxloader").style.display = "none";
	    });
	}

	render() {
		let dropbox = null, dragbool=true;

		if (this.authUser.id===this.state.user_id || this.state.canUpload) {
			dropbox = 	<div className="projects_grid prjupd_grid">
						 <div className="projs_itminner">
						<div className="drag-add-more">
							 	
								<b className="one"></b>
								<b className="two"></b>
								<b className="three"></b>
								<b className="four"></b>
								<div className="centre-aligned">
								 Click here or drag <br/>design here to upload <img src={require('assets/images/upload_icon.png')} alt=""/> 
								</div>
							 
						</div></div>
						</div>;
			dragbool = false; 
		}
		if(!this.state.canAccess) return <div className="page_body page_body2"><div className="page_wrapper light_bg singles_page plan_exp"><div className="container"> <h2>Access restricted</h2> <p>You don't have access to view this project</p> </div></div></div>
		else if(this.state.is_expired) return <div className="page_wrapper light_bg singles_page plan_exp"><div className="container"> <h2>Package Expired</h2> <p>please renewal your plan </p> <Link className="App-link btn" to='/pro/new_plans'>Get Billing Plans</Link> </div></div>
		else	
		return (
			<Dropzone noClick={true} noDrag={dragbool} onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop}>
				{({getRootProps, getInputProps}) => (
					<div className="pg_boxwrapper">
						<div className="page_wrapper light_bg">
							<div className="container1">
					<div {...getRootProps()}>


					
					 
						 
						<div className="project_ct_outer pro_single">
						<div className="project-header">
						<div className="crtitle_lt">
<textarea defaultValue={this.state.title} disabled={!this.state.canEdit && this.props.match.params.id!=='create'} onKeyDown={this.onEnterPress} id="projtitle" className="title not-empty" placeholder="Give your project a title..." onBlur={this.handleTitleChange}></textarea>
						</div>
						{this.props.match.params.id!=='create'?
						<div className="crp_top_row">
						<div className="crtitle_rt">
							<div className="collaborators-container">
								 
								<div className="collaborators">
									<ul>
									{this.state.shared.map((share,key1) => (
					        		<li key={key1}><span>
										<Collab removeAccess={this.removeAccess} togglePowers={this.togglePowers} share={share} author={this.state.user_id}></Collab>
									</span></li>
					        		))}
									
									{this.state.invite.map((share,key1) => (
					        		<li key={key1}><span>
					        			<Collabi removeAccess={this.removeAccessi} togglePowers={this.togglePowersi} share={share} author={this.state.user_id}></Collabi>
									</span></li>
					        		))}

									</ul>

									
					        		
									<span className="add-new" onClick={this.showSharepopup}>+ Share

									<Share reloadProject={this.reloadProject} userId={this.authUser.id} showShare={this.state.showShare} toggleShare={this.toggleShare} handleClose={this.closeModal} projectId={this.props.match.params.id} updateSecretMode={this.updateSecretMode} secretMode={this.state.secret_mode}>
				        			</Share>
									</span>
									
								</div>
							</div>
						</div>
						<div className="searchbox prjs_srch_outer ">

						   <div className="left_design">
							<div className="designs">{this.state.images.length} Designs </div>
							<Sortdd className="link_btn" filterProjects={this.filterDesigns} page="project"></Sortdd>
							<div className="prjs_serch_icon">
							    <div className="ser_icon" onClick={this.toggleSearch}>
							   		<img src={require('assets/images/search_1.svg')}/>
							    </div>
								<div className={this.state.togSear?'show prjs_serch':'hide prjs_serch'}>
									<form method="post" onSubmit={this.searchDesigns}>
									 <input
							          type="search"
							          name="keyword"
							          placeholder="Search"
							          id="keyword"
							          onKeyUp={this.searchDesigns}
							          />
							    </form>
								</div>
							</div>
							</div>

							

							
						</div>
							
						</div>

						:''}
							 
							
						</div>

						 <div className="all_projects_row">

							<div className="all_projects_list">
									<div className="projects_item dropfile">
							        <input {...getInputProps()} />
							        {dropbox}
							        </div>
									{this.state.images.map((project,key) => (
										<div className="projects_item" key={key}>
								       
								        <div className="projects_grid">
								        <div className="projs_itminner">
									        {project.user===this.authUser.id || this.state.canUpload?
									       		<span className="delete_bg"> <Trash projectId={this.props.match.params.id} reloadProject={this.reloadProject} image={project} user={this.state.user_id} canUpload={this.state.canUpload}></Trash></span>
									       	: '' }
								        	<div className="project-image">
								        		<img alt="" onClick={() => this.handleClick(project._id)} src={config.url.IMAGE_URL+project.image} />
								        		{this.state.nlists[project._id]?(
									        	<div className="unseen-over-thumb-container">
									        		<div className="unseen-animation-wrapper">
									        			<i className="shadow"></i>
									        			<aside className="unseen-over-thumb">
									        			<i className="overlay"></i>
									        			<strong className="number">{this.state.nlists[project._id]?.length}</strong>
									        			<span>
										        			<span>{this.state.nlists[project._id]?.length>1?'Unseen things':this.state.nlists[project._id][0] && this.state.nlists[project._id][0]?.message=='design'?'This design was updated':'Unseen thing'}</span>
									        			</span>
									        			</aside>
									        		</div>
									        	</div>
									        	):''}
								        	</div>
								        	<Nameedit handleClick={this.handleClick} canUpload={this.state.canUpload} user={this.state.user_id} image={project}></Nameedit>
								       </div></div>
								        </div>
							        ))}
							    </div>

						</div>

						
							
						</div>

						

						<Modal showModal={this.state.showModal} handleClose={this.closeModal}>
							<h2>Update existing design?</h2>
				          	<p><b>{this.state.imagename}</b> has the same filename as an existing design. Do you want to update the existing design with a new version?</p>
				          	<button onClick={this.uploadNewVersion}>Update as new version</button>
				          	<button onClick={this.uploadNewDesign}>Add as new design</button>
				        </Modal>
				        
				        
						

						
						 </div>	 

				    </div> </div><div id="ajxloader" className="lds-dual-ring hidden overlay"></div>
				     </div>

			    )}
			</Dropzone>


		);
	}
}