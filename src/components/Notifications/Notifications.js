import React from 'react';
import onClickOutside from "react-onclickoutside";
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
						<span className="title">Updates to this project</span>
						<button className="command" title="Mark all notifications as ‘seen’">I’ve seen all</button>
					</strong>
					{this.props.nlist.map((notify,key) => (
					<article key={key} className="">
						<figure>
							<span>
								<img alt="" src={config.url.IMAGE_URL+notify.image.image} />
							</span>
						</figure>
						<figcaption>
							<span>
								<strong>
									<span>Designer</span>
									<span> </span>
								</strong>
								<span> added </span>
								<span className="grey">a <a href={config.url.BASE_URL+notify.image._id}>design</a></span>
								<span> </span>
								<strong>{notify.image.name} v1</strong>
								<span className="grey">.</span>
							</span>
						</figcaption>
					</article>
					))}
				</aside>);
		}
		else{
			return <span onClick={this.showNotifypopup} className="notifications-inline on-light " title="Notifications for this project">
									<i className="face"></i>
									<i className="bubble"></i>
								</span>;
		}
	}
}
export default onClickOutside(Notifications);