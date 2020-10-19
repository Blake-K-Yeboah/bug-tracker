const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChangeSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    properties: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Change = mongoose.model("changes", ChangeSchema);