const pg = require("pg");

const client = new pg.Client(
	process.env.DATABASE_URL || "postgres://localhost/movie_db"
);

client.connect();

const sync = async () => {
	const SQL = `
  DROP TABLE IF EXISTS movies;

  CREATE TABLE movies(
    id SERIAL,
    Title VARCHAR(255) NOT NULL UNIQUE,
    Year INT,
    Poster VARCHAR(255)
  );

  INSERT INTO movies (Title, Year, Poster) VALUES ('Parasite', '2019', 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg
  ')
  ;

`;
	client.query(SQL);
};

const readMovies = async () => {
	const SQL = "SELECT * from movies";
	return (await client.query(SQL)).rows;
};

const addMovie = async movie => {
	const SQL =
		"INSERT INTO movies(Title, Year, Poster) values($1, $2, $3) returning *";
	return (await client.query(SQL, [movie.Title, movie.Year, movie.Poster]))
		.rows[0];
};

const delMovie = async id => {
	const SQL = "DELETE FROM movies where id= $1";
	await client.query(SQL, [id]);
};

module.exports = {
	sync,
	readMovies,
	addMovie,
	delMovie
};
