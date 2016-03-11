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
		if(userDetails.username.trim()===""||userDetails.password.trim()===""||this.refs.confirm_password.value.trim()===""||userDetails.email.trim()===""){
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
	authLogin(){
		var e               = function(u) {return encodeURIComponent(u);}
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
      console.log("base---------",base)
    window.location.href = base;
    return false;
   }
	render(){
		let type = this.state.type
		return (
			<div className="signup-wrapper form-group">
				<button onClick={this.authLogin.bind(this)}>Sign in with google</button>
			</div>
		)
	}
}

export default SignUp;