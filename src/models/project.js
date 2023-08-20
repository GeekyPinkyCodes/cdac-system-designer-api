const { Description } = require("@material-ui/icons");
const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		fileName: { type: String, required: true, unique: true },
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
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
