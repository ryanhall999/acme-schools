import React from "react";

export default function School({ school, updateSchool, deleteSchool }) {
	return (
		<div>
			<h1>Update School</h1>
			<form>
				<input type="text" placeholder={school.name}></input>
				<br></br>
				<button onClick={e => updateSchool(e, school)}>Update School</button>
			</form>
			<button onClick={e => deleteSchool(e, school)}>Delete School</button>
		</div>
	);
}
