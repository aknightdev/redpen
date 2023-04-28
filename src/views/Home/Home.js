import React from 'react';
import TimeAgo from 'timeago-react';
import { Link } from 'react-router-dom';
import { config } from 'Constants.js';
import Moment from 'react-moment';
import Sortdd from 'components/Sortdd/Sortdd.js';
import Sharedropdown from 'components/Sharedropdown/Sharedropdown.js';
import Protrash from 'components/Protrash/Protrash.js';
const defaultimage = require('assets/images/default.jpg');

export default class Home extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {isLoggedIn: false, projects:[], nlist:[], archived:0, availprojects:0, keyword:'', sortby:'', allpros:[], showMore:false, togSear:false};
	    this.authUser = window.localStorage.getItem('auth_user')==null?{id:null,name:null}:JSON.parse(window.localStorage.getItem('auth_user'));
	    this.updateProjects = this.updateProjects.bind(this);
	    this.filterProjects = this.filterProjects.bind(this);
	    this.searchProjects = this.searchProjects.bind(this);
			this.clickShowmore = this.clickShowmore.bind(this);
			this.toggleSearch = this.toggleSearch.bind(this);
	}
	toggleSearch(){
		this.setState({togSear:!this.state.togSear});
	}
	async getProjects() {
		//if(window.localStorage.getItem('projects')==null){
			if (this.authUser.id!=null) {
				const response = await fetch(config.url.API_URL+'projects',{ method: "POST", body: JSON.stringify({user_id: this.authUser.id}), headers: { 'Content-Type': 'application/json' }});
			    const projects = await response.json();
			    //window.localStorage.setItem('projects',JSON.stringify(projects.list));
			    this.setState({projects:projects.list});
			    this.setState({allpros:projects.list});
			    this.setState({archived:projects.archived});
			    this.setState({availprojects:projects.availprojects});

			    this.filterProjects('updated');

			    const notif = await fetch(config.url.API_URL+'notifications',{ method: "POST", body: JSON.stringify({user_id: this.authUser.id}), headers: { 'Content-Type': 'application/json' }});
			    const notifications = await notif.json();
			    var nlist = [];
			    notifications.forEach((n,k)=>{
			    	if(nlist[n.project]===undefined) nlist[n.project]=[];
			    	nlist[n.project].push(n);
			    	this.setState({nlist:nlist});
			    });
		    }
		/*}
	    else{
	    	let projects = JSON.parse(window.localStorage.getItem('projects'));
	    	this.setState({projects:projects});
	    }*/
	}
	clickShowmore(){
		this.setState({showMore:!this.state.showMore});
	}
	updateProjects(){
		this.getProjects();
	}
	filterProjects(sortby){
		let sortedProjectsDsc;
		if (sortby=='updated') {
	    sortedProjectsDsc= this.state.projects.sort((a,b)=>{
			  if (a.updated  < b.updated) {
			    return 1;
			  }
			  if (a.updated > b.updated) {
			    return -1;
			  }
			  return 0;
	    });
	    this.setState({
	        projects:sortedProjectsDsc
	    });
    }
    else if (sortby=='commented') {
	    sortedProjectsDsc= this.state.projects.sort((a,b)=>{
			  if (a.commented  < b.commented) {
			    return 1;
			  }
			  if (a.commented > b.commented) {
			    return -1;
			  }
			  return 0;
	    });
	    this.setState({
	        projects:sortedProjectsDsc
	    });
    }
    else {
	    sortedProjectsDsc= this.state.projects.sort((a,b)=>{
	      var nameA = a.name.toUpperCase();
			  var nameB = b.name.toUpperCase();
			  if (nameA < nameB) {
			    return -1;
			  }
			  if (nameA > nameB) {
			    return 1;
			  }
			  return 0;
	    });
	    this.setState({
	        projects:sortedProjectsDsc
	    });
    }
	}
	searchProjects(e){
		e.preventDefault();
		let keyword = document.getElementById('keyword').value;
		this.setState({projects:this.state.allpros.filter(v=>v.name.toLowerCase().indexOf(keyword.toLowerCase())>=0)});
	}
	componentDidMount() {
		if (window.localStorage.getItem('auth_user')!=null) {this.setState({ isLoggedIn: true });}
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
        this.getProjects();
    }
	render() {
		const isLoggedIn = this.state.isLoggedIn;
	  let button = null;

	    // if (isLoggedIn) {
	    // 	if (this.state.availprojects>0) {
	    // 		button =<div className="projects_item"> <div className="projects_grid prjupd_grid"><div className="projs_itminner"><div className="drag-add-more"> <Link  to='/p/create'>Click here or Start <br/>New Project <img src={require('assets/images/upload_icon.png')} alt=""/> </Link></div></div></div></div>;
	    // 	}
	    // 	else
	    //   		button = <div className="projects_item"><div className="projects_grid prjupd_grid"><div className="projs_itminner"><div className="drag-add-more"> <Link  to='/pro/new_plans'>Click here or Start <br/>New Project <img src={require('assets/images/upload_icon.png')} alt=""/> </Link></div></div></div></div>;
	    // } else {
	    //   button = null;
	    // }

	    if (isLoggedIn) {
	    	/*if(this.state.projects.length==0){
		return (
			<div className="page_body">
			<div className="page_wrapper">
			<div className="no_design_row">
				<div className="container2">
						<div className="no_design">
							<img src={require('assets/images/galery_icon.svg')}/>
						<h2>No designs yet</h2>
						<p>Be the first to Create a Project.</p>
						<Link className="link_btn" to='/p/create'>Create Project</Link>
						</div>
					</div>
			</div></div></div>);
		}
		else*/
			return (
				<div className="pg_boxwrapper">
			<div className="page_wrapper">
			<div className="container home">
				 
				<div className="all_projects_outer">
					 

						<div className="prjs_srch_outer">
							<Link className="link_btn crate_btn" to={this.state.availprojects>0?'/p/create':'/pro/new_plans'}>Create new project</Link>
							<div className="prjs_serch_icon">
							    <div className="ser_icon" onClick={this.toggleSearch}>
							   		<img src={require('assets/images/search_1.svg')}/>
							    </div>
								<div className={this.state.togSear?'show prjs_serch':'hide prjs_serch'}>
									<form method="post" onSubmit={this.searchProjects}>
									 <input
							          type="search"
							          name="keyword"
							          placeholder="Search"
							          id="keyword"
							          onKeyUp={this.searchProjects}
							          />
							    </form>
								</div>
							</div>
							<Sortdd className="link_btn" filterProjects={this.filterProjects} page="home"></Sortdd>
							<div className="cnt">{this.state.projects.length} Projects</div>
						</div>

						



						<div className="all_projects_row">
							{this.state.projects.length == 0?
							<div className="projects_item dropfile">
								<Link className="np_dummy" to={this.state.availprojects>0?'/p/create':'/pro/new_plans'}><strong>Click here to <br />create new project</strong> <img src={require('assets/images/upload_icon.png')}/></Link>
								</div>
								:''}
					 		{button}
					 
				      {this.state.projects.map((project,key) => (
				      	<div className={project.is_expired?'expired projects_item':'projects_item'} key={key}>
				        <div className="projects_grid" >
				        	<div className={project.user===this.authUser.id?'prt_right':'prt_right no_del'}>
		        			 <Sharedropdown projectId={project._id} updateProjects={this.updateProjects} project={project}></Sharedropdown>
		        			 {project.user===this.authUser.id?
		        			 <div className="delete_bg">{!project.is_expired?<Protrash updateProjects={this.updateProjects} project={project}></Protrash>:null}</div>
		        			 :''}
		        			</div>
				        	{/*<Dropdown updateProjects={this.updateProjects} project={project}></Dropdown>*/}
				        	<div className="projs_itminner">
				        	
				        	<div className="project-image">
				        		<Link to={project.is_expired?'/pro/new_plans':'/p/'+project._id}><img alt="" src={project.designs[0]!==undefined?config.url.IMAGE_URL+project.designs[0].image:defaultimage} /></Link>
				        		{this.state.nlist[project._id]?(
					        	<div className="unseen_thum">
					        			<div className="inner_unseen_thum"> 
					        			<strong className="number">{this.state.nlist[project._id].length}</strong>
					        			<span> Unseen things</span> 
						        		<Moment format="DD MMM YY hh:mma" datetime={this.state.nlist[project._id][0].created}></Moment>
					        			 </div>
					        	 </div>
					        	):''}
				        	</div></div>

				        		<div className="prt_info dash_1">
				        			<div className="prttitle_left">
				        				<Link to={project.is_expired?'/pro/new_plans':'/p/'+project._id}><h2>{project.name}</h2>
				        				<p><Moment format="DD MMM YY hh:mma">{project.updated}</Moment></p>
					        			{/*<p> with {project.shared.map((share,key1) => (
								        		<span key={key1}>{share.user?share.user._id===this.authUser.id?'You':share.user.name:''}{key1===(project.shared.length-2)?' and ':key1===(project.shared.length-1)?'':', '}</span>
								        		))}
								        		{project.invite && project.invite.map((share,key1) => (
								        		<span key={key1}>{','+share.email}</span>
								        		))}
							        		 
					        			</p>*/}</Link>
				        			</div>
				        			
				        		</div>	</div>

				        	 
				        	
				        	 
				        </div>
				      ))}

					 </div>
					  
				   
				    
				</div>
					
				{/*<div className="arc_btns_row">
						<ul>

						<li>{this.state.archived>0?(
						 <Link to='/archived'>Archived projects..</Link> 
						):''}</li>
						<li> {this.state.projects.length>8?(<Link onClick={this.clickShowmore}>Load {this.state.showMore?'Less':'More'}</Link>):""} </li>
						</ul>
						
				</div>*/}</div>

		    </div></div>
		);
		}
	    else{
	    	return (<div className="page_body">
			<div className="home_banner">
			 <div className="header_grid">
			 <div className="bnr_right fl_right">
			 			<div className="bnr_circle"><img src={require('assets/images/hb-img.png')}/></div>
			 			<div className="shapes_outer">
			 				<div className="shapes_img1">
			 					<img src={require('assets/images/share_1.png')}/>
			 				</div>
			 				<div className="shapes_img2">
			 					<img src={require('assets/images/share_2.png')}/>
			 				</div>
			 				<div className="shapes_img3">
			 					<img src={require('assets/images/share_3.png')}/>
			 				</div>
			 			</div>
			 		</div>
			 		
			 		<div className="bnr_left">
			 			<h1>The fastest feedback tool for visual teams.</h1>
					<p>From the beginning, our goal has been to make collaboration super-fast.
					No matter where your colleagues are in the world, if you work with visuals we’ll help you collaborate with your team effortlessly.</p>
						<Link to='/register' className="bnr_btn">Get Started Today</Link>
			 		</div>
			 		

			 	</div>
			 </div>

			 <div className="hw_headblock">
				<h2>How it Work</h2>
				<div className="web_container">
				<div className="hw_midtitle">
					<h3>How feedback tool works</h3>
					<p>Get Your Point across Click and comment.</p>
				</div>
				</div>
				
			</div>
			<div className="step_sec step_sec1">
			<div className="web_container">
			<div className="step_row">
				<div className="step_rt fl_right">
					<img src={require('assets/images/explain_img.png')}/>
				</div>
				<div className="step_lt">
					<h2>Step1</h2>
					<h3>Explain your thinking</h3>
					<p>Point and click to give feedback. Everyone sees comments live as they happen. And we’ll show you who has the page open. It feels just like they’re standing next to you, without the annoying hovering or pressure.</p>
				</div>
				
			</div></div>
		</div>

				<div className="step_sec step_sec2">
			<div className="web_container">
			<div className="step_row">
				<div className="step_rt">
					 <div className="inv_box">
					<h4>invite colleagues</h4>
					<p>Invite team members or other guests</p>
						<img src={require('assets/images/people_img.png')}/>
					<a href="#">Share with another</a>
				</div>
				</div>
				<div className="step_lt">
				<div className="step_wrapper">
					<h2>Step2</h2>
					<h3>Get everyone involved</h3>
					<p>You can ask colleagues and clients for feedback by giving them a private link, or inviting them via email. We don’t restrict the number of collaborators you can have, so you’re free to get everyone involved.</p>
				</div></div>
				
			</div></div>
		</div>

		<div className="step_sec step_sec3">
			<div className="web_container">
			<div className="step_row">
				<div className="step_rt fl_right">
					  <div className="step_imgwrap">	<img src={require('assets/images/step3.png')}/></div>
				</div>
				<div className="step_lt">
				<div className="step_wrapper">
					<h2>Step3</h2>
					<h3>Organize with projects</h3>
					<p>When a design has many states, screens or alternatives, drag them in together to make a project. We’ll keep your team updated about comments, additions, and new versions.</p>
				</div></div>
				
			</div></div>
		</div>

		<div className="step_sec step_sec4">
			<div className="web_container">
			<div className="step_row">
				<div className="step_rt">
					  <div className="step_imgwrap">	<img src={require('assets/images/step4.png')}/></div>
				</div>
				<div className="step_lt">
				<div className="step_wrapper">
					<h2>Step4</h2>
					<h3>Keep track of versions</h3>
					<p>Each image can be easily updated or replaced whenever an iteration has been made. We’ll keep track of the versions for you.</p>
				</div></div>
				
			</div></div>
		</div>
<div className="hw_headblock au_headblock"><h2>ABOUT US</h2><div className="web_container"><div className="hw_midtitle"><h3>About Feedback Tool</h3><p>Get Your Point across Click and comment.</p></div></div></div>
<div className="ab_cols">
	<div className="web_container">
		<div className="ab_left">
			<img src={require('assets/images/about-img.png')}/>
		</div>
		<div className="ab_right">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
			<div className="ab_btn">
			<Link to='/register' className="bnr_btn">Get Started Today</Link>
			 </div>
		</div>
	</div>
</div>
		
	
	<div className="convi_sec">
	<div className="web_container">
		<h2>And if you’re still not convinced…</h2>

		<div className="drp_row">
			<div className="drp_col">
				<div className="dc_img"><img src={require('assets/images/people_icon.png')}/></div>
				<h3>Unlimited collaborators</h3>
				<p>You shouldn't question who you want to invite. We want you to get everyone involved. There are no limitations to invites.</p>
			</div>
			<div className="drp_col drp_line">
				<div className="dc_img"><img src={require('assets/images/people_icon2.png')}/></div>
				<h3>Highly praised support</h3>
				<p>As a feedback company, we pride ourselves on giving the best support; and being responsive lightning-fast. <Link to='/Contactus'>Drop us a line.</Link></p>
			</div>

		</div>

	</div>
</div>
			 </div>

			);
	    }				        	
	}
}