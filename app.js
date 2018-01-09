var http = require('http');
var url = require('url');
var ejs = require('ejs'); // Import du module d'incorporation du modèle JavaScript
var express = require('express'); // Import du framework express
var app = express(); // Appelle de la fonction de création d'application Express
var bodyParser = require('body-parser'); // Import du module d'analyse du corps de requête (retourné par req.body)
var util = require('util');
var passport = require('passport'); // Import du module d'authentification compatible avec Express
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs'); // Import du module de cryptage de mdp
var expressValidator = require('express-validator'); // Import du module express de gestion de messages de validation
var session = require('express-session'); // Import du module de gestion des sessions et cookies 
var multer = require('multer'); // Import du module de gestion d'upload de fichier
var path = require("path");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var User = require('./models/user'); // Import du modèle user
var Photo = require('./models/photo'); // Import du modèle photo
var Friends = require('./models/friends'); // Import du modèle friends
var con = require('./db/bdd'); // Import du module de gestion de la connexion à la bdd

// Initialisation
app.use(expressValidator());
app.use(session({secret:'XASDASDA'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var ssn;
app.use(function(req, res, next) {
  res.locals = req.session;
  ssn = res.locals;
  next();
});

// Initialisation du port
app.set('port', (process.env.PORT || 8080));


app.set('view engine', 'ejs'); // Moteur de modèle utilisé

// Page de connexion 
app.get('/', function(req, res) {
    app.use(express.static(__dirname + '/ressources')); // Utilisation de l'ensemble des ressources nécessaires (css, js, etc.)
    res.status(200);
    res.render('connexion');
});

// Méthode POST de la page connexion
app.post('/connexion', function(req, res) {
    passport.authenticate('local', { failWithError: true }),
    User.getUserByEmail(req.body.email, function(err, user){
        if(user!=null){
            console.log("ENFIN!!!!!!!! "+req.body.email);
            con.query("SELECT * FROM photos", function(err, result) { // Sélection de l'ensemble des photos de la bdd
                if (err) throw err;
                ssn.user = user;
                Friends.getFriendsById(user.id_user, function(err, friends) {
                    if (err) {
                        res.status(404);
                        res.redirect("connexion");
                    };
                    ssn.friends = friends;
                    ssn.images = result;
                    console.log(friends.length);
                    res.status(201);
                    res.redirect('/accueil'); // Renvoi vers la page d'accueil avec le tableau d'images retourné par la requête précédente
                });})
        }else{
            res.status(401);
            return res.redirect('/inscription');
        }
        
    }),
    function(err, req, res, next) {
        res.status(401);
        return res.render('inscription');
    }
});

// // Méthode POST de la page connexion
// app.post('/connexion', function(req, res) {
//     passport.authenticate('local', { failWithError: true }),
//     User.getUserByEmail(req.body.email, function(err, user){
//         if(user!=null){
//             console.log("ENFIN!!!!!!!! "+req.body.email);
//             con.query("SELECT * FROM photos", function(err, result) { // Sélection de l'ensemble des photos de la bdd
//                 if (err) throw err;
//                 ssn=req.session;
//                 ssn.user = user;
                
//                 Friends.getFriendsById(user.id_user, function(err, friends) {
//                     if (err) {
//                         res.status(404);
//                         res.render("connexion", {msg: err});
//                     };
//                 });  
//                 console.log(ssn.nbfriends);
//                 res.status(201);
//                 res.render('accueil', { images: result, user: ssn.user}); // Renvoi vers la page d'accueil avec le tableau d'images retourné par la requête précédente
//         })
//         }else{
//             res.status(401);
//             return res.render('inscription');
//         }
        
//     }),
//     function(err, req, res, next) {
//         res.status(401);
//         return res.render('inscription');
//     }
// });

// app.post('/accueil',
//     passport.authenticate('local', { failWithError: true }),
//     function(req, res, next) {
//         // handle success
//         User.getUserByEmail(req.body.email, function(err, user){
//             console.log("ENFIN!!!!!!!! "+req.body.email);
//             res.render('accueil', {user: user});
//         });
//     },
//     function(err, req, res, next) {
//         // handle error
//         return res.render('inscription');
//     }
// );

// Méthode GET de la page MesAmis
app.get('/mesamis', (req, res) => {
    Friends.getPhotosFriends(ssn.user.id_user, function(err, result){
        if(err) {
            res.status(404);
            res.redirect("/accueil");
        }
        ssn.photosamis = result;
        res.render('mesamis'); // Renvoi vers la page d'accueil avec le tableau d'images retourné par la requête précédente
    })
});

// Méthode GET de la page Mesinformations
app.get('/mesinformations', function (req, res) {
    app.use(express.static(__dirname+'/ressources'));
    con.query("SELECT * FROM user WHERE name='"+ssn.user.name+"'", function(err, result){
    if(err){ 
        res.status(404);
        res.render("accueil", {msg: err, user: ssn.user});
    }else{
        res.render('mesinformations', {mesinfos: result, user: ssn.user});
    }
  })
});

// Méthode GET de la page d'inscription
app.get('/inscription', function(req, res) {
    app.use(express.static(__dirname + '/ressources'));
    res.status(200);
    res.render('inscription');
});

// Méthode POST de la page d'inscription
app.post('/inscription', function(req, res) {
    // Ensemble des données retournées par le formulaire
    var name = req.body.name;
    var pseudo = req.body.pseudo;
    var email = req.body.email;
    var password = req.body.password;
    var confirm = req.body.confirm;

    // Contôle de validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('pseudo', 'Pseudo is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirm', 'Passwords do not match').equals(req.body.password);
    var errors = req.validationErrors();
    if (errors) {
        //---------------------------- A VOIR ----------------------------
        res.status(400);
        res.render('inscription', {
            errors: errors
        }); // Si erreur, renvoi à la page /inscription avec le tableau d'erreurs
        console.log(errors);

    } else {
        // Création d'une variable newUser avec les informations retournées par le formulaire
        var newUser = {
            name: name,
            pseudo: pseudo,
            email: email,
            password: password
        };

        // Appelle de la méthode createUser issu du modèle user
        User.createUser(newUser, function(err, user) {
            if (err) {
                res.status(404);
                res.render("inscription", {msg: err});
            };
            console.log(user);
        });

        // req.flash('success_msg', 'You are registered and can now login');
        res.status(200);
        res.render('connexion');
    }
});

// Mis en place du port
app.listen(app.get('port'), function() {
    console.log('listening on port ' + app.get('port') + '!');
})

// Configuration et gestion de l'authentification
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true
}, function(email, password, done) {
    // Appelle de la méthode getUserByEmail issu du modèle user
    User.getUserByEmail(email, function(err, user) {
        console.log("je passe ici");
        // Si user existe dans la bdd
        if (user.mail && user.password) {
            console.log("OK");
            if (err) {
                res.status(404);
                res.render("inscription", {msg: err})
            };
            console.log('user.AdresseMail =' + user.mail);
            console.log('user.MotDePasse =' + user.password);
            if (!user.mail) {
                console.log('!userEmail ' + user.mail);
                return done(null, false);
            }
            // Comparaison du mdp rentré par le user voulant se connecté et le mdp issu de la bdd
            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) {
                    res.status(404);
                    res.render("inscription", {msg: err})
                };
                // Comparaison : ok
                if (isMatch) {
                    console.log("Ca match !!!!!!!!!!!!! ");
                    return done(null, user.mail); // Informe Passport que l'authentification est ok avec le mail user
                } else { // Comparaison : ko
                    console.log("Ca match pas !!!!!! ");
                    return done(null, false); // Informe Passport de l'échec de l'authentification
                }
            });
        } else {
            return done(null, false); // Informe Passport de l'échec de l'authentification
        }
    });
}));

