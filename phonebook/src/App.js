import { useState, useEffect } from 'react';
import phonebookService from './services/entries';
import Entry from './components/Entry';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([  ]); 
  const [filter, setFilter] = useState('');

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => setPersons(response));
  }, []);

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  }

  const tryAddPerson = (newName, newNumber) => {
    const checkSameName = persons.reduce(
        (check, person) => (
          person.name.toLowerCase() === newName.toLowerCase() ?
          check.concat(person) : check
        ),
    []);
    
    if(checkSameName.length > 0)
    {
      if(window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
        )) {
          phonebookService
            .update(checkSameName[0].id, {name: newName, number: newNumber})
            .then(response => setPersons(persons.map(
              person => person.id === response.id ? response : person
            )));
          return true;
        } else {
          return false;
        }
    } else {
      phonebookService
        .create({name: newName, number: newNumber})
        .then(response => setPersons(persons.concat(response)));
      return true;
    }
  };

  const removePerson = (entry) => {
    if(window.confirm(`Delete ${entry.name}?`)) {
      phonebookService
        .remove(entry.id);
      setPersons(persons.filter(person => person.id !== entry.id));
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filter} updateFilter={updateFilter} />
      <h2>add a new</h2>
      <PersonForm tryAddPerson={tryAddPerson} />
      <h2>Numbers</h2>
      {persons.reduce((reduced, person) => (
        (person.name.toLowerCase().search(filter.toLowerCase()) < 0) ?
        reduced : reduced.concat(person))
        ,[]).map(person => <Entry key={person.name} person={person} remove={() => removePerson(person)} />)}
    </div>
  );
};

export default App;