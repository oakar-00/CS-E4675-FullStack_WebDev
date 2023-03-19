import { useState } from 'react'
import Togglable from './Toggable'
import blogService from '../services/blogs'
import Notification from './Notification'
import Error from './Error'

const BlogForm = ( { setBlogs }) => {
  const [message, setMessage] = useState(null)
  const [errMessage, setErrMessage] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')


  const addBlog = async (event) => {
    event.preventDefault()
    try {
      if (likes===''){
        await blogService.create({ title, author, url })
      }
      else{
        await blogService.create({ title, author, url , likes })
      }
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      setMessage(`a new blog ${title} by ${author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes('')
      setShowForm(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrMessage('Please fill in all the fields')
      setTimeout(() => {
        setErrMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <div>
      <form onSubmit={addBlog}>
        <div>
					title:{' '}
          <input
            value={title}
            id="new-blog-title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
					author:{' '}
          <input
            value={author}
            id="new-blog-author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
					url:{' '}
          <input id="new-blog-url" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
					likes:{' '}
          <input id="new-blog-likes" value={likes} onChange={({ target }) => setLikes(target.value)} />
        </div>
        <button type="submit" id="new-blog-submit-button">submit</button>
      </form>
    </div>
  )

  return (
    <div>
      <Notification message={message} />
      <Error errMessage={errMessage} />
      <Togglable
        // eslint-disable-next-line react/no-children-prop
        children={blogForm()}
        buttonLabel={'create'}
        showForm={showForm}
        setShowForm={setShowForm}
      />
    </div>
  )
}

export default BlogForm
