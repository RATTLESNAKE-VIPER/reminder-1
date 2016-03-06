var mongoose = require("mongoose");
var taskSchema   = {
	owner_uid: String,
	task     : String,
	time     : Date,
	complete : Boolean
}
var UserSchema   = {
	username         : String,
	password         : String,
	confirm_password : String,
	email            : String,
	authtoken        : String,
	auth_data        : {
		google: {
			uid: String,
			email: String,
			
		}
	}
}

module.exports.TaskSchema = mongoose.model('task',taskSchema)
module.exports.UserSchema = mongoose.model('users',UserSchema)