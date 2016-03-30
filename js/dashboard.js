import React from "react";
import rest from "rest";
import Tasks from "./tasks";

class Dashboard extends React.Component {
	constructor(){
		super();
	  this.state = {
	  	list:[] 
	  }
	}

	componentWillMount(){
		var self = this;
		console.log("in Dashboard---------",this.props.location)
		/*rest('http://localhost:3000/getList')
		.then(function(res){
			self.setState({
		  	list: JSON.parse(res.entity)
		  })
		})*/
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
			<div className="dashboard">
			<nav className="">
				<ul className="nav nav-pills nav-stacked">
					<li><a href="#">Tasks</a></li>
					<li><a href="#">Analytics</a></li>
				</ul>
			</nav>
			<div>Tasks will be here</div>
				{/*<textarea ref="input" placeholder="Enter task"/>
				<button onClick={this.addTask.bind(this)}>Add task</button>
				<Tasks list={this.state.list} />*/}
			</div>
		)
	}
}

export default Dashboard;