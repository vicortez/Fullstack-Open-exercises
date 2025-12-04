const { expect } = require('@playwright/test')

const login = async (page, sampleUserData) => {
  await page.getByRole('textbox', { name: 'username' }).fill(sampleUserData.username)
  await page.getByRole('textbox', { name: 'password' }).fill(sampleUserData.password)
  await page.getByRole('button', { name: 'login' }).click()
  const blogsHeader = page.getByRole('heading', { name: 'blogs' })
  await expect(blogsHeader).toBeVisible()
}

const createBlog = async (page, blogData) => {
  await page.getByRole('button', { name: 'create new' }).click()
  await page.getByRole('textbox', { name: 'title*:' }).fill(blogData.title)
  await page.getByRole('textbox', { name: 'author:' }).fill(blogData.author)
  await page.getByRole('textbox', { name: 'url*:' }).fill(blogData.url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${blogData.title} ${blogData.author}`).waitFor()
}

module.exports = {
  login,
  createBlog,
}
