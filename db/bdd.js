// Paramètres de la base de données mysql

var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'pictureme'
});

module.exports = con;