const express = require("express");
const app = express();
const path = require("path");
const db = require("./db");
const morgan = require("morgan");

app.use(express.json());

morgan(":method :url :status :res[content-length] - :response-time ms");

app.use("/dist", express.static("dist"));
app.use("/css", express.static("css"));

app.get("/", (req, res, next) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/students", (req, res, next) => {
	db.readStudents()
		.then(movies => res.send(movies))
		.catch(next);
});

app.get("/api/schools", (req, res, next) => {
	db.readSchools()
		.then(movies => res.send(movies))
		.catch(next);
});

app.get("/api/studentSchools", (req, res, next) => {
	db.readStudentSchools()
		.then(movies => res.send(movies))
		.catch(next);
});

app.post("/api/students", (req, res, next) => {
	db.addStudent(req.body.name).then(response => res.send(response));
});

app.post("/api/schools", (req, res, next) => {
	db.addSchool(req.body.name).then(response => res.send(response));
});

app.post("/api/studentSchools", (req, res, next) => {
	db.addStudentSchool(req.body.studentId, req.body.schoolId).then(response =>
		res.send(response)
	);
});

app.delete("/api/students/:id", (req, res, next) => {
	db.destroyStudent(req.params.id).then(response => res.send(response));
});

app.delete("/api/schools/:id", (req, res, next) => {
	db.destroyStudent(req.params.id).then(response => res.send(response));
});

app.delete("/api/studentSchools/:id", (req, res, next) => {
	db.destroyStudentSchool(req.params.id).then(response => res.send(response));
});

app.put("/api/students", (req, res, next) => {
	db.updateStudent(req.body.studentid, req.body.name).then(response =>
		res.send(response)
	);
});

app.put("/api/schools", (req, res, next) => {
	db.updateSchool(req.body.schoolid, req.body.name).then(response =>
		res.send(response)
	);
});

const port = process.env.PORT || 3000;

db.sync().then(() => {
	app.listen(port, () => {
		console.log(`listening on port ${port}...`);
	});
});
