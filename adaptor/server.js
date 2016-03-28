var express    = require('express')
var app        = express()

var mongoose   = require("mongoose")
var userHelper = require("./user-helper")
var bodyParser = require("body-parser")
var Task       = require("./schema").TaskSchema
var User       = require("./schema").UserSchema
var rest       = require('rest')

mongoose.connect('mongodb://localhost/reminder')
var db = mongoose.connection;

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
  User.findOne({email: req.body.email}, function(err, data){
    var password_salt= userHelper.generateSalt()
    var cryptedPswd  = userHelper.computeHash(req.body.password, password_salt)
    var userObj      = {
      crypted_password : cryptedPswd,
      password_salt : password_salt,
      username      : req.body.username,
      email         : req.body.email
    }
    var user = new User(userObj);
    if(!data){
      user.save(function (err, data) {
        if(err)
          res.send(err);
        else{
          userHelper.activateUser(req.body)
          .then(function(data){
            res.send(data)
          })
        }
      });
    } else{
      if(!data.activated){
        user = data;
        user.update(userObj, function(err, updated){
          if(err)
            res.send(err);
          else{
            userHelper.activateUser(req.body)
            .then(function(data){
              res.send(data)
            })
          }
        })
      }else{
        res.send("Your account is already active!!!")
      }
    }
  })
})

app.post('/activateUser', function(req, res) {
  console.log("in activateUser-------",req.body);
  User.findOne({
    email   : req.body.email,
    username: req.body.username
  }, function(err, user){
  console.log("in activateUser--found-----",user);
    if(!user){
      res.send("Your registration information seems wrong. Please register again!")
    } else{
      user.update({
        activated: true
      }, function(err, updated){
        console.log("updated-------",updated)
        res.send("Your account has been activated. Please login in into keepatab and have fun.",updated)
      })
    }
  })
})

app.post('/login',  function(req, res){
  User.findOne({email: req.body.email},function(err, data){
    if(!data){
      res.send("You need to register first!")
    } else{
      if(data.activated){
        var isPswdCorrect = userHelper.compareHash(req.body.password, data.password_salt, data.crypted_password)
        if(isPswdCorrect){
          var user = data;
          user.update({
            authtoken: userHelper.generateAuthtoken()
          }, function(err, updated){
            User.findOne({_id:user._id},function(err, data){
              console.log("data in old user-------",data, isPswdCorrect)
              res.send(data)
            })
          })
        }else{
          res.send("Wrong password")
        }
      }else{
        res.send("You need to register first!")
      }
    }
  })
})

app.post('/auth_login', function(req, res){
  rest('https://www.googleapis.com/oauth2/v1/tokeninfo?'+req.body.access_token)
  .then(function(data){
    var gmailUser = JSON.parse(data.entity)
    User.findOne({email: gmailUser.email},function(err, data){
      if(!data){
        var user = new User({
          authtoken : userHelper.generateAuthtoken(),
          email     : gmailUser.email,
          auth_data : {
            google: {
              uid   : gmailUser.user_id,
              email : gmailUser.email
            }
          }
        });
        user.save(function (err, data) {
          if(err)
            res.send(err);
          else{
            console.log("data in new user-------",data)
            res.send(data);
          }
        });
      } else{
        var user = data;
        user.update({
          authtoken: userHelper.generateAuthtoken()
        }, function(err, updated){
          User.findOne({_id:user._id},function(err, data){
            console.log("data in old user-------",data, updated)
            res.send(data)
          })
        })
      }
    })
  })
})

app.listen(3000, function () {
  console.log('Reminder app listening on port 3000!')
});