import React, { useEffect, useState } from "react";
import axios from "axios";
import InputForm from "./Components/InputForm";

function App() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		Promise.all([axios.get("/api/movies")])
			.then(responses => responses.map(response => response.data))
			.then(results => {
				setMovies(results[0]);
			})
			.catch(ex => console.log(ex.response.data.message));
	}, []);

	const createMovie = async e => {
		e.preventDefault();
		let movie = e.target[0].value;
		let preResponse;
		await axios({
			method: "GET",
			url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
			headers: {
				"content-type": "application/octet-stream",
				"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
				"x-rapidapi-key": "65dc49f6eamsh84846df4dd813c2p1231afjsnced63f581170"
			},
			params: {
				page: "1",
				r: "json",
				s: `${movie}`
			}
		})
			.then(response => {
				preResponse = response.data.Search[0];
			})
			.catch(error => {
				console.log(error);
			});
		const created = (await axios.post("/api/moives", preResponse)).data;
		console.log(created);
	};
	console.log(movies);
	return (
		<div>
			<div className="stats">Stats</div>
			<div className="listContainer">
				<div className="addMovie"></div>
				<InputForm createMovie={createMovie} />
				<div className="movieList">Movie List</div>
			</div>
		</div>
	);
}

export default App;
//
