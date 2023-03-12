const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

describe("total likes", () => {
	const listWithOneBlog = [
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0,
		},
	];
	const listWithMoreBlogs = [
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0,
		},
		{
			_id: "9h422aa71b54a676234d17f8",
			title: "Among US",
			author: "Sus",
			url: "https://i.ytimg.com/vi/35b2CgIH2Rs/maxresdefault.jpg",
			likes: 17,
			__v: 0,
		},
		{
			_id: "5a422aa71b59a676234d17f8",
			title: "Juan",
			author: "Juan",
			url: "https://knowyourmeme.com/memes/juan-horse-on-balcony",
			likes: 13,
			__v: 0,
		},
	];

	test("of empty list is zero", () => {
		const result = listHelper.totalLikes([]);
		expect(result).toBe(0);
	});

	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	});
	test("of a bigger list is calculated right", () => {
		const result = listHelper.totalLikes(listWithMoreBlogs);
		expect(result).toBe(35);
	});
});
