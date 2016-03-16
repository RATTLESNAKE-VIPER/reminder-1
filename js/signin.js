import React from 'react';
import { login } from "../sdk/sdk";
import { Link } from 'react-router';

class SignIn extends React.Component {
	constructor(){
		super()
		this.state = {
			type         : "password",
			showPassword : false
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
		/*var userDetails = {
			username: this.refs.username.value,
			email   : this.refs.email.value,
			password: this.refs.password.value
		}
		login(userDetails)
		.then(function(user){
			console.log("user-----------",user)
		})*/
	}
	authLogin(){
		/*var e               = function(u) {return encodeURIComponent(u);}
		var client_secret   = "SQ9vGcHSKroo-tvVFXO-Wi21";
		var base            = 'https://accounts.google.com/o/oauth2/auth';
		var response_type   = e('token');
		var client_id       = e('173788126945-ir2vi7o6924uon6g72h2ibrr69j3vai5.apps.googleusercontent.com');
		var redirect_uri    = e('http://localhost:8000/');
		var scope           = e('https://www.googleapis.com/auth/userinfo.email');
		var state           = e('lollalal');
		var approval_prompt = e('auto');
    
    base = base +
      '?response_type=' + response_type +
      '&client_id=' + client_id +
      '&redirect_uri=' + redirect_uri +
      '&scope=' + scope +
      '&state=' + state +
      '&approval_prompt=' + approval_prompt;
    window.location.href = base;
    return false;*/
   }
	render() {
		var type = this.state.type;
		return (
			<div className="signin-wrapper form-group">
				<div className="content col-md-8">
					<p>Welcome to xyz!</p>
				</div>
				<div className="signin col-md-4">
					<input ref="email" className="form-control" placeholder="email"></input>
					<input ref="username" className="form-control" placeholder="username"></input>
					<input ref="password" className="form-control" type={type} placeholder="password"></input>
					<input className="form-control" type="checkbox" onChange={this.showPassword.bind(this)}>Show password</input>
					<input className="form-control" type="button" value="Login" onClick={this.signIn.bind(this)}></input>
					<button onClick={this.authLogin.bind(this)}>Sign in with google</button>
					<Link to="/signup">Register first!</Link>
				</div>
			</div>
		)
	}
}

export default SignIn;