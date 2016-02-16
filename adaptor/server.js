var express    = require('express');
var app        = express();

var mongoose   = require("mongoose");
var Model 		 = require("./schema").Model;
var userHelper = require("./user-helper");

mongoose.connect('mongodb://localhost/reminder')
var db = mongoose.connection

db.once('open', function(callback) {
	console.log("connected to Reminder")
})

db.on('error', function(e) {
	 console.error('connection error:', e)
});

//allows CORS
app.use("*",function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  next()
});

app.get('/getList', function (req, res) {
	Model.find(function(err, data){
		console.log(data);
		res.send(data)
  });
});

app.listen(3000, function () {
  console.log('Reminder app listening on port 3000!');
});
