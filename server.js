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

app.get("/api/movies", (req, res, next) => {
	db.readMovies()
		.then(movies => res.send(movies))
		.catch(next);
});

app.post("/api/movies", (req, res, next) => {
	db.addMovie(req.body)
		.then(movies => res.send(movies))
		.catch(next);
});

app.delete("/api/movies/:id", (req, res, next) => {
	db.delMovie(req.params.id)
		.then(movies => res.send(movies))
		.catch(next);
});

app.put("/api/movies/", (req, res, next) => {
	db.upMovie(req.body.id, req.body.rating)
		.then(movies => res.send(movies))
		.catch(next);
});

const port = process.env.PORT || 3000;

db.sync().then(() => {
	app.listen(port, () => {
		console.log(`listening on port ${port}...`);
	});
});
