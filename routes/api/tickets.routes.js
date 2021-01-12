// Required Packages
const express = require('express');
const jwt = require('express-jwt');
const keys = require("../../config/keys");

// Define Router
const router = express.Router();

// Import Ticket Model
const Ticket = require("../../models/ticket.model");

// Import Project Model
const Project = require("../../models/project.model");

// Import Change Model
const Change = require('../../models/change.model');

// Import Validation Function
const validateTicketInput = require('../../validation/ticket');

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

router.post('/create', jwt({ secret: keys.secretOrKey, algorithms: ['HS256'] }), (req, res) => {

    // Validation
    const { errors, isValid } = validateTicketInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // TODO Check if User in assigned to project
    Project.findById(req.body.projectId).then(project => {
        
        if (!project) return res.status(400).json({ msg: "No project with that id" });

        if (!project.usersList.includes(req.body.owner)) return res.status(400).json({ msg: "You are not assigned to that project" });
        
    });

    // TODO Check if dev is an actual developer
    // TODO Check if ticket with same text exists

    const newTicket = new Ticket(req.body);

    newTicket.save().then(ticket => {

        const properties = {
            userId: req.body.owner,
            ticketText: ticket.text
        }

        const newChange = new Change({
            message: "created a ticket ",
            type: "TICKET_CREATED",
            properties: JSON.stringify(properties)
        });

        newChange.save().then(change => { }).catch(err => console.log(err));

        return res.json(ticket);

    }).catch(err => {

        return res.status(500).json(err);

    });

});

module.exports = router;