import React from "react";

export default function UserRating({ movie, updateRating }) {
	if (movie.userrating !== null) {
		return <div>Your Rating: {movie.userrating}</div>;
	} else if (movie.userrating === null) {
		return (
			<div>
				<label htmlFor="userRating">Set Your Rating:</label>
				<select id="userRating">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
				</select>
				<button onClick={e => updateRating(e, movie)}>Update Rating</button>
			</div>
		);
	}
}
