const resetDb = async (request) => {
  await request.post('/api/testing/reset')
}

const createUser = async (request, userData) => {
  await request.post('/api/users', { data: userData })
}

const createBlogs = async (page, blogsSampleData) => {
  const authData = await page.evaluate(() => {
    const userAuthKey = 'userAuth'
    return JSON.parse(globalThis.localStorage.getItem(userAuthKey) || '')
  })
  if (!authData) {
    throw new Error('Error getting auth data')
  }
  const token = authData.token
  const req = page.request
  for (let i = 0; i < blogsSampleData.length; i++) {
    await req.post('/api/blogs', {
      data: blogsSampleData[i],
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  }
}
module.exports = {
  resetDb,
  createUser,
  createBlogs,
}
