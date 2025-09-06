const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helpers')
const { listWithOneBlog, sampleBlogs } = require('./utils/sample_blogs')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, listWithOneBlog[0].likes)
  })
})

describe('favoriteBlog', () => {
  test('single blog returns that blog', () => {
    const res = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(res, listWithOneBlog[0])
  })
  test('when empty blogs list, returns null', () => {
    const res = listHelper.favoriteBlog([])
    assert.equal(res, null)
  })
  test('when not list, throws', () => {
    assert.throws(() => {
      listHelper.favoriteBlog({})
    })
  })
  test('when multiple blogs, returns correct one', () => {
    const res = listHelper.favoriteBlog(sampleBlogs)
    assert.deepStrictEqual(res, sampleBlogs[2])
  })
})

describe('mostBlogs', () => {
  test('when empty blogs list, returns null', () => {
    const res = listHelper.mostBlogs([])
    assert.equal(res, null)
  })
  test('when not list, throws', () => {
    assert.throws(() => {
      listHelper.mostBlogs({})
    })
  })
  test('when single element in list, return one blog', () => {
    const expectedAuthor = listWithOneBlog[0].author

    const res = listHelper.mostBlogs(listWithOneBlog)

    assert.deepStrictEqual(res, {
      author: expectedAuthor,
      blogs: 1,
    })
  })
  test('when multiple blogs, return author with most blogs', () => {
    const expectedAuthor = sampleBlogs[3].author

    const res = listHelper.mostBlogs(sampleBlogs)

    assert.equal(res.author, expectedAuthor)
    assert.equal(res.blogs, 3)
  })
})

describe('mostLikes', () => {
  test('when empty blogs list, returns null', () => {
    const res = listHelper.mostLikes([])
    assert.equal(res, null)
  })
  test('when not list, throws', () => {
    assert.throws(() => {
      listHelper.mostLikes({})
    })
  })
  test('when single element in list, return that author', () => {
    const expectedAuthor = listWithOneBlog[0].author
    const expectedLikes = listWithOneBlog[0].likes

    const res = listHelper.mostLikes(listWithOneBlog)

    assert.deepStrictEqual(res, {
      author: expectedAuthor,
      likes: expectedLikes,
    })
  })
  test('when multiple blogs, return author with most likes', () => {
    const expectedAuthor = sampleBlogs[1].author

    const res = listHelper.mostLikes(sampleBlogs)

    assert.equal(res.author, expectedAuthor)
    assert.equal(res.likes, 17)
  })
})
