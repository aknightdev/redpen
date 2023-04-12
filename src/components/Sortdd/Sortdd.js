import React from 'react';
import onClickOutside from "react-onclickoutside";
import { config } from 'Constants.js';
import { BiSort } from 'react-icons/bi';

class Sortdd extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {showDrop: false, activesort: 'updated'};
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
        this.setState({showDrop:false, activesort: sortby});
        this.props.filterProjects(sortby);
    }
    render() {
        if(this.state.showDrop)
    	    return  <div className="sort-opt"><div className="link_btn sortby" onClick={this.gearClick}><img src={require('assets/images/sort.svg')}/> Sort</div><div className="dropdown-menu project-thumb-dropdown">
				<ul>
                    {this.props.page=='home'?<li onClick={()=>this.sortClick('updated')} class={this.state.activesort == 'updated'?'active':''}><a href="javascript:void(0)">Date updated</a></li>:''}
    				<li onClick={()=>this.sortClick('name')} class={this.state.activesort == 'name'?'active':''}><a href="javascript:void(0)">Name</a></li>
                    <li onClick={()=>this.sortClick('commented')} class={this.state.activesort == 'commented'?'active':''}><a href="javascript:void(0)">Latest commments</a></li>
                </ul>
    			</div></div>;
        else
            return <div className="link_btn sortby" onClick={this.gearClick}><img src={require('assets/images/sort.svg')}/> Sort</div>;
	}				
}
export default onClickOutside(Sortdd);