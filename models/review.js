var mongoose = require("mongoose");

var reviewSchema = mongoose.Schema({
    text: String,
    rating: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        firstname: String
    }
});

module.exports = mongoose.model("Review", reviewSchema);