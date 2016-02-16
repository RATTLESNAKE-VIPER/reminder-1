import React from 'react';
import rest from 'rest';
import Tasks from "./tasks";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

var mime 			= require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');

var client 		= rest.wrap(mime, {
	mime: 'application/json'
})

class App extends React.Component {
	constructor(){
		super();
	  this.state = {
	  	list:[] 
	  }
	}
	
	componentWillMount(){
		var self = this;
		rest('http://localhost:3000/getList')
		.then(function(res){
			self.setState({
		  	list: JSON.parse(res.entity)
		  })
		})
	}
	render() {
		return (
			<div className="container dashboard">
				<textarea placeholder="Enter task"></textarea>
				<Tasks list={this.state.list}/>
			</div>
		)
	}
}

export default App;