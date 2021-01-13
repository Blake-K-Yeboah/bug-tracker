// Required Packages
const express = require('express');

// Define Router
const router = express.Router();

// Import Change Model
const Change = require('../../models/change.model');

// @route GET api/changes
// @desc Get all changes
// @access Public
router.get('/', async (req, res) => {
    
    try {

        const changes = await Change.find();

        res.json(changes.reverse());

    } catch (err) {

        console.error(err.message);

        return res.status(500).json({ msg: "Server Error" });

    }
});

module.exports = router;
