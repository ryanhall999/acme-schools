import React from "react";
import { sortById } from "./util";

export default function({ movies, UserRating, updateRating, destroyMovie }) {
	console.log(movies);
	movies = sortById(movies);
	console.log(movies);
	return (
		<div>
			<h1>Movie List</h1>
			{movies.map(movie => {
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
							{movie.title}
							<br></br>
							{movie.year}
							<br></br>
							{movie.overview}
							<br></br>
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
