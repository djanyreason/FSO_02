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
    if(persons.reduce((check, person) => 
                      (check || (person.name.toLowerCase() 
                                 === newName.toLowerCase())), false))
    {
      return false;
    } else {
      phonebookService
        .create({name: newName, number: newNumber})
        .then(response => setPersons(persons.concat(response)));
      console.log('Hello!');
      console.log(persons);
      return true;
    }
  };

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
        ,[]).map(person => <Entry key={person.name} person={person} />)}
    </div>
  );
};

export default App;