var express = require("express");
var router = express.Router();
var Mechanic = require("../models/mechanic");
var middleware = require("../middleware");

//INDEX - show all mechanics
router.get("/", middleware.isLoggedIn, function(req, res){
    // Get all mechanics from DB
    Mechanic.find({}, function(err, allMechanics){
        if(err){
            console.log(err);
        } else {
            res.render("mechanics/index", {mechanics:allMechanics});
        }
    });
});

//CREATE - add new mechanics to DB
router.post("/", middleware.isAdmin, function(req, res){
    // get data from form and add to mechanics array
    var name = req.body.name;
    var image = req.body.image;
    var tel = req.body.tel;
    var email = req.body.email;
    var bio = req.body.bio;
    var loc = req.body.loc;
    var area_covered = req.body.area_covered;
    var author = {
        id: req.user._id,
        username: req.user.username,
        firstname: req.user.firstname
    }
    var newMechanic = {name: name, image: image, tel: tel, email: email, bio: bio, loc: loc, area_covered: area_covered, author: author};
    // Create a new mechanic and save to DB
    Mechanic.create(newMechanic, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to mechanics page
            res.redirect("/mechanics");
        }
    });
});


//NEW - show form to create new mechanic
router.get("/new", middleware.isAdmin, function(req, res){
    res.render("mechanics/new");
});

router.get("/:id", middleware.isLoggedIn, function(req, res){
    //find the mechanic with provided ID
    Mechanic.findById(req.params.id).populate("reviews").exec(function(err, foundMechanic){
        if(err){
            console.log(err);
        } else {
            console.log(foundMechanic);
            //render show template with that mechanic
            res.render("mechanics/show", {mechanic: foundMechanic});
        }
    });
});

// EDIT MECHANIC ROUTE
router.get("/:id/edit", middleware.checkMechanicOwnership, middleware.isAdmin, function(req, res){
    Mechanic.findById(req.params.id, function(err, foundMechanic){
        res.render("mechanics/edit", {mechanic: foundMechanic});
    });
});

// UPDATE MECHANIC ROUTE
router.put("/:id", middleware.checkMechanicOwnership, middleware.isAdmin, function(req, res){
    //find and update the correct mechanic
    Mechanic.findByIdAndUpdate(req.params.id, req.body.mechanic, function(err, updatedMechanic){
        if(err){
            res.redirect("/mechanics");
        } else {
            res.redirect("/mechanics/" + req.params.id);
        }
    });
    //redirect somewhere
});

module.exports = router;