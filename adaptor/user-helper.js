var nodemailer = require('nodemailer');
//gives string of specified length consisting given characters

var randomString =  module.exports.randomString = function(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
	return result;
}

module.exports.generateAuthtoken = function(){
  return randomString(12, 'abcdefghijklm12345678');
}
