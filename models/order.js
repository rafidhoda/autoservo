var mongoose= require("mongoose");

// SCHEMA SETUP
var orderSchema = new mongoose.Schema({
    num: Number,
    name: String,
    service: String,
    extra: String,
    price: String,
    date: String,
    time: String,
    reg: String,
    email: String,
    tel: String,
    address: String,
    postal: String,
    region: String,
    subscribe: Boolean,
    timestamp: String
});

module.exports = mongoose.model("Order", orderSchema);