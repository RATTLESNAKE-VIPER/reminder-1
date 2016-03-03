import React from "react";
import rest from "rest";

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

	addTask() {
		console.log("add task",this.refs.input.value)
		var task = this.refs.input.value;
		client({
			path		:"add", 
			method  : "POST",
			entity  : {
				task : task,
				time : new Date(),
				complete: false 
			}
		})
		.then(function(res){
			alert(res.entity)
		})
	}

	render(){
		return (
			<div>
				<textarea ref="input" placeholder="Enter task"/>
				<button onClick={this.addTask.bind(this)}>Add task</button>
				<Tasks list={this.state.list} />
			</div>
		)
	}
}
