// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// require("dotenv").config();

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const projectsRouter = require("./routes/projects");

app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/projects", projectsRouter);

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
