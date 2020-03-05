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
		let movieToCreate;
		let poster;
		await axios({
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
		})
			.then(response => {
				movieToCreate = response.data.Search[0];
			})
			.catch(error => {
				console.log(error);
			});
		const created = (await axios.post("/api/movies", movieToCreate)).data;
		setMovies(created);
	};

	const destroyMovie = async movieToDelete => {
		try {
			await axios.delete(`/api/movies/${movieToDelete.id}`);
			setMovies(movies.filter(movie => movie.id !== movieToDelete.id));
		} catch (ex) {
			console.log(ex.response.data.message);
		}
	};
	console.log(movies);

	return (
		<div>
			<div className="stats">Stats</div>
			<div className="listContainer">
				<div className="addMovie">
					<InputForm createMovie={createMovie} />
				</div>
				<div className="movieList">
					<h1>Movie List</h1>
					{movies.map(movie => {
						return (
							<li key={movie.id}>
								{movie.title}
								{movie.year}
								<br></br>
								<img src={movie.poster} />
								<button onClick={() => destroyMovie(movie)}>x</button>
							</li>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default App;
//
