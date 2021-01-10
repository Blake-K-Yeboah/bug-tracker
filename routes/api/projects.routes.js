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

router.get('/:id?', jwt({ secret: keys.secretOrKey, algorithms: ['HS256'] }), (req, res) => {
    
    let id = req.params.id;

    if (id) {

        // Return Individual project if there is an id
        Project.findById(id).then(project => {

            // If there is no project return error
            if (!project) return res.status(400).json({ error: "Project Does Not Exist" });

            return res.json(project);

        });

    } else {

        // Return all projects
        Project.find({}).then(projects => {
            return res.json(projects);
        });

    }

});

router.post('/create', jwt({ secret: keys.secretOrKey, algorithms: ['HS256'] }), (req, res) => {

    // Validation
    const { errors, isValid } = validateProjectInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Project.findOne({ name: req.body.name }).then(project => {

        // Check if project exists with same name
        if (project) {
            res.status(400).json({ name: 'Project with same name exists.'});
        } else {

            // Check owner is admin or project
            User.findById(req.body.owner).then(user => {
                if (!user) {
                    return res.status(400).json({ owner: "No user with that ID." });
                } else if (user.role != "admin" && user.role != 'project-manager') {
                    return res.status(401).json({ owner: "You dont have permission." });
                }
            });

            // Create New Project Model
            const newProject = new Project({
                name: req.body.name,
                description: req.body.description,
                owner: req.body.owner
            });

            newProject.save().then(project => {
                const properties = {
                    userId: project.owner,
                    projectName: project.name
                }

                const newChange = new Change({
                    message: "created a project called ",
                    type: "PROJECT_CREATED",
                    properties: JSON.stringify(properties)
                });

                newChange.save().then(change => {  }).catch(err => console.log(err));

                return res.json(project);

            })
        }
    });

});

router.delete('/:id', jwt({ secret: keys.secretOrKey, algorithms: ['HS256'] }), (req, res) => {

    const projectId = req.params.id;

    Project.findByIdAndDelete(projectId, (err, doc) => {

        if (err) { 

            return res.send(500, err);
            
        } else {

            const properties = {
                userId: doc.owner,
                projectName: doc.name
            }

            const newChange = new Change({
                message: "project called ",
                type: "PROJECT_DELETED",
                properties: JSON.stringify(properties)
            });

            newChange.save().then(change => {  }).catch(err => console.log(err));

            return res.json(doc);
        }

    });

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