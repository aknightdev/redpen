import React from 'react';
import onClickOutside from "react-onclickoutside";
import { config } from 'Constants.js';
import { BiSort } from 'react-icons/bi';

class Sortdd extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {showDrop: false};
        this.gearClick = this.gearClick.bind(this);
        this.sortClick = this.sortClick.bind(this);
        this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
    }
    handleClickOutside = evt => {
        this.setState({showDrop:false});
    }
    componentDidMount() {
    }
    gearClick(){
        this.setState({showDrop:!this.state.showDrop});
    }
    sortClick(sortby){
        this.setState({showDrop:false});
        this.props.filterProjects(sortby);
    }
    render() {
        if(this.state.showDrop)
    	    return  <div className="sort-opt"><div className="link_btn sortby" onClick={this.gearClick}><BiSort /> Sort</div><div className="dropdown-menu project-thumb-dropdown">
				<ul>
                    {this.props.page=='home'?<li onClick={()=>this.sortClick('updated')}>Date updated</li>:''}
    				<li onClick={()=>this.sortClick('name')}>Name</li>
                    <li onClick={()=>this.sortClick('commented')}>Latest commments</li>
                </ul>
    			</div></div>;
        else
            return <div className="link_btn sortby" onClick={this.gearClick}><BiSort /> Sort</div>;
	}				
}
export default onClickOutside(Sortdd);