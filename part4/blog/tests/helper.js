const Blog = require("../models/blog");

const initialBlogs = [
	{
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
	},
	{
		title: "How to code 101",
		author: "Steve",
		url: "https://stackoverflow.com/",
		likes: 7,
	},
];

const nonExistingId = async () => {
	const blog = new Blog({
		title: "willremovethissoon",
		author: "jest",
		url: null,
		likes: 4,
	});
	await blog.save();
	await blog.remove();

	return blog._id.toString();
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb,
	usersInDb,
};
