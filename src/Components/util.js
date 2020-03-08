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

function formatDate(date) {
	var d = new Date(date),
		month = "" + (d.getMonth() + 1),
		day = "" + d.getDate(),
		year = d.getFullYear();
	if (month.length < 2) month = "0" + month;
	if (day.length < 2) day = "0" + day;
	return [year, month, day].join("-");
}

export { sortById, avgRating, avgIMBDRating, formatDate };
