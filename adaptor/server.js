var express    = require('express')
var app        = express()

var mongoose   = require("mongoose")
var Model 		 = require("./schema").Model
var userHelper = require("./user-helper")
var bodyParser = require("body-parser")
var Task			 = require("./schema")

mongoose.connect('mongodb://localhost/reminder')
var db = mongoose.connection

app.use(bodyParser.json())

db.once('open', function(callback) {
	console.log("connected to Reminder")
})

db.on('error', function(e) {
	 console.error('connection error:', e)
});

//allows CORS
app.use("*",function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-type")
  next()
});

app.get('/getList', function (req, res) {
	Model.find(function(err, data){
		res.send(data)
  });
});
app.post('/add',  function(req, res){
	console.log("req",req.body)
	var task = new Task({
		task     : req.body.task,
		time     : req.body.time,
		complete : req.body.complete
  });
  task.save(function (err, data) {
    if (err)
      res.send(err);
    else
      res.send("saved successfully!");
  });
})
app.listen(3000, function () {
  console.log('Reminder app listening on port 3000!');
});
