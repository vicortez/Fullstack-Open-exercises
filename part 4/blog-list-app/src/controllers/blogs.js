const Blog = require('../models/blog')
const blogsRouter = require('express').Router()

blogsRouter.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/api/blogs', async (req, res) => {
  const blogDoc = new Blog({ likes: 0, ...req.body })
  const blog = await blogDoc.save()
  res.status(201).json(blog)
})

module.exports = blogsRouter
