import React from "react";

export default function Student({
	schools,
	student,
	updateStudent,
	deleteStudent
}) {
	return (
		<div>
			<h1>Update Student</h1>
			<form>
				<input type="text" placeholder={student.name}></input>
				<br></br>
				<select name="plan" id="plan" defaultValue="none">
					<option value="none" disabled hidden>
						--Select a School--
					</option>
					{schools.map(school => {
						return <option value={school.name}>{school.name}</option>;
					})}
				</select>
				<button onClick={e => updateStudent(e, student)}>Update Student</button>
			</form>
			<button onClick={e => deleteStudent(e, student)}></button>
		</div>
	);
}
