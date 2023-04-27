import React from 'react';
import onClickOutside from "react-onclickoutside";
import $ from 'jquery';
import { FaRedo, FaTrash, FaEdit } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import Modal from 'components/Modal/Modal.js';
import Notifications from 'components/Notifications/Notifications.js';

class Sdropdown extends React.Component {
    constructor(props) {
        super(props);

	    this.state = {showDrop: false, showModal:false,name:null,error:""};
        this.gearClick = this.gearClick.bind(this);
        this.showEditTitle = this.showEditTitle.bind(this);
        this.handleImgTitleChange = this.handleImgTitleChange.bind(this);
        this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    }
    /*componentDidMount() {
        $(document).on('click','#screenOptions ul li',()=>{
            this.setState({showDrop:false});
        })
        this.setState({name:this.props.name});
    }*/
    handleImgTitleChange(){
        if(document.getElementById('imageName').value.trim()!=''){
            this.props.handleImgTitleEdit(document.getElementById('imageName').value);
            this.showEditTitle();
            this.setState({error:''});
        }
        else{
            this.setState({error:'Enter title'});
        }
    }
    handleClickOutside = evt => {
        this.setState({showDrop:false});
    }
    gearClick(){
        this.setState({showDrop:!this.state.showDrop});
        console.log(this.state.showDrop);
    }
    showEditTitle(){
        this.setState({showModal:!this.state.showModal});
    }
    render() {
        let shrinkButton, copyButton, delButton, updateButton, delVersions=[], cmpBtn, editBtn,editTitle;
        if(this.props.user===this.authUser.id || this.props.canUpload){
            editBtn = <li title="Edit title"><div className="edit_link" onClick={this.showEditTitle}><FaEdit /></div></li>;
            if(this.props.versions.length>1){
                delButton = delButton = <li className="danger" title="Delete"><div className="dd_inner" onClick={this.gearClick}><FaTrash /></div></li>;
                this.props.versions.forEach((v,k)=>{
                    delVersions.push(v);
                });
            }
            else{
                delButton = <li onClick={this.gearClick} className="danger" title="Delete"><FaTrash /></li>;
            }
            if(this.props.shrink){
                shrinkButton = <li onClick={this.props.shrinkScreen}>Enlarge by 150%</li>;
            }
            else{
                shrinkButton = <li onClick={this.props.shrinkScreen}>Shrink by 50%</li>;
            }
            if (this.props.project!==0) {
                if (parseInt(this.props.version) === this.props.versions.length && this.props.versions.length>1) {
                    copyButton = <li onClick={this.props.copyComments}>Clone comments from version {this.props.versions.length - 1}</li>;
                }
                else{
                    copyButton = <li className="disabled">Clone comments from previous version </li>;
                }
                updateButton = <li title="Upload new version" onClick={this.props.updateScreen}><FaRedo /></li>;
                cmpBtn = <li title={this.props.approved?'Disapprove':'Approve'} className={this.props.approved?'active approve':'approve'} onClick={()=>this.props.approveScreen(this.props.version-1)}>{this.props.approved?'Disapprove':'Approve'}</li>
            }
            else{
                copyButton = null;
                updateButton = null;
                cmpBtn = <li title={this.props.approved?'Disapprove':'Aprove'} className={this.props.approved?'active approve':'approve'} onClick={()=>this.props.approveScreen(this.props.version-1)}>{this.props.approved?'Disapprove':'Approve'}</li>
            }
            editTitle=<Modal showModal={this.state.showModal} handleClose={this.handleImgTitleChange}><h2>Edit Title</h2><p><textarea id="imageName" defaultValue={this.props.name} className="title not-empty" placeholder="Image name"></textarea>{this.state.error!=""?<div class="error">{this.state.error}</div>:null}</p><button onClick={this.handleImgTitleChange}>Save</button><button onClick={this.showEditTitle}>Cancel</button></Modal>;
        }
        else{
            editBtn = null;
            delButton = null;
            shrinkButton = null;
            copyButton = null;
            updateButton = null;
            cmpBtn = null;
            editTitle = null;
        }
        if(this.state.showDrop)
    	    return  <div id="screenOptions">
                    <ul>
                    {editBtn}
                    {updateButton}
                    <li>
                        <FaTrash onClick={this.gearClick} />
                        <ul className="dropdown-menu on-light project-thumb-dropdown segmented checkable">
                            {this.props.versions.length>1?<li className="danger" onClick={()=>this.props.deleteVersion(this.props.version-1)}>Delete current version</li>:null}
                            <li className="danger" onClick={this.props.deleteScreen}>Delete {this.props.versions.length>1?'all versions':'screen'}</li>
                        </ul>
                    </li>
                    {cmpBtn}
                    <Notifications seenAll={this.props.seenAll} nlist={this.props.nlist}></Notifications>
                    </ul>
                    {editTitle}
                    </div>
        else
            return <div id="screenOptions">
                    <ul>
                    {editBtn}
                    {updateButton}
                    {delButton}
                    {cmpBtn}
                    <Notifications seenAll={this.props.seenAll} nlist={this.props.nlist}></Notifications>
                    </ul>
                    {editTitle}
                    </div>
	}				
}
export default onClickOutside(Sdropdown);