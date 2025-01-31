const mongoose = require("mongoose");

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