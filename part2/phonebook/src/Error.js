const Error = ({ errMessage }) => {
	if (errMessage === "") {
		return null;
	}

	return <div className="error">{errMessage}</div>;
};

export default Error;
