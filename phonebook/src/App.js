import { useState, useEffect } from 'react';
import axios from 'axios';
import Entry from './components/Entry';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([  ]); 
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      }
    );
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
      axios
        .post('http://localhost:3001/persons', {name: newName, number: newNumber})
        .then(response => {setPersons(persons.concat(response.data));});
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