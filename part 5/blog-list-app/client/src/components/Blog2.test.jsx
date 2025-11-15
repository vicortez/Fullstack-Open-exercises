import { render, screen } from '@testing-library/react'
import { default as userEvent, default as UserEvent } from '@testing-library/user-event'
import { test } from 'vitest'
import Blog from './Blog'

// This is just a file to test some stuff on my IDE. Ignore it.

const getSampleBlog = () => ({
  title: 'sample title',
  author: 'sample author',
  url: 'https://example.com',
  likes: 24,
})

test('renders likes and url after detail button is clicked', async () => {
  // arrange
  const user = userEvent.setup()
  const sampleBlog = getSampleBlog()
  render(<Blog blog={sampleBlog} />)

  // act
  const btn = screen.getByText('view')
  function aa() {
    return fetch('/test')
  }
  await user.click(btn)

  // assert
})
