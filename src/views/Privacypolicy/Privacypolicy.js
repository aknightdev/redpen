import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js';

export default class Privacypolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {termsofuse:[]};
  }
  componentDidMount() {
    document.body.classList = 'termsofuse';
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
					  
						<h1>Feedback tool Privacy Policy</h1>
						<p>Written on the 01st January 2021. Updated on 31th December 2022.</p>
					</div>
				</div>
			
            
            	<div className="container">
            		   <div className="abt_sec1 faq_section terms">
					<div >	 
						<div className="row">
							<div className="col col12">
								<h3>Privacy-policy we collect</h3>	

								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>	 

                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>	

                <p>Quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. </p>

                 <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit voluptatem.</p>	

                 <h3>Cookies</h3>

                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

								<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.</p>

                 <p>sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>

                 <h3>Who has access to your designs</h3>

                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>

									<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>

									<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem nesciunteque porro quisquam est, incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>

									<h3>Terms of your using our service</h3>

									 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>

									<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>

									<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem nesciunteque porro quisquam est, incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>

									<h3>Changes to this page</h3>

									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

									<h3>Thanks for reading</h3>

									<p>Feedback tool are Made in Sydney, Australia. If you have any questions, email: <a href="mailto:info@feedbacktool.com">Info@feedbacktool.com</a></p>

								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
			

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