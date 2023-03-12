const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

let token;

beforeEach(async () => {
	await Blog.deleteMany({});
	await User.deleteMany({});

	const passwordHash = await bcrypt.hash("pass123", 15);
	const new_user = {
		username: "hello",
		name: "hello",
		passwordHash,
	};
	const user = new User(new_user);
	const savedUser = await user.save();
	const userForToken = {
		username: savedUser.username,
		id: savedUser._id,
	};
	token = jwt.sign(userForToken, config.SECRET);

	for (let blog of helper.initialBlogs) {
		blog.creator = savedUser._id;
		let blogObject = new Blog(blog);
		await blogObject.save();
	}
});

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
}, 100000);

test("all blogs are returned", async () => {
	const response = await api.get("/api/blogs");
	expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("blogs have id", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/)
		.then((response) => {
			response.body.map((blog) => expect(blog._id).toBeDefined());
		});
}, 100000);

test("a blog post can be added", async () => {
	const newBlog = {
		title: "How to post a blog",
		author: "Jim",
		url: "https://google.com/",
		likes: 2,
	};
	await api
		.post("/api/blogs")
		.set("Authorization", `Bearer ${token}`)
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
	const contents = blogsAtEnd.map((blog) => blog.title);
	expect(contents).toContain("How to post a blog");
});

describe("Posting Blogs Tests", () => {
	const newBlog = {
		title: "How to post a blog",
		author: "Jim",
		url: "https://google.com/",
		likes: 2,
	};
	const zeroLikes = {
		title: "Posting without Likes",
		author: "Jim",
		url: "https://youtube.com/",
	};
	const noTitle = {
		author: "Jim",
		url: "https://youtube.com/",
	};
	const noURL = {
		title: "Posting without Likes",
		author: "Jim",
	};

	test("a blog post can be added", async () => {
		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${token}`)
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
		const contents = blogsAtEnd.map((blog) => blog.title);
		expect(contents).toContain("How to post a blog");
	});

	test("blogs have default ZERO likes", async () => {
		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${token}`)
			.send(zeroLikes)
			.expect(201)
			.expect("Content-Type", /application\/json/)
			.then((response) => {
				expect(response.body.likes).toBeDefined();
				expect(response.body.likes).toBe(0);
			});
	}, 100000);

	test("no title returns 400", async () => {
		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${token}`)
			.send(noTitle)
			.expect(400);
		const end = await helper.blogsInDb();
		expect(end).toHaveLength(helper.initialBlogs.length);
	});
	test("no URL returns 400", async () => {
		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${token}`)
			.send(noURL)
			.expect(400);
		const end = await helper.blogsInDb();
		expect(end).toHaveLength(helper.initialBlogs.length);
	});
	test("no token returns 401", async () => {
		await api.post("/api/blogs").send(newBlog).expect(401);
		const end = await helper.blogsInDb();
		expect(end).toHaveLength(helper.initialBlogs.length);
	});
});

test("fails deleting random entry", async () => {
	const blogsAtStart = await helper.blogsInDb();
	const blogToDelete = blogsAtStart[0];

	await api
		.delete(`/api/blogs/${blogToDelete._id}`)
		.set("Authorization", `Bearer ${token}`)
		.expect(401);
	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	const contents = blogsAtEnd.map((blog) => blog.title);

	expect(contents).toContain(blogToDelete.title);
});

test("successfully deleting entry from same user", async () => {
	const newBlog = {
		title: "How to post a blog",
		author: "Jim",
		url: "https://google.com/",
		likes: 2,
	};
	await api
		.post("/api/blogs")
		.set("Authorization", `Bearer ${token}`)
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const blogsAtMid = await helper.blogsInDb();
	const ids = blogsAtMid.map((blog) => blog._id);
	const blog_id = ids[ids.length - 1];

	await api
		.delete(`/api/blogs/${blog_id}`)
		.set("Authorization", `Bearer ${token}`)
		.expect(204);
	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	const contents = blogsAtEnd.map((blog) => blog._id);

	expect(contents).not.toContain(blog_id);
});

test("updating", async () => {
	const newLikes = {
		likes: 123,
	};

	const blogsAtStart = await helper.blogsInDb();
	const blogToUpdate = blogsAtStart[0];

	await api.put(`/api/blogs/${blogToUpdate._id}`).send(newLikes).expect(200);

	const blogsAtEnd = await helper.blogsInDb();
	const likes = blogsAtEnd.map((blog) => blog.likes);

	expect(likes).toContain(123);
});

afterAll(async () => {
	await mongoose.connection.close();
});
