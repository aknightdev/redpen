import React from 'react';
import logo from 'logo.svg';
import { Link } from 'react-router-dom';
//import { config } from 'Constants.js';
import Userdropdown from 'components/Userdropdown/Userdropdown.js';

export default class Header extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleLogoutClick = this.handleLogoutClick.bind(this);
	    this.handleScroll = this.handleScroll.bind(this);
	    this.menuClick = this.menuClick.bind(this);	
	    this.state = {isLoggedIn: false, menuOpen:false, fixedHeader:false, currentPage:'home'};
	  }
	  menuClick(b,p){	  
	  	this.setState({ menuOpen: b });
	  	this.setState({ currentPage: p });
	  }
	  handleScroll(event) {
	    let scrollTop = window.scrollY;
	    this.setState({
	      fixedHeader: scrollTop>0?true:false
	    });
	    if(scrollTop>0)
	    	document.getElementsByTagName('body')[0].classList.add('fixed_body');
	    else
	    	document.getElementsByTagName('body')[0].classList.remove('fixed_body');
	 }

	  componentDidMount() {
	  	if (window.localStorage.getItem('auth_user')!=null) {this.setState({ isLoggedIn: true });}
	  	window.addEventListener('scroll', this.handleScroll);
	      /*fetch(config.url.API_URL+'checkToken')
	        .then(res => {
	          if (res.status === 200) {
	            this.setState({ isLoggedIn: true });
	          } else {
	            const error = new Error(res.error);
	            throw error;
	          }
	        })
	        .catch(err => {
	          console.error(err);
	          this.setState({ isLoggedIn: false });
	        });*/
	    }

	  handleLogoutClick() {
	  	window.localStorage.removeItem('auth_user');
	  	setTimeout(()=>{
	  		window.location.replace('/');
	  	},200);
	  	/*fetch(config.url.API_URL+'logout')
	        .then(res => {
	          if (res.status === 200) {
	            //this.setState({ isLoggedIn: false });
	            window.location.replace('/');
	          } else {
	            const error = new Error(res.error);
	            throw error;
	          }
	        })
	        .catch(err => {
	          console.error(err);
	        });*/
	  }

	  render() {
	  	
	  	if (this.state.isLoggedIn) {
		return (
			<header className={this.state.fixedHeader?"App-header dash_header frnt_header fixed_header":"App-header frnt_header dash_header"}>
			<div className="header_grid">
				<div className="logo_lt">
					<div className="main_logo">
					<Link className="App-link" to='/'>
						<img src={require('assets/images/logo-main.png')} alt="logo"/>
						</Link>
					</div>
						
				</div>
				<div className="mobinav" onClick={()=>this.menuClick(true)}><span>&nbsp;</span></div>
				<div className="nav_rt">
				
					<div className="fl_right">

							<div className={this.state.menuOpen?'top_menu open':'top_menu'}>

							<div className="navclsbtn" onClick={()=>this.menuClick(false)}> <span>&nbsp;</span></div>

								<ul>
								<li className={this.state.currentPage=='projects'?'active':''}>
									<Link className="App-link" to='/' onClick={()=>this.menuClick(false,'projects')}>Projects</Link>
								</li>
								<li className={this.state.currentPage=='singles'?'active':''}>
									<Link className="App-link" to='/singles/' onClick={()=>this.menuClick(false,'singles')}>Singles</Link>
								</li>
								<li className={this.state.currentPage=='team'?'active':''}>
									<Link className="App-link" to='/team/' onClick={()=>this.menuClick(false,'team')}>Your team</Link>
								</li>
								 
								<li className={this.state.currentPage=='new_plans'?'active':''}>
									<Link className="App-link" to='/pro/new_plans' onClick={()=>this.menuClick(false,'new_plans')}>Billing</Link>
								</li>
								</ul>
							</div>
							 
							<div className="head_profile">
							 <Userdropdown />
							</div> 
					</div>
					
				</div>
			</div>					

		    </header>

			
		);
	}
	else{
		return (
			<header className={this.state.fixedHeader?"App-header frnt_header fixed_header dash_header":"App-header frnt_header dash_header"}>
			<div className="header_grid">
				<div className="logo_lt">
					<div className="main_logo">
					<Link className="App-link" to='/'>
						<img src={require('assets/images/logo-main.png')} alt="logo"/>
						</Link>
					</div>
						
				</div>
				<div className="mobinav" onClick={()=>this.menuClick(true)}><span>&nbsp;</span></div>
				<div className="nav_rt">
				
					<div className="fl_right">

							<div className={this.state.menuOpen?'top_menu open':'top_menu'}>

							<div className="navclsbtn" onClick={()=>this.menuClick(false)}> <span>&nbsp;</span></div>

								<ul>
								<li className={this.state.currentPage=='home'?'active':''}>
									<Link className="App-link" to='/' onClick={()=>this.menuClick(false,'home')}>Home</Link>
								</li>
								<li className={this.state.currentPage=='about'?'active':''}>
									<Link className="App-link" to='/about-us/' onClick={()=>this.menuClick(false,'about')}>About Us</Link>
								</li>
								<li className={this.state.currentPage=='pricing'?'active':''}>
									<Link className="App-link" to='/pro/pricing' onClick={()=>this.menuClick(false,'pricing')}>Pricing</Link>
								</li>
								</ul>
							</div>
							<div className="usermenu">
								<ul>
								<li>
									<Link className="App-link" to='/login'>Login</Link>
								</li>
								<li className="suplink">
									<Link className="App-link" to='/register'>Sign up</Link>
								</li>
								</ul>
							</div>
					</div>
					
				</div>
			</div>					

		    </header>
		);
	  }
	}
}