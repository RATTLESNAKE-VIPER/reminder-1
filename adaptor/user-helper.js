var crypto        = require('crypto')
var nodemailer    = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
var when          = require('when');
var transporter   = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

var smtpTransport = nodemailer.createTransport(smtpTransport({
    host: "smtp.mailgun.org",
    port: 587,
    auth : {
      user : "rohini21@sandboxce0483c6c2834b9ca5b8c958c6883272.mailgun.org",
      pass : "18158914i"
    }
}));

//gives string of specified length consisting given characters

var randomString =  module.exports.randomString = function(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
	return result;
}

module.exports.generateAuthtoken = function(){
  return randomString(12, 'abcdefghijklm12345678');
}

/*
  Compute a hash from a plaintext and salt
  This is the technique adopted by RoR for password hashing.
  We've duplicated it here to maintain backwards compatibility.
*/
var computeHash = module.exports.computeHash = function(plainText, salt) {
  var digest = plainText+salt
  var shasum
  for(var i=0; i<20; i++) {
    shasum = crypto.createHash('sha512')
    shasum.update(digest)
    digest = shasum.digest("hex")
  }
  return digest
}

/*
  Compare plaintext and hash
*/
module.exports.compareHash = function(plainText, salt, hash) {
  return computeHash(plainText, salt) === hash
}

/*
  Generate a new, random salt
*/
module.exports.generateSalt = function() {
  return crypto
    .randomBytes(15)
    .toString('base64')
    .replace('+', '')
    .replace('/', '')
    .replace('=', '')
    .replace('\n', '')
    .trim()
}

module.exports.activateUser = function(userDetails) {
  var redirectionLink = 'http://localhost:8000/activation?username=' + userDetails.username + '&email=' + userDetails.email;
  var mailOptions = {
    from    : 'keepatabb@gmail.com',
    to      : userDetails.email,
    subject : 'Keepatab activation mail!!!',
    html    : '<p>Hello! We are glad you chose keepatabb to keep track of your tasks. Click on this link to activate your account.</p>'
    + '<br>'
    + '<a href=' + redirectionLink.toString() + '>'+ redirectionLink.toString() +'</a>'
  };

  var promise = when.promise(function(resolve, reject, notify) {
    smtpTransport.sendMail(mailOptions, function(error, info){
      if(error){
        reject(error);
      }
      console.log("success!!!!",info)
      resolve("A mail has been sent to you! Please activate your account.");
    });
  });

  return promise;
}
