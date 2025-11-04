import axios from 'axios'
import { userAuthKey } from '../App'

const baseUrl = '/api/blogs'

const getToken = () => {
  let token = ''
  const storedUserData = window.localStorage.getItem(userAuthKey)
  if (storedUserData) {
    token = JSON.parse(storedUserData).token
  }
  return token
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (blogData) => {
  const config = {
    headers: {
      authorization: `Bearer ${getToken()}`,
    },
  }
  const res = await axios.post(baseUrl, blogData, config)
  return res.data
}

const put = async (blogData) => {
  const id = blogData.id
  if (!id) {
    throw new Error('Tried to update blog with no id')
  }
  const config = {
    headers: {
      authorization: `Bearer ${getToken()}`,
    },
  }
  const blog = { ...blogData }
  delete blog.id
  delete blog.user
  const res = await axios.put(`${baseUrl}/${id}`, blog, config)
  return res.data
}

const remove = async (blogId) => {
  const config = {
    headers: {
      authorization: `Bearer ${getToken()}`,
    },
  }
  const res = await axios.delete(`${baseUrl}/${blogId}`, config)
  return res.data
}

const blogService = { getAll, create, put, remove }
export default blogService
