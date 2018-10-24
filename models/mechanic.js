var mongoose = require("mongoose");

var mechanicSchema = new mongoose.Schema({
    name: String,
    image: String,
    tel: String,
    email: String,
    bio: String,
    loc: String,
    area_covered: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        firstname: String
    },
    reviews:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
        }
    ]
});

module.exports = mongoose.model("Mechanic", mechanicSchema);

