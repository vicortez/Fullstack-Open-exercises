import { useState } from 'react'
import { useNotification } from '../context/NotificationContext'

const BlogForm = ({ onSubmit }) => {
  const [title, settitle] = useState('')
  const [author, setauthor] = useState('')
  const [url, seturl] = useState('')

  const notification = useNotification()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!title || !url) {
      notification({ message: 'Title and url are required', type: 'error' })

      return
    }

    onSubmit({ title, author, url })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title*:{' '}
            <input type="text" onChange={({ target }) => settitle(target.value)} value={title} />
          </label>
        </div>
        <div>
          <label>
            author:{' '}
            <input type="text" onChange={({ target }) => setauthor(target.value)} value={author} />
          </label>
        </div>
        <div>
          <label>
            url*: <input type="text" onChange={({ target }) => seturl(target.value)} value={url} />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
