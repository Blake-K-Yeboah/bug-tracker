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

// Import checkObjectId middleware
const checkObjectId = require('../../middleware/checkObjectId');

// @route GET api/users
// @desc Get all users
// @access Public
router.get('/', async (req, res) => {

    try {

        const users = await User.find({});

        res.json(users);

    } catch(err) {

        console.error(error.message);

        res.status(500).json({ msg: "Server error" });
    }
});

// @route GET api/users/:id
// @desc Get user by id
// @access Public
router.get('/:id', checkObjectId('id'), async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json(user);

    } catch (err) {

        console.error(error.message);

        res.status(500).json({ msg: "Server error" });

    }

});

// @route POST api/users/register
// @desc Register a new user
// @access Public
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

// @route POST api/users/login
// @desc Log User In
// @access Public
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

// @route PUT api/users/:id/update/role
// @desc Update users role
// @access Private
router.put('/:id/update/role', async (req, res) => {

    // Check user who submitted request is an admin or poject manager
    const reqUserId = req.body.userId;

    const user = await User.findById(reqUserId);

    if (user.role != 'admin' && user.role != 'project-manager') {
        return res.status(401).json({ msg: "You don't have permission. "});
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { role: req.body.role });

    const newChange = new Change({
        message: "changed role of ",
        type: "ROLE_CHANGED",
        properties: JSON.stringify({
            userId: reqUserId,
            changedUserId: user._id,
            newRole: req.body.role
        })
    });

    const change = await newChange.save();

    res.json(updatedUser);

});

// @route PUT api/users/:id/
// @desc Update users details
// @access Private
router.put('/:id', checkObjectId('id'), async (req, res) => {

    try {

        const updatedProperties = { [req.body.field]: req.body.value };

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedProperties);

        const newChange = new Change({
            message: "updated their profile",
            type: "UPDATED_PROFILE",
            properties: JSON.stringify({ userId: req.params.id})
        });

        const change = await newChange.save();

        res.json(updatedUser);

    } catch (err) {

        console.error(err.message);

        res.status(500).json({ msg: "Server error" });

    }

});

// @route PUT api/users/:id/profilepic
// @desc Upload Profile Pic
// @access Private
router.put('/:id/profilepic', checkObjectId('id'), async (req, res) => {

    // Validate Image
    if (!req.files) return res.status(400).json({ msg: "You must upload an image"});

    const file = req.files.file;

    const newFileName = `${req.params.id}.${file.name.split('.')[1]}`;

    // Upload file
    file.mv(`./client/public/uploads/profile/${newName}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server Error. Try Again Later' });
        }
    });

    try {

        const updatedUser = await User.findByIdAndUpdate(req.params.id, { profileIcon: newFileName });

        res.json(updatedUser);

    } catch (err) {

        console.error(err.message);

        res.status(500).json({ msg: "Server error" });

    }

});

module.exports = router;