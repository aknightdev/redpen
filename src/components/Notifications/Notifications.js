import React from 'react';
import onClickOutside from "react-onclickoutside";
import { FaRegBell } from 'react-icons/fa';
import { config } from 'Constants.js';
import $ from 'jquery';

class Notifications extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {showNotify:false};
    	this.showNotifypopup = this.showNotifypopup.bind(this);
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
					{this.props.nlist.map((notify,key) => (
					<article key={key} className="">
						<figcaption>
							<span>
								<strong>
									<span>{notify.user?notify.user.name:'Annon'}</span>
									<span> </span>
								</strong>
								<span> added </span>
								<span>a <a href={config.url.BASE_URL+notify.image._id+'#'+notify.comment}>{notify.message}</a></span>
							</span>
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