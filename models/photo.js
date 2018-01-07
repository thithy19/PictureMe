//Modèle photo.js

var con = require('../db/bdd'); // Import du module de gestion de la connexion à la bdd

var Photo = module.exports

// Méthode de création de photo
module.exports.createPhoto = function(newPhoto, callback) {
    var photo = { description: newPhoto.title, photo_url: newPhoto.image, id_user: "1" };
    con.query("INSERT INTO photos SET ?", photo, function(err, result) {
        if (err) throw err;
        console.log("1 photo inserée");
        return callback(null, result);
    });
}