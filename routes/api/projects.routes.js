// Required Packages
const express = require('express');

// Define Router
const router = express.Router();

// Import Project Model
const Project = require("../../models/project.model");

router.get('/:id?', (req, res) => {
    
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

module.exports = router;