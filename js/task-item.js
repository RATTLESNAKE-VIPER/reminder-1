import React from 'react';

class TaskItem extends React.Component {
	constructor(props){
    super(props);
  }
  
	render() {
		return (
			<li className="container item-wrapper">
				<div>{this.props.item.task}</div>
			</li>
		);
	}
}

export default TaskItem;