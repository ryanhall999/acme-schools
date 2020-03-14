import React from "react";

export default function Form({ createStudent, schools, createSchool }) {
	return (
		<div className="createBoxes">
			<div className="createStudent">
				<h1>Create Student</h1>
				<form onSubmit={e => createStudent(e)}>
					<input type="text"></input>
					<br></br>
					<select name="plan" id="plan" defaultValue="none">
						<option value="none" disabled hidden>
							--Select a School--
						</option>
						{schools.map(school => {
							return <option value={school.name}>{school.name}</option>;
						})}
					</select>
					<br></br>
					<button>Create</button>
				</form>
			</div>
			<div className="createSchool">
				<h1>Create School</h1>
				<form onSubmit={e => createSchool(e)}>
					<input type="text"></input>
					<br></br>
					<button>Create</button>
				</form>
			</div>
		</div>
	);
}
