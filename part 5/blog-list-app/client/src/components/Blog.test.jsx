import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import Blog from './Blog'

const getSampleBlog = () => ({
  title: 'sample title',
  author: 'sample author',
  url: 'https://example.com',
  likes: 24,
})

test('renders title and author, but not likes and url', async () => {
  // arrange
  const sampleBlog = getSampleBlog()

  // act
  render(<Blog blog={sampleBlog} />)

  // assert
  const titleEl = screen.getByText(sampleBlog.title, { exact: false })
  expect(titleEl).toBeVisible()
  const authorEl = screen.getByText(sampleBlog.author, { exact: false })
  expect(authorEl).toBeVisible()

  const urlEl = screen.queryByText(sampleBlog.url, { exact: false })
  expect(urlEl).toBeNull()
  const likesEl = screen.queryByText(`likes ${sampleBlog.likes}`, { exact: false })
  expect(likesEl).toBeNull()
})

test('renders likes and url after detail button is clicked', async () => {
  // arrange
  const user = userEvent.setup()
  const sampleBlog = getSampleBlog()
  render(<Blog blog={sampleBlog} />)
  const urlEl = screen.queryByText(sampleBlog.url, { exact: false })
  expect(urlEl).toBeNull()
  const likesEl = screen.queryByText(`likes ${sampleBlog.likes}`, { exact: false })
  expect(likesEl).toBeNull()

  // act
  const btn = screen.getByText('view')
  await user.click(btn)

  // assert
  const urlElAfter = screen.getByText(sampleBlog.url, { exact: false })
  expect(urlElAfter).toBeVisible()
  const likesElAfter = screen.getByText(`likes ${sampleBlog.likes}`, { exact: false })
  expect(likesElAfter).toBeVisible()
})

test('if likes is clicked twice, component calls like handler twice', async () => {
  // arrange
  const user = userEvent.setup()
  const sampleBlog = getSampleBlog()
  const mockLikeHandler = vi.fn()
  render(<Blog blog={sampleBlog} onLike={mockLikeHandler} />)
  const btn = screen.getByText('view')
  await user.click(btn)

  // act
  const likeBtn = screen.getByText('like', { exact: true })
  await user.click(likeBtn)
  await user.click(likeBtn)

  // assert
  expect(mockLikeHandler).toHaveBeenCalledTimes(2)
})
