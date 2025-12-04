// @ts-check
const { test, expect, request } = require('@playwright/test')
const { resetDb, createUser, createBlogs } = require('./helpers/api-helper')
const { sampleUserData, sampleUser2Data } = require('./samples/user-samples')
const { login, createBlog } = require('./helpers/interface-helper')
const { sampleBlogData, getSampleBLogData } = require('./samples/blog-samples')

test.describe('blog app', async () => {
  test.beforeEach(async ({ page, request }) => {
    await resetDb(request)
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const loginHeader = page.getByRole('heading', { name: 'Login' })
    const usernameField = page.getByRole('textbox', { name: 'username' })
    const passwordField = page.getByRole('textbox', { name: 'password' })
    await expect(loginHeader).toBeVisible()
    await expect(usernameField).toBeVisible()
    await expect(passwordField).toBeVisible()
  })

  test.describe('login', () => {
    test.beforeEach(async ({ request }) => {
      await resetDb(request)
      await createUser(request, sampleUserData)
    })
    test('login succeeds', async ({ page }) => {
      await login(page, sampleUserData)

      const blogsHeader = page.getByRole('heading', { name: 'blogs' })
      await expect(blogsHeader).toBeVisible()
    })

    test('login fails with wrong credentials', async ({ page }) => {
      const userData = {
        ...sampleUserData,
        password: 'wrong',
      }

      // we don't reuse the login function here because it confirms login was successful
      // before handing off the control.
      await page.getByRole('textbox', { name: 'username' }).fill(userData.username)
      await page.getByRole('textbox', { name: 'password' }).fill(userData.password)
      await page.getByRole('button', { name: 'login' }).click()

      const loginErrorMsg = page.getByText('Invalid username or password')
      await expect(loginErrorMsg).toBeVisible()

      const blogsHeader = page.getByRole('heading', { name: 'blogs' })
      await expect(blogsHeader).not.toBeVisible({ timeout: 2000 })
    })
  })

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page, request }) => {
      await createUser(request, sampleUserData)
      await login(page, sampleUserData)
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, sampleBlogData)

      const successMsgText = `A new blog '${sampleBlogData.title}' by ${sampleBlogData.author}`
      const createBlogSuccessMsg = page.getByText(successMsgText)
      await expect(createBlogSuccessMsg).toBeVisible()

      const blogLocator = page.getByText(`${sampleBlogData.title} ${sampleBlogData.author}`)
      await expect(blogLocator).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, sampleBlogData)

      const viewButtonLocator = page
        .getByText(`${sampleBlogData.title} ${sampleBlogData.author}`)
        .getByRole('button', { name: 'view' })
      await viewButtonLocator.click()
      const emptyLikesTextLocator = page.getByText('likes 0')
      await expect(emptyLikesTextLocator).toBeVisible()

      await emptyLikesTextLocator.getByRole('button', { name: 'like' }).click()

      await expect(emptyLikesTextLocator).not.toBeVisible()
      const oneLikesTextLocator = page.getByText('likes 1')
      await expect(oneLikesTextLocator).toBeVisible()
    })

    test('a blog can be deleted by its creator', async ({ page }) => {
      await createBlog(page, sampleBlogData)
      await createBlog(page, { ...sampleBlogData, title: 'asdfg' })

      const blogContainer = page.getByText(`${sampleBlogData.title} ${sampleBlogData.author}`)
      const viewButtonLocator = blogContainer.getByRole('button', { name: 'view' })
      await viewButtonLocator.click()

      page.on('dialog', (dialog) => dialog.accept())
      await blogContainer.getByRole('button', { name: 'remove' }).click()
      await expect(blogContainer).not.toBeVisible()
    })

    test('user who did not create the blog cannot see remove button', async ({ browser, page }) => {
      // user 1 creates blog
      await createBlog(page, sampleBlogData)

      // user 2 lists blog and clicks view
      const user2Ctx = await browser.newContext({})
      const user2Page = await user2Ctx.newPage()
      const requestUser2 = user2Page.request
      await createUser(requestUser2, sampleUser2Data)
      await user2Page.goto('/')
      await login(user2Page, sampleUser2Data)
      const blogContainer = user2Page.getByText(`${sampleBlogData.title} ${sampleBlogData.author}`)
      const viewButtonLocator = blogContainer.getByRole('button', { name: 'view' })
      await viewButtonLocator.click()

      const removeBtnLocator = blogContainer.getByRole('button', { name: 'remove' })
      await expect(removeBtnLocator).not.toBeVisible()

      await user2Ctx.close()
    })
    test('blogs are ordered by likes, descending', async ({ browser, page }) => {
      // since we are creating many blogs, lets directly create them in the API.
      await createBlogsWithLikes(page, 5)

      const blogsDivLocator = await page
        .getByRole('listitem')
        .filter({ has: page.getByRole('button', { name: 'view' }) })

      while ((await blogsDivLocator.count()) > 0) {
        const viewButtonLocator = blogsDivLocator.first().getByRole('button', { name: 'view' })
        await viewButtonLocator.click()
      }

      const texts = await page.getByText(/likes\s\d+/).allTextContents()
      const likesList = texts.map((text) => {
        return Number(text.replace(/\D/g, ''))
      })
      let isAscending = true
      for (let i = 1; i < likesList.length; i++) {
        if (likesList[i] > likesList[i - 1]) {
          isAscending = false
          break
        }
      }
      expect(isAscending).toBe(true)
    })
  })
})

/**
 * @param {import("playwright-core").Page} page
 */
async function createBlogsWithLikes(page, n = 5) {
  const blogsSampleData = getSampleBLogData(n).map((el, i) => ({ ...el, likes: i * 10 }))
  await createBlogs(page, blogsSampleData)
  await page.reload()
  await page.getByText(`${blogsSampleData[0].title} ${blogsSampleData[0].author}`).waitFor()
}
