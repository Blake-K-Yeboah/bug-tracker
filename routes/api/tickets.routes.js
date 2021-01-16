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

// Import User Model
const User = require("../../models/user.model");

// Import Change Model
const Change = require('../../models/change.model');

// Import Validation Function
const validateTicketInput = require('../../validation/ticket');

// Import CheckObjectID middleware
const checkObjectId = require('../../middleware/checkObjectId');

// Use JWT Authentication Middleware
router.use(jwt({ secret: keys.secretOrKey, algorithms: ['HS256'] }));

// @route GET api/tickets
// @desc Get all tickets
// @access Private
router.get('/', async (req, res) => {
        
    try {

        const tickets = await Ticket.find().sort({ createdOn: -1 });

        res.json(tickets);

    } catch (err) {

        console.error(err.message);
        
        res.status(500).json({ msg: "Server Error" });

    }

});

// @route GET api/tickets/:id
// @desc Get ticket by ID
// @access Private
router.get('/:id', checkObjectId('id'), async (req, res) => {
    
    try {

        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({ msg: "Ticket not found" })
        }

        res.json(ticket);

    } catch(err) {

        console.error(err.message);
        
        res.status(500).json({ msg: "Server Error" });

    }

});

// @route POST api/tickets/create
// @desc Create a ticket
// @access Private
router.post('/create', async (req, res) => {
    
    // Validation
    const { errors, isValid } = validateTicketInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    // Check if owner is assigned to Project
    const project = await Project.findById(req.body.projectId, 'usersList owner');
    
    if (!project) {

        return res.status(404).json({ msg: "No project with that ID" });

    }

    if (!project.usersList.includes(req.body.owner) && project.owner !== req.body.owner) {

        return res.status(400).json({ msg: "User is not assigned to that project" });

    }
 
    // Check if developer is actual developer
    const user = await User.findById(req.body.dev, 'role');

    if (!user) {
        
        return res.status(404).json({ msg: "No developer with that ID" });

    }

    if (user.role !== 'developer') {

        return res.status(400).json({ msg: "Developer requested doesn't have role of dev" });

    }

    try {

        const newTicket = new Ticket(req.body);

        const savedTicket = await newTicket.save();

        const newChange = new Change({
            message: 'created a ticket ',
            type: 'TICKET_CREATED',
            properties: JSON.stringify({ userId: savedTicket.owner, ticketText: savedTicket.text })    
        });

        const change = await newChange.save();

        res.json(savedTicket);

    } catch (err) {

        console.error(err.message);
        
        res.status(500).json({ msg: "Server Error" });

    }

});

module.exports = router;