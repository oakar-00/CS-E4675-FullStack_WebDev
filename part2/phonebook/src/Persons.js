import personsServices from "./services/persons";

const Persons = (props) => {
	const deleteHandler = (object) => {
		const bool = window.confirm(`Delete ${object.name}?`);
		if (bool) {
			personsServices.remove(object.id).then((response) => {
				console.log(response);
				personsServices.getAll().then((res) => {
					console.log("Promise fulfilled");
					props.setPersons(res.data);
				});
			});
		}
	};

	return (
		<div>
			{!props.hasFilter
				? props.persons.map((person) => (
						<p>
							{`${person.name}: ${person.number}`}{" "}
							<button onClick={() => deleteHandler(person)}>
								delete
							</button>
						</p>
				  ))
				: props.filtered.map((person) => (
						<p>
							{`${person.name}: ${person.number}`}{" "}
							<button onClick={() => deleteHandler(person)}>
								delete
							</button>
						</p>
				  ))}
		</div>
	);
};

export default Persons;
