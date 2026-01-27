import axios from 'axios'

export const getCountries = async (name) => {
  const res = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
  return res
}
