var mongoose = require("mongoose");
var taskSchema   = {
	owner_uid: String,
	task     : String,
	time     : Date,
	complete : Boolean
}
var UserSchema   = {
	username         : String,
	password_salt    : String,
	crypted_password : String,
	email            : String,
	authtoken        : String,
	activated        : Boolean,
	auth_data        : {
		google: {
			uid: String,
			email: String,
			
		}
	}
}

module.exports.TaskSchema = mongoose.model('task',taskSchema)
module.exports.UserSchema = mongoose.model('users',UserSchema)