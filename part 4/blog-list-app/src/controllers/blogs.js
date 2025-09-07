const Blog = require('../models/blog')

const blogsRouter = require('express').Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blogDoc = new Blog({ likes: 0, ...req.body, _id: undefined })
  const blog = await blogDoc.save()
  res.status(201).json(blog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  await Blog.findByIdAndDelete(id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id

  const newBlogData = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes ?? 0,
  }

  const updatedBlogDoc = await Blog.findByIdAndUpdate(id, newBlogData, {
    new: true,
    runValidators: true,
  })
  res.json(updatedBlogDoc)
})

module.exports = blogsRouter
