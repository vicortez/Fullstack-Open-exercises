import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useNotification } from './context/NotificationContext'
import blogService from './services/blogService'
import loginService from './services/loginService'

export const userAuthKey = 'userAuth'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [blogFormKey, setBlogFormKey] = useState(0)

  const notification = useNotification()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const userValue = window.localStorage.getItem(userAuthKey)
    if (userValue) {
      setUser(JSON.parse(userValue))
    }
  }, [])

  const handleSubmitLogin = async ({ username, password }) => {
    try {
      const res = await loginService.login({ username, password })
      window.localStorage.setItem(userAuthKey, JSON.stringify(res))
      setUser(res)
      notification({ message: `Logged in`, type: 'success' })
    } catch (error) {
      notification({ message: error.response?.data?.error ?? 'Error logging in', type: 'error' })
    }
  }

  const handleSubmitBlog = async ({ title, author, url }) => {
    try {
      const res = await blogService.create({ title, author, url })
      setBlogs((blogs) => blogs.concat(res))
      notification({ message: `A new blog '${res.title}' by ${res.author} added`, type: 'success' })
      refreshBlogForm()
    } catch (error) {
      notification({ message: error.message ?? 'Error posting blog', type: 'error' })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(userAuthKey)
    setUser(null)
    notification({ message: 'Logged out', type: 'success' })
  }

  const refreshBlogForm = () => {
    setBlogFormKey((prev) => prev + 1)
  }

  return (
    <div>
      <Notification />
      {!user && <LoginForm onSubmit={handleSubmitLogin} />}
      {user && (
        <div>
          <p>{user.name ?? user.username} is logged in</p>
          <button onClick={handleLogout}>logout</button>
          <div>
            <h2>blogs</h2>
            <BlogForm key={blogFormKey} onSubmit={handleSubmitBlog} />
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
