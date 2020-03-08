import React from "react";

export default function InputForm({ createMovie }) {
	return (
		<form onSubmit={e => createMovie(e)}>
			<label htmlFor="mname">Add Movie:</label>
			<br></br>
			<input type="text" id="fname" name="mname"></input>
			Date Watched:
			<input type="date"></input>
			<input type="submit" value="Submit"></input>
		</form>
	);
}
