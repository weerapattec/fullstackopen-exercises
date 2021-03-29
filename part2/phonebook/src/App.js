import React, { useState } from "react";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import Filter from "./Components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [filterPersons, setFilterPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let exist = false;
    for (const person of persons) {
      if (person.name === newName) {
        exist = true;
      }
    }
    if (exist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNum,
      };
      setPersons(persons.concat(personObject));
      setFilterPersons(persons.concat(personObject));
      setNewName("");
      setNewNum("");
    }
  };

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleNum = (e) => {
    setNewNum(e.target.value);
  };

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setFilterPersons(persons);
    } else {
      const regex = new RegExp(`^${e.target.value}`, "i");
      const newFilterPersons = filterPersons.filter((person) =>
        regex.test(person.name)
      );
      setFilterPersons(newFilterPersons);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleName={handleName}
        newNum={newNum}
        handleNum={handleNum}
      />
      <h2>Numbers</h2>
      <Persons persons={filterPersons} />
    </div>
  );
};

export default App;