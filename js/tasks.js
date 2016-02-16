import React from 'react';
import TaskItem from "./task-item";

class Tasks extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		var list = this.props.list || [];
		return (
			<div className="container task-wrapper">
				<ul>
					{
						list.map(function(item,ind){
							return <TaskItem item={item} key={ind} />
						})
					}
				</ul>
			</div>
		)
	}
}

export default Tasks;