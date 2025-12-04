import { useEffect, useMemo, useState } from 'react'
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
  const [showBlogForm, setShowBlogForm] = useState(false)

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
      // refreshBlogForm()
      setShowBlogForm(false)
    } catch (error) {
      notification({ message: error.message ?? 'Error posting blog', type: 'error' })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(userAuthKey)
    setUser(null)
    notification({ message: 'Logged out', type: 'success' })
  }

  const handleClickLike = async (blog) => {
    const newLikes = blog.likes != null ? blog.likes + 1 : 1
    const updatedBlog = await blogService.put({ ...blog, likes: newLikes })
    setBlogs((prev) => {
      return prev.map((el) => {
        if (el.id === blog.id) {
          return { ...updatedBlog }
        } else {
          return el
        }
      })
    })
  }

  const handleClickRemove = async (blog) => {
    const confirmation = window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)
    if (!confirmation) {
      return
    }
    await blogService.remove(blog.id)
    setBlogs((prev) => prev.filter((el) => el.id !== blog.id))
  }

  // const refreshBlogForm = () => {
  //   setBlogFormKey((prev) => prev + 1)
  // }

  const sortedBlogsData = useMemo(() => {
    if (!user) return []
    return blogs
      .map((el) => {
        return { ...el, showRemove: el.user?.username === user.username }
      })
      .toSorted((el1, el2) => el2.likes - el1.likes)
  }, [blogs, user])

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
            {showBlogForm && (
              <>
                <BlogForm key={blogFormKey} onSubmit={handleSubmitBlog} />
                <button onClick={() => setShowBlogForm(false)}>cancel</button>
              </>
            )}
            {!showBlogForm && <button onClick={() => setShowBlogForm(true)}>create new</button>}
            <ol>
              {sortedBlogsData.map((blogData) => (
                <li key={blogData.id}>
                  <Blog
                    blog={blogData}
                    onLike={handleClickLike}
                    onRemove={handleClickRemove}
                    showRemove={blogData.showRemove}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
