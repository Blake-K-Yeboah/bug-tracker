// Required Packages
const express = require('express');
const jwt = require('express-jwt');
const keys = require("../../config/keys");

// Define Router
const router = express.Router();

// Import Ticket Model
const Ticket = require("../../models/ticket.model");

// Import Change Model
const Change = require('../../models/change.model');

router.get('/:id?', jwt({ secret: keys.secretOrKey, algorithms: ['HS256'] }), (req, res) => {

    // Define ID
    const id = req.params.id;

    if (id) {
        
        // Return ticket with specified id
        Ticket.findById(id).then(ticket => {

            if (!ticket) return res.status(400).json({ msg: "Ticket doesn't exist"})

            return res.json(ticket);

        });

    } else {
        
        // Return all tickets
        Ticket.find({}).then(tickets => {
           
            return res.json(tickets);

        });

    }   
});

module.exports = router;