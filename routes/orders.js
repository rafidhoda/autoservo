var express = require("express");
var router = express.Router();
var Order = require("../models/order");
var middleware = require("../middleware");

router.get("/", middleware.isAdmin, function(req, res){
    //Get all orders from DB
    Order.find({}, function(err, allOrders){
        if(err){
            console.log(err);
        } else {
            res.render("orders",{orders:allOrders});
        }
    });
});

// EDIT ORDER ROUTE
router.get("/:id/edit", middleware.isLoggedIn, function(req,res){
    Order.findById(req.params.id, function(err, foundOrder){
        if(err){
            res.redirect("/orders")
        } else {
            res.render("orders/edit", {order: foundOrder});
        }
    });
});

// UPDATE ORDER
router.put("/:id", middleware.isLoggedIn, function(req, res){
    // find and update the correct order
    Order.findByIdAndUpdate(req.params.id, req.body.order, function(err, updatedOrder){
        if(err){
            res.redirect("/orders");
        } else {
            res.redirect("/orders");
        }
    });
    //redirect somwhere(show page)
});

// DESTROY ORDER ROUTE
router.delete("/:id", middleware.isLoggedIn, function(req, res){
    Order.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/orders");
        } else {
            res.redirect("/orders");
        }
    });
});

module.exports = router;