var mongoose = require("mongoose");
var taskSchema   = {
	task     : String,
	time     : Date,
	complete : Boolean
}
var UserSchema   = {
	username         : String,
	password         : String,
	confirm_password : String
}

module.exports.TaskSchema = mongoose.model('task',taskSchema)
module.exports.UserSchema = mongoose.model('users',UserSchema)