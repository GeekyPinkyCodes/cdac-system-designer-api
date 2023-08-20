const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Create a new user
router.post("/", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({
			email: email,
			password: password,
		});

		if (user) {
			res.status(200).json(user);
		} else {
			res.status(401).json({
				error: "Invalid Email or Password",
			});
		}
	} catch (error) {
		res.status(500).json({ error: error });
	}
});



module.exports = router;
