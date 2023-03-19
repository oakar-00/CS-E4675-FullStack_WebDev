import { useState } from 'react'

const Blog = ( { blog, addLike, removeBlog } ) => {
  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')
  // const [likes, setLikes] = useState(props.blog.likes);

  const toggleVisibility = () => {
    setVisible(!visible)
    if (buttonLabel === 'view') {
      setButtonLabel('hide')
    } else {
      setButtonLabel('view')
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className='blogContent'>
      {blog.title} {blog.author}
      <button id="blog-view-more" onClick={toggleVisibility}>{buttonLabel}</button>
      {!visible ? (
        <div></div>
      ) : (
        <div>
          <a href={blog.url}> {blog.url}</a>
          <br />
					Likes: {blog.likes}
          <button id="like-blog" onClick={() => addLike(blog._id, blog.likes)}>
						like
          </button>
          <br />
          {blog.user[0] ? blog.user[0].name : ''}
          <br />
          <button id="remove-blog" onClick={() => removeBlog(blog)}>remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog
