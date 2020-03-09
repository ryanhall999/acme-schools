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

function countDays(movies) {
	let dateObj = {
		0: 0,
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0
	};
	if (movies[0]) {
		movies.forEach(movie => {
			let day = new Date(movie.datewatched);
			let date = day.getDay();
			dateObj[`${date}`] += 1;
		});
	}
	return dateObj;
}

function getToday() {
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, "0");
	var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
	var yyyy = today.getFullYear();
	today = yyyy + "-" + mm + "-" + dd;
	return today;
}

export { sortById, avgRating, avgIMBDRating, formatDate, countDays, getToday };