// Gestion des cookies
// Sérialisation de la session avec le userId 
passport.serializeUser(function(userId, done) {
    done(null, userId);
});

// Déserialisation de la session
passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, userId) {
        done(err, userId);
    });
});

// Méthode GET de la page connexion
app.get('/connexion', function(req, res) {
    app.use(express.static(__dirname + '/ressources'));
    ssn.destroy(function(err){
		if(err){
            res.status(404);
			res.render("connexion", {msg: err})
		}
		else
		{
            res.status(200);
			res.redirect('/');
		}
	});
    res.status(200);
    res.render('connexion');
});


app.use(express.static('./'));

//---------------------------- MODIFICATION DES CONST EN VAR ----------------------------

// Configuration des informations concernant l'upload
var storage = multer.diskStorage({
    destination: './uploads/', // Dossier qui contiendra les fichiers uploadés
    filename: function(req, file, cb) { // Format de nommage des fichiers
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


// Initialisation de l'upload
var upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

// Vérification et contrôles du type de fichier
function checkFileType(file, cb) {
    var filetypes = /jpeg|jpg|png|gif/;
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    var mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Seules les images sont autorisées!');
    }
}

// Méthode GET de la page accueil
app.get('/accueil', (req, res) => {
    //---------------------------- A MODIFIER ----------------------------
    con.query("SELECT * FROM photos WHERE id_user = " + ssn.user.id_user, function(err, result) { // Sélection issue de la bdd de l'ensemble des photos du user connecté + amis 
        if (err) {
            res.status(404);
            res.render("connexion", {msg: err});
        };
        res.status(200);
        res.render('accueil', {
            images: result,
            user: ssn.user 
        }); // Renvoi vers la page /accueil avec le tableau d'images retournés par la requête précédente
    })
});

// Méthode GET de la page Upload
app.get('/upload', function(req, res) {
    app.use(express.static(__dirname + '/ressources'));
    res.status(200);
    res.render('upload', {user: ssn.user });
});

// Méthode POST de la page upload
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(404);
            res.render('upload', {
                msg: err,
                user: ssn.user
            });
        } else {
            if (req.file == undefined) {
                res.status(404);
                res.render('upload', {
                    msg: 'Error: Aucune image séléctionnée !',
                    user: ssn.user
                });
            } else {
                console.log("bonjour");
                var image = "uploads/" + req.file.filename;
                var title = req.body.title;
                var newPhoto = {
                    title: title,
                    image: image,
                    id_user: ssn.user.id_user
                };
                // Insertion de la photo dans la bdd avec chemin de la photo
                Photo.createPhoto(newPhoto, function(err, result) {
                    if (err) {
                        res.status(404);
                        res.render("upload",{
                            msg: err,
                            user: ssn.user
                        });
                    };
                });

                con.query("SELECT * FROM photos WHERE id_user = " + ssn.user.id_user, function(err, result) {
                    if (err) {
                        res.status(404);
                        res.render("upload", {
                            msg: err,
                            user: ssn.user
                        });
                    };
                    res.status(200);
                    res.redirect("/accueil"); // Renvoi vers la page /accueil avec le tableau d'images retournés par la requête précédente
                })
            }
        }
    });
});