import React from 'react';
import rest from 'rest';
import Tasks from "./tasks";
import SignUp from "./signup";
import { Link } from 'react-router';


class App extends React.Component {
  routeHandler() {
		console.log("props------",this.context.router.transitionTo)
		this.props.history.replaceState(null,"/signup");
  }
	componentWillMount(){
		this.routeHandler();
		//this.transitionTo('/signup')
	}
	see(){
		//this.props.history.transitionTo("/signup")
	}
	render() {
		return (
			<div className="container">
				<input type="button" value="signup" onClick={this.see.bind(this)}></input>
				<Link to={"/signup"}>Go to signup</Link>
				{this.props.children}
			</div>
		)
	}
}

App.contextTypes = {
  router: React.PropTypes.object
};
export default App;

