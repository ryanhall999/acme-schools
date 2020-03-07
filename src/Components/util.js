function sortById(movies) {
	return movies.sort((a, b) => (a.userrating < b.userrating ? 1 : -1));
}

function avgRating(movies) {
	let count = 0;
	movies.forEach(movie => {
		count = count + movie.userrating;
	});
	count = count / movies.length;
	count = count.toFixed(2);
	return count;
}

function avgIMBDRating(movies) {
	let count = 0;
	movies.forEach(movie => {
		count = count + movie.voteavg;
	});
	count = count / movies.length;
	count = count.toFixed(2);
	return count;
}

export { sortById, avgRating, avgIMBDRating };
