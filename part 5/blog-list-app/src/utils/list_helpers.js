const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length < 1) {
    return 0
  }

  return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!Array.isArray(blogs)) {
    throw new Error('Invalid input. Not an array: ', blogs)
  } else if (blogs.length === 0) {
    return null
  }

  const reducer = (acc, curr) => (curr.likes > acc.likes ? curr : acc)
  return blogs.reduce(reducer, { likes: -Infinity })
}

const mostBlogs = (blogs) => {
  if (!Array.isArray(blogs)) {
    throw new Error('Invalid input. Not an array: ', blogs)
  } else if (blogs.length === 0) {
    return null
  }

  return _(blogs)
    .countBy('author') // returns object in form author: count
    .map((count, author) => ({ author, blogs: count })) // returns list of objs
    .maxBy('blogs') // terminator function. returns element (oject)
}

const mostLikes = (blogs) => {
  if (!Array.isArray(blogs)) {
    throw new Error('Invalid input. Not an array: ', blogs)
  } else if (blogs.length === 0) {
    return null
  }

  return _(blogs)
    .groupBy('author')
    .map((blogs, author) => ({ author, likes: _(blogs).sumBy('likes') }))
    .maxBy('likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
