import React from 'react';
import onClickOutside from "react-onclickoutside";
import { FaRegBell } from 'react-icons/fa';
import { config } from 'Constants.js';
import Moment from 'react-moment';
import $ from 'jquery';

class Notifications extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {showNotify:false};
    	this.showNotifypopup = this.showNotifypopup.bind(this);
    	this.getCnumber = this.getCnumber.bind(this);
    }
    getCnumber = (v) => {
    	return this.props.comments.findIndex((obj)=>{
    		return obj._id === v;
    	}) + 1;
    }
    showNotifypopup() {
    	this.setState({showNotify: true});  
    }
    handleClickOutside = evt => {
    	var $target = $(evt.target);
  		if(!$target.closest('#sidenotify').length){
    		this.setState({showNotify:false});
  		}
    }
	render() {
		if(this.state.showNotify){
			return (<aside id="sidenotify" className="expanded-notifications-balloon">
					<strong className="header">
						<span className="subtitle">Updates in this design</span>
						<button className="command button" onClick={()=>{this.props.seenAll();this.setState({showNotify:false});}} title="Mark all notifications as ‘seen’">I’ve seen all</button>
					</strong>
					{this.props.comments.map((notify,key) => (
					<article key={key} className="">
						<figcaption>
							<span className={'circle sidecomment'+notify._id}>{key+1}</span>
							<strong>
								<span><a href={'#'+notify._id}><span>{notify.replies[notify.replies.length-1].reply.substring(0, 20)}...</span></a></span>
							</strong>
							<Moment format="DD MMM YY hh:mma">{notify.replies[notify.replies.length-1].created}</Moment>
						</figcaption>
					</article>
					))}
				</aside>);
		}
		else{
			return <li onClick={this.showNotifypopup} className="notifications-inline on-light " title="Notifications for this design">
						<FaRegBell />
						<i className="bubble"></i>
					</li>;
		}
	}
}
export default onClickOutside(Notifications);