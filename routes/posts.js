const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://satishdhamne13012:I6864lO6Q1cSIFMC@cluster0.dkf1i.mongodb.net/");

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    imageurl: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    },
    imagetext:{
        type: String,
    },
    image: {
        type: String,
    },
    likes:{
        type: Array,
        default: []
    },
    createdAt:{
        type: Date,
        dafault: Date.now()
    }
})

module.exports = mongoose.model("post", postSchema)