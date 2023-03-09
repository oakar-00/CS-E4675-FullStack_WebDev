import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
	return axios.get(baseUrl);
};

const create = (newObject) => {
	return axios.post(baseUrl, newObject);
};

const remove = (id) => {
	return axios.delete(baseUrl + `/${id}`);
};

const edit = (object) => {
	return axios.put(baseUrl + `/${object.id}`, object);
};

export default {
	getAll: getAll,
	create: create,
	remove: remove,
	edit: edit,
};
