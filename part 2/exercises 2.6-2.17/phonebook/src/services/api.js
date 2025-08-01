import axios from "axios"

const baseUrl = "http://localhost:3001/persons"
export const getPersons = () => axios.get(baseUrl).then((res) => res.data)

export const createPerson = (newPerson) =>
  axios.post(baseUrl, newPerson).then((res) => res.data)

export const deletePerson = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((res) => res.data)

export const updatePerson = (id, data) =>
  axios.put(`${baseUrl}/${id}`, data).then((res) => res.data)
