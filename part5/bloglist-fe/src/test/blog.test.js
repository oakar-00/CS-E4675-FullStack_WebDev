// import React from 'react'
// import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
// import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'
import Togglable from '../components/Toggable'
// import blogService from '../services/blogs'

describe('Testing Blog', () => {
  const sampleBlog ={
    title: 'Testing React Project With Jest',
    author: 'John Cena',
    url: 'https://google.com',
    likes: 2,
    user: '6414a409bb15e5dc0c92afb2',
  }

  let container
  const pressLike = jest.fn()

  beforeEach(() => {
    container = render(
      <div>
        <Togglable/>
        <Blog blog={sampleBlog} addLike={pressLike}>
          <div className="testDiv" >
          togglable content
          </div>
        </Blog>
      </div>
    ).container
  })

  test('1+1 returns 2', () => {
    const value = 1+1
    expect(value).toBe(2)
  })

  test('display blogs renders title and author', () => {

    const element = screen.getByText(`${sampleBlog.title} ${sampleBlog.author}`)
    expect(element).toBeDefined()
  })

  test('blog shows url and likes on button click', async() => {

    const user = userEvent.setup()
    const button = screen.getByText('view')
    expect(button).toBeDefined()
    await user.click(button)
    const likes = screen.getByText(`Likes: ${sampleBlog.likes}`)
    const url = screen.getByText(`${sampleBlog.url}`)
    expect(likes).toBeDefined()
    expect(url).toBeDefined()
  })

  test('like button clicked twice', async() => {

    const user = userEvent.setup()
    const view_button = screen.getByText('view')
    await user.click(view_button)

    const div = container.querySelector('.blogContent')
    expect(div).toBeDefined()

    const like_button = screen.getByText('like')
    await user.click(like_button)
    await user.click(like_button)
    expect(pressLike.mock.calls).toHaveLength(2)

  })
  //   let component
  // let sampleBlog = {
  //   title: 'Testing React Project With Jest',
  //   author: 'John Cena',
  //   url: 'https://google.com',
  //   likes: 2,
  //   user: '6414a409bb15e5dc0c92afb2',
  // }

  // //   let mockHandler = jest.fn()

  // blogService.update = jest.fn().mockImplementation(() => {
  //   return Promise.resolve({ success: true })
  // })

  //   beforeEach(() => {
  //     component = render(<Blog blog={sampleBlog} handleLikes={mockHandler} />)
  //   })

  // test('Blog displays Title & Author, but no Likes or URL', () => {
  //   render(<Blog blog={sampleBlog}/>)
  //   const element = screen.getByText('Component testing is done with react-testing-library')
  //   expect(element).toBeDefined()
  //   // expect(component.container).toHaveTextContent(sampleBlog.title)
  //   // expect(component.container).toHaveTextContent(sampleBlog.author)
  //   // expect(component.container).not.toHaveTextContent(sampleBlog.likes)
  //   // expect(component.container).not.toHaveTextContent(sampleBlog.url)
  // })

  //   test('Blog displays Likes & URL after click', () => {
  //     const button = component.getByText('view')
  //     fireEvent.click(button)

  //     expect(component.container).toHaveTextContent(sampleBlog.likes)
  //     expect(component.container).toHaveTextContent(sampleBlog.url)
  //   })

  //   test('2 Click => 2 Times event called', () => {
  //     const viewButton = component.getByText('view')
  //     fireEvent.click(viewButton)

  //     const likeButton = component.getByText('like')

  //     fireEvent.click(likeButton)
  //     fireEvent.click(likeButton)

//     expect(mockHandler.mock.calls).toHaveLength(2)
//   })
})