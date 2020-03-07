import React, { useEffect, useState } from "react";
import axios from "axios";
import InputForm from "./Components/InputForm";
import UserRating from "./Components/UserRating";
import MovieList from "./Components/MovieList";
import { FetchMovie } from "./Components/CreateMovie";
import { avgRating, avgIMBDRating } from "./Components/util";
import "./app.css";

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
		let movieToCreate = await FetchMovie(movie);
		await axios.post("/api/movies", movieToCreate).then(response => {
			let copy = [...movies];
			copy.push(response.data);
			setMovies(copy);
		});
	};

	const destroyMovie = async movieToDelete => {
		try {
			await axios.delete(`/api/movies/${movieToDelete.id}`);
			setMovies(movies.filter(movie => movie.id !== movieToDelete.id));
		} catch (ex) {
			console.log(ex.response.data.message);
		}
	};

	const updateRating = async (e, movieToUpdate) => {
		e.preventDefault();
		let rating = e.target.previousElementSibling.value;
		let id = movieToUpdate.id;
		try {
			axios.put(`/api/movies/`, { id, rating }).then(response => {
				let words = [...movies.filter(movie => movie.id !== id), response.data];
				setMovies(words);
			});
		} catch (ex) {
			console.log(ex.response.data.message);
		}
	};

	return (
		<div className="red">
			<div className="outerBox">
				<div className="stats">
					<div>Stats: Movies {movies.length}</div>
					<div>AVG IMBD Rating: {avgIMBDRating(movies)}</div>
					<div>AVG Rating: {avgRating(movies)}</div>
				</div>
				<div className="innerBox">
					<div className="listContainer">
						<div className="addMovie">
							<InputForm createMovie={createMovie} />
						</div>
						<div className="movieList">
							<MovieList
								movies={movies}
								UserRating={UserRating}
								updateRating={updateRating}
								destroyMovie={destroyMovie}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
//
