//Modèle photo.js

var con = require('../db/bdd'); // Import du module de gestion de la connexion à la bdd

var Photo = module.exports;

// Méthode de création de photo
module.exports.createPhoto = function(newPhoto, callback) {
    var photo = { id_photo: ChaineAleatoire(6), description: newPhoto.title, photo_url: newPhoto.image, id_user: newPhoto.id_user };
    con.query("INSERT INTO photos SET ?", photo, function(err, result) {
        if (err) throw err;
        console.log("1 photo inserée");
        return callback(null, result);
    });
}

/* Génére un code aléatoire */
let ChaineAleatoire = function ChaineAleatoire(nbcar)
{
	let ListeCar = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9");
	let Chaine ='';
	for(i = 0; i < nbcar; i++)
	{
		Chaine = Chaine + ListeCar[Math.floor(Math.random()*ListeCar.length)];
	}
	return Chaine;
}

	
// Méthode d'affichage de photo
module.exports.see = function(req, res){
		let id = req.params.id;
			con.query('SELECT * FROM photos WHERE id_photo = ?',[id],function(err,rows)
					{		
					if(err) console.log("Error Selecting : %s ",err );
					res.render('accueil',{data: rows});
					});
	};


// Méthode de suppression de photo
module.exports.delete_photo = function(req,res){      
	let id = req.params.id;
		con.query("DELETE FROM photos  WHERE id_photo = ? ",[id], function(err, rows)
				{ 
			if(err)
				console.log("Error deleting : %s ",err );
			res.redirect('/accueil');
				});
};

/* module.exports.delete_photo = function(id){   
		con.query("DELETE FROM photos WHERE id_photo = ? ",[id], function(err, rows){ 
			if(err){
				console.log("Error deleting : %s ",err );				
			}
				});
    }; */

// Méthode de modification de photo
module.exports.edit = function(req, res){
	let id = req.params.id;
		con.query('SELECT * FROM photos WHERE id_photo = ?',[id],function(err,rows)
				{
			if(err)
				console.log("Error Selecting : %s ",err );
			res.render('edit_photo',{data:rows});
				});
	
};

// Méthode de sauvegarde de modification de photo
module.exports.save_edit = function(id){
		let input = JSON.parse(JSON.stringify(req.body));
			let data = { 
					Description   	: input.Description
			};
			con.query("UPDATE photos set ? WHERE id_photo = ? ",[data,id], function(err, rows)
					{
				if (err)
					console.log("Error Updating : %s ",err );
					});
		};
	

