const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.startsWith("Bearer ")) {
		return authorization.replace("Bearer ", "");
	}
	return null;
};

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", {
		username: 1,
		name: 1,
		id: 1,
	});
	response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
	const token = request.token;

	if (!token) {
		return response.status(401).json({ error: "Wrong identifier" });
	}

	if (!request.body.title || !request.body.url) {
		response.status(400).json("title or url missing");
	} else {
		const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
		if (!decodedToken.id) {
			return response.status(401).json({ error: "token invalid" });
		}
		const user = await User.findById(decodedToken.id);
		// const user = await User.findById(request.body.userId);
		const blog = new Blog({
			url: request.body.url,
			title: request.body.title,
			author: request.body.author,
			likes: request.body.likes,
			user: user._id,
		});

		const result = await blog.save();
		user.blogs = user.blogs.concat(blog._id);
		await user.save();
		response.status(201).json(result);
	}
});

blogsRouter.delete("/:id", async (request, response) => {
	const token = request.token;
	const decodedToken = jwt.verify(token, process.env.SECRET);

	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" });
	}

	const blogID = request.params.id;
	const blog = await Blog.findById(blogID);
	if (blog.user.toString() === decodedToken.id) {
		await Blog.findByIdAndRemove(blogID);
		response.status(204).end();
	} else {
		response.status(401).json({
			error: "You are not authorized",
		});
	}
});

blogsRouter.put("/:id", async (request, response) => {
	const body = request.body;
	const blog = {
		likes: body.likes,
	};

	const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
	});
	response.json(result);
});

module.exports = blogsRouter;
