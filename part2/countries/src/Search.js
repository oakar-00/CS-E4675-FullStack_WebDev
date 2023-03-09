import { useState } from "react";
import Country from "./Country.js";

const Search = (props) => {
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [selectOne, setSelectOne] = useState();

	const searchChangehandler = (event) => {
		console.log(event.target.value);
		setSearchText(event.target.value);
		setSelectOne();

		const tem = [];
		props.countries.forEach((country) => {
			if (
				country.name.common
					.toLowerCase()
					.includes(event.target.value.toLowerCase())
			) {
				tem.push(country);
			}
		});
		console.log(tem.length);
		console.log(tem);

		setSearchResults(tem);
	};

	const showCountry = (country) => {
		setSearchResults([]);
		setSelectOne(country);
		return;
	};

	return (
		<div>
			<div>
				find countries{" "}
				<input
					value={searchText}
					onChange={searchChangehandler}
				></input>
			</div>
			<div>
				{searchText.length === 0 ? (
					<p>type something</p>
				) : searchResults.length === 1 ? (
					<Country country={searchResults[0]} />
				) : searchResults.length > 10 ? (
					<p>Too many matches, specify another filter</p>
				) : (
					searchResults.map((res) => (
						<li>
							{`${res.name.common}`}{" "}
							<button onClick={() => showCountry(res)}>
								show
							</button>
						</li>
					))
				)}
				{selectOne ? <Country country={selectOne} /> : <></>}
			</div>
		</div>
	);
};

export default Search;
