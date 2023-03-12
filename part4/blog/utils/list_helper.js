const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	let total = 0;
	blogs.map((blog) => {
		total += blog.likes;
	});
	return total;
};

const mostBlogs = (blogs) => {
	const dd = {};
	blogs.map((blog) => {
		const author = blog.author;
		if (!dd[author]) {
			dd[author] = 1;
		} else {
			dd[author] += 1;
		}
	});
	let maxKey = null;
	let maxValue = 0;
	for (const [key, value] of Object.entries(dd)) {
		if (value > maxValue) {
			maxValue = value;
			maxKey = key;
		}
	}
	return { author: maxKey, blogs: maxValue };
};

const mostLikes = (blogs) => {
	const dd = {};
	blogs.map((blog) => {
		const author = blog.author;
		if (!dd[author]) {
			dd[author] = blog.likes;
		} else {
			dd[author] += blog.likes;
		}
	});
	let maxKey = null;
	let maxValue = 0;
	for (const [key, value] of Object.entries(dd)) {
		if (value > maxValue) {
			maxValue = value;
			maxKey = key;
		}
	}
	return { author: maxKey, likes: maxValue };
};

module.exports = {
	dummy,
	totalLikes,
	mostBlogs,
	mostLikes,
};
