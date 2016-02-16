import React from 'react';
import rest from 'rest';
var mime 			= require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');


var client 		= rest.wrap(mime, {
	mime: 'application/json'
})

class NF extends React.Component {
	render() {
		return (
			<div className="wait">Waiting...</div>
		)
	}
}

export default NF;