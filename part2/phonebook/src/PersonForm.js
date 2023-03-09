import { useState } from "react";
import personsServices from "./services/persons.js";
import Notification from "./Notification.js";

const PersonForm = (props) => {
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const duplicateEntry = (p1, p2) => {
		return p1.name === p2.name;
	};

	const addPerson = (event) => {
		event.preventDefault();
		console.log(props.persons);
		const newEntry = { name: newName, number: newNumber };
		for (var i = 0; i < props.persons.length; i++) {
			if (duplicateEntry(props.persons[i], newEntry)) {
				changeExistingNumber(props.persons[i].name, newEntry.number);
				setNewName("");
				setNewNumber("");
				return;
			}
		}
		personsServices.create(newEntry).then((response) => {
			console.log(response);
			props.setPersons(props.persons.concat(response.data));
			setNewName("");
			setNewNumber("");
			props.setMessage(`${response.data.name} has been added.`);
			setTimeout(() => {
				props.setMessage("");
			}, 5000);
		});
	};

	const changeExistingNumber = (name, number) => {
		const person = props.persons.find((person) => person.name === name);
		person.number = number;
		const bool = window.confirm(
			`${newName} is already added to phonebook, replace the old number with a new one?`
		);
		if (bool) {
			personsServices
				.edit(person)
				.then((response) => {
					personsServices.getAll().then((res) => {
						console.log("Promise fulfilled");
						props.setPersons(res.data);
						props.setMessage(
							`${person.name}'s number has been changed.`
						);
						setTimeout(() => {
							props.setMessage("");
						}, 5000);
					});
				})
				.catch((error) => {
					props.setErrMessage(
						`'${person.name}' was already removed from server`
					);
					setTimeout(() => {
						props.setErrMessage("");
					}, 5000);
				});
		}
	};
	return (
		<div>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number:{" "}
					<input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</div>
	);
};

export default PersonForm;
