import React from "react";
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { config } from 'Constants.js';
import Trash from 'components/Trash/Trash.js';
import Moment from 'react-moment';

export default class Single extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {images:[]};
    	this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    	this.handleClick = this.handleClick.bind(this);
    	this.handleDrop = this.handleDrop.bind(this);
    	this.handleDragEnter = this.handleDragEnter.bind(this);
    	this.handleDragLeave = this.handleDragLeave.bind(this);
    	this.fileClick = this.fileClick.bind(this);
    	this.reloadSingles = this.reloadSingles.bind(this);
    }
    componentDidMount() {
    	this.loadSingles();
    }
    fileClick = (k) =>{
		document.getElementById('fileInput').click()
	}
    handleClick = (k) =>{
		this.props.history.push('/'+k)
	}
    handleDrop = (acceptedFiles) => {
		document.body.classList.remove('dz-drag-hover');
		acceptedFiles.forEach((acceptedFile,key)=>{
			this.file = acceptedFile;
			let file = acceptedFile;
			this.doUpload(file,acceptedFiles.length);
		});
	}
	reloadSingles(){
		this.loadSingles();
	}
	async loadSingles(){
		fetch(config.url.API_URL+"singles", {
		  	method: "POST",
	  		body: JSON.stringify({user_id: this.authUser.id}),
	  		headers: {
		        'Content-Type': 'application/json'
		    }
		}).then(function (response) {
            return response.json();
	    }).then((result)=>{
		    this.setState({images: result.images});
	    });
	}
	doUpload(file,cnt){
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
    	formData.append('project_id', '');
    	formData.append('user_id', this.authUser.id);
    	formData.append('type', '');
    	formData.append('parent', '');
    	fetch(config.url.API_URL+"uploadscreen", {
		  	method: "POST",
	  		body: formData
		}).then(function (response) {
            return response.json();
	    }).then( (image) => {
	    	this.setState({images: [...this.state.images,image]});  
	    	if(cnt===1){
	    		this.handleClick(image._id);
	    	}
	    });			
	}
    handleDragEnter = (event) => {
		document.body.classList.add('dz-drag-hover');
	}
	handleDragLeave = (event) => {
		document.body.classList.remove('dz-drag-hover');
	}
    render() {
    	let dragbool=false;
    	return (
    		<div className="page_body page_body2">
				<div className="page_wrapper light_bg singles_page">
					<div className="container1">
						<div className="project_ct_outer">
							<div className="all_projects_row">
							
						<Dropzone noClick={true} noDrag={dragbool} onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop} mutliple={false}>
							{({getRootProps, getInputProps}) => (
								<div className="all_projects_list" {...getRootProps()}>
								 
								 
								<div className="projects_item dropfile">
									 <div className="projects_grid prjupd_grid">
									 	<div className="projs_itminner">
											 <div className="drag-add-more" onClick={this.fileClick}>
											 	<b className="one"></b>
													<b className="two"></b>
													<b className="three"></b>
													<b className="four"></b>
													<div className="centre-aligned">
													Click here or drag <br/>design here to upload <img src={require('assets/images/upload_icon.png')} alt=""/> 
													</div>
										</div>
								
									 </div>
								</div>

									 
						        </div>
					        {this.state.images.map((image,key) => (
						        <div className="projects_item" key={key}>
						        		 <div className="projects_grid">
							        		 <div className="prt_right"> 
												 <span className="delete_bg"><Trash reloadProject={this.reloadSingles} image={image} user={this.authUser.id}></Trash></span>
								        	 </div>
							        		 <div className="projs_itminner">
							        		 	<div className="project-image">
							        		 		<img alt="" onClick={() => this.handleClick(image._id)} src={config.url.IMAGE_URL+image.image} />
							        		 	</div>

							        		 </div>
							        	
							        	 <div className="prj_meta prt_info dash_1"> 
							        	 	<div className="prttitle_left"> 
							        	 		<h3 className="project-title">{image.name.replace('.jpg','').replace('_',' ')}</h3>
							        	 		<p><Moment format="DD MMM YY hh:mma">{image.updated}</Moment></p>
								        	 </div>
								        	 
							        	 </div>
							        	 
						        	</div><div id="ajxloader" className="lds-dual-ring hidden overlay"></div>
						    	</div>
					        ))}
						 
						 
						<input id="fileInput" {...getInputProps()} />
				    </div>
			    )}
			</Dropzone>
					</div>
				</div>
			</div>
		 </div>
	 </div>
		);
	}
}