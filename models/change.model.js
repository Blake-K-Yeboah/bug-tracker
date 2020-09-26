const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChangeSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Change = mongoose.model("changes", ChangeSchema);