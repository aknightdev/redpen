import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js';

export default class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {faq:[]};
  }
  componentDidMount() {
    document.body.classList = 'faqpage';
  }
  componentWillUnmount() {
    document.body.classList = '';
  }
  render() {
    return (
		<div className="page_top">
			<div className="page_wrapper">
			<div className="inner_banner price_inner">
					<div className="container">
					  
						<h1>F.A.Q</h1>
						<p>Learn everything about Feedback tool and the most frequently asked questions.</p>
					</div>
				</div>
			
            
            	<div className="container">
            		   <div className="abt_sec1 faq_section faq">
					<div className="grid_1000">	 
						<div className="row">
							<div className="col col12">
								<h2>Frequently Asked Questions</h2>				

							

							</div>
							<div className="col col12">

												<div className="accordion">
					       
					        <span className="target-fix" id="accordion"></span>					         
					       
					        <div>					          
					            <span className="target-fix" id="accordion1"></span>					            
					            <a href="#accordion1" id="open-accordion1" title="open">Is the Free plan really forever-free?</a>				            
					            <a href="#accordion" id="close-accordion1" title="close">Is the Free plan really forever-free?
		 										<div className="accordion-content">
							              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							          </div>
					            </a>				           
					           
					        </div>
					       
					        <div>
					            <span className="target-fix" id="accordion2"></span>
					            <a href="#accordion2" id="open-accordion2" title="open">What will happen when my trial expires?</a>
					            <a href="#accordion" id="close-accordion2" title="close">What will happen when my trial expires?
												 <div className="accordion-content">
						                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>   
						            </div>
					            </a>
					           
					        </div>
					       
					        <div>
					            <span className="target-fix" id="accordion3"></span>
					            <a href="#accordion3" id="open-accordion3" title="open">Can I choose what to upgrade?</a>
					            <a href="#accordion" id="close-accordion3" title="close">Can I choose what to upgrade?
						            <div className="accordion-content">
						                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						            </div>

					            </a>
					        </div>


					         <div>
					            <span className="target-fix" id="accordion4"></span>
					            <a href="#accordion4" id="open-accordion4" title="open">Can I change my subscription anytime I want?</a>
					            <a href="#accordion" id="close-accordion4" title="close">Can I change my subscription anytime I want?
						            <div className="accordion-content">
						                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						            </div>
					            </a>
					        </div>

					         <div>
					            <span className="target-fix" id="accordion5"></span>
					            <a href="#accordion5" id="open-accordion5" title="open">Which plan is right for me?</a>
					            <a href="#accordion" id="close-accordion5" title="close">Which plan is right for me?
						            <div className="accordion-content">
						                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						            </div>

					            </a>
					        </div>


					         <div>
					            <span className="target-fix" id="accordion6"></span>
					            <a href="#accordion6" id="open-accordion4" title="open">Can I choose what to upgrade?</a>
					            <a href="#accordion" id="close-accordion4" title="close">Can I choose what to upgrade?
						            <div className="accordion-content">
						                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						            </div>
					            </a>
					        </div>

					         <div>
					            <span className="target-fix" id="accordion7"></span>
					            <a href="#accordion7" id="open-accordion5" title="open">Can I change my subscription anytime I want?</a>
					            <a href="#accordion" id="close-accordion5" title="close">Can I change my subscription anytime I want?
						            <div className="accordion-content">
						                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						            </div>

					            </a>
					        </div>

					         <div>
					            <span className="target-fix" id="accordion8"></span>
					            <a href="#accordion8" id="open-accordion4" title="open">Can I choose what to upgrade?</a>
					            <a href="#accordion" id="close-accordion4" title="close">Can I choose what to upgrade?
						            <div className="accordion-content">
						                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						            </div>
					            </a>
					        </div>

					         <div>
					            <span className="target-fix" id="accordion9"></span>
					            <a href="#accordion9" id="open-accordion5" title="open">Can I change my subscription anytime I want?</a>
					            <a href="#accordion" id="close-accordion5" title="close">Can I change my subscription anytime I want?
						            <div className="accordion-content">
						                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						            </div>

					            </a>
					        </div>

					         <div>
					            <span className="target-fix" id="accordion10"></span>
					            <a href="#accordion10" id="open-accordion5" title="open">Which plan is right for me?</a>
					            <a href="#accordion" id="close-accordion5" title="close">Which plan is right for me?
						            <div className="accordion-content">
						                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						            </div>

					            </a>
					        </div>


					    </div>
								 

							</div>
						</div>
							</div>
								</div>
            	</div>

			</div>
		</div>
    );
  }
}