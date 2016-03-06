var express    = require('express')
var app        = express()

var mongoose   = require("mongoose")
var userHelper = require("./user-helper")
var bodyParser = require("body-parser")
var Task       = require("./schema").TaskSchema
var User			 = require("./schema").UserSchema

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
	Task.find(function(err, data){
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
      res.send("Successfully added!");
  });
})

app.post('/registerUser',  function(req, res){
  console.log("req",req.body)
  var user = new User({
    password : req.body.password,
    username : req.body.username,
    email    : req.body.email
  });
  user.save(function (err, data) {
    console.log("saved---------",data)
    if (err)
      res.send(err);
    else
      res.send("Successfully registered!!");
  });
})

app.post('/login',  function(req, res){
  User.findOne(req.body,function(err, data){
    if(!data){
      res.send("You need to register first!")
    } else{
      var user = data;
      user.update({
        authtoken: userHelper.generateAuthtoken()
      }, {upsert: true}, function(err, data){
      })
    }
  })
})

app.post('/auth_login', function(req, res){
  User.findOne({email: req.body.email},function(err, data){
    if(!data){
      var user = new User({
        authtoken: userHelper.generateAuthtoken(),
        email    : req.body.email
      });
      user.save(function (err, data) {
        if (err)
          res.send(err);
        else
          res.send(data);
      });
    } else{
      var user = data;
      user.update({
        authtoken: userHelper.generateAuthtoken()
      }, function(err, updated){
        User.findOne({_id:user._id},function(err, data){
          res.send(data)
        })
      })
    }
  })
})


app.listen(3000, function () {
  console.log('Reminder app listening on port 3000!');
});
