var Mechanic = require("../models/mechanic");
var Review = require("../models/review");
var Order = require("../models/order");
var User = require("../models/user");
var admin_id = "574256cf94a020a50fcccae2";

// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkMechanicOwnership = function(req, res, next){
if(req.isAuthenticated()){
        Mechanic.findById(req.params.id, function(err, foundMechanic){
            if(err){
                res.redirect("back");
            } else {
                // does user own the mechanic?
                if(foundMechanic.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}


middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Du må være innlogget for å gjøre det.");
    res.redirect("/login");
}

middlewareObj.isAdmin = function (req, res, next){
    if(req.isAuthenticated() && (req.user._id == admin_id)){
        return next();
    }
    res.redirect("/login");
}


module.exports = middlewareObj;