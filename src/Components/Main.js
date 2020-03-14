import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Form from "./Form";
import Schools from "./Schools";
import Student from "./Student";

export default function Main({
	schools,
	students,
	studentSchools,
	unenrolled,
	enrolled,
	createSchool,
	createStudent,
	deleteSchool,
	deleteStudent,
	destroyStudentSchool,
	updateStudentSchool,
	updateStudent,
	updateSchool
}) {
	return (
		<div>
			<h1>ACME SCHOOLS</h1>
			<h2>{schools.length} Schools</h2>
			<h2>
				{students.length} Students ({enrolled} Enrolled)
			</h2>
			<div className="mainBody">
				<Form
					createStudent={createStudent}
					schools={schools}
					createSchool={createSchool}
				/>
				<div className="lists">
					<div className="unenrolled">
						<h2>Unenrolled Students</h2>
						<ul>
							{unenrolled.map(unenrolle => {
								return (
									<li key={unenrolle.studentid}>
										<Router>
											<Link to="/student">{unenrolle.name}</Link>
											<Switch>
												<Route exact path="/student">
													<Student
														schools={schools}
														student={unenrolle}
														updateStudent={updateStudent}
														deleteStudent={deleteStudent}
													/>
												</Route>
											</Switch>
										</Router>
									</li>
								);
							})}
						</ul>
					</div>
					<Schools
						students={students}
						schools={schools}
						studentSchools={studentSchools}
						unenrolled={unenrolled}
						updateStudentSchool={updateStudentSchool}
						destroyStudentSchool={destroyStudentSchool}
						updateSchool={updateSchool}
						deleteSchool={deleteSchool}
					/>
				</div>
			</div>
		</div>
	);
}
