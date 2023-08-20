// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String },
		phone: { type: Number, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		country: { type: String, required: true },
		createdAt: { type: Date, default: Date.now },
	},
	{
		toJSON: {
			transform: function (doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
