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

const blogService = { getAll, create }
export default blogService
