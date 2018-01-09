// Paramètres de la base de données mysql

var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
<<<<<<< HEAD
    password: '',
    port: 8889,
    database: 'test'
=======
    password: 'root',
    port: 3306,
    database: 'pictureme'
>>>>>>> fc788abd20d586ffaaba846c964e3948463c19ab
});

module.exports = con;