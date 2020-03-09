import React from "react";
import MovieList from "./MovieList";
import UserRating from "./UserRating";

export default function FullList({
	movies,
	createMovie,
	updateRating,
	destroyMovie
}) {
	return (
		<div>
			<MovieList
				movies={movies}
				UserRating={UserRating}
				updateRating={updateRating}
				destroyMovie={destroyMovie}
			/>
		</div>
	);
}
