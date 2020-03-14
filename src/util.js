const getSchoolIdByName = (name, schools) => {
	return schools.filter(school => school.name === name);
};

const getStudentIdByName = (name, students) => {
	return students.filter(student => student.name === name);
};

const getUnenrolled = (students, studentSchools) => {
	let ids = studentSchools.map(studentSchool => studentSchool.studentid);
	return students.filter(student => !ids.includes(student.studentid));
};

module.exports = {
	getSchoolIdByName,
	getUnenrolled,
	getStudentIdByName
};
