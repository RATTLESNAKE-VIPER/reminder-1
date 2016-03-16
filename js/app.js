import React from 'react';
import rest from 'rest';
import Tasks from "./tasks";
import SignUp from "./signup";
import { Link } from 'react-router';
import {auth_login} from "../sdk/sdk";


class App extends React.Component {
	constructor(){
		super();
		this.state = {
			user         : undefined
		}
	}
  componentDidUpdate(prevProps, prevState){
  	if(this.state.user && prevState.user!==this.state.user){
  		console.log("replace")
			this.props.history.replace({ pathname: "/dashboard", query: {user:JSON.stringify(this.state.user)}});
  	}
  }
	componentWillMount(){
		var self = this;
		var access_token = window.location.href.split("&")[1]
		if(!this.state.user){
			this.props.history.replace("/signin");
		}
		if(access_token){
			auth_login(access_token)
			.then(function(data){
				console.log("data------------",data)
			})
		}
	}
	
	render() {
		return (
			<div className="app-wrap">
				{this.props.children}
			</div>
		)
	}
}

App.contextTypes = {
  router: React.PropTypes.object
};
export default App;

