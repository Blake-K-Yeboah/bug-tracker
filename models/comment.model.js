const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    for: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Comment = mongoose.model("comments", CommentSchema);