const { mongoose } = require('mongoose')
const { describe, after, test, beforeEach, before } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const {
  samplesUserDataCreation,
  samplesUserDocument,
} = require('./utils/sample_users')
const User = require('../models/user')
const expect = require('node:assert/strict')

const url = '/api/users'

const api = supertest(app)

after(() => {
  mongoose.connection.close()
})
before(async () => {
  await User.ensureIndexes()
})

describe('user endpoints', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ ...samplesUserDocument[0] })
    await user.save()
  })
  test('user can be added', async () => {
    // arrange
    const usersInDbBefore = await User.find({})
    const userData = samplesUserDataCreation[0]

    // act
    await api
      .post(url)
      .send(userData)
      .expect(201)
      .expect('content-type', /application\/json/)

    // assert
    const usersInDbAfter = await User.find({})
    expect.equal(usersInDbAfter.length, usersInDbBefore.length + 1)
  })

  test("user with no username can't be added", async () => {
    const usersInDbBefore = await User.find({})

    const userData = { ...samplesUserDataCreation[0] }
    delete userData.username

    const res = await api
      .post(url)
      .send(userData)
      .expect(400)
      .expect('content-type', /application\/json/)

    expect(res.body.error.includes('Username is required'))
    const usersInDbAfter = await User.find({})
    expect.equal(usersInDbAfter.length, usersInDbBefore.length)
  })

  test("user with short password can't be added", async () => {
    const usersInDbBefore = await User.find({})

    const userData = { ...samplesUserDataCreation[0] }
    userData.password = '12'

    const res = await api
      .post(url)
      .send(userData)
      .expect(400)
      .expect('content-type', /application\/json/)

    expect(res.body.error.includes('password should be at least'))
    const usersInDbAfter = await User.find({})
    expect.equal(usersInDbAfter.length, usersInDbBefore.length)
  })

  test("user with duplicate username can't be added", async () => {
    const usersInDbBefore = await User.find({})

    const userData = { ...samplesUserDataCreation[0] }
    userData.username = samplesUserDocument[0].username

    const res = await api
      .post(url)
      .send(userData)
      .expect(400)
      .expect('content-type', /application\/json/)

    expect(res.body.error.includes('expected `username` to be unique'))
    const usersInDbAfter = await User.find({})
    expect.equal(usersInDbAfter.length, usersInDbBefore.length)
  })
})
