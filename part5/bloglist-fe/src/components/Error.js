const Error = ({ errMessage }) => {
  if (errMessage === '' || errMessage === null) {
    return null
  }

  return <div className="error">{errMessage}</div>
}

export default Error
