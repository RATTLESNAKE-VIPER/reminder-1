import React from 'react';
import { login } from "../sdk/sdk";

class SignIn extends React.Component {
	constructor(){
		super()
		this.state = {
			type         : "password",
			showPassword :false
		}
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

	signIn() {
		var userDetails = {
			username: this.refs.username.value,
			email: this.refs.email.value,
			password: this.refs.password.value
		}
		login(userDetails)
		.then(function(user){
			console.log("user-----------",user)
		})

	}
	
	render() {
		var type = this.state.type;
		return (
			<div className="signin-wrapper form-group">
				<input ref="email" className="form-control" placeholder="email"></input>
				<input ref="username" className="form-control" placeholder="username"></input>
				<input ref="password" className="form-control" type={type} placeholder="password"></input>
				<input className="form-control" type="checkbox" onChange={this.showPassword.bind(this)}>Show password</input>
				<input className="form-control" type="button" value="Login" onClick={this.signIn.bind(this)}></input>
			</div>
		)
	}
}

export default SignIn;