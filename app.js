var http = require('http');
var url = require('url');
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const util = require('util');


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
      res.render('connexion');
});

app.get('/accueil', function (req, res) {
     app.use(express.static(__dirname+'/ressources'));
      res.render('accueil');
});

app.get('/inscription', function (req, res) {
     app.use(express.static(__dirname+'/ressources'));
      res.render('inscription');
});

app.listen(8080, function () {
    console.log('listening on port 8080!')
})
