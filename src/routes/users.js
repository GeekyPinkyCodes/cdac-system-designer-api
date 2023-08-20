// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Create a new user
router.post("/", async (req, res) => {
	try {
		const { firstName, lastName, phone, email, password, country } = req.body;
		const user = new User({
			firstName,
			lastName,
			phone,
			email,
			password,
			country,
		});
		await user.save();
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// Get a user by id
router.get("/:userId", async (req, res) => {
	try {
		console.log("Get a user by Id");
		const { userId } = req.params;
		const user = await User.findById(userId);
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ error: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// Get a user by email
router.get("/getByEmail/:email", async (req, res) => {
	try {
		console.log("Get a user by Email");
		const { email } = req.params;
		const user = await User.findOne({ email: email });
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ error: "Invalid Email: " + email });
		}
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// Get all users
router.get("/", async (req, res) => {
	try {
		console.log("Get all users");
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// delete a user
router.delete("/:userId", async (req, res) => {
	try {
		const { userId } = req.params;
		const deletedUser = await User.findByIdAndDelete(userId);
		if (deletedUser) {
			res.status(204).end();
		} else {
			res.status(404).json({ error: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// update a user
router.patch("/:userId", async (req, res) => {
	try {
		const { userId } = req.params;
		const { firstName, lastName, phone, email, password, country } = req.body;

		if (
			firstName == null ||
			lastName == null ||
			phone == null ||
			email == null ||
			password == null ||
			country == null
		) {
			res.status(400).json({ error: "Bad request" });
		}

		const updateUser = await User.findByIdAndUpdate(userId, {
			firstName: firstName,
			lastName: lastName,
			phone: phone,
			email: email,
			password: password,
			country: country,
		});
		if (updateUser) {
			res.status(204).end();
		} else {
			res.status(404).json({ error: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

module.exports = router;
