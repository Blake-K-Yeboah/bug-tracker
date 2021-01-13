// Required Packages
const express = require('express');
const jwt = require('express-jwt');
const keys = require("../../config/keys");

// Define Router
const router = express.Router();

// Validation Functions
const validateProjectInput = require("../../validation/project");

// Import Project Model
const Project = require("../../models/project.model");

// Import Change Model
const Change = require('../../models/change.model');

// Import User Model
const User = require('../../models/user.model');

// Import checkObJectId middleware
const checkObjectId = require('../../middleware/checkObjectId');

// JWT Authentication Middleware
router.use(jwt({ secret: keys.secretOrKey, algorithms: ['HS256'] }));

// @route GET api/projects
// @desc Get all projects
// @access Private
router.get('/', async (req, res) => {

    try {

        const projects = await Project.find();

        res.json(projects);

    } catch (err) {

        console.error(err.message);

        res.status(500).json({ msg: "Server error" });

    }

});

// @route GET api/projects/:id
// @desc Get project by id
// @access Private
router.get('/:id', checkObjectId('id'), async (req, res) => {
    
    try {

        const project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ msg: "Project not found" });

        res.json(project);

    } catch (err) {

        console.error(err.message);

        res.status(500).json({ msg: "Server error" });

    }

});

// @route POST api/projects/create
// @desc Create a project
// @access Private
router.post('/create', async (req, res) => {

    // Validation
    const { errors, isValid } = validateProjectInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Check if project exists with same name
    const sameNameProject = await Project.findOne({ name: req.body.name });

    if (sameNameProject) return res.status(400).json({ name: 'Project with same name exists. ' });

    // Check owner is an admin or a project manager
    const owner = await User.findById(req.body.owner);

    if (!owner) return res.status(404).json({ owner: "No user with that ID." });

    if (owner.role != "admin" && owner.role != "project-manager") return res.status(401).json({ owner: "You dont have permission." });

    // Create new project
    const newProject = new Project(req.body);

    const project = await newProject.save();

    const newChange = new Change({
        message: "created a project called ",
        type: "PROJECT_CREATED",
        properties: JSON.stringify({ userId: project.owner, projectName: project.name })
    });

    const change = await newChange.save();

    res.json(project);

});

// @route DELETE api/projects/:id
// @desc Delete a project
// @access Private
router.delete('/:id', checkObjectId('id'), async (req, res) => {

    try {

        const deletedProject = await Project.findByIdAndDelete(req.params.id);

        const newChange = new Change({
            message: "project called ",
            type: "PROJECT_DELETED",
            properties: JSON.stringify({ userId: doc.owner, projectName: doc.name })
        });

        const change = await newChange.save();

        res.json(deletedProject);

    } catch (err) {

        console.error(err.message);

        res.status(500).json({ msg: "Server error" });

    }

});

router.put('/:id/adduser', jwt({ secret: keys.secretOrKey, algorithms: ['HS256'] }), (req, res) => {

    const projectId = req.params.id;
    const addedUserId = req.body.addedUserId;
    const userMakingRequest = req.body.userId;

    // Check if user is admin or project manager
    User.findById(userMakingRequest).then(user => {

        if (!user) {
            return res.status(400).json({ owner: "No user with that ID." });
        } else if (user.role != "admin" && user.role != 'project-manager') {
            return res.status(401).json({ owner: "You dont have permission." });
        }

    });

    // Add User to Project
    Project.findByIdAndUpdate(projectId, { $push: { usersList: addedUserId }}, (err, doc) => {

        if (err) return res.send(500, err);

        // Save Change
        const properties = {
            userId: userMakingRequest,
            projectName: doc.name,
            changedUserId: addedUserId
        }

        const newChange = new Change({
            message: "added ",
            type: "NEW_USER_TO_PROJECT",
            properties: JSON.stringify(properties)
        });

        newChange.save().then(change => {  }).catch(err => console.log(err));

        res.json(doc);

    });

});

router.put('/:id/removeuser', jwt({ secret: keys.secretOrKey, algorithms: ['HS256'] }), (req, res) => {

    const projectId = req.params.id;
    const removedUserId = req.body.removedUserId;
    const userMakingRequest = req.body.userId;

    // Check if user is admin or project manager
    User.findById(userMakingRequest).then(user => {

        if (!user) {
            return res.status(400).json({ owner: "No user with that ID." });
        } else if (user.role != "admin" && user.role != 'project-manager') {
            return res.status(401).json({ owner: "You dont have permission." });
        }

    });

    // Remove User from Project
    Project.findByIdAndUpdate(projectId, { $pull: { usersList: removedUserId }}, (err, doc) => {
        
        if (err) return res.send(500, err);
        
         // Save Change
         const properties = {
            userId: userMakingRequest,
            projectName: doc.name,
            changedUserId: removedUserId
        }

        const newChange = new Change({
            message: "removed ",
            type: "REMOVE_USER_FROM_PROJECT",
            properties: JSON.stringify(properties)
        });

        newChange.save().then(change => {  }).catch(err => console.log(err));

        res.json(doc);

    });

});

module.exports = router;