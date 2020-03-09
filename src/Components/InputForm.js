import React from "react";
import { getToday, countDays } from "./util";

export default function InputForm({ createMovie, movies }) {
	let today = getToday();
	let dates = countDays(movies);
	return (
		<div>
			<form onSubmit={e => createMovie(e)}>
				<label htmlFor="mname">Add Movie:</label>
				<br></br>
				<input type="text" id="fname" name="mname"></input>
				<br></br>
				Date Watched:
				<br></br>
				<input type="date" defaultValue={today}></input>
				<br></br>
				<input type="submit" value="Submit"></input>
			</form>
			<div>
				<div className="dayList">
					<h5>Most Days Watched:</h5>
					<ul>
						<li>Sunday: {dates[0]}</li>
						<li>Monday: {dates[1]}</li>
						<li>Tuesday: {dates[2]}</li>
						<li>Wednesday: {dates[3]}</li>
						<li>Thursday: {dates[4]}</li>
						<li>Friday: {dates[5]}</li>
						<li>Saturday: {dates[6]}</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
