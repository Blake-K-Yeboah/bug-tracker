// Required Packages
const express = require('express');

// Define Router
const router = express.Router();

router.get('/:id?', (req, res) => {
    return res.send("Projects");
});

module.exports = router;