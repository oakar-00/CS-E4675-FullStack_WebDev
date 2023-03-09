import { useState, useEffect } from "react";
import personsServices from "./services/persons.js";
import Filter from "./Filter.js";
import PersonForm from "./PersonForm.js";
import Persons from "./Persons.js";
import Notification from "./Notification.js";
import Error from "./Error.js";
import "./index.css";

const App = () => {
	const [persons, setPersons] = useState([]);
	useEffect(() => {
		personsServices.getAll().then((response) => {
			console.log("Promise fulfilled");
			setPersons(response.data);
		});
	}, []);
	const [message, setMessage] = useState("");
	const [errMessage, setErrMessage] = useState("");
	const [filtered, setFiltered] = useState([]);
	const [hasFilter, setHasFilter] = useState(false);

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
			<Error errMessage={errMessage} />
			<Filter
				persons={persons}
				filtered={filtered}
				setFiltered={setFiltered}
				setHasFilter={setHasFilter}
			/>
			<h3>add a new</h3>
			<PersonForm
				persons={persons}
				setPersons={setPersons}
				setMessage={setMessage}
				setErrMessage={setErrMessage}
			/>
			<h3>Numbers</h3>
			<Persons
				persons={persons}
				filtered={filtered}
				hasFilter={hasFilter}
				setPersons={setPersons}
			/>
		</div>
	);
};

export default App;
