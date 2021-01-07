// Required Packages
const express = require('express');
const jwt = require('express-jwt');
const keys = require("../../config/keys");

// Define Router
const router = express.Router();

// Import Comment Model
const Comment = require("../../models/comment.model");

router.get('/:id?', jwt({ secret: keys.secretOrKey, algorithms: ['HS256'] }), (req, res) => {

    // Define Id
    const id = req.params.id;

    if (id) {

        // Return Comment with specified id
        Comment.findById(id).then(comment => {
            
            if (!comment) return res.status(400).json({ msg: 'Comment doesn\'t exist'});

            return res.json(comment);

        });

    } else {

        // Return all comments
        Comment.find({}).then(comments => {
            return res.json(comments);
        });

    }

});

module.exports = router;