import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import BlogForm from './BlogForm'

const getSampleBlog = () => ({
  title: 'sample title',
  author: 'sample author',
  url: 'https://example.com',
})

const mockNotification = vi.fn()

vi.mock(import('../context/NotificationContext'), () => ({
  useNotification: vi.fn(() => mockNotification),
}))

test('calls submit handler with proper information when submitted', async () => {
  // arrange
  const user = userEvent.setup()
  const mockSubmitHandler = vi.fn()
  render(<BlogForm onSubmit={mockSubmitHandler} />)
  const sampleData = getSampleBlog()

  // act
  // fill title, author, url
  const titleInput = screen.getByLabelText('title*:', { exact: false })
  await user.type(titleInput, sampleData.title)

  const authorInput = screen.getByLabelText('author:', { exact: false })
  await user.type(authorInput, sampleData.author)

  const urlInput = screen.getByLabelText('url*:', { exact: false })
  await user.type(urlInput, sampleData.url)

  const submitBtn = screen.getByRole('button')
  await user.click(submitBtn)

  // assert
  expect(mockSubmitHandler).toHaveBeenCalledTimes(1)

  const args = mockSubmitHandler.mock.calls[0]
  const [{ title, author, url }] = args
  expect(title).toBe(sampleData.title)
  expect(author).toBe(sampleData.author)
  expect(url).toBe(sampleData.url)
})
