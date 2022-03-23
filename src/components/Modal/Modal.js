import React from 'react';
export default class Modal extends React.Component {
	
	render() {
	  return (
	    <div className={this.props.showModal ? "modal display-block" : "modal display-none"}>
	      <section className="modal-main">
	        {this.props.children}
	      </section>
	    </div>
	  );
	}
};