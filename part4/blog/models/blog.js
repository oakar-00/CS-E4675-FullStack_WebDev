const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
	url: String,
	title: String,
	author: String,
	user: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	likes: { type: Number, default: 0 },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
