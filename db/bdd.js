// Paramètres de la base de données mysql

var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 8889,
    database: 'test'
});

module.exports = con;