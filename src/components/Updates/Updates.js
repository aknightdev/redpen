import React from 'react';
import logo from 'logo.svg';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js';

export default class Header extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleLogoutClick = this.handleLogoutClick.bind(this);
	    this.state = {isLoggedIn: false};
	}

	componentDidMount() {
	}

	render() {
		return (<aside className="expanded-notifications-balloon"><strong className="header"><span className="title">Updates to this project</span><a className="command" title="Mark all notifications as seen">I’ve seen all</a></strong><article className=""><figure><span><img src="https://s3.amazonaws.com/redpen-prod/red-pen-4f25292f-6ce4-4ca5-e9b6-1aac551ff7b1_m.jpg" /></span></figure><figcaption><span><strong><span>Designer</span><span> </span></strong><span>updated </span><span className="grey" >the design</span><span > </span><strong>Moof tech v1</strong><span className="grey" >.</span></span></figcaption></article></aside>);
	  }
}