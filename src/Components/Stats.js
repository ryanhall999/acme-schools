import React from "react";
import { avgRating, avgIMBDRating } from "./util";

export default function Stats({ movies }) {
	return (
		<div className="stats">
			<div>Stats: Movies {movies.length}</div>
			<div>AVG IMBD Rating: {avgIMBDRating(movies)}</div>
			<div>AVG Rating: {avgRating(movies)}</div>
		</div>
	);
}
