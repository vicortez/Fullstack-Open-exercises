import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import {
  createPerson,
  deletePerson,
  getPersons,
  updatePerson,
} from "./services/api"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterText, setFilterText] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    getPersons().then((persons) => setPersons(persons))
  }, [])

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [errorMessage])

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [successMessage])

  function handleSubmit(ev) {
    ev.preventDefault()
    if (
      persons.some(
        ({ name, number }) => name === newName && number === newNumber
      )
    ) {
      setErrorMessage(`${newName} is already added to phonebook`)
      setTimeout(() => {}, 5000)
      return
    }
    const newPerson = { name: newName, number: newNumber }
    const foundPerson = persons.find(({ name }) => name === newName)
    if (foundPerson != null) {
      const text = `${newName} is already added to the phonebook. Replace the old number with a new one?`
      if (confirm(text)) {
        if (!foundPerson.id) {
          setErrorMessage(`Error identifying contact. Cancelling operation`)
          setTimeout(() => {}, 5000)
          return
        }
        updatePerson(foundPerson.id, newPerson)
          .then(() => {
            foundPerson.number = newNumber
            setSuccessMessage(`Updated ${newName}`)
            setNewName("")
            setNewNumber("")
          })
          .catch((err) => {
            setErrorMessage(`${newName} has already been removed`)
          })
      }
    } else {
      createPerson(newPerson).then((updatedPerson) => {
        // alternatively, could use prev.concat(x)
        setPersons((prev) => [...prev, updatedPerson])
        setSuccessMessage(`Added ${newName}`)
        setNewName("")
        setNewNumber("")
      })
    }
  }

  function handleDelete(id) {
    if (!window.confirm("Delete user?")) {
      return
    }

    deletePerson(id).then(() => {
      setPersons((prev) => prev.filter((person) => person.id !== id))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
      <Filter
        filterText={filterText}
        onChange={(ev) => setFilterText(ev.target.value)}
      />

      <h2>Add a new</h2>
      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        onChangeName={(ev) => setNewName(ev.target.value)}
        newNumber={newNumber}
        onChangeNumber={(ev) => setNewNumber(ev.target.value)}
      />
      <h2>Numbers</h2>
      <Persons
        onDelete={handleDelete}
        persons={persons.filter((pers) =>
          pers.name.toLowerCase().includes(filterText.toLowerCase())
        )}
      />
    </div>
  )
}

export default App
