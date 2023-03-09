import axios from "axios";

const API_key = process.env.REACT_APP_NOT_SECRET_CODE;

const getWeather = (lat, lon) => {
	return axios.get(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
	);
};

const getIcon = (icon) => {
	return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

export default { getWeather, getIcon };
