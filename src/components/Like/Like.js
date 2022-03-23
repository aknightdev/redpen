import React from 'react';

export default class Like extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {tipOpen:false};
    	this.commentlikeLeave = this.commentlikeLeave.bind(this);
    	this.commentlikeHover = this.commentlikeHover.bind(this);
    }
    commentlikeLeave(){
    	this.setState({tipOpen: false});
    }
    commentlikeHover(){
    	this.setState({tipOpen: true});
    }
    render() {
    	var tip = null;
    	if (this.state.tipOpen) {tip=<span className="informative-tip like-tip" style={{marginLeft:'-40px'}}>{this.props.agree.user.name} agrees</span>;}
    	return <span className="like-container  " onMouseEnter={this.commentlikeHover} onMouseLeave={this.commentlikeLeave}>
												<i className="like"></i>
												<i className="big-like">
													<i className="happy-face"></i>
													<i className="thumb-outer-bg"></i>
													<i className="thumb-container">
														<i className="thumb"></i>
														<i className="thumb-stroke"></i>
													</i>
												</i>
												{tip}
											</span>
    }
}