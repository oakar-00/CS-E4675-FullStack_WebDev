import { useState } from "react";

const Filter = (props) => {
	const [filter, setFilter] = useState("");
	const handleFilterChange = (event) => {
		// console.log("event target value: ", event.target.value);
		setFilter(event.target.value);
		if (event.target.value === "") {
			props.setHasFilter(false);
			return;
		} else {
			props.setHasFilter(true);
			const tem = [];
			props.persons.forEach((person) => {
				if (
					person.name
						.toLowerCase()
						.includes(event.target.value.toLowerCase())
				) {
					tem.push(person);
				}
			});
			props.setFiltered(tem);
		}
	};

	return (
		<div>
			filter shown with{" "}
			<input value={filter} onChange={handleFilterChange} />{" "}
		</div>
	);
};

export default Filter;
