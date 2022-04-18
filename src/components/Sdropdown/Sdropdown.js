import React from 'react';
import onClickOutside from "react-onclickoutside";
import $ from 'jquery';
import { FaRedo, FaTrash } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';

class Sdropdown extends React.Component {
    constructor(props) {
        super(props);

	    this.state = {showDrop: false};
        this.gearClick = this.gearClick.bind(this);
        this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    }
    componentDidMount() {
        $(document).on('click','#screenOptions ul li',()=>{
            this.setState({showDrop:false});
        })
    }
    handleClickOutside = evt => {
        this.setState({showDrop:false});
    }
    gearClick(){
        this.setState({showDrop:!this.state.showDrop});
    }
    render() {
        let shrinkButton, copyButton, delButton, updateButton, delVersions=[], cmpBtn;
        if(this.props.user===this.authUser.id || this.props.canUpload){
            if(this.props.versions.length>1){
                delButton = delButton = <li className="danger"><FaTrash onClick={this.gearClick} /></li>;
                this.props.versions.forEach((v,k)=>{
                    delVersions.push(v);
                });
            }
            else{
                delButton = <li className="danger"><FaTrash onClick={this.gearClick} /></li>;
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
                updateButton = <li onClick={this.props.updateScreen}><FaRedo /></li>;
                cmpBtn = <li className={this.props.approved?'active approve':'approve'} onClick={()=>this.props.approveScreen(this.props.version-1)}><TiTick /></li>
            }
            else{
                copyButton = null;
                updateButton = null;
                cmpBtn = <li className={this.props.approved?'active approve':'approve'} onClick={()=>this.props.approveScreen(this.props.version-1)}><TiTick /></li>
            }
        }
        else{
            delButton = null;
            shrinkButton = null;
            copyButton = null;
            updateButton = null;
            cmpBtn = null;
        }
        if(this.state.showDrop)
    	    return  <div id="screenOptions">
                    <ul>
                    {updateButton}
                    <li>
                        <FaTrash onClick={this.gearClick} />
                        <ul className="dropdown-menu on-light project-thumb-dropdown segmented checkable">
                            {this.props.versions.length>1?<li className="danger" onClick={()=>this.props.deleteVersion(this.props.version-1)}>Delete current version</li>:null}
                            <li className="danger" onClick={this.props.deleteScreen}>Delete {this.props.versions.length>1?'all versions':'screen'}</li>
                        </ul>
                    </li>
                    {cmpBtn}
                    </ul>
                    </div>
        else
            return <div id="screenOptions"><br/>
                    <ul>
                    {updateButton}
                    {delButton}
                    {cmpBtn}
                    </ul>
                    </div>
	}				
}
export default onClickOutside(Sdropdown);