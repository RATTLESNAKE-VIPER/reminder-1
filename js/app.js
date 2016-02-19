import React from 'react';
import rest from 'rest';
import Tasks from "./tasks";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import counter from './reducer';

var mime 			= require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');
var client 		= rest.wrap(mime, {
	mime: 'application/json'
})

var store = createStore(counter);

const todo = (state=[],action) => {
	switch(action.type) {
		case 'add_todo':
		return [
			...state,
			{
				id:action.id,
				text:action.text,
				completed:false
			}
		];
		default: 
		return state;
	}
}

const testAddTodo = () => {
	const stateBefore = [];
	const action = {
		type : "add_todo",
		id   :0,
		text :"test1"
	};
	const stateAfter = {
		id        :0,
		text      :"test1",
		completed : false
	}
}
todo(stateBefore,action)
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
				<textarea placeholder="Enter task" onChange={}/>
				<Tasks list={this.state.list}/>
			</div>
		)
	}
}

export default App;