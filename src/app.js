// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// require("dotenv").config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

// Connect to MongoDB
mongoose
	.connect("mongodb://127.0.0.1:27017/SystemDesigner", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error);
	});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
