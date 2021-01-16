const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    usersList: {
        type: Array,
        required: false,
        default: []
    },
    owner: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

// Export Model
module.exports = Project = mongoose.model("projects", ProjectSchema);