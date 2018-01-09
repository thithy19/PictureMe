// Modèle friends.js

var con = require('../db/bdd'); // Import du module de gestion de la connexion à la bdd

var Friends = module.exports

// Méthode de récupération de l'id user
module.exports.getFriendsById = function(id, callback) {
    con.query("SELECT user.* FROM friends, user WHERE friends.id_friend = user.id_user AND friends.id_user =" + id, function(err, result) { // Vérification de l'existence d'un id user
        if (err) throw err;
        console.log("id trouvé");
        callback(null, result);
    });
}

// Méthode de récupération des photos user
module.exports.getPhotosFriends = function(id, callback) {
    con.query("SELECT user.*, photos.* FROM friends, user, photos WHERE friends.id_friend = user.id_user AND photos.id_user = user.id_user AND friends.id_user =" + id, function(err, result) { // Vérification de l'existence d'un id user
        if (err) throw err;
        console.log("id trouvé");
        callback(null, result);
    });

}
