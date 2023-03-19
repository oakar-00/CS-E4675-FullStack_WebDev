const Togglable = (props) => {
  const hideWhenVisible = { display: props.showForm ? 'none' : '' }
  const showWhenVisible = { display: props.showForm ? '' : 'none' }

  const toggleVisibility = () => {
    props.setShowForm(!props.showForm)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id="new-blog-create-button" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility} id="new-blog-cancel">cancel</button>
      </div>
    </div>
  )
}

export default Togglable
