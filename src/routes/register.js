const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Register a new user
router.post("/", async (req, res) => {
	try {
		const { firstName, lastName, email, password, phone, country } = req.body;

		// Check if the email is already registered
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({
				error: "Email already registered",
			});
		}

		// Create a new user
		const newUser = new User({
			firstName,
			lastName,
			email,
			password,
			phone,
			country,
		});

		await newUser.save();

		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
