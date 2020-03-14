const pg = require("pg");
const uuid = require("uuidv4");

const client = new pg.Client(
	process.env.DATABASE_URL || "postgres://localhost/acme_school"
);

client.connect();

const sync = async () => {
	const SQL = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
	DROP TABLE IF EXISTS student_school;
	DROP TABLE IF EXISTS schools;
	DROP TABLE IF EXISTS students;

  CREATE TABLE students(
		studentId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		Name VARCHAR(255) UNIQUE NOT NULL
	);

	CREATE TABLE schools(
		schoolId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		Name VARCHAR(255) UNIQUE NOT NULL
	);

	CREATE TABLE student_school(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    schoolId UUID REFERENCES schools(schoolId),
    studentId UUID REFERENCES students(studentId)
	);

	INSERT INTO students (name) VALUES ('Ryan');
  INSERT INTO schools (name) VALUES ('UNF');
  INSERT INTO student_school (studentId, schoolId)
		VALUES ((SELECT studentId FROM students WHERE name = 'Ryan'),
            (SELECT schoolId FROM schools WHERE name = 'UNF'));`;
	await client.query(SQL);
};

const readStudents = async () => {
	const SQL = `SELECT * FROM students;`;
	const response = await client.query(SQL);
	return response.rows;
};

const readSchools = async () => {
	const SQL = `SELECT * FROM schools;`;
	const response = await client.query(SQL);
	return response.rows;
};

const readStudentSchools = async () => {
	const SQL = "SELECT * FROM student_school";
	const response = await client.query(SQL);
	return response.rows;
};

const addStudent = async name => {
	const SQL = `INSERT INTO students (name) VALUES ($1) returning *;`;
	const response = await client.query(SQL, [name]);
	return response.rows;
};

const addSchool = async name => {
	const SQL = `INSERT INTO schools (name) VALUES ($1) returning *;`;
	const response = await client.query(SQL, [name]);
	return response.rows;
};

const addStudentSchool = async (studentId, schoolId) => {
	const SQL = `INSERT INTO student_school 
  (studentId, 
		schoolId) 
  VALUES  ($1,$2)
    returning *;`;
	const response = await client.query(SQL, [studentId, schoolId]);
	return response.rows[0];
};

const destroyStudent = async id => {
	const SQL = `DELETE FROM students WHERE studentId = $1;`;
	await client.query(SQL, [id]);
};

const destroySchool = async id => {
	const SQL = `DELETE FROM schools WHERE schoolId = $1;`;
	await client.query(SQL, [id]);
};

const destroyStudentSchool = async id => {
	const SQL = `DELETE FROM student_school WHERE id = $1;`;
	await client.query(SQL, [id]);
};

const updateStudent = async (id, name) => {
	const SQL = `UPDATE students SET Name=$1 WHERE studentId = $2 returning *;`;
	await client.query(SQL, [name, id]);
};

const updateSchool = async (id, name) => {
	const SQL = `UPDATE schools SET Name=$1 WHERE schoolId = $2 returning *;`;
	await client.query(SQL, [name, id]);
};

module.exports = {
	sync,
	readStudents,
	readSchools,
	readStudentSchools,
	addStudent,
	addSchool,
	addStudentSchool,
	destroyStudent,
	destroySchool,
	destroyStudentSchool,
	updateSchool,
	updateStudent
};
