import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import Home from "./Components/Home";
import FullList from "./Components/FullList";
import { FetchMovie } from "./Components/CreateMovie";

function App() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		Promise.all([axios.get("/api/movies")])
			.then(responses => responses.map(response => response.data))
			.then(results => {
				setMovies(results[0]);
			})
			.catch(ex => console.log(ex.response.data.message));
	}, []);

	const createMovie = async e => {
		let date;
		let movie;
		e.preventDefault();
		if (e.target[0].value !== "") {
			movie = e.target[0].value;
		} else {
			alert("Please enter a Film");
			return createMovie;
		}
		console.log(e.target[1].value);
		if (e.target[1].value !== "") {
			date = e.target[1].value;
			console.log(date);
		} else {
			date = getToday();
			console.log(date);
		}
		console.log(date);
		e.target[0].value = "";
		let movieToCreate = await FetchMovie(movie);
		movieToCreate.dateWatched = date;
		await axios.post("/api/movies", movieToCreate).then(response => {
			let copy = [...movies];
			copy.push(response.data);
			setMovies(copy);
		});
	};

	const destroyMovie = async movieToDelete => {
		try {
			await axios.delete(`/api/movies/${movieToDelete.id}`);
			setMovies(movies.filter(movie => movie.id !== movieToDelete.id));
		} catch (ex) {
			console.log(ex.response.data.message);
		}
	};

	const updateRating = async (e, movieToUpdate) => {
		e.preventDefault();
		let rating = e.target.previousElementSibling.value;
		let id = movieToUpdate.id;
		try {
			axios.put(`/api/movies/`, { id, rating }).then(response => {
				let words = [...movies.filter(movie => movie.id !== id), response.data];
				setMovies(words);
			});
		} catch (ex) {
			console.log(ex.response.data.message);
		}
	};

	return (
		<Router>
			<div>
				<nav className="nav">
					<Link to="/">Home</Link>
					<Link to="/list">Full List</Link>
				</nav>
				{/* A <Switch> looks through its children <Route>s and
						renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/list">
						<FullList
							movies={movies}
							createMovie={createMovie}
							updateRating={updateRating}
							destroyMovie={destroyMovie}
						/>
					</Route>
					<Route path="/">
						<Home
							movies={movies}
							createMovie={createMovie}
							updateRating={updateRating}
							destroyMovie={destroyMovie}
						/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
//
