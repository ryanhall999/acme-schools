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
    Title VARCHAR(255) NOT NULL,
    Year INT
  );

  INSERT INTO movies (Title, Year) VALUES ('Parasite', '2019')
  ;

`;
	client.query(SQL);
};

const readMovies = async () => {
	const SQL = "SELECT * from movies";
	return (await client.query(SQL)).rows;
};

const addMovie = async movie => {
	const SQL = "INSERT INTO movies(Title, Year) values($1, $2) returning *";
	return (await client.query(SQL, [movie.Title, movie.Year])).rows[0];
};

module.exports = {
	sync,
	readMovies,
	addMovie
};
