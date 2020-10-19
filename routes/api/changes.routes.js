// Required Packages
const express = require('express');

// Define Router
const router = express.Router();

// Import Change Model
const Change = require('../../models/change.model');

// Return all changes
router.get('/', (req, res) => {
    Change.find({}).then(changes => {
        return res.json(changes);
    });
});

module.exports = router;
