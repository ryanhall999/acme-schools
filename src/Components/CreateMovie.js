import React, { useEffect, useState } from "react";
import axios from "axios";

const APIKey = "4b18b9498fd390e01136b15ad2559940";

async function FetchMovie(movie) {
	try {
		const basicInfo = await axios({
			method: "GET",
			url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
			headers: {
				"content-type": "application/octet-stream",
				"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
				"x-rapidapi-key": "65dc49f6eamsh84846df4dd813c2p1231afjsnced63f581170"
			},
			params: {
				r: "json",
				s: `${movie}`
			}
		});
		const advancedInfo = await axios.get(
			`https://api.themoviedb.org/3/find/${basicInfo.data.Search[0].imdbID}?api_key=${APIKey}&language=en-US&external_source=imdb_id`
		);
		let movieToCreate = await advancedInfo.data.movie_results[0];
		movieToCreate.poster = await basicInfo.data.Search[0].Poster;
		return movieToCreate;
	} catch (err) {
		console.error(err);
	}
}

export { FetchMovie };
