var express = require("express");
var router = express.Router({mergeParams: true});
var Mechanic = require("../models/mechanic");
var Review = require("../models/review");
var middleware = require("../middleware");


//Reviews New
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find mechanic by id
    Mechanic.findById(req.params.id, function(err, mechanic){
        if(err){
            console.log(err);
        } else {
            res.render("reviews/new", {mechanic: mechanic});
        }
    });
});

//Reviews Create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup mechanics using ID
    Mechanic.findById(req.params.id, function(err, mechanic){
        if(err){
            req.flash("error", "Noe gikk galt.");
            console.log(err);
            res.redirect("/mechanics");
        } else {
            Review.create(req.body.review, function(err, review){
                if(err){
                    console.log(err);
                } else {
                    //add username and id to review
                    review.author.id = req.user._id;
                    review.author.username = req.user.username;
                    review.author.firstname = req.user.firstname;
                    // save review
                    review.save();
                    mechanic.reviews.push(review);
                    mechanic.save();
                    console.log(review);
                    req.flash("success", "Anmeldelsen er innsendt");
                    res.redirect("/mechanics/" + mechanic._id);
                }
            });
        }
    });
});

module.exports = router;