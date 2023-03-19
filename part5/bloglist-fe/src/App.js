import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [message] = useState(null)
  const [errMessage, setErrMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    })
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setBlogs(blogs)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrMessage('Wrong username or password')
      setTimeout(() => {
        setErrMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addLike = async (id, likes) => {
    const new_likes = { likes: likes + 1 }
    await blogService.update(id, new_likes)
    await blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }
  const removeBlog = async (blog) => {
    const bool = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (bool) {
      await blogService.remove(blog._id)
      await blogService
        .getAll()
        .then((blogs) =>
          setBlogs(blogs.sort((a, b) => b.likes - a.likes))
        )
      // window.alert('blog removed')
    }
  }

  const listBlogs = () => {
    return (
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} />
        ))}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h1>Login</h1>
        <Error errMessage={errMessage} />
        <Login
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <Error errMessage={errMessage} />

      <p>
				Logged in as {user.name}
        <button id="logout-button" onClick={handleLogout}>Logout</button>
      </p>
      {/* {showForm ? blogForm() : <div />} */}
      {/* <button onClick={() => setShowForm(!showForm)}>Show</button> */}

      <BlogForm setBlogs={setBlogs} />
      {listBlogs()}
    </div>
  )
}

export default App
