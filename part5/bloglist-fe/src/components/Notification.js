const Notification = ({ message }) => {
  if (message === '' || message === null) {
    return null
  }

  return <div className="notification">{message}</div>
}

export default Notification
