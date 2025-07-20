import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const dummyData = [
  { name: "Arto Hellas", number: "040-123456", id: 1 },
  { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
];

const App = () => {
  const [persons, setPersons] = useState(dummyData);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");

  function handleSubmit(ev) {
    ev.preventDefault();
    if (persons.some(({ name }) => name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    // alternatively, could use prev.concat(x)
    setPersons((prev) => [...prev, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  }
  return (
    <div>
      <h2>Phonebook</h2>
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
        persons={persons.filter((pers) =>
          pers.name.toLowerCase().includes(filterText.toLowerCase())
        )}
      />
    </div>
  );
};

export default App;
