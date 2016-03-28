import React from 'react';
import rest from 'rest';
import Tasks from "./tasks";
import SignUp from "./signup";
import { Link } from 'react-router';
import {auth_login} from "../sdk/sdk";
import { connect } from 'react-redux';


class App extends React.Component {
	constructor(){
		super();
		this.state = {
			user : "rohini joshi"
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
		console.log("this.context.redux.getState()",this.context)
		if(!this.state.user){
			//this.props.history.replace("/signin");
		}

		if(access_token && access_token.split('=')[0]==="access_token"){
			auth_login(access_token)
			.then(function(data){
				console.log("data------------",data)
			})
		}
	}

	render() {
		return (
			<div className="app-wrap">
				<header> Header</header>
				{this.props.children}
			</div>
		)
	}

}
function mapStateToProps(state) {
	return state;
}
export default connect(mapStateToProps)(App);

