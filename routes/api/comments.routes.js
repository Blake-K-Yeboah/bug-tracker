// Required Packages
const express = require('express');
const jwt = require('express-jwt');
const keys = require("../../config/keys");

// Define Router
const router = express.Router();

// Import Comment Model
const Comment = require("../../models/comment.model");

// Import Change Model
const Change = require('../../models/change.model');
const validateCommentInput = require('../../validation/comment');

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

router.post('/create',  jwt({ secret: keys.secretOrKey, algorithms: ['HS256'] }), (req, res) => {

    // Validation
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const forProperty = { type: req.body.type, typeId: req.body.typeId }; // e,g type: project typeId: Project ID

    const newComment = new Comment({
        text: req.body.text,
        user: req.body.userId,
        for: JSON.stringify(forProperty)
    });

    newComment.save().then(comment => {

        // Create Change
        
        const properties = {
            userId: comment.user,
            type: JSON.parse(comment.for).type
        };

        const newChange = new Change({
            message: "posted a comment on a ",
            type: "COMMENT_ADDED",
            properties: JSON.stringify(properties)
        });
        
        newChange.save().then(change => {  }).catch(err => console.log(err));

        return res.json(comment);

    }).catch(err => {

        console.throw(err);
        return res.status(500).json({ msg: "There was an error" });

    });

});

router.delete('/:id', jwt({ secret: keys.secretOrKey, algorithms: ['HS256'] }), (req, res) => {

    const commentId = req.params.id;

    Comment.findByIdAndDelete(commentId, (err, doc) => {

        if (err) { 

            return res.send(500, err);
            
        } else {

            const properties = {
                userId: req.body.userId,
                postedBy: doc.user
            }

            const newChange = new Change ({
                message: "deleted a comment posted by ",
                type: "COMMENT_DELETED",
                properties: JSON.stringify(properties)
            });

            
            newChange.save().then(change => {  }).catch(err => console.log(err));

            return res.json(doc);
        }

    });

});

module.exports = router;