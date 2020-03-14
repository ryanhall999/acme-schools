import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { getSchoolIdByName, getUnenrolled, getStudentIdByName } from "./util";
import School from "./Components/School";
import qs from "qs";
import Main from "./Components/Main";
import Student from "./Components/Student";

function App() {
	const [students, setStudents] = useState([]);
	const [schools, setSchools] = useState([]);
	const [studentSchools, setstudentSchools] = useState([]);

	useEffect(() => {
		Promise.all([
			axios.get("/api/students"),
			axios.get("/api/schools"),
			axios.get("/api/studentSchools")
		])
			.then(responses => responses.map(response => response.data))
			.then(results => {
				setStudents(results[0]);
				setSchools(results[1]);
				setstudentSchools(results[2]);
			})
			.catch(ex => console.log(ex.response.data.message));
	}, []);

	const createStudent = async e => {
		e.preventDefault();
		let studentId;
		let schoolName = e.target[1].value;
		let studentToCreate = {};
		let studentSchoolToCreate = {};
		if (e.target[0].value !== "") {
			studentToCreate.name = e.target[0].value;
			e.target[0].value = "";
		} else {
			alert("Please enter a Name");
			return createStudent;
		}
		await axios.post("/api/students", studentToCreate).then(response => {
			let copy = [...students];
			copy.push(response.data[0]);
			studentId = response.data[0].studentid;
			setStudents(copy);
		});
		if (schoolName !== "none") {
			studentSchoolToCreate.schoolId = getSchoolIdByName(
				schoolName,
				schools
			)[0].schoolid;
			studentSchoolToCreate.studentId = studentId;
			await axios
				.post("/api/studentSchools", studentSchoolToCreate)
				.then(response => {
					let copy = [...studentSchools];
					copy.push(response.data[0]);
					setstudentSchools(copy);
				});
		}
	};

	const createSchool = async e => {
		e.preventDefault();
		let schoolToCreate = {};
		if (e.target[0].value !== "") {
			schoolToCreate.name = e.target[0].value;
			e.target[0].value = "";
		} else {
			alert("Please enter a School");
			return createSchool;
		}
		await axios.post("/api/schools", schoolToCreate).then(response => {
			let copy = [...schools];
			copy.push(response.data[0]);
			setSchools(copy);
		});
	};

	const deleteStudent = async (e, studentToDelete) => {
		e.preventDefault();
		await axios
			.delete(`/api/students/${studentToDelete.id}`)
			.then(response => console.log(response));
		setSchools(
			students.filter(
				student => student.studentid !== studentToDelete.studentid
			)
		);
	};

	const deleteSchool = async (e, schoolToDelete) => {
		e.preventDefault();
		await axios
			.delete(`/api/schools/${schoolToDelete.schoolid}`)
			.then(response => console.log(response));
		setSchools(
			schools.filter(school => school.schoolid !== schoolToDelete.schoolid)
		);
	};

	const destroyStudentSchool = async (e, studentSchoolToDelete) => {
		e.preventDefault();
		await axios
			.delete(`/api/studentSchools/${studentSchoolToDelete.id}`)
			.then(response => console.log(response));
		setstudentSchools(
			studentSchools.filter(
				studentSchool => studentSchool.id !== studentSchoolToDelete.id
			)
		);
	};

	const updateStudentSchool = async (e, school) => {
		e.preventDefault();
		let student = getStudentIdByName(e.target[0].value, students);
		let studentSchoolToCreate = {
			schoolId: `${school.schoolid}`,
			studentId: `${student[0].studentid}`
		};
		await axios
			.post("/api/studentSchools", studentSchoolToCreate)
			.then(response => {
				let copy = [...studentSchools];
				copy.push(response.data);
				setstudentSchools(copy);
			});
	};

	const updateStudent = async (e, student) => {
		e.preventDefault();
		if (e.target[1].value !== "none") {
			updateStudentSchool(e, school);
		}
		console.log(e.target.parentElement[0].value);
		student.name = e.target[0].value;
		await axios.put("/api/students", student).then(response => {
			setstudents(response.data);
		});
	};

	const updateSchool = async (e, school) => {
		e.preventDefault();
		school.name = e.target.parentElement[0].value;
		console.log(school);
		await axios.put("/api/schools", school).then(response => {
			console.log(response.data);
			setSchools(response.data);
		});
	};

	// console.log(students, schools, studentSchools);
	let unenrolled = getUnenrolled(students, studentSchools);
	let enrolled = students.length - unenrolled.length;

	return (
		<Main
			schools={schools}
			students={students}
			studentSchools={studentSchools}
			unenrolled={unenrolled}
			enrolled={enrolled}
			createSchool={createSchool}
			createStudent={createStudent}
			deleteSchool={deleteSchool}
			deleteStudent={deleteStudent}
			destroyStudentSchool={destroyStudentSchool}
			updateStudentSchool={updateStudentSchool}
			updateStudent={updateStudent}
			updateSchool={updateSchool}
		/>
	);
}

export default App;
