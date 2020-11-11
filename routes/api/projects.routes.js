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

                newChange.save().then(change => { console.log(change) }).catch(err => console.log(err));

                return res.json(project);

            })
        }
    });

});

module.exports = router;