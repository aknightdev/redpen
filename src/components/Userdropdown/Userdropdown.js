import React from 'react';
import onClickOutside from "react-onclickoutside";
import { config } from 'Constants.js';
import { Link } from 'react-router-dom';

class Userdropdown extends React.Component {
    constructor(props) {
    		super(props);
    		this.state = {showDrop: false, isLoggedIn: false};
    		this.gearClick = this.gearClick.bind(this);
            this.handleLogoutClick = this.handleLogoutClick.bind(this);
    	}	
    	gearClick(){ 
        	this.setState({showDrop:!this.state.showDrop});
    	}
        componentDidMount() {
        if (window.localStorage.getItem('auth_user')!=null) {this.setState({ isLoggedIn: true });}
        }
    	handleClickOutside = evt => {
         if(evt.target.innerHTML==='Logout' || evt.target.innerHTML==='Login' || evt.target.innerHTML==='Archive project for everyone' || evt.target.innerHTML==='Delete project for everyone' || evt.target.innerHTML==='Leave project'){
            return false;
        }
        this.setState({showDrop:false});
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
        const isLoggedIn = this.state.isLoggedIn;
        let button;

        if (isLoggedIn) {
          button= <div><div className="user_nm" onClick={this.gearClick}><button>JD</button></div>
                    <ul className="dropdown-menu">
                        <li><Link className="App-link" to='/login'>Account details</Link> </li>
                        <li><Link className="App-link" to='/login'>Our Team</Link></li>
                        <li><Link className="App-link" to='/login'>Upgrade</Link></li>
                        <li><Link className="App-link" to='/login'>Support</Link></li>
                        <li><button onClick={this.handleLogoutClick} className="App-link" >Logout</button></li>
                    </ul></div>;
        } else {
          button = <div><button className="user_nm" onClick={this.gearClick}>JD</button>
                    <ul className="dropdown-menu"><li><Link className="App-link" to='/login'>Login</Link></li></ul></div>;
        }
        if(this.state.showDrop)
    	    return  button;
        else
            return <div className="user_nm" onClick={this.gearClick}><button>JD</button></div>;
	}				
}
export default onClickOutside(Userdropdown);	