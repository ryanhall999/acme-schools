import React from "react";
import { sortById, formatDate } from "./util";

export default function({ movies, UserRating, updateRating, destroyMovie }) {
	movies = sortById(movies);
	let partMovies = [];
	for (let i = 0; i < 3; i++) {
		if (movies[i] !== undefined) {
			partMovies.push(movies[i]);
		}
	}
	return (
		<div>
			<h1 style={{ textDecoration: "underline", textAlign: "center" }}>
				Movie List
			</h1>
			{partMovies.map(movie => {
				let date = formatDate(movie.datewatched);
				return (
					<li
						className="film"
						key={movie.id}
						style={{
							backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.background})`
						}}
					>
						<img src={movie.poster} />
						<div className="filmInfo">
							Title: {movie.title}
							<br></br>
							Date Released: {movie.year}
							<br></br>
							Description: {movie.overview}
							<br></br>
							Date Watched: {date}
						</div>
						<div className="ratingInfo">
							IMBD User Rating: {movie.voteavg}
							<br></br>
							<UserRating movie={movie} updateRating={updateRating} />
							<br></br>
						</div>
						<button onClick={() => destroyMovie(movie)}>x</button>
					</li>
				);
			})}
		</div>
	);
}
