import React from "react";
import { sortById, formatDate } from "./util";
import Stats from "./Stats";

export default function({ movies, UserRating, updateRating, destroyMovie }) {
	movies = sortById(movies);
	return (
		<div>
			<div>
				<Stats movies={movies} />
			</div>
			<div>
				<h1 style={{ textDecoration: "underline", textAlign: "center" }}>
					Movie List
				</h1>
				{movies.map(movie => {
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
								<div>Title: {movie.title}</div>
								<div>Date Released: {movie.year}</div>
								<div>Description: {movie.overview}</div>
								<div> Date Watched: {date}</div>
							</div>
							<div className="ratingInfo">
								<div>IMBD User Rating: {movie.voteavg}</div>
								<div>
									<UserRating movie={movie} updateRating={updateRating} />
								</div>
							</div>
							<button onClick={() => destroyMovie(movie)}>x</button>
						</li>
					);
				})}
			</div>
		</div>
	);
}
