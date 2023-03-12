const listHelper = require("../utils/list_helper");

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
			author: "John Cena",
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
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "5 Lifehacks that will change your life",
			author: "John Cena",
			url: null,
			likes: 13,
			__v: 0,
		},
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "How to make people not see you",
			author: "John Cena",
			url: null,
			likes: 38,
			__v: 0,
		},
	];

	test("of empty list is zero", () => {
		const result = listHelper.mostBlogs([]);
		expect(result).toEqual({ author: null, blogs: 0 });
	});

	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.mostBlogs(listWithOneBlog);
		expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 1 });
	});
	test("of a bigger list is calculated right", () => {
		const result = listHelper.mostBlogs(listWithMoreBlogs);
		expect(result).toEqual({ author: "John Cena", blogs: 3 });
	});
});
