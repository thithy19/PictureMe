var bcrypt = require('bcryptjs');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
	user: 'root',
    password : '',
    port: 3306,
    database: 'pictureme'
});

var User = module.exports

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            var utilisateur = {AdresseMail: newUser.email, MotDePasse: newUser.password, Nom: newUser.name, Prénom: newUser.name};
            con.query("INSERT INTO utilisateur SET ?", utilisateur, function (err, result) {
                if (err) throw err;
                console.log("1 ligne inserée");
            });
	    });
	});
}

module.exports.getUserById = function(id, callback){
	con.query("SELECT id FROM utilisateur WHERE id = "+id, function (err, result) {
        if (err) throw err;
        console.log("id trouvé");
        callback(null, result);
    });    
	
}

module.exports.getUserByEmail = function(email, callback){
    con.query("SELECT * FROM utilisateur WHERE AdresseMail = '"+email+"'", function (err, result) {
        if(result[0] != null)
        {
            if (err) throw err;
            console.log("email trouvé!!!");
            callback(null, result[0].MotDePasse, result[0].AdresseMail);
        }
        callback(null, null, null);
    });    
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
        console.log("MDP="+hash);
    	callback(null, isMatch);
	});
}