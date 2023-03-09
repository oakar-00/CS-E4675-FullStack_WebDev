import { useState } from "react";
import weatherServices from "./services/weatherServices.js";

const Country = (props) => {
	console.log(props.country.latlng[0], props.country.latlng[1]);
	const [temp, setTemp] = useState(0);
	const [icon, setIcon] = useState("");
	const [wind, setWind] = useState(0);
	const api = weatherServices
		.getWeather(props.country.latlng[0], props.country.latlng[1])
		.then((response) => {
			setTemp((response.data.main.temp - 273.15).toFixed(2)); //the temperature form API is in Kelvin
			setIcon(weatherServices.getIcon(response.data.weather[0].icon));
			setWind(response.data.wind.speed.toFixed(2));
		});
	// console.log("this is temp: ", data);

	return (
		<div>
			<h1>{props.country.name.common}</h1>
			<p>
				capital: {props.country.capital} <br />
				area: {props.country.area}
			</p>
			<p>Languages: </p>
			<ul>
				{Object.values(props.country.languages).map((language) => (
					<li>{language}</li>
				))}
			</ul>
			<br />
			<img src={props.country.flags.png} alt="flag not available" />
			<br />
			<h2>Weather in {props.country.capital}</h2>
			<p>temperature {temp} celcius</p>
			<img src={icon}></img>
			<p>wind: {wind}m/s</p>
		</div>
	);
};

export default Country;
