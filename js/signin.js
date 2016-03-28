import React from 'react';
import { Link } from 'react-router';
import Content from "./content";
import { connect } from 'react-redux';
import {loginAction} from './actions/userActions';

class SignIn extends React.Component {
	constructor(){
		super()
		this.state = {
			type         : "password",
			showPassword : false
		}
	}
	componentDidMount(){
		console.log("this.props.user",this.props.user)
		if(this.props.user && this.props.user.entity.email){
			this.props.history.replace("/dashboard");
		}
	}
	componentWillReceiveProps(nextProps){
		if(this.props.user !== nextProps.user && nextProps.user && nextProps.user.entity.email){
			this.props.history.replace("/dashboard");
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
			email   : this.refs.email.value,
			password: this.refs.password.value
		}
		this.props.dispatch(loginAction(userDetails))
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
    window.location.href = base;
    return false;
   }
	render() {
		var type = this.state.type;
		return (
			<div className="signin-wrapper form-group">
				<Content />
				<div className="signin col-md-4">
					<div className="signin-form">
						<input ref="email" className="form-control input" placeholder="email"></input>
						<input ref="username" className="form-control input" placeholder="username"></input>
						<input ref="password" className="form-control input" type={type} placeholder="password"></input>
						{/*<div className="showPassword">
							<input id="check" className="form-control" type="checkbox" onChange={this.showPassword.bind(this)}></input>
							<label HTMLFor="check">Show password</label>
						</div>*/}
						<input className="form-control input loginbtn" type="button" value="Login" onClick={this.signIn.bind(this)}></input>
						<div className="auth">
							<a href="#" onClick={this.authLogin.bind(this)}><i className ="fa fa-google-plus"></i> Sign in with google</a>
						</div>
						<div className="reg">
							<Link to="/signup">Register first!</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state;
}
export default connect(mapStateToProps)(SignIn);