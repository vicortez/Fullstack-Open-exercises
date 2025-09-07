const { describe, beforeEach, test, after } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const { mongoose } = require('mongoose')
const Blog = require('../models/blog')
const { initialBlogs } = require('./utils/sample_blogs')
const assert = require('node:assert')

const api = supertest(app)
const baseUrl = '/api/blogs'

after(async () => {
  // either that or close the api itself (it should have a hook to disconnect from db.)
  await mongoose.connection.close()
})

describe('HTTP API tests for the blogs endpoints', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  describe('read operations on blogs', () => {
    test('all blogs are returned', async () => {
      const res = await api
        .get(baseUrl)
        .expect(200)
        .expect('content-type', /application\/json/)

      assert.strictEqual(res.body.length, initialBlogs.length)
    })

    test('all blogs contain id property', async () => {
      const res = await api.get(baseUrl)
      const ids = res.body.map((el) => el.id)
      assert(ids.every((el) => el))
    })
  })

  describe('modify operations on blogs', () => {
    test('POST a new blog', async () => {
      const newBlog = {
        title: 'new blog title just created 32847',
        author: 'some-author',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 99,
      }

      await api
        .post(baseUrl)
        .send(newBlog)
        .expect(201)
        .expect('content-type', /application\/json/)

      const resAfter = await api.get(baseUrl)
      const blogsAfter = resAfter.body

      assert.strictEqual(blogsAfter.length, initialBlogs.length + 1)

      const titles = blogsAfter.map((el) => el.title)
      assert(titles.includes(newBlog.title))
    })

    test("'likes' property defaults to 0", async () => {
      const newBlog = {
        title: 'new blog title just created 32847',
        author: 'some-author',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      }

      await api.post(baseUrl).send(newBlog).expect(201)

      const resAfter = await api.get(baseUrl)
      const blogsAfter = resAfter.body

      const likesCreated = blogsAfter.find(
        (el) => el.title === newBlog.title
      ).likes
      assert.strictEqual(likesCreated, 0)
    })

    test("can't create blogs without title", async () => {
      const newBlog = {
        title: '',
        author: 'some-author',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      }

      await api.post(baseUrl).send(newBlog).expect(400)

      const resAfter = await api.get(baseUrl)
      const blogsAfter = resAfter.body

      assert.strictEqual(blogsAfter.length, initialBlogs.length)
    })

    test("can't create blogs without url", async () => {
      const newBlog = {
        title: 'asdf',
        author: 'some-author',
        url: '',
      }

      await api.post(baseUrl).send(newBlog).expect(400)

      const resAfter = await api.get(baseUrl)
      const blogsAfter = resAfter.body

      assert.strictEqual(blogsAfter.length, initialBlogs.length)
    })

    test('delete blog', async () => {
      const blogToDelete = initialBlogs[1]

      await api.delete(`${baseUrl}/${blogToDelete._id}`).expect(204)

      const resAfter = await api.get(baseUrl)
      const blogsAfter = resAfter.body

      assert.strictEqual(blogsAfter.length, initialBlogs.length - 1)

      const titlesAfter = blogsAfter.map((el) => el.title)
      assert(!titlesAfter.includes(blogToDelete.title))
    })

    test('update blog', async () => {
      const blogToUpdate = initialBlogs[1]
      blogToUpdate.title = 'New title 29102'

      const res = await api
        .put(`${baseUrl}/${blogToUpdate._id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('content-type', /application\/json/)

      assert.strictEqual(res.body.title, blogToUpdate.title)

      const resAfter = await api.get(baseUrl)
      const blogAfter = resAfter.body.find(
        (el) => el.title === blogToUpdate.title
      )

      assert(blogAfter != null)

      assert.strictEqual(blogAfter.title, blogToUpdate.title)
    })

    test('cant update blog with missing info', async () => {
      const blogToUpdate = { ...initialBlogs[1] }
      blogToUpdate.title = ''

      await api
        .put(`${baseUrl}/${blogToUpdate._id}`)
        .send(blogToUpdate)
        .expect(400)
        .expect('content-type', /application\/json/)

      const resAfter = await api.get(baseUrl)

      const titlesAfter = resAfter.body.map((el) => el.title)

      assert(!titlesAfter.includes(blogToUpdate.title))
      // assert.strictEqual(blogAfter.title, blogToUpdate.title)
    })
  })
})
