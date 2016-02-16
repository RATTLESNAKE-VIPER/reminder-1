var mongoose = require("mongoose");
var schema   = {
	task     : String,
	time     : Date,
	complete : Boolean
}
module.exports.Model = mongoose.model('task',schema)