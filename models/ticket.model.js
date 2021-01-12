const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Shema 
const TicketSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    dev: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    projectId: {
        type: String,
        required: true
    }
});

module.exports = Ticket = mongoose.model("tickets", TicketSchema);