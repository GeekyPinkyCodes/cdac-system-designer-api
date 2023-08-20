// routes/projects.js
const express = require("express");
const router = express.Router();
const Project = require("../models/project");

// Create a new project
router.post("/", async (req, res) => {
	try {
		const { name, fileName } = req.body;

		const project = new Project({
			name,
			fileName,
		});
		await project.save();
		res.status(201).json(project);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// Get  projects
router.get("/:projectId", async (req, res) => {
	try {
		const { projectId } = req.params;
		const projects = await Project.findById(projectId);
		res.json(projects);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// Get all projects
router.get("/", async (req, res) => {
	try {
		console.log("Get all projects");
		const projects = await Project.find();
		res.json(projects);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// delete a project
router.delete("/:projectId", async (req, res) => {
	try {
		const { projectId } = req.params;
		const deletedProject = await Project.findByIdAndDelete(projectId);
		if (deletedProject) {
			res.status(204).end();
		} else {
			res.status(404).json({ error: "Project is not present" });
		}
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// update a project
router.patch("/:projectId", async (req, res) => {
	try {
		const { projectId } = req.params;
		const { name, fileName } = req.body;

		if (name == null || fileName == null) {
			res.status(400).json({ error: "Bad request" });
		}

		const updateProject = await Project.findByIdAndUpdate(projectId, {
			name: name,
			fileName: fileName,
		});
		if (updateProject) {
			res.status(204).end();
		} else {
			res.status(404).json({ error: "Project is not present" });
		}
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

module.exports = router;
