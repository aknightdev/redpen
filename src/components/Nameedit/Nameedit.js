import React from 'react';
import { config } from 'Constants.js';
import Trash from 'components/Trash/Trash.js';
import { FaPen } from 'react-icons/fa';
import Moment from 'react-moment';

export default class Nameedit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showEdit: false, name: this.props.image.name};
        this.handleImgTitleChange = this.handleImgTitleChange.bind(this);
        this.onEnterPress = this.onEnterPress.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
        this.reloadProject = this.reloadProject.bind(this);
    }
    reloadProject(){
        this.loadProject();
    }
    handleImgTitleChange = (event) => {
        this.setState({showEdit:false});
        if(this.state.name!==event.target.value){
            this.setState({name: event.target.value});   
            fetch(config.url.API_URL+"updatescreen", {
                  method: "POST",
                  body: JSON.stringify({id:this.props.image._id, name:event.target.value, description: this.props.image.description, version: 0, version_id: this.props.image.versions[0]._id}),
                  headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                return response.json();
            }).then( (result) => { 
                
            });
        }
    }
    toggleEdit(){
        this.setState({showEdit:!this.state.showEdit});
        setTimeout(()=>{
            if(this.state.showEdit){
                document.getElementById("imageName").focus();
                document.getElementById("imageName").value = document.getElementById("imageName").value;
                var len = document.getElementById("imageName").value.length * 2;
                setTimeout(function() {
                    document.getElementById("imageName").setSelectionRange(len, len);
                }, 1);
            }
        },50);
    }
    onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            this.handleImgTitleChange(e);
        }
    }

    render() {
        let imgTitle;
        if(this.props.user===this.authUser.id || this.props.canUpload){
            imgTitle =<div className="prj_meta prt_info dash_1">

            <div className="prttitle_left" onClick={()=>this.props.handleClick(this.props.image._id)}><h3 className="project-title" >{this.props.image.name}</h3>
                <p><Moment format="DD MMM YY hh:mma">{this.props.image.updated}</Moment></p>
                </div>
                <div className="prt_right">
                 {/*<span onClick={this.toggleEdit} ><FaPen/></span>*/}
                 <span className="ver_bg">{this.props.image.versions.length>1?(<span className="version">V{this.props.image.versions.length}</span>):''}</span>
               <span className="delete_bg"> <Trash reloadProject={this.reloadProject} image={this.props.image} user={this.state.user_id} canUpload={this.props.canUpload}></Trash></span>
                </div> 
               
                </div>;
        }
        else{
            imgTitle =<div className="prj_meta" onClick={()=>this.props.handleClick(this.props.image._id)}> <h3 className="project-title">{this.props.image.name}{this.props.image.versions.length>1?(<span className="version">,&nbsp;v{this.props.image.versions.length}</span>):''}</h3></div>;
        }
        if(this.state.showEdit)
    	    return  <div className="prj_meta"><textarea id="imageName" onKeyDown={this.onEnterPress} defaultValue={this.state.name} className="title not-empty" placeholder="Image name" onBlur={this.handleImgTitleChange}></textarea></div>;
        else
            return imgTitle;
	}	
}