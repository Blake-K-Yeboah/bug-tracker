// Required Packages
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");

// Define Router
const router = express.Router();

// Validation Functions
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Import User Model
const User = require('../../models/user.model');

// Import Change Model
const Change = require('../../models/change.model');

// Default User Route
router.get('/:id?', (req, res) => {

    let id = req.params.id;

    if (id) {

        // Return Individual user if there is an id
        User.findById(id).then(user => {

            // If there is no user return error
            if (!user) return res.status(400).json({ error: "User Does Not Exist" });

            return res.json(user);

        });

    } else {

        // Return all users
        User.find({}).then(users => {
            return res.json(users);
        });

    }

});

// Register Route
router.post('/register', (req, res) => {

    // Validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {

        // Check if user exists
        if (user) {
            res.status(400).json({ email: 'Email Already Exists' });
        } else {
            // Create new user model
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash Password before saving in db
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;

                    // Change users password to hashed password
                    newUser.password = hash;

                    // Save New User to database
                    newUser.save().then(user => {
                        const properties = {
                            userId: user._id
                        }

                        const newChange = new Change({
                            message: "created an account.",
                            type: "ACCOUNT_CREATED",
                            properties: JSON.stringify(properties)
                        });

                        newChange.save().then(change => { console.log(change) }).catch(err => console.log(err));

                        return res.json(user);
                    }).catch(err => console.log(err));


                })
            })
        }
    })
});

// Login Route
router.post('/login', (req, res) => {

    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Store email and password from request
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {

        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched

                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    bio: user.bio,
                    email: user.email,
                    role: user.role,
                    createdOn: user.createdOn,
                    profileIcon: user.profileIcon
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ password: "Password incorrect" });
            }
        });
    });
});

// Update Role Route
router.put('/:id/update/role', (req, res) => {

    // Check user who submitted request is an admin or poject manager
    const reqUserId = req.body.userId;

    User.findById(reqUserId).then(user => {

        // If there is no user return error
        if (!user || (user.role != 'admin' && user.role != 'project-manager')) return res.status(401).json({ msg: "You dont have permission" });

    });

    User.findByIdAndUpdate(req.params.id, { role: req.body.role }).then((user) => {
        const properties = {
            userId: reqUserId,
            changedUserId: user._id,
            newRole: req.body.role
        }

        const newChange = new Change({
            message: "changed role of ",
            type: "ROLE_CHANGED",
            properties: JSON.stringify(properties)
        });

        newChange.save().then(change => { console.log(change) }).catch(err => console.log(err));

        return res.json(user);

    }).catch(err => {

        if (err) {
            console.log(err);
            res.status(500).json({ msg: "A server errror occured."})
        }
        
    });


})

module.exports = router;