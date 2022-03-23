import React from "react";
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { config } from 'Constants.js';
import Trash from 'components/Trash/Trash.js';

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
			<Dropzone noClick={true} noDrag={dragbool} onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop} mutliple={false}>
				{({getRootProps, getInputProps}) => (
					<div className="container projects" {...getRootProps()}>
						<ul className="breadcrumb">
						  <li><Link to="/">React APP</Link></li>
						  <li><Link to="/">Dashboard</Link></li>
						  <li>Singles</li>
						</ul>
						<div className="content">
						<h2><Link to={'/'}>Projects</Link> &nbsp; Singles</h2>
						<ul className="list">
							<li>
								<div className="drag-add-more" onClick={this.fileClick}>
									<div className="container">
										<b className="one"></b>
										<b className="two"></b>
										<b className="three"></b>
										<b className="four"></b>
										<div className="centre-aligned">
										Drop Here
										</div>
									</div>
								</div>
					        </li>
					        {this.state.images.map((image,key) => (
						        <li key={key}>
						        	<Trash reloadProject={this.reloadSingles} image={image} user={this.authUser.id}></Trash>
						        	<div className="project-image"><img alt="" onClick={() => this.handleClick(image._id)} src={config.url.IMAGE_URL+image.image} /></div>
						        	<h3 className="project-title">{image.name.replace('.jpg','').replace('_',' ')}</h3>
						        </li>
					        ))}
						</ul>
						</div>
						<input id="fileInput" {...getInputProps()} />
				    </div>
			    )}
			</Dropzone>
		);
	}
}