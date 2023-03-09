import Search from "./Search";
import { useState, useEffect } from "react";
import countriesServices from "./services/countries.js";

function App() {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		countriesServices.getAll().then((response) => {
			console.log(response.data);
			setCountries(response.data);
		});
	}, []);

	return (
		<div className="App">
			<Search countries={countries} />
		</div>
	);
}

export default App;
