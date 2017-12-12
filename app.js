var http = require('http');
var url = require('url');
var fs = require('fs');
var fsExtra = require('fs-extra');
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
var formidable = require('formidable');
var path = require("path");
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());

var urlencodedParser = bodyParser.urlencoded({ extended: false });
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
// page de connexion 
app.get('/', function(req, res) {
    app.use(express.static(__dirname + '/ressources'));
    res.render('connexion', { qs: req.query });
});

app.post('/accueil',
    passport.authenticate('local', { failWithError: true }),
    function(req, res, next) {
        // handle success
        
        User.getUserByEmail(req.body.email, function(err, user){
            console.log("ENFIN!!!!!!!! "+req.body.email);
            res.render('accueil', {user: user});
        });
        
    },
    function(err, req, res, next) {
        // handle error
        return res.render('inscription');
    }
);
     
app.get('/accueil', function (req, res) {
     app.use(express.static(__dirname+'/ressources'));
     res.render('accueil');
});


//page d'inscription
app.get('/inscription', function(req, res) {
    app.use(express.static(__dirname + '/ressources'));
    res.render('inscription');
});
//poster les infos rentrées dans le formulaire
app.post('/inscription', function(req, res) {
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

    if (errors) {
        res.render('inscription', {
            errors: errors
        });
    } else {
        var newUser = {
            name: name,
            email: email,
            password: password
        };

        User.createUser(newUser, function(err, user) {
            if (err) throw err;
            console.log(user);
        });

        // req.flash('success_msg', 'You are registered and can now login');

        res.redirect('/connexion');
    }
});

app.listen(8080, function() {
    console.log('listening on port 8080!')
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true
}, function(email, password, done) {
   User.getUserByEmail(email, function(err, user){
       console.log("je passe ici");
    if(user.AdresseMail && user.MotDePasse)
    {
        console.log("OK");
        if(err) throw err;
        console.log('user.AdresseMail =' + user.AdresseMail);
        console.log('user.MotDePasse =' + user.MotDePasse);
        if(!user.AdresseMail){
            console.log('!userEmail ' + user.AdresseMail);
            return done(null, false);
        }

        User.comparePassword(password, user.MotDePasse, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
                console.log("Ca match !!!!!!!!!!!!! ");
                return done(null, user.AdresseMail);
            } else {
                console.log("Ca match pas !!!!!! ");
                return done(null, false);
            }
        });
    }else{
        return done(null, false);;
    }
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

app.get('/connexion', function (req, res) {
     app.use(express.static(__dirname+'/ressources'));
      res.render('connexion');
});

//création d'image
app.post('/upload', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.write('received upload:\n\n');
        res.end(util.inspect({ fields: fields, files: files }));
    });
    form.on('fileBegin', function(name, file) {
        file.path = path.join(__dirname, '/temp/') + file.name;
    });
    form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete.toFixed(2));
    });
    form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        var new_location = path.join(__dirname, '/upload/');
        fsExtra.copy(temp_path, new_location + file_name, function(err) {
            if (err) {
                console.error(err); //
            } else {
                console.log("success!");
                // Delete the "temp" file
                fsExtra.unlink(temp_path, function(err) {
                    if (err) {
                        console.error(err);
                        console.log("TROUBLE deletion temp !");
                    } else {
                        console.log("success deletion temp !");
                    }
                });
            }
        });
    });
    return;
});