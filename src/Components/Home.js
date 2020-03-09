import React from "react";
import InputForm from "./InputForm";
import Stats from "./Stats";
import { FetchMovie } from "./CreateMovie";
import UserRating from "./UserRating";
import PartialMovieList from "./PartialMovieList";

export default function Home({
	movies,
	createMovie,
	updateRating,
	destroyMovie
}) {
	return (
		<div>
			<div className="outerBox">
				<Stats movies={movies} />
				<div className="innerBox">
					<div className="listContainer">
						<div className="addMovie">
							<InputForm createMovie={createMovie} movies={movies} />
						</div>
						<div className="movieList">
							<PartialMovieList
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
