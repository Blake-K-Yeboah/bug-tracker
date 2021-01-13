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

// checkObjectId middleware
const checkObjectId = require('../../middleware/checkObjectId');

// Import Validation Function
const validateCommentInput = require('../../validation/comment');

// JWT authentication middleware
router.use(jwt({ secret: keys.secretOrKey, algorithms: ['HS256'] }));

// @route GET api/comments
// @desc Get all comments
// @access Private
router.get('/', async (req, res) => {

    try {

        const comments = await Comment.find();

        res.json(comments);

    } catch (err) {

        console.error(err.message);

        res.status(500).json({ msg: "Server error" });

    }

});

// @route GET api/comments/:id
// @desc Get comment by id
// @access Private
router.get('/:id', checkObjectId('id'), async (req, res) => {

    try {

        const comment = await Comment.findById(req.params.id);

        if (!comment) return res.status(404).json({ msg: "Comment not found" });

        res.json(comment);

    } catch (err) {

        console.error(err.message);

        res.status(500).json({ msg: "Server error" });

    }

});

// @route POST api/comments/create
// @desc Post a new comment
// @access Private
router.post('/create',  async (req, res) => {

    // Validation
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newComment = new Comment({
        text: req.body.text,
        user: req.body.userId,
        for: JSON.stringify({ type: req.body.type, typeId: req.body.typeId })
    });

    const comment = await newComment.save();

    const newChange = new Change({
        message: "posted a comment on a ",
        type: "COMMENT_ADDED",
        properties: JSON.stringify({ userId: comment.user, type: JSON.parse(comment.for).type })
    });

    const change = await newChange.save();

    res.json(comment);
    
});

router.delete('/:id', jwt({ secret: keys.secretOrKey, algorithms: ['HS256'] }), (req, res) => {

    const commentId = req.params.id;

    Comment.findByIdAndDelete(commentId, (err, doc) => {

        if (err) { 

            return res.send(500, err);
            
        } else {

            console.log(doc);

            const properties = {
                userId: req.body.userId,
                type: JSON.parse(doc.for).type
            }

            const newChange = new Change ({
                message: "deleted a comment on a ",
                type: "COMMENT_DELETED",
                properties: JSON.stringify(properties)
            });

            
            newChange.save().then(change => {  }).catch(err => console.log(err));

            return res.json(doc);
        }

    });

});

module.exports = router;