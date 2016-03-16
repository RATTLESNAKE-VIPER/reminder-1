import React from 'react';
import { register } from "../sdk/sdk";
import { Link } from 'react-router';

class SignUp extends React.Component {
	constructor(){
		super();
		this.state = {
			type         : "password",
			showPassword :false
		}
	}
	signUp(e) {
		e.preventDefault()
		var userDetails = {
			password: this.refs.password.value,
			username: this.refs.username.value,
			email: this.refs.email.value	
		}
		if(userDetails.username.trim()===""||userDetails.password.trim()===""||userDetails.email.trim()===""){
			alert("Please fill all fields!")
			return;
		}
	  register(userDetails)
		.then(function(data){
			console.log("A mail has been sent to you! Please activate your account.",data)
		})
	}
	showPassword(e){
		
		if(this.state.showPassword){
			this.setState({
				type         : "password",
				showPassword :false
			})
		}else{
			this.setState({
				type         : "text",
				showPassword :true
			})
		}
	}
	
	render(){
		let type = this.state.type
		return (
			<div className="signup-wrapper form-group">
				<div className="content col-md-8">
					<p>Welcome to Keepatab!</p>
				</div>
				<div className="signup col-md-4">
					<input ref="email" className="form-control" placeholder="email"></input>
					<input ref="username" className="form-control" placeholder="username"></input>
					<input ref="password" className="form-control" type={type} placeholder="password"></input>
					<input className="form-control" type="checkbox" onChange={this.showPassword.bind(this)}>Show password</input>
					<input className="form-control" type="button" value="Register" onClick={this.signUp.bind(this)}></input>
				</div>
			</div>
		)
	}
}

export default SignUp;