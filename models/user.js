// Modèle user.js

var bcrypt = require('bcryptjs'); // Import du module de cryptage de mdp
var con = require('../db/bdd'); // Import du module de gestion de la connexion à la bdd

var User = module.exports

// Méthode de création d'utilisateur
module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) { // hashage du mot de passe retourné par l'utilisateur
        bcrypt.hash(newUser.password, salt, function(err, hash) { 
            newUser.password = hash;
            var utilisateur = { mail: newUser.email, password: newUser.password, name: newUser.name, pseudo: newUser.pseudo }; // Données récupérées via formulaire
            con.query("INSERT INTO user SET ?", utilisateur, function(err, result) { // Stockage du nouveau user dans bdd avec mdp hashé
                if (err) throw err;
                console.log("1 ligne inserée");
            });
        });
    });
}

// Méthode de récupération de l'id user
module.exports.getUserById = function(id, callback) {
    con.query("SELECT id FROM user WHERE id_user = " + id, function(err, result) { // Vérification de l'existence d'un id user
        if (err) throw err;
        console.log("id trouvé");
        callback(null, result);
    });

}

// Méthode de récupération de l'email user
module.exports.getUserByEmail = function(email, callback) {
    con.query("SELECT * FROM user WHERE mail = '" + email + "'", function(err, result) { // Vérification de l'existence d'un email user
        if (result[0] != null) { // Email trouvé
            if (err) throw err;
            console.log("email trouvé!!!");
            callback(null, result[0]); // Ne renvoi pas d'erreur et renvoi l'email retourné par la requête
        } else { // Email non trouvé
            console.log("email non trouvé!!!");
            callback(null, null); 
        }
    });
}

// Méthode de comparaison de mdp
module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) { // Compare le mdp issu de la bdd et le mdp entré
        if (err) throw err;
        console.log("MDP=" + hash);
        callback(null, isMatch); // Comparaison ok, ne renvoi pas d'erreur et renvoi un booléen (isMatch) à true
    });
}