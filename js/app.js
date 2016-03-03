import React from 'react';
import rest from 'rest';
import Tasks from "./tasks";
import SignUp from "./signup";
import { Link } from 'react-router';


class App extends React.Component {
	mixins: [ Navigation ]
	componentWillMount(){
		this.transitionTo('/signup')
	}
	render() {
		return (
			<div className="container">
				<SignUp />
			</div>
		)
	}
}


export default App;

