const Blog = require('../models/blog')

const { compareIds } = require('../utils/model_utils')
const { userExtractor } = require('../middlewares/auth')

const blogsRouter = require('express').Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    _id: 1,
  })
  res.json(blogs)
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const { user } = req

  const blogDoc = new Blog({
    likes: 0,
    ...req.body,
    _id: undefined,
    user: user._id,
  })
  const blog = await blogDoc.save()
  await blog.populate('user', {
    username: 1,
    name: 1,
    _id: 1,
  })
  user.blogs.push(blog._id)
  await user.save()
  res.status(201).json(blog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const { user } = req

  const id = req.params.id
  const blog = await Blog.findById(id)
  if (blog) {
    // at this level, we ideally just want to call something like canDelete()
    if (!compareIds(user._id, blog.user)) {
      res.status(401).json({ error: 'user does not have permission for that action' })
      return
    }
    await blog.deleteOne()
    user.blogs = user.blogs.filter((el) => el._id.toHexString() !== id)
    await user.save()
  }
  res.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (req, res) => {
  const id = req.params.id

  const newBlogData = {
    title: req.body.title ?? null,
    author: req.body.author ?? null,
    url: req.body.url ?? null,
    likes: req.body.likes ?? 0,
    // we dont allow replacing the user in the put request.
    user: undefined,
  }
  console.log(req.body)

  // doesn't replace properties that are set as undefined
  const updatedBlogDoc = await Blog.findByIdAndUpdate(id, newBlogData, {
    new: true,
    runValidators: true,
    context: 'query',
  }).populate('user', {
    username: 1,
    name: 1,
    _id: 1,
  })
  res.json(updatedBlogDoc)
})

module.exports = blogsRouter
