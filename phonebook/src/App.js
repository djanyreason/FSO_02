import { useState } from 'react';
import Entry from './components/Entry';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([  ]); 
  const [filter, setFilter] = useState('');

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filter} updateFilter={updateFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      {persons.reduce((reduced, person) => (
        (person.name.toLowerCase().search(filter.toLowerCase()) < 0) ?
        reduced : reduced.concat(person))
        ,[]).map(person => <Entry key={person.name} person={person} />)}
    </div>
  );
};

export default App;