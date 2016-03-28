import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import {activateUser} from "../sdk/sdk";

class Activation extends React.Component {
	constructor(props){
    super(props);
  }
  fetchUserFromParams(params){
  	var userObj = {};
  	params.split("?")[1].split("&").map(function(param){
  		var arr = param.split("=")
  		userObj[arr[0]] = arr[1];
  	})
  	return userObj
  }
  componentDidMount(){
  	var user = this.fetchUserFromParams(window.location.search)
    console.log("user--------------",user)
  	activateUser(user).
  	then(function(data){
  		console.log(data)
  	})
	}
	render() {
		return (
			<div>
				{this.props.children}
				Activating.......
			</div>
		);
	}
}
export default Activation;
