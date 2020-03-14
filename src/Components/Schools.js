import React from "react";
import School from "./School";
import Student from "./Student";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Schools({
	schools,
	students,
	studentSchools,
	unenrolled,
	updateStudentSchool,
	destroyStudentSchool,
	updateSchool,
	updateStudent,
	deleteSchool,
	deleteStudent
}) {
	return (
		<div className="schoolsList">
			{schools.map(school => {
				return (
					<div className="school">
						<h1>
							<Router>
								<Link to="/school">{school.name}</Link>
								<Switch>
									<Route exact path="/school">
										<School
											school={school}
											updateSchool={updateSchool}
											deleteSchool={deleteSchool}
										/>
									</Route>
								</Switch>
							</Router>
						</h1>
						<form onSubmit={e => updateStudentSchool(e, school)}>
							<select name="plan" defaultValue="none">
								<option value="none" disabled hidden>
									--Enroll a Student--
								</option>
								{unenrolled.map(enrolle => {
									return <option value={enrolle.name}>{enrolle.name}</option>;
								})}
							</select>
							<button>Enroll</button>
						</form>
						<ul>
							{studentSchools
								.filter(
									studentSchool => studentSchool.schoolid === school.schoolid
								)
								.map(studentSchool => {
									return (
										<li key={studentSchool.id}>
											{
												<Router>
													<Link to="/student">
														{
															students.find(
																student =>
																	student.studentid === studentSchool.studentid
															).name
														}
													</Link>
													<Switch>
														<Route exact path="/student">
															<Student
																schools={schools}
																student={
																	students.find(
																		student =>
																			student.studentid ===
																			studentSchool.studentid
																	).name
																}
																updateStudent={updateStudent}
																deleteStudent={deleteStudent}
															/>
														</Route>
													</Switch>
												</Router>
											}
											<button
												onClick={e => destroyStudentSchool(e, studentSchool)}
											>
												Unenroll
											</button>
										</li>
									);
								})}
						</ul>
					</div>
				);
			})}
		</div>
	);
}
