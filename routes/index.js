var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

router.get("/", function(req,res){
    res.render("homepage");
});


// Auth Routes

// show sign up form
router.get("/register", function(req,res){
    res.render("register");
});


//handling user sign up
router.post("/register", function(req, res){
    req.body.username
    req.body.password
    req.body.firstname
    req.body.lastname
    req.body.tel
    User.register(new User({username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname, tel: req.body.tel}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Registrering vellykket. Velkommen til Autoservo!");
           res.redirect("/");
        });
    });
});

// LOGIN ROUTES
//render login form
router.get("/login", function(req,res){
    res.render("login");
});

//login logic
//middleware
router.post("/login",passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}) ,function(req,res){
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Du er nå logged ut.");
    res.redirect("/");
});

router.get("/user/:id", middleware.isLoggedIn, function(req, res){
    //find the user with provided ID
    User.findById(req.params.id).exec(function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            console.log(foundUser);
            //render show template with that mechanic
            res.render("users/show", {user: foundUser});
        }
    });
});

module.exports = router;