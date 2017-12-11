var http = require('http');
var url = require('url');
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var util = require('util');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var expressValidator = require('express-validator');
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());

var urlencodedParser = bodyParser.urlencoded({ extended: false});

var User = require('./models/user');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var con = mysql.createConnection({
    host: 'localhost',
	user: 'root',
    password : '',
    port: 3306,
    database: 'pictureme'
});

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
     app.use(express.static(__dirname+'/ressources'));
      res.render('connexion',{qs:req.query});
});


// app.post('/connexion',urlencodedParser, function (req, res) {
//      app.use(express.static(__dirname+'/ressources'));
//       console.log(req.body);
//       res.render('accueil',{qs:req.query});
// });

app.get('/accueil', function (req, res) {
     app.use(express.static(__dirname+'/ressources'));
         res.render('accueil',{qs:req.query});
});
     
app.post('/accueil', urlencodedParser, function (req, res) {
     app.use(express.static(__dirname+'/ressources'));
     console.log(req.body);
      res.render('connexion-success',{qs:req.query});
});
     



app.get('/accueil', function (req, res) {
     app.use(express.static(__dirname+'/ressources'));
          var utilisateurs=[];
    con.query("SELECT * FROM utilisateur", function (err, result) {
    if (err)
        throw err;
    utilisateurs=result;
    res.render('accueil', {utilisateurs});
    });    
});
     


app.get('/inscription', function (req, res) {
     app.use(express.static(__dirname+'/ressources'));
      res.render('inscription');
});

app.post('/inscription', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var confirm = req.body.confirm;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('confirm', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('inscription',{
			errors:errors
		});
	} else {
		var newUser = {
			name: name,
			email:email,
			password: password
		};

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		// req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/connexion');
	}
});

app.listen(8080, function () {
    console.log('listening on port 8080!')
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true
}, function(email, password, done) {
   User.getUserByEmail(email, function(err, userPassword, userEmail){
   	if(err) throw err;
    console.log('userEmail =' + userEmail);
    console.log('userPassword =' + userPassword);
   	if(!userEmail){
        console.log('!userEmail ' + userEmail);
   		return done(null, false);
   	}

   	User.comparePassword(password, userPassword, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
            console.log("Ca match ! ");
   			return done(null, userEmail);
   		} else {
            console.log("Ca match pas !!!!!! ");
   			return done(null, false);
   		}
   	});
   });
  }));

passport.serializeUser(function(userId, done) {
  done(null, userId);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, userId) {
    done(err, userId);
  });
});

app.post('/connexion',
  passport.authenticate('local', {successRedirect:'/accueil', failureRedirect:'/connexion', failureFlash: true}), function (req, res) {
     app.use(express.static(__dirname+'/ressources'));
      console.log(req.body);
      res.render('accueil',{qs:req.query});
});
