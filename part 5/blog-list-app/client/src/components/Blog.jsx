import { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, showRemove, onLike, onRemove }) => {
  const [detailedView, setDetailedView] = useState(false)
  const userName = blog.user?.name ?? blog.user?.username

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button
        onClick={() => {
          setDetailedView((prev) => !prev)
        }}
      >
        {detailedView ? 'hide' : 'view'}
      </button>
      {detailedView && (
        <>
          <div>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </div>
          <div>
            likes {blog.likes} <button onClick={() => onLike(blog)}>like</button>
          </div>
          <div>{userName ?? 'missing user data'}</div>
          {showRemove && <button onClick={() => onRemove(blog)}>remove</button>}
        </>
      )}
    </div>
  )
}

export default Blog
