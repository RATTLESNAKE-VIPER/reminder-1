import React from 'react';
import { register } from "../sdk/sdk";

class SignUp extends React.Component {
	constructor(){
		super()
		this.state = {
			type         : "password",
			showPassword :false
		}
	}
	signUp(e) {
		e.preventDefault()
		var userDetails = {
			username: this.refs.username.value,
			password: this.refs.password.value,
			confirm_password: this.refs.confirm_password.value
		}
		if(userDetails.username.trim()===""||userDetails.password.trim()===""||userDetails.confirm_password.trim()===""){
			alert("Please fill all fields!")
			return;
		}

	  register(userDetails)
		.then(function(userdata){
			console.log("userdata-",userdata)
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
				<input ref="username" className="form-control" placeholder="username"></input>
				<input ref="password" className="form-control" type={type} placeholder="password"></input>
				<input ref="confirm_password" className="form-control" type={type} placeholder="confirm password"></input>
				<input className="form-control" type="checkbox" onChange={this.showPassword.bind(this)}>Show password</input>
				<input className="form-control" type="button" value="Submit" onClick={this.signUp.bind(this)}></input>
			</div>
		)
	}
}

export default SignUp;