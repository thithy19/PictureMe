var http = require('http');
var url = require('url');
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var util = require('util');

var urlencodedParser = bodyParser.urlencoded({ extended: false});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var con = mysql.createConnection({
    host: 'localhost',
	user: 'root',
    password : '',
    port: 8889,
    database: 'pictureme'
});

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
     app.use(express.static(__dirname+'/ressources'));
      res.render('connexion',{qs:req.query});
});


app.get('/connexion',urlencodedParser, function (req, res) {
     app.use(express.static(__dirname+'/ressources'));
      console.log(req.body);
      res.render('connexion-success',{qs:req.query});
});

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

app.listen(8080, function () {
    console.log('listening on port 8080!')
})
